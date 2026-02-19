import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background with simple abstraction since we might not have the frame assets or complex shader */}
            <div className="absolute inset-0 bg-[#3D2418]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-transparent to-[#1A0F0A]" />
                {/* Animated Gradient Blob */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A574] rounded-full blur-[120px] opacity-30"
                />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-serif font-bold text-[#F5E6D3] mb-8"
                >
                    Elevate Your Morning Ritual
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-[#D4A574]/80 mb-12 font-light"
                >
                    Join thousands of coffee enthusiasts who have upgraded their daily brew.
                </motion.p>
                <motion.a
                    href="#products"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative overflow-hidden inline-block bg-[#D4A574] text-[#1A0F0A] px-12 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_rgba(212,165,116,0.3)] hover:shadow-[0_0_60px_rgba(212,165,116,0.5)] transition-all group"
                >
                    <span className="relative z-10">Shop Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
                </motion.a>
            </div>
        </section>
    );
};

export default FinalCTA;
