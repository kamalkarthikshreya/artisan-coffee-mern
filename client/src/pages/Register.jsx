import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, Coffee } from 'lucide-react';
import Navbar from '../components/Navbar';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await register(name, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0503]">
            <Navbar />

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/video/hero-coffee.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    {/* Glass Card */}
                    <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">

                        {/* Decorative Gradient Blob */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4A574] rounded-full blur-[80px] opacity-20 pointer-events-none" />

                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4A574]/10 mb-4 text-[#D4A574]"
                            >
                                <Coffee size={24} />
                            </motion.div>
                            <h2 className="text-3xl font-serif text-[#F5E6D3] mb-2 tracking-wide">Join Artisan</h2>
                            <p className="text-white/40 text-sm">Start your journey with exceptional coffee</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A574] transition-colors duration-300" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-[#F5E6D3] placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/10 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A574] transition-colors duration-300" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-[#F5E6D3] placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/10 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A574] transition-colors duration-300" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-[#F5E6D3] placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 focus:bg-white/10 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#D4A574] hover:bg-[#c69260] text-[#1A0F0A] font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#D4A574]/20"
                            >
                                Create Account
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/40 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#D4A574] hover:text-[#eacbb0] font-medium transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
