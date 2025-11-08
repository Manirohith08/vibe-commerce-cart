import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/productlist';
import Cart from './components/cart';
import './app.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      const count = data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error('Failed to update cart count:', err);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">Vibe Commerce</Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList onCartUpdate={updateCartCount} />} />
          <Route path="/cart" element={<Cart onCartUpdate={updateCartCount} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
