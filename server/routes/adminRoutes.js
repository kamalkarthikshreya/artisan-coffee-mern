const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');

// @desc  Get all orders (admin)
// @route GET /api/admin/orders
router.get('/orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc  Get all contact messages (admin)
// @route GET /api/admin/contacts
router.get('/contacts', protect, async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
