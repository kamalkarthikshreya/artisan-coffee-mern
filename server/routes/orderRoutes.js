const express = require('express');
const router = express.Router();
// Initialize Stripe only if key exists to prevent crash
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
const Order = require('../models/Order');
const { sendEmail, generateOrderEmail } = require('../utils/email');

// @desc    Create Checkout Session
// @route   POST /api/checkout
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { items, customer } = req.body;

        // Sanitize input
        if (customer && customer.email) customer.email = customer.email.trim();
        if (customer && customer.name) customer.name = customer.name.trim();

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in checkout' });
        }

        const totalAmount = items.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);

        // Resolve Frontend URL dynamically
        const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

        // Simulation Mode Check
        if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_...')) {
            console.warn('⚠️ Stripe Keys Inspect - Using SIMULATION MODE');
            const mockOrderId = 'ORD-SIM-' + Math.random().toString(36).substr(2, 6).toUpperCase();

            const newOrder = await Order.create({
                orderId: mockOrderId,
                customer,
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount,
                status: 'paid',
                stripeSessionId: `mock_${mockOrderId}_${Date.now()}`
            });

            // Send Simulated Email (Fire & Forget)
            const emailHtml = generateOrderEmail(newOrder);
            sendEmail({
                to: customer.email,
                subject: `Order Confirmation: ${mockOrderId}`,
                html: emailHtml
            });

            // Send Merchant Notification (Fire & Forget)
            sendEmail({
                to: process.env.CONTACT_EMAIL || 'admin@example.com',
                subject: `🔔 New Order: ${mockOrderId}`,
                html: `<p>New order received from ${customer.name} ($${totalAmount}).</p>`
            });

            return res.json({
                url: `${origin}/success?session_id=mock_${mockOrderId}`
            });
        }

        // Real Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        // Fix image URL for Stripe (Stripe requires valid URL)
                        // images: [item.image], 
                    },
                    unit_amount: Math.round(parseFloat(item.price.replace('$', '')) * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout`,
            customer_email: customer.email,
        });

        // Create Pending Order
        await Order.create({
            orderId: 'PENDING-' + session.id.slice(-8).toUpperCase(),
            customer,
            items: items.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            status: 'pending',
            stripeSessionId: session.id
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error('Checkout Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Verify Stripe Payment
// @route   POST /api/verify-stripe
router.post('/verify', async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (sessionId.startsWith('mock_')) {
            return res.json({ success: true, orderId: sessionId.split('_')[1] });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const order = await Order.findOne({ stripeSessionId: sessionId });
            if (order && order.status !== 'paid') {
                order.status = 'paid';
                order.orderId = 'ORD-' + sessionId.slice(-8).toUpperCase(); // Finalize ID
                await order.save();

                // Send Real Emails (Fire & Forget)
                const emailHtml = generateOrderEmail(order);
                sendEmail({
                    to: order.customer.email,
                    subject: `Order Confirmation: ${order.orderId}`,
                    html: emailHtml
                });
            }
            return res.json({ success: true, orderId: order ? order.orderId : 'UNKNOWN' });
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
