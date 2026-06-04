import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-img-container">
        <span className="product-category-badge">{product.category}</span>
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        <div className="product-card-overlay">
          <button className="wishlist-btn" aria-label="Add to Wishlist">
            <Heart size={16} />
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
    </div>
  );
};

export default ProductCard;
