import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
          <h1 className="hero-title">
            The Specialist for <span className="text-brand">Peanuts</span><br/> in Sri Lanka
          </h1>
          <p className="hero-subtitle">
            Authentic mixtures, murukkus, and snacks crafted with tradition since 1962.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Explore Our Products <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section container text-center">
        <h2 className="section-title">Our Heritage</h2>
        <div className="story-content">
          <p>
            David Gram Stores was founded by late Mr. David Gnanapragasam in 1962. 
            Starting as a humble cart vendor by the shores of Galle Face, our dedication to 
            quality has made us a household name for traditional Sri Lankan snacks.
          </p>
          <Link to="/about" className="btn btn-outline" style={{ marginTop: '20px' }}>
            Read Our Full Story
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section bg-tertiary">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Snacks</h2>
            <Link to="/shop" className="view-all-link">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section container text-center">
        <h2 className="section-title">Planning an Event?</h2>
        <p className="cta-desc">
          Weddings, hoteliers, parties and evening tea time snacks would be incomplete without our savouries. 
          Make a special order today.
        </p>
        <Link to="/checkout" className="btn btn-primary">Order Now</Link>
      </section>
    </div>
  );
};

export default Home;
