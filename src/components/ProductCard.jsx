import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`🛒 Added "${product.name}" to cart`, {
      icon: '✨',
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlisted(prev => !prev);
    toast(
      wishlisted ? `Removed from wishlist` : `❤️ Added to wishlist`,
      { icon: wishlisted ? '💔' : '❤️' }
    );
  };

  return (
    <motion.div
      className="product-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
    >
      <div className="product-img-container">
        <span className="product-category-badge">{product.category}</span>

        {/* Skeleton shimmer shown until image loads */}
        {!imgLoaded && <div className="img-skeleton skeleton-shimmer" aria-hidden="true" />}

        <img
          src={product.image}
          alt={product.name}
          className={`product-img ${imgLoaded ? 'img-visible' : 'img-hidden'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />

        <div className="product-card-overlay">
          <button
            className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
            aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlist}
          >
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="product-price">Rs {product.price.toFixed(2)}</span>
          </div>
          <button className="add-cart-btn" onClick={handleAdd} aria-label="Add to cart">
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
