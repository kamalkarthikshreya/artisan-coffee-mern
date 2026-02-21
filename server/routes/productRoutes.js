const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const seedData = [
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Cappuccino is a latte made with more foam than steamed milk, often topped with cocoa powder.',
        price: '$3.50',
        rating: 4.9,
        image: '/coffee/cappuccino.svg',
        features: ['Espresso', 'Steamed Milk', 'Foam']
    },
    {
        id: 'latte',
        name: 'Latte',
        description: 'Latte is a coffee drink made with espresso and steamed milk. Rich, creamy, balanced.',
        price: '$4.00',
        rating: 5.0,
        image: '/coffee/latte.svg',
        features: ['Espresso', 'Steamed Milk', 'Light Foam']
    },
    {
        id: 'mocha',
        name: 'Mocha',
        description: 'Mocha is a coffee beverage where dark espresso meets rich chocolate and creamy milk.',
        price: '$4.50',
        rating: 4.7,
        image: '/coffee/mocha.svg',
        features: ['Espresso', 'Chocolate', 'Steamed Milk']
    }
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Seed products
// @route   GET /api/products/seed
// @access  Public
router.get('/seed', async (req, res) => {
    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(seedData);
        res.json({ message: 'Products Seeded Successfully', count: createdProducts.length });
    } catch (error) {
        res.status(500).json({ message: 'Seeding Failed', error: error.message });
    }
});

module.exports = router;
