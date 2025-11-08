import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productlist.css';

function ProductList({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    
    try {
      await axios.post('/api/cart', {
        productId,
        quantity: 1
      });
      
      onCartUpdate();
      
      setTimeout(() => {
        setAddingToCart(prev => ({ ...prev, [productId]: false }));
      }, 500);
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product.id)}
                  className={`add-to-cart-btn ${addingToCart[product.id] ? 'adding' : ''}`}
                  disabled={addingToCart[product.id]}
                >
                  {addingToCart[product.id] ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
