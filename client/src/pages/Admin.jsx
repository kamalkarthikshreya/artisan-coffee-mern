import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, TrendingUp, DollarSign, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-[#120a06]/80 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={22} className="text-[#0A0503]" />
        </div>
        <div>
            <p className="text-[#D4A574]/60 text-sm">{label}</p>
            <p className="text-[#F5E6D3] text-2xl font-bold font-mono">{value}</p>
        </div>
    </div>
);

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const headers = { Authorization: `Bearer ${user.token}` };

        const fetchData = async () => {
            try {
                const [ordersRes, contactsRes] = await Promise.all([
                    api.get('/admin/orders', { headers }),
                    api.get('/admin/contacts', { headers }),
                ]);
                setOrders(ordersRes.data);
                setContacts(contactsRes.data);
            } catch (err) {
                console.error('Admin fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const totalRevenue = orders.filter(o => o.status === 'paid').reduce((s, o) => s + o.totalAmount, 0);

    return (
        <div className="min-h-screen bg-[#0A0503]">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-4xl font-serif text-[#F5E6D3]">Admin Dashboard</h1>
                            <p className="text-[#D4A574]/60 mt-1">Manage your coffee empire</p>
                        </div>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">LIVE</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <StatCard icon={Package} label="Total Orders" value={orders.length} color="bg-[#D4A574]" />
                        <StatCard icon={DollarSign} label="Revenue" value={`$${totalRevenue.toFixed(0)}`} color="bg-green-400" />
                        <StatCard icon={MessageSquare} label="Messages" value={contacts.length} color="bg-blue-400" />
                        <StatCard icon={TrendingUp} label="Paid Orders" value={orders.filter(o => o.status === 'paid').length} color="bg-purple-400" />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        {['orders', 'messages'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${tab === t
                                        ? 'bg-[#D4A574] text-[#0A0503]'
                                        : 'bg-[#1A0F0A] text-[#F5E6D3]/60 hover:text-[#F5E6D3]'
                                    }`}
                            >
                                {t} {t === 'orders' ? `(${orders.length})` : `(${contacts.length})`}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-[#1A0F0A] rounded-xl animate-pulse" />)}
                        </div>
                    ) : tab === 'orders' ? (
                        <div className="space-y-3">
                            {orders.map(order => (
                                <div key={order._id} className="bg-[#120a06]/80 border border-white/5 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <p className="font-mono text-[#D4A574] text-sm font-bold">{order.orderId}</p>
                                        <p className="text-[#F5E6D3]/70 text-sm mt-0.5">{order.customer.name} · {order.customer.email}</p>
                                        <p className="text-[#F5E6D3]/40 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#D4A574] font-bold font-mono">${order.totalAmount.toFixed(2)}</span>
                                        <span className={`text-xs px-3 py-1 rounded-full ${order.status === 'paid' ? 'bg-green-400/10 text-green-400' :
                                                order.status === 'shipped' ? 'bg-blue-400/10 text-blue-400' :
                                                    'bg-yellow-400/10 text-yellow-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && <p className="text-[#F5E6D3]/40 text-center py-10">No orders yet.</p>}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {contacts.map(msg => (
                                <div key={msg._id} className="bg-[#120a06]/80 border border-white/5 rounded-xl p-5">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[#F5E6D3] font-medium">{msg.name} <span className="text-[#D4A574]/60 font-normal text-sm">· {msg.email}</span></p>
                                        <p className="text-[#F5E6D3]/30 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-[#F5E6D3]/60 text-sm mt-2 leading-relaxed">{msg.message}</p>
                                </div>
                            ))}
                            {contacts.length === 0 && <p className="text-[#F5E6D3]/40 text-center py-10">No messages yet.</p>}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Admin;
