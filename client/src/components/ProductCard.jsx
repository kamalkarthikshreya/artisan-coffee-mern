import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-[#120a06]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4A574]/30 hover:shadow-[0_10px_40px_-10px_rgba(212,165,116,0.1)] transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative h-80 overflow-hidden bg-[#0A0503]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-transparent to-transparent opacity-90" />

                {/* Quick Add Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-[#D4A574] text-[#1A0F0A] rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center hover:bg-white hover:scale-110 shadow-lg z-10"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                {/* Decorative Line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#3D2418] to-transparent group-hover:via-[#D4A574]/50 transition-colors duration-500" />

                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-[#F5E6D3] group-hover:text-[#D4A574] transition-colors">{product.name}</h3>
                    <span className="text-lg font-mono text-[#D4A574] font-bold">{product.price}</span>
                </div>
                <p className="text-sm text-[#D4A574]/70 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i < Math.floor(product.rating) ? 'bg-[#D4A574]' : 'bg-[#3D2418] group-hover:bg-[#3D2418]/50'}`} />
                    ))}
                    <span className="text-xs text-[#D4A574]/60 ml-2 font-mono">{product.rating}</span>
                </div>

                {/* Features (Tags) */}
                <div className="flex flex-wrap gap-2">
                    {product.features?.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#3D2418] rounded-full text-[#F5E6D3]/50 group-hover:border-[#D4A574]/30 group-hover:text-[#D4A574]/80 transition-colors">
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
