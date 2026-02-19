const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const sendEmail = require('../utils/email');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            message,
        });

        // Send notification email (Simulated or Real)
        const emailHtml = `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        await sendEmail({
            to: process.env.CONTACT_EMAIL || 'admin@example.com',
            subject: `New Message from ${name}`,
            html: emailHtml,
        });

        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
