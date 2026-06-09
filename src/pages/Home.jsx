import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Award, CheckCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>David Gram Stores | Specialists for Peanuts &amp; Snacks in Sri Lanka</title>
        <meta
          name="description"
          content="David Gram Stores — Sri Lanka's finest handcrafted peanuts, spicy mixtures, and savouries since 1962. Shop online or visit our outlets in Colombo and Kandy."
        />
      </Helmet>

      <div className="home-container animate-fade-in">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container hero-content text-center">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Award size={16} className="text-gold mr-1" />
              <span>Sri Lanka's Finest Snacks Since 1962</span>
            </motion.div>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The Specialists for <span className="text-gold italic">Peanuts</span> &amp; Savoury Mixtures
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              Authentic recipes, hand-selected spices, and time-honored roasting techniques passed down through generations.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/shop" className="btn btn-primary btn-lg">
                Explore Our Catalog <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/store-finder" className="btn btn-outline btn-lg ml-3">
                Find Our Outlets
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Heritage / Story Section */}
        <motion.section
          className="heritage-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
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
        </motion.section>

        {/* Featured Products Section */}
        <section className="featured-section bg-tertiary">
          <div className="container">
            <motion.div
              className="section-header flex justify-between items-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <span className="section-subtitle text-center">Gourmet Selection</span>
                <h2 className="section-title">Our Featured Snacks</h2>
              </div>
              <Link to="/shop" className="view-all-link">
                <span>View Full Selection</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              className="product-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Store Finder Teaser Section */}
        <motion.section
          className="store-teaser-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container store-teaser-grid">
            <div className="store-teaser-visual">
              <div className="teaser-map-mock">
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
        </motion.section>

        {/* Event Ordering & Bulk Services Section */}
        <motion.section
          className="events-section bg-tertiary"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container text-center max-width-wrapper">
            <span className="section-subtitle">Catering &amp; Special Occasions</span>
            <h2 className="section-title">Planning an Event?</h2>
            <p className="cta-desc">
              Whether it's a wedding reception, a corporate gathering, a hotel evening service, or a festive family get-together, a traditional Sri Lankan tea table is incomplete without the premium crunch of DGS mixtures.
            </p>
            <motion.div
              className="event-cards-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="event-card" variants={fadeUp}>
                <Star className="event-icon text-gold" size={28} />
                <h4>Weddings &amp; Receptions</h4>
                <p>Elegant mini-packs and customized snacks for your guests.</p>
              </motion.div>
              <motion.div className="event-card" variants={fadeUp}>
                <Clock className="event-icon text-gold" size={28} />
                <h4>Hotel &amp; Cafe Supply</h4>
                <p>Reliable bulk delivery services tailored for premium hospitality businesses.</p>
              </motion.div>
            </motion.div>
            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ marginTop: '2.5rem' }}>
              Request Event Booking / Order Now
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Home;
