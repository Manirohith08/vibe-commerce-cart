const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, default: 'mock-user-1' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{
    productId: Number,
    title: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
