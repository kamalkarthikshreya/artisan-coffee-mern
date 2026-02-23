const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// PRE-FLIGHT DEBUG ROUTE
app.get('/api/debug-v3', (req, res) => res.json({ status: 'active', version: '1.0.3', date: 'Feb 23' }));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', orderRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Artisan Coffee Backend is Running v1.0.3');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: '1.0.3', time: new Date() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [v1.0.3]`);
});
