import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3 className="footer-title"><span className="text-brand">David</span> Gram Stores</h3>
          <p className="footer-desc">
            Specialist for Peanuts in Sri Lanka since 1962. Serving the best traditional snacks, mixtures, and sweets.
          </p>
          <div className="social-links">
            <a href="https://facebook.com/davidgramstores" target="_blank" rel="noreferrer">FB</a>
            <a href="https://www.instagram.com/davidgramstores.lk" target="_blank" rel="noreferrer">IG</a>
            <a href="https://twitter.com/davidgramstores" target="_blank" rel="noreferrer">TW</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-subtitle">Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/shop">Our Products</Link>
          <Link to="/checkout">Cart & Checkout</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-subtitle">Contact Us</h4>
          <div className="contact-item">
            <MapPin size={18} className="text-brand" />
            <span>214, Gasworks Street, Colombo, Sri Lanka</span>
          </div>
          <div className="contact-item">
            <Phone size={18} className="text-brand" />
            <span>+94 XX XXX XXXX</span>
          </div>
          <div className="contact-item">
            <Mail size={18} className="text-brand" />
            <span>orders@davidgramstores.com</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} David Gram Stores. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
