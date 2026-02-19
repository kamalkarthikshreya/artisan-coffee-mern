import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
    const { isSidebarOpen, toggleSidebar, cartItems, updateQuantity, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 min-w-full md:min-w-[500px] h-full bg-[#0A0503]/95 backdrop-blur-2xl border-l border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[#3D2418] flex items-center justify-between">
                            <h2 className="text-2xl font-serif text-[#F5E6D3]">Your Selection</h2>
                            <button onClick={toggleSidebar} className="text-[#D4A574] hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-[#D4A574]/60 mt-10">
                                    <p>Your cart is empty.</p>
                                    <button onClick={toggleSidebar} className="mt-4 text-[#F5E6D3] underline underline-offset-4">
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-24 h-24 bg-[#0A0503] rounded-xl overflow-hidden border border-[#3D2418] group-hover:border-[#D4A574]/50 transition-colors">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="text-[#F5E6D3] font-serif text-lg">{item.name}</h3>
                                                <p className="text-[#D4A574] font-bold">{item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center gap-3 border border-[#3D2418] rounded-full px-3 py-1 bg-[#0A0503]/50">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-[#D4A574] hover:text-white transition-colors"><Minus size={14} /></button>
                                                    <span className="text-sm text-[#F5E6D3] w-4 text-center font-mono">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-[#D4A574] hover:text-white transition-colors"><Plus size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-[#D4A574]/40 hover:text-red-400 transition-colors ml-auto p-2 hover:bg-red-900/10 rounded-full">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-[#3D2418] bg-[#0A0503]/50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#F5E6D3]/60 text-sm uppercase tracking-wider">Total Estimate</span>
                                    <span className="text-2xl font-serif text-[#D4A574]">${totalPrice.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={toggleSidebar}
                                    className="block w-full text-center bg-[#D4A574] text-[#1A0F0A] font-bold py-4 rounded-lg hover:bg-white transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
