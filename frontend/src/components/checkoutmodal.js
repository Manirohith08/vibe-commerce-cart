import React, { useState } from 'react';
import axios from 'axios';
import './checkoutmodal.css';

function CheckoutModal({ cart, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/checkout', formData);
      setReceipt(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (receipt) {
      onComplete();
    }
    onClose();
  };

  if (receipt) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content receipt" onClick={(e) => e.stopPropagation()}>
          <h2>Order Confirmed! 🎉</h2>
          <div className="receipt-details">
            <p><strong>Order ID:</strong> {receipt.orderId}</p>
            <p><strong>Customer:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
            <p><strong>Date:</strong> {new Date(receipt.orderDate).toLocaleString()}</p>
            
            <h3>Items:</h3>
            <ul className="receipt-items">
              {receipt.items.map((item, index) => (
                <li key={index}>
                  {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            
            <div className="receipt-total">
              <strong>Total: ${receipt.total}</strong>
            </div>
          </div>
          <button onClick={handleClose} className="close-btn">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customerEmail">Email Address</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="order-summary-checkout">
            <h3>Order Summary</h3>
            <p>Items: {cart.items.length}</p>
            <p><strong>Total: ${cart.total.toFixed(2)}</strong></p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
