import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, Search, Clock, MapPin, Phone, RefreshCw, 
  CheckCircle, Truck, Package, ShieldCheck, ChevronRight, XCircle, Loader2
} from 'lucide-react';
import { fetchOrders, updateOrderStatus } from '../utils/api';
import toast from 'react-hot-toast';
import './AdminOrders.css';

const statusColors = {
  Pending: 'status-pending',
  Preparing: 'status-preparing',
  Dispatched: 'status-dispatched',
  Delivered: 'status-delivered',
  Cancelled: 'status-cancelled'
};

const statusIcons = {
  Pending: <Clock size={16} />,
  Preparing: <Package size={16} />,
  Dispatched: <Truck size={16} />,
  Delivered: <CheckCircle size={16} />,
  Cancelled: <XCircle size={16} />
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadOrders = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
      if (data.length > 0) {
        // Maintain selection if already selected
        if (selectedOrder) {
          const updatedSelected = data.find(o => o.id === selectedOrder.id);
          setSelectedOrder(updatedSelected || data[0]);
        } else {
          setSelectedOrder(data[0]);
        }
      } else {
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      toast.error('Could not connect to database server.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    if (updatingStatus) return;
    setUpdatingStatus(true);
    const toastId = toast.loading(`Updating status to ${newStatus}...`);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`, { id: toastId });
      await loadOrders(true); // reload silently
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to update order status', { id: toastId });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Orders Dashboard | David Gram Stores</title>
      </Helmet>
      <div className="admin-orders-page animate-fade-in">
        {/* Banner */}
        <div className="admin-banner text-center">
          <div className="container">
            <span className="section-subtitle">Database Control</span>
            <h1 className="page-title">Orders Management Dashboard</h1>
            <p className="page-subtitle">Inspect gourmet orders, track dispatch status, and manage client details.</p>
          </div>
        </div>

        <div className="container admin-container">
          <div className="admin-grid">
            
            {/* Left Column: Orders List Sidebar */}
            <div className="admin-sidebar">
              
              {/* Search & Filter Controls */}
              <div className="sidebar-controls">
                <div className="admin-search-wrapper">
                  <Search size={16} className="admin-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by ID, name, phone, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                  />
                </div>
                
                <div className="admin-filter-row">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="admin-filter-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  
                  <button 
                    onClick={() => loadOrders(false)}
                    className="admin-refresh-btn"
                    title="Refresh from DB"
                    aria-label="Refresh from database"
                  >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>

              {/* Order Cards List */}
              <div className="orders-list">
                {loading ? (
                  <div className="admin-loading-state">
                    <Loader2 size={32} className="animate-spin text-gold" />
                    <p>Loading database orders...</p>
                  </div>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map(order => {
                    const isSelected = selectedOrder?.id === order.id;
                    const itemsCount = order.items?.reduce((c, i) => c + i.quantity, 0) || 0;
                    
                    return (
                      <div 
                        key={order.id}
                        className={`order-list-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="card-header-row">
                          <span className="order-id">{order.id}</span>
                          <span className={`status-pill ${statusColors[order.status]}`}>
                            {statusIcons[order.status]}
                            <span>{order.status}</span>
                          </span>
                        </div>
                        <h4 className="customer-name">{order.customerName}</h4>
                        <div className="card-meta">
                          <span>{order.city}</span>
                          <span className="dot">•</span>
                          <span>{itemsCount} item{itemsCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="card-footer-row">
                          <span className="order-time">{formatDate(order.createdAt)}</span>
                          <strong className="order-price">Rs {order.totalAmount.toFixed(2)}</strong>
                        </div>
                        <ChevronRight size={16} className="card-arrow" />
                      </div>
                    );
                  })
                ) : (
                  <div className="no-orders text-center">
                    <ClipboardList size={40} className="text-muted" />
                    <h3>No Orders Found</h3>
                    <p>No transactions registered matching the active filters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Detail pane */}
            <div className="admin-main">
              <AnimatePresence mode="wait">
                {selectedOrder ? (
                  <motion.div 
                    key={selectedOrder.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="order-detail-card"
                  >
                    <div className="detail-header">
                      <div>
                        <span className="order-detail-tag">Order Receipt</span>
                        <h2>{selectedOrder.id}</h2>
                        <span className="order-detail-date">Placed on {formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      
                      {/* Status quick control */}
                      <div className="status-control-section">
                        <label>Manage Status</label>
                        <div className="status-buttons">
                          <button 
                            onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}
                            className={`ctrl-btn prep-btn ${selectedOrder.status === 'Preparing' ? 'active' : ''}`}
                            disabled={updatingStatus}
                          >
                            Prepare
                          </button>
                          <button 
                            onClick={() => handleStatusChange(selectedOrder.id, 'Dispatched')}
                            className={`ctrl-btn ship-btn ${selectedOrder.status === 'Dispatched' ? 'active' : ''}`}
                            disabled={updatingStatus}
                          >
                            Dispatch
                          </button>
                          <button 
                            onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                            className={`ctrl-btn deliver-btn ${selectedOrder.status === 'Delivered' ? 'active' : ''}`}
                            disabled={updatingStatus}
                          >
                            Deliver
                          </button>
                          <button 
                            onClick={() => handleStatusChange(selectedOrder.id, 'Cancelled')}
                            className={`ctrl-btn cancel-btn ${selectedOrder.status === 'Cancelled' ? 'active' : ''}`}
                            disabled={updatingStatus}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="detail-divider"></div>

                    {/* Customer Info Section */}
                    <div className="customer-info-section">
                      <h3>Customer Information</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <Clock size={16} className="text-gold" />
                          <div>
                            <strong>Full Name</strong>
                            <p>{selectedOrder.customerName}</p>
                          </div>
                        </div>
                        <div className="info-item">
                          <Phone size={16} className="text-gold" />
                          <div>
                            <strong>Contact Phone</strong>
                            <p>{selectedOrder.customerPhone}</p>
                          </div>
                        </div>
                        <div className="info-item full-width">
                          <MapPin size={16} className="text-gold" />
                          <div>
                            <strong>Delivery Address</strong>
                            <p>{selectedOrder.address}, {selectedOrder.city}</p>
                          </div>
                        </div>
                        {selectedOrder.notes && (
                          <div className="info-item full-width notes-item">
                            <ClipboardList size={16} className="text-gold" />
                            <div>
                              <strong>Special Roasting / Order Instructions</strong>
                              <p className="special-notes">"{selectedOrder.notes}"</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="detail-divider"></div>

                    {/* Ordered Items List */}
                    <div className="items-section">
                      <h3>Ordered Savouries & Sweets</h3>
                      <div className="detail-items-list">
                        <div className="table-header">
                          <span>Snack Item</span>
                          <span className="text-center">Price</span>
                          <span className="text-center">Qty</span>
                          <span className="text-right">Subtotal</span>
                        </div>
                        
                        {selectedOrder.items?.map(item => (
                          <div key={item.id} className="table-row">
                            <span className="item-name font-outfit">{item.productName}</span>
                            <span className="text-center">Rs {item.price.toFixed(2)}</span>
                            <span className="text-center">x{item.quantity}</span>
                            <span className="text-right font-weight-bold">Rs {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="detail-totals">
                        <div className="totals-row">
                          <span>Subtotal</span>
                          <span>Rs {selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="totals-row">
                          <span>Delivery Fee</span>
                          <span className="text-success font-weight-bold">FREE</span>
                        </div>
                        <div className="totals-row grand-total">
                          <span>Grand Total Paid (COD)</span>
                          <strong className="text-brand">Rs {selectedOrder.totalAmount.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="detail-footer">
                      <div className="guarantee-badge">
                        <ShieldCheck size={14} className="text-gold" />
                        <span>Database Transaction Verified</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="empty-detail-state text-center">
                    <ClipboardList size={60} className="text-gold opacity-40 animate-pulse" />
                    <h3>No Order Selected</h3>
                    <p>Choose an order from the list on the left to see transaction details and update status.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
