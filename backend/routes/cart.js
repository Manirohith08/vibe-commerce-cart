const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      cart = await Cart.create({ userId: 'mock-user-1', items: [], total: 0 });
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart', message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }
    
    const product = await Product.findOne({ id: productId });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      cart = new Cart({ userId: 'mock-user-1', items: [] });
    }
    
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    cart.total = calculateTotal(cart.items);
    await cart.save();
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.id;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    
    const cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    item.quantity = quantity;
    cart.total = calculateTotal(cart.items);
    await cart.save();
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items.pull({ _id: req.params.id });
    cart.total = calculateTotal(cart.items);
    await cart.save();
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from cart', message: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = [];
    cart.total = 0;
    await cart.save();
    
    res.json({ message: 'Cart cleared successfully', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart', message: err.message });
  }
});

module.exports = router;
