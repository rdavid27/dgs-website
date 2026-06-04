import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CheckCircle, ShieldCheck, Truck, ClipboardList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Remember cart items before clearing them so we can display them in the receipt
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptTotal, setReceiptTotal] = useState(0);

  // When submitting, capture items to render on success screen
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setReceiptItems([...cartItems]);
    setReceiptTotal(cartTotal);
    
    const generatedId = `DGS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 600);
  };

  if (orderPlaced) {
    return (
      <div className="container checkout-container animate-fade-in">
        <div className="success-card text-center">
          <div className="success-icon-wrapper">
            <CheckCircle size={60} className="text-gold" />
          </div>
          <h1 className="success-title">Order Received</h1>
          <p className="success-subtitle">
            Thank you, <strong>{formData.name}</strong>. Your gourmet order is being prepared.
          </p>

          {/* Receipt Invoice Card */}
          <div className="receipt-invoice">
            <div className="receipt-header">
              <div className="receipt-logo">
                <span className="logo-brand">David</span>
                <span className="logo-sub">Gram Stores</span>
              </div>
              <div className="receipt-meta">
                <span>Receipt / Invoice</span>
                <strong>{orderId}</strong>
              </div>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-details">
              <div className="receipt-row">
                <span>Deliver To:</span>
                <strong>{formData.name}</strong>
              </div>
              <div className="receipt-row">
                <span>Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className="receipt-row">
                <span>Destination:</span>
                <span className="text-right">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-items-list">
              {receiptItems.map(item => (
                <div key={item.id} className="receipt-item-row">
                  <span>{item.name} <em className="text-muted">x{item.quantity}</em></span>
                  <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-total-row">
              <span>Total Paid (COD):</span>
              <strong className="text-brand">Rs {receiptTotal.toFixed(2)}</strong>
            </div>

            <div className="receipt-footer">
              <p>Estimated Delivery: 24 - 48 Hours</p>
              <p>Please prepare exact cash for Cash on Delivery.</p>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
            <Link to="/" className="btn btn-outline ml-3">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container checkout-container animate-fade-in text-center" style={{ padding: '8rem 0' }}>
        <div className="empty-cart-card">
          <div className="empty-icon">🛒</div>
          <h1 className="page-title">Your Cart is Empty</h1>
          <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
            Looks like you haven't selected any gourmet snacks yet. Visit our shop to begin.
          </p>
          <Link to="/shop" className="btn btn-primary">Browse Snacking Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-container animate-fade-in">
      <div className="checkout-title-section text-center">
        <span className="section-subtitle">Secure Ordering</span>
        <h1 className="page-title">Gourmet Checkout</h1>
      </div>
      
      <div className="checkout-grid">
        {/* Left Side: Checkout Form */}
        <div className="checkout-form-container">
          <div className="form-section-header">
            <Truck size={20} className="text-gold" />
            <h3>Delivery Details</h3>
          </div>
          <form className="checkout-form" onSubmit={handleOrderSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="e.g. Rakesh Silva"
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="e.g. +94 77 123 4567"
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea 
                id="address" 
                name="address" 
                rows="3" 
                placeholder="Street address, apartment unit, floor..."
                required 
                value={formData.address} 
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="e.g. Colombo / Kandy"
                required 
                value={formData.city} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Special Roasting / Order Instructions (Optional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows="2" 
                value={formData.notes} 
                onChange={handleInputChange} 
                placeholder="e.g. Extra spicy mixture, light salt Cashews, deliver after 5 PM..."
              ></textarea>
            </div>
            
            <div className="payment-method">
              <h4>Payment Verification</h4>
              <div className="cod-badge-container">
                <span className="cod-badge">Cash on Delivery (COD)</span>
                <span className="guarantee-badge"><ShieldCheck size={14} /> Safe Snacking</span>
              </div>
              <p className="payment-note">Payment is collected in cash upon arrival. No credit card required.</p>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '2rem', width: '100%', padding: '14px' }}>
              Confirm & Place Order - Rs {cartTotal.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Right Side: Cart Summary */}
        <div className="cart-summary">
          <div className="form-section-header">
            <ClipboardList size={20} className="text-gold" />
            <h3>Order Summary</h3>
          </div>
          
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-img-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <span className="cart-item-qty-badge">{item.quantity}</span>
                </div>
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <span className="cart-item-category">{item.category}</span>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={12} /></button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={12} /></button>
                    </div>
                    <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-totals-panel">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>Rs {cartTotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Delivery Fee</span>
              <span className="text-success">FREE Delivery</span>
            </div>
            <div className="totals-row grand-total">
              <span>Total Amount</span>
              <span className="text-brand">Rs {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
