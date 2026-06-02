import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="container flex justify-between items-center navbar-content">
        <Link to="/" className="logo-text">
          <span className="text-brand">David</span> Gram Stores
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/shop" className="nav-link">Our Products</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/checkout" className="cart-btn">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="mobile-nav animate-fade-in">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/shop" className="nav-link" onClick={() => setIsOpen(false)}>Our Products</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
