import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="container checkout-container animate-fade-in text-center" style={{ padding: '5rem 0' }}>
        <h1 className="page-title text-brand">Order Received!</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Thank you, {formData.name}. Your order has been placed successfully.
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Payment Method: <strong>Cash on Delivery</strong>
        </p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container checkout-container animate-fade-in text-center" style={{ padding: '5rem 0' }}>
        <h1 className="page-title">Your Cart is Empty</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Looks like you haven't added any snacks yet.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container checkout-container animate-fade-in">
      <h1 className="page-title mb-lg">Checkout</h1>
      
      <div className="checkout-grid">
        {/* Cart Summary */}
        <div className="cart-summary">
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Order Summary</h2>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-price">Rs {item.price.toFixed(2)}</div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                    </div>
                    <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-totals">
            <div className="total-row font-bold">
              <span>Total</span>
              <span className="text-brand">Rs {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form-container">
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delivery Details</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea id="address" name="address" rows="3" required value={formData.address} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Order Notes (Optional)</label>
              <textarea id="notes" name="notes" rows="2" value={formData.notes} onChange={handleInputChange} placeholder="Special instructions..."></textarea>
            </div>
            
            <div className="payment-method">
              <h4>Payment Method</h4>
              <div className="cod-badge">
                Cash on Delivery (COD)
              </div>
              <p className="payment-note">You will pay in cash when your order is delivered.</p>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem', width: '100%' }}>
              Place Order - Rs {cartTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
