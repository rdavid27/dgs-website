import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-title">
                <ShoppingBag size={20} />
                <span>Your Cart</span>
                {cartItems.length > 0 && (
                  <span className="drawer-count">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
                )}
              </div>
              <button className="drawer-close-btn" onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="drawer-body">
              {cartItems.length === 0 ? (
                <div className="drawer-empty">
                  <ShoppingBag size={52} className="empty-bag-icon" />
                  <p>Your cart is empty</p>
                  <span>Add some premium DGS snacks!</span>
                  <button className="btn btn-primary" onClick={closeCart} style={{ marginTop: '1.5rem' }}>
                    Browse Products
                  </button>
                </div>
              ) : (
                <ul className="drawer-items-list">
                  <AnimatePresence initial={false}>
                    {cartItems.map(item => (
                      <motion.li
                        key={item.id}
                        className="drawer-item"
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="drawer-item-img-wrap">
                          <img src={item.image} alt={item.name} className="drawer-item-img" />
                        </div>
                        <div className="drawer-item-info">
                          <p className="drawer-item-name">{item.name}</p>
                          <span className="drawer-item-price">Rs {item.price.toFixed(2)}</span>
                          <div className="drawer-qty-controls">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="qty-num">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                        <button
                          className="drawer-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="drawer-subtotal">
                  <span>Subtotal</span>
                  <span className="subtotal-amount">Rs {cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="btn btn-primary w-full"
                  onClick={closeCart}
                  style={{ justifyContent: 'center', gap: '0.5rem' }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
