import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-brand">David</span>
            <span className="logo-sub text-gold">Gram Stores</span>
          </Link>
          <p className="footer-desc">
            Specialists in traditional Sri Lankan snacks, spicy mixtures, and premium peanuts since 1962. Crafting quality with heritage.
          </p>
          <div className="social-links">
            <a href="https://facebook.com/davidgramstores" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            <a href="https://www.instagram.com/davidgramstores.lk" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://twitter.com/davidgramstores" target="_blank" rel="noreferrer" aria-label="Twitter">TW</a>
          </div>
        </div>

        <div className="footer-col links-col">
          <h4 className="footer-subtitle">Quick Navigation</h4>
          <div className="footer-links-list">
            <Link to="/">Home Dashboard</Link>
            <Link to="/about">Our Heritage Story</Link>
            <Link to="/shop">Gourmet Products</Link>
            <Link to="/store-finder">Store Locator</Link>
            <Link to="/checkout">Shopping Cart</Link>
          </div>
        </div>

        <div className="footer-col contact-col">
          <h4 className="footer-subtitle">Flagship Outlets</h4>
          
          <div className="contact-item">
            <MapPin size={16} className="text-gold" />
            <div>
              <strong className="text-white">Pettah (Head Office)</strong>
              <p className="text-muted">214, Gasworks Street, Colombo 11</p>
            </div>
          </div>

          <div className="contact-item">
            <MapPin size={16} className="text-gold" />
            <div>
              <strong className="text-white">One Galle Face</strong>
              <p className="text-muted">Lower Ground, Colombo 02</p>
            </div>
          </div>
          
          <div className="contact-item">
            <Phone size={16} className="text-gold" />
            <span className="text-muted">+94 11 232 4567</span>
          </div>

          <div className="contact-item">
            <Mail size={16} className="text-gold" />
            <span className="text-muted">orders@davidgramstores.com</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} David Gram Stores. Made with premium Sri Lankan heritage.</p>
      </div>
    </footer>
  );
};

export default Footer;
