import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending' },
    paid: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Paid' },
    shipped: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Shipped' },
};

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;
        const fetchOrders = async () => {
            try {
                const { data } = await api.get(`/checkout/myorders?email=${encodeURIComponent(user.email)}`);
                setOrders(data);
            } catch (err) {
                setError('Could not load your orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="min-h-screen bg-[#0A0503]">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-serif text-[#F5E6D3] mb-2">My Orders</h1>
                    <p className="text-[#D4A574]/60 mb-10">Your complete order history</p>

                    {loading && (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-[#120a06]/80 rounded-2xl p-6 animate-pulse h-32 border border-white/5" />
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="text-red-400 bg-red-400/10 rounded-xl p-4">{error}</div>
                    )}

                    {!loading && orders.length === 0 && (
                        <div className="text-center py-20">
                            <ShoppingBag className="mx-auto text-[#D4A574]/30 mb-4" size={60} />
                            <p className="text-[#F5E6D3]/50 text-lg">No orders yet.</p>
                            <a href="/" className="mt-4 inline-block text-[#D4A574] hover:underline">
                                Shop Now →
                            </a>
                        </div>
                    )}

                    <div className="space-y-4">
                        {orders.map((order, i) => {
                            const { icon: StatusIcon, color, bg, label } = statusConfig[order.status] || statusConfig.pending;
                            return (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-[#120a06]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-[#D4A574]/20 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-mono text-[#D4A574] font-bold text-sm">{order.orderId}</p>
                                            <p className="text-[#F5E6D3]/40 text-xs mt-1">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bg}`}>
                                            <StatusIcon size={14} className={color} />
                                            <span className={`text-xs font-medium ${color}`}>{label}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        {order.items.map((item, j) => (
                                            <div key={j} className="flex justify-between text-sm">
                                                <span className="text-[#F5E6D3]/70">{item.name} × {item.quantity}</span>
                                                <span className="text-[#D4A574]/80">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-white/5 pt-3 flex justify-between">
                                        <span className="text-[#F5E6D3]/50 text-sm">Total</span>
                                        <span className="text-[#D4A574] font-bold font-mono">${order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderHistory;
