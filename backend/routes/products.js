const express = require('express');
const router = express.Router();
const axios = require('axios');
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    let products = await Product.find().limit(10);
    
    if (products.length === 0) {
      const response = await axios.get('https://fakestoreapi.com/products?limit=10');
      const apiProducts = response.data;
      
      await Product.insertMany(apiProducts);
      products = apiProducts;
    }
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', message: err.message });
  }
});

module.exports = router;
