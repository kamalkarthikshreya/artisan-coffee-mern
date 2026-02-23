import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut, Coffee, Package, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { cartItems, toggleSidebar } = useCart();
    const { user, logout } = useAuth();
    const location = useLocation();

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'bg-[#0A0503]/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-[#D4A574] flex items-center justify-center text-[#1A0F0A] group-hover:scale-110 transition-transform duration-500">
                        <Coffee size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl md:text-3xl font-serif font-bold text-[#F5E6D3] tracking-tighter group-hover:text-white transition-colors">
                        Artisan<span className="text-[#D4A574]">.</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12 bg-white/5 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                    {['Home', 'Shop', 'Story'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                            className="relative text-[#F5E6D3] text-xs uppercase tracking-[0.2em] hover:text-[#D4A574] transition-colors group py-2 font-medium"
                        >
                            {item}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#D4A574] transition-all duration-300 group-hover:w-1/2" />
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {/* User Menu */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10 relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 text-[#F5E6D3] hover:text-[#D4A574] transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-[#D4A574] text-[#0A0503] font-bold text-xs flex items-center justify-center">
                                    {user.name?.[0]?.toUpperCase()}
                                </div>
                                <span className="text-xs uppercase tracking-wider font-bold">{user.name.split(' ')[0]}</span>
                            </button>
                            {userMenuOpen && (
                                <div className="absolute top-10 right-0 bg-[#1A0F0A] border border-white/10 rounded-xl shadow-2xl py-2 w-44 z-50">
                                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#F5E6D3]/80 hover:text-[#D4A574] hover:bg-white/5 transition-colors">
                                        <User size={14} /> My Profile
                                    </Link>
                                    <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#F5E6D3]/80 hover:text-[#D4A574] hover:bg-white/5 transition-colors">
                                        <Package size={14} /> My Orders
                                    </Link>
                                    <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#F5E6D3]/80 hover:text-[#D4A574] hover:bg-white/5 transition-colors">
                                        <LayoutDashboard size={14} /> Admin
                                    </Link>
                                    <div className="border-t border-white/5 mt-1 pt-1">
                                        <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors">
                                            <LogOut size={14} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:flex items-center gap-2 text-[#F5E6D3] hover:text-[#D4A574] transition-colors text-xs uppercase tracking-widest font-bold group"
                            title="Login"
                        >
                            <User size={18} className="group-hover:scale-110 transition-transform" />
                            <span>Sign In</span>
                        </Link>
                    )}

                    <button
                        onClick={toggleSidebar}
                        className="relative p-3 rounded-full bg-[#D4A574]/10 text-[#D4A574] hover:bg-[#D4A574] hover:text-[#1A0F0A] transition-all duration-300 group"
                    >
                        <ShoppingBag size={20} strokeWidth={2} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-[#1A0F0A] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                                {itemCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-[#F5E6D3] hover:text-[#D4A574] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden md:hidden bg-[#0A0503] border-t border-white/10"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <Link to="/" className="text-[#F5E6D3] text-2xl font-serif">Home</Link>
                                <a href="#products" className="text-[#F5E6D3] text-2xl font-serif">Shop</a>
                                <a href="#about" className="text-[#F5E6D3] text-2xl font-serif">Our Story</a>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            {user ? (
                                <>
                                    <Link to="/profile" className="text-[#F5E6D3] flex items-center gap-3 text-lg font-serif"><User size={20} /> My Profile</Link>
                                    <Link to="/orders" className="text-[#F5E6D3] flex items-center gap-3 text-lg font-serif"><Package size={20} /> My Orders</Link>
                                    <Link to="/admin" className="text-[#F5E6D3] flex items-center gap-3 text-lg font-serif"><LayoutDashboard size={20} /> Admin</Link>
                                    <button onClick={logout} className="text-red-400 flex items-center gap-3 text-lg font-serif"><LogOut size={20} /> Sign Out</button>
                                </>
                            ) : (
                                <Link to="/login" className="text-[#D4A574] flex items-center gap-3 text-lg font-serif">
                                    <User size={20} /> Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
