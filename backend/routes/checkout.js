const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/order');

router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;
    
    if (!customerName || !customerEmail) {
      return res.status(400).json({ error: 'Customer name and email are required' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const order = await Order.create({
      userId: 'mock-user-1',
      customerName,
      customerEmail,
      items: cart.items.map(item => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: cart.total,
      orderDate: new Date()
    });
    
    cart.items = [];
    cart.total = 0;
    await cart.save();
    
    const receipt = {
      orderId: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items,
      total: order.total.toFixed(2),
      orderDate: order.orderDate.toISOString(),
      timestamp: Date.now()
    };
    
    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: 'Checkout failed', message: err.message });
  }
});

module.exports = router;
