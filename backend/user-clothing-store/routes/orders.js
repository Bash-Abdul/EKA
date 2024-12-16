const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place Order
router.post('/place', async (req, res) => {
  const { userId, items, total } = req.body;

  try {
    const order = new Order({ userId, items, total });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Order History
router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
