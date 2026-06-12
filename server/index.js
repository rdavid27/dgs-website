import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/outlets - Get all store outlets
app.get('/api/outlets', (req, res) => {
  try {
    const outlets = db.prepare('SELECT * FROM outlets').all();
    
    // Parse JSON serialized columns (openHours, amenities)
    const formattedOutlets = outlets.map(outlet => ({
      ...outlet,
      openHours: JSON.parse(outlet.openHours),
      amenities: JSON.parse(outlet.amenities)
    }));
    
    res.json(formattedOutlets);
  } catch (error) {
    console.error('Error fetching outlets:', error);
    res.status(500).json({ error: 'Failed to fetch outlets' });
  }
});

// GET /api/orders - Get all orders (newest first)
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
    
    const ordersWithItems = orders.map(order => {
      const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(order.id);
      return {
        ...order,
        items
      };
    });
    
    res.json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Get a single order by ID
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(id);
    
    res.json({
      ...order,
      items
    });
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /api/orders - Place a new order
app.post('/api/orders', (req, res) => {
  const { customerName, customerPhone, address, city, notes, totalAmount, items } = req.body;
  
  if (!customerName || !customerPhone || !address || !city || !totalAmount || !items || !items.length) {
    return res.status(400).json({ error: 'Missing required order fields or items' });
  }
  
  const orderId = `DGS-${Math.floor(100000 + Math.random() * 900000)}`;
  const createdAt = new Date().toISOString();
  const status = 'Pending';
  
  try {
    // Write in transaction
    db.exec('BEGIN TRANSACTION');
    
    const insertOrder = db.prepare(`
      INSERT INTO orders (id, customerName, customerPhone, address, city, notes, totalAmount, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertOrder.run(orderId, customerName, customerPhone, address, city, notes || '', totalAmount, status, createdAt);
    
    const insertItem = db.prepare(`
      INSERT INTO order_items (orderId, productId, productName, price, quantity)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    for (const item of items) {
      insertItem.run(orderId, item.id || item.productId, item.name || item.productName, item.price, item.quantity);
    }
    
    db.exec('COMMIT');
    
    // Fetch the inserted order to return it
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(orderId);
    
    res.status(201).json({
      ...order,
      items: orderItems
    });
    
  } catch (error) {
    db.exec('ROLLBACK');
    console.error('Error placing order, transaction rolled back:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// PATCH /api/orders/:id/status - Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  const validStatuses = ['Pending', 'Preparing', 'Dispatched', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }
  
  try {
    const checkOrder = db.prepare('SELECT id FROM orders WHERE id = ?').get(id);
    if (!checkOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const updateStatus = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    updateStatus.run(status, id);
    
    res.json({ id, status, message: 'Order status updated successfully' });
  } catch (error) {
    console.error(`Error updating status for order ${id}:`, error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on port ${PORT}`);
});
