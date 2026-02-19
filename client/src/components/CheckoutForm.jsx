import React, { useState } from 'react';
import { createCheckoutSession } from '../services/api';

const CheckoutForm = ({ cartItems, totalAmount }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { url } = await createCheckoutSession(cartItems, formData);
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error("Checkout Failed", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wider text-[#D4A574]/80">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-3 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wider text-[#D4A574]/80">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-3 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm uppercase tracking-wider text-[#D4A574]/80">Shipping Address</label>
                <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-3 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wider text-[#D4A574]/80">City</label>
                    <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-3 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wider text-[#D4A574]/80">ZIP Code</label>
                    <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-3 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4A574] text-[#1A0F0A] font-bold py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
            >
                {isLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
            </button>
            <p className="text-center text-xs text-[#F5E6D3]/40">Secured by Stripe</p>
        </form>
    );
};

export default CheckoutForm;
