const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
    },
    items: [{
        productId: String,
        name: String,
        quantity: Number,
        price: String,
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
    stripeSessionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
