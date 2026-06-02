import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Shop.css';

const categories = ['All', 'David Snacks', 'David Sweets', 'Haldiram\'s', 'Gold Winner Oil'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="shop-container animate-fade-in container">
      <div className="shop-header text-center">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Sate your desires with our internationally and seasonally inspired snacks.</p>
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
