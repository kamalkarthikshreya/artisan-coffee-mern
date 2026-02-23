import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const payload = { name, email };
            if (password) payload.password = password;
            const { data } = await api.put('/users/profile', payload, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Profile updated!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    return (
        <div className="min-h-screen bg-[#0A0503]">
            <Navbar />
            <div className="max-w-lg mx-auto px-6 pt-32 pb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Avatar */}
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574] to-[#6f4536] flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-[#0A0503]">
                            {user?.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <h1 className="text-3xl font-serif text-[#F5E6D3]">My Profile</h1>
                        <p className="text-[#D4A574]/60 mt-1">Manage your account settings</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        {/* Name */}
                        <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574]/50" />
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3.5 bg-[#1A0F0A] border border-white/10 rounded-xl text-[#F5E6D3] placeholder-[#D4A574]/30 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574]/50" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-3.5 bg-[#1A0F0A] border border-white/10 rounded-xl text-[#F5E6D3] placeholder-[#D4A574]/30 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                            />
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574]/50" />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="New Password (leave blank to keep)"
                                className="w-full pl-10 pr-4 py-3.5 bg-[#1A0F0A] border border-white/10 rounded-xl text-[#F5E6D3] placeholder-[#D4A574]/30 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574]/50" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full pl-10 pr-4 py-3.5 bg-[#1A0F0A] border border-white/10 rounded-xl text-[#F5E6D3] placeholder-[#D4A574]/30 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#D4A574] to-[#B8864E] text-[#1A0F0A] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-4 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
