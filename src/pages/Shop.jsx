import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Shop.css';

const categories = ['All', 'David Snacks', 'David Sweets', 'Haldiram\'s', 'Gold Winner Oil'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter & sort products using useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <>
      <Helmet>
        <title>Shop Our Snacks | David Gram Stores</title>
        <meta
          name="description"
          content="Browse the full DGS catalog — hand-roasted peanuts, spicy mixtures, murukkus, and premium sweets. Filter by category and order online."
        />
      </Helmet>
      <div className="shop-container animate-fade-in container">
      {/* Editorial Header */}
      <div className="shop-header text-center">
        <span className="section-subtitle">DGS Catalog</span>
        <h1 className="page-title">Explore Our Savouries</h1>
        <p className="page-subtitle">Hand-roasted peanuts, custom spicy mixtures, and premium local sweets crafted since 1962.</p>
      </div>

      {/* Controls Bar: Search, Category, Sorting */}
      <div className="shop-controls-bar">
        {/* Search Input */}
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search snacks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-wrapper">
          <ArrowUpDown size={18} className="sort-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Sort by: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Results Count */}
      <div className="results-info">
        <SlidersHorizontal size={14} />
        <span>Showing {filteredAndSortedProducts.length} premium snack{filteredAndSortedProducts.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="shop-grid">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results text-center">
          <h3>No Snacks Found</h3>
          <p>We couldn't find any snacks matching your criteria. Try adjusting your filters or search terms.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSortBy('default'); }}
            style={{ marginTop: '1.5rem' }}
          >
            Reset All Filters
          </button>
        </div>
      )}
      </div>
    </>
  );
};

export default Shop;
