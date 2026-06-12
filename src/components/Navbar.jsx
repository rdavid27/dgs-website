import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center navbar-content">
        <Link to="/" className="logo-text">
          <span className="logo-brand">David</span>
          <span className="logo-sub">Gram Stores</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>Our Products</Link>
          <Link to="/store-finder" className={`nav-link ${location.pathname === '/store-finder' ? 'active' : ''}`}>Store Finder</Link>
          <Link to="/admin/orders" className={`nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}>Admin</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/store-finder" className="store-icon-link" title="Find a Store">
            <MapPin size={20} />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Cart opens drawer */}
          <button className="cart-btn" onClick={openCart} title="View Cart" aria-label="Open cart">
            <div className="cart-icon-wrapper">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge animate-bounce-in">{cartCount}</span>}
            </div>
          </button>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="mobile-nav animate-fade-in">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Our Products</Link>
          <Link to="/store-finder" className={`nav-link ${location.pathname === '/store-finder' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Store Finder</Link>
          <Link to="/admin/orders" className={`nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Admin</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
