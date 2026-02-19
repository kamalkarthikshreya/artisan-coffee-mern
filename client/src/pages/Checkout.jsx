import React from 'react';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
    const { cartItems } = useCart();

    const totalPrice = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);

    return (
        <div className="bg-[#1A0F0A] min-h-screen text-[#F5E6D3]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-32">
                <Link to="/" className="inline-flex items-center gap-2 text-[#D4A574] hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Shop
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5E6D3] mb-12">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-xl font-serif text-[#D4A574] mb-6 border-b border-[#3D2418] pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            {cartItems.length === 0 ? (
                                <p className="text-[#F5E6D3]/60 italic">Your cart is empty.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-[#0A0503] p-4 rounded-lg border border-[#3D2418]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-black/20 rounded overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-sm text-[#D4A574]/80">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono">{item.price}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-[#3D2418]">
                            <span>Total</span>
                            <span className="text-[#D4A574]">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-xl font-serif text-[#D4A574] mb-6 border-b border-[#3D2418] pb-4">Payment Details</h2>
                        {cartItems.length > 0 ? (
                            <CheckoutForm cartItems={cartItems} totalAmount={totalPrice} />
                        ) : (
                            <div className="bg-[#2D1810] p-6 rounded-lg text-center">
                                <p className="mb-4">Please add items to your cart before checking out.</p>
                                <Link to="/" className="text-[#D4A574] underline">Return Home</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
