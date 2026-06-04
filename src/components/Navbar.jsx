import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
        </nav>

        <div className="nav-actions">
          <Link to="/store-finder" className="store-icon-link" title="Find a Store">
            <MapPin size={20} />
          </Link>
          
          <Link to="/checkout" className="cart-btn" title="View Cart">
            <div className="cart-icon-wrapper">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge animate-bounce-in">{cartCount}</span>}
            </div>
          </Link>
          
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
        </nav>
      )}
    </header>
  );
};

export default Navbar;
