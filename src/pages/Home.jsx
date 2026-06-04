import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Award, CheckCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content text-center">
          <div className="hero-badge">
            <Award size={16} className="text-gold mr-1" />
            <span>Sri Lanka's Finest Snacks Since 1962</span>
          </div>
          <h1 className="hero-title">
            The Specialists for <span className="text-gold italic">Peanuts</span> & Savoury Mixtures
          </h1>
          <p className="hero-subtitle">
            Authentic recipes, hand-selected spices, and time-honored roasting techniques passed down through generations.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore Our Catalog <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/store-finder" className="btn btn-outline btn-lg ml-3">
              Find Our Outlets
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage / Story Section */}
      <section className="heritage-section">
        <div className="container heritage-grid">
          <div className="heritage-text">
            <span className="section-subtitle">Since 1962</span>
            <h2 className="section-title-left">A Legacy of Crispy Perfection</h2>
            <p className="lead-text">
              David Gram Stores was founded by the late Mr. David Gnanapragasam in 1962. What started as a humble single-cart vendor on the windy shores of Galle Face Green has grown into a cornerstone of Sri Lankan snack culture.
            </p>
            <p>
              For over six decades, our commitment to using the highest-grade peanuts, fresh-pressed oils, and traditional mixtures of spices has remained unchanged. Every batch is crafted with precision to deliver that signature crunch.
            </p>
            <div className="heritage-stats">
              <div className="stat-card">
                <span className="stat-num">60+</span>
                <span className="stat-label">Years of Craftsmanship</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">100%</span>
                <span className="stat-label">Natural Spices Used</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: '20px' }}>
              Discover Our Full Story
            </Link>
          </div>
          <div className="heritage-image-wrapper">
            <div className="heritage-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="David Gram Stores spices and ingredients" 
                className="heritage-img"
              />
              <div className="heritage-badge-overlay">
                <span className="overlay-year">1962</span>
                <span className="overlay-text">Galle Face Origins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section bg-tertiary">
        <div className="container">
          <div className="section-header flex justify-between items-center">
            <div>
              <span className="section-subtitle text-center">Gourmet Selection</span>
              <h2 className="section-title">Our Featured Snacks</h2>
            </div>
            <Link to="/shop" className="view-all-link">
              <span>View Full Selection</span>
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Store Finder Teaser Section */}
      <section className="store-teaser-section">
        <div className="container store-teaser-grid">
          <div className="store-teaser-visual">
            <div className="teaser-map-mock">
              {/* Animated visual showing store points */}
              <div className="map-circle pulsing"></div>
              <div className="map-pin-indicator colombo animate-bounce-in">
                <MapPin size={24} className="pin-icon" />
                <span className="pin-name">Pettah Outlet</span>
              </div>
              <div className="map-pin-indicator galleface">
                <MapPin size={20} className="pin-icon" />
                <span className="pin-name">Galle Face</span>
              </div>
              <div className="map-pin-indicator kandy">
                <MapPin size={20} className="pin-icon" />
                <span className="pin-name">Kandy</span>
              </div>
            </div>
          </div>
          <div className="store-teaser-text">
            <span className="section-subtitle">Convenient Locations</span>
            <h2>Visit Our Outlets</h2>
            <p>
              Craving that fresh, warm crunch? Stop by any of our physical outlets across Sri Lanka. Experience our live peanut roasting stations or pick up customized gift boxes for your family.
            </p>
            <div className="teaser-outlet-list">
              <div className="teaser-outlet-item">
                <CheckCircle size={18} className="text-gold" />
                <div>
                  <strong>Pettah Head Office</strong>
                  <p>214, Gasworks Street (Our primary outlet since 1978)</p>
                </div>
              </div>
              <div className="teaser-outlet-item">
                <CheckCircle size={18} className="text-gold" />
                <div>
                  <strong>One Galle Face Mall</strong>
                  <p>Lower Ground Floor (Premium boutique experience)</p>
                </div>
              </div>
            </div>
            <Link to="/store-finder" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Open Store Locator
            </Link>
          </div>
        </div>
      </section>
      
      {/* Event Ordering & Bulk Services Section */}
      <section className="events-section bg-tertiary">
        <div className="container text-center max-width-wrapper">
          <span className="section-subtitle">Catering & Special Occasions</span>
          <h2 className="section-title">Planning an Event?</h2>
          <p className="cta-desc">
            Whether it's a wedding reception, a corporate gathering, a hotel evening service, or a festive family get-together, a traditional Sri Lankan tea table is incomplete without the premium crunch of DGS mixtures.
          </p>
          <div className="event-cards-grid">
            <div className="event-card">
              <Star className="event-icon text-gold" size={28} />
              <h4>Weddings & Receptions</h4>
              <p>Elegant mini-packs and customized snacks for your guests.</p>
            </div>
            <div className="event-card">
              <Clock className="event-icon text-gold" size={28} />
              <h4>Hotel & Cafe Supply</h4>
              <p>Reliable bulk delivery services tailored for premium hospitality businesses.</p>
            </div>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg" style={{ marginTop: '2.5rem' }}>
            Request Event Booking / Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
