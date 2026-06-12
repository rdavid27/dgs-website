import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFolder = path.join(__dirname, 'data');

// Ensure database directory exists
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const dbPath = path.join(dbFolder, 'dgs_database.db');
const db = new DatabaseSync(dbPath);

console.log(`Database initialized at: ${dbPath}`);

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS outlets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    hours TEXT NOT NULL,
    openHours TEXT NOT NULL, -- JSON string representation
    type TEXT NOT NULL,
    amenities TEXT NOT NULL, -- JSON string representation
    mapX REAL NOT NULL,
    mapY REAL NOT NULL,
    shortDesc TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerName TEXT NOT NULL,
    customerPhone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    notes TEXT,
    totalAmount REAL NOT NULL,
    status TEXT DEFAULT 'Pending',
    createdAt TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    productName TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE
  )
`);

// Seed Products if table is empty
const productCountResult = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (productCountResult.count === 0) {
  console.log('Seeding initial products data...');
  const initialProducts = [
    {
      id: 'p1',
      name: 'Spicy Peanut Mixture',
      description: 'Our signature mixture with roasted peanuts, chickpeas, and traditional spices.',
      price: 450.00,
      category: 'David Snacks',
      image: 'https://images.unsplash.com/photo-1577789312520-569d51ff6a71?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p2',
      name: 'Roasted Cashews',
      description: 'Premium quality cashew nuts roasted to perfection with a hint of salt.',
      price: 1200.00,
      category: 'David Snacks',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p3',
      name: 'Manioc Chips',
      description: 'Thinly sliced, crispy manioc chips seasoned with chili and salt.',
      price: 350.00,
      category: 'David Snacks',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p4',
      name: 'Murukku (Spicy)',
      description: 'Traditional South Indian style crispy spirals, perfect for tea time.',
      price: 400.00,
      category: 'David Snacks',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p5',
      name: 'Sweet Peanut Candy (Kadalai Mittai)',
      description: 'Crunchy peanuts bound together in traditional jaggery syrup.',
      price: 300.00,
      category: 'David Sweets',
      image: 'https://images.unsplash.com/photo-1621258667520-2f9547d7e35b?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p6',
      name: 'Haldiram\'s Bhujia Sev',
      description: 'Mildly spicy and crispy sev made from tepary bean and gram flour.',
      price: 550.00,
      category: 'Haldiram\'s',
      image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p7',
      name: 'Gold Winner Sunflower Oil 1L',
      description: '100% pure sunflower oil enriched with Vitamins A & D.',
      price: 1150.00,
      category: 'Gold Winner Oil',
      image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'p8',
      name: 'Chickpea Crackers',
      description: 'Light and crunchy crackers made with premium roasted chickpeas.',
      price: 380.00,
      category: 'David Snacks',
      image: 'https://images.unsplash.com/photo-1563114773-84221bd62bf3?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, price, category, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const product of initialProducts) {
    insertProduct.run(product.id, product.name, product.description, product.price, product.category, product.image);
  }
}

// Seed Outlets if table is empty
const outletCountResult = db.prepare('SELECT COUNT(*) as count FROM outlets').get();
if (outletCountResult.count === 0) {
  console.log('Seeding initial outlets data...');
  const initialOutlets = [
    {
      id: 'out-pettah',
      name: 'Pettah Flagship (Head Office)',
      address: '214, Gasworks Street, Colombo 11, Sri Lanka',
      phone: '+94 11 232 4567',
      hours: 'Mon - Sat: 8:30 AM - 6:30 PM, Sun: Closed',
      openHours: { start: 8.5, end: 18.5, days: [1, 2, 3, 4, 5, 6] },
      type: 'Wholesale & Retail',
      amenities: ['Live Peanut Roasting', 'Bulk Order Station', 'Spicy Mixture Bar', 'Card Payments'],
      mapX: 110,
      mapY: 180,
      shortDesc: 'Our original heritage shop opened in 1978. The absolute hub for fresh hot mixtures.'
    },
    {
      id: 'out-galleface',
      name: 'Galle Face Green Kiosk',
      address: 'Galle Face Green Promenade, Colombo 03, Sri Lanka',
      phone: '+94 77 123 4567',
      hours: 'Daily: 4:00 PM - 10:00 PM',
      openHours: { start: 16.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] },
      type: 'Historic Kiosk',
      amenities: ['Heritage Cart Style', 'Fresh Hot Murukkus', 'Ocean Breeze Views', 'Cash Only'],
      mapX: 100,
      mapY: 200,
      shortDesc: 'A tribute to Mr. David Gnanapragasam’s original 1962 cart. Perfect evening tea-time snack spot.'
    },
    {
      id: 'out-ofg',
      name: 'One Galle Face Mall Boutique',
      address: 'Lower Ground Floor, One Galle Face Mall, Colombo 02, Sri Lanka',
      phone: '+94 11 456 7890',
      hours: 'Daily: 10:00 AM - 10:00 PM',
      openHours: { start: 10.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] },
      type: 'Premium Boutique',
      amenities: ['Gourmet Gift Packs', 'Tasting Station', 'Air Conditioned', 'Card & Mobile Pay'],
      mapX: 105,
      mapY: 190,
      shortDesc: 'Luxury boutique experience. Customize your snack gift baskets with custom labels.'
    },
    {
      id: 'out-kandy',
      name: 'Kandy City Centre Outlet',
      address: 'Level 2, Kandy City Centre, Dalada Veediya, Kandy, Sri Lanka',
      phone: '+94 81 234 5678',
      hours: 'Daily: 9:00 AM - 8:00 PM',
      openHours: { start: 9.0, end: 20.0, days: [0, 1, 2, 3, 4, 5, 6] },
      type: 'Hill Country Branch',
      amenities: ['Premium Cashews', 'Bulk Event Ordering', 'Local Sweets Bar', 'Card Payments'],
      mapX: 200,
      mapY: 130,
      shortDesc: 'Bringing the authentic Galle Face peanut crunch to the heart of the Hill Capital.'
    }
  ];

  const insertOutlet = db.prepare(`
    INSERT INTO outlets (id, name, address, phone, hours, openHours, type, amenities, mapX, mapY, shortDesc)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const outlet of initialOutlets) {
    insertOutlet.run(
      outlet.id,
      outlet.name,
      outlet.address,
      outlet.phone,
      outlet.hours,
      JSON.stringify(outlet.openHours),
      outlet.type,
      JSON.stringify(outlet.amenities),
      outlet.mapX,
      outlet.mapY,
      outlet.shortDesc
    );
  }
}

export default db;
