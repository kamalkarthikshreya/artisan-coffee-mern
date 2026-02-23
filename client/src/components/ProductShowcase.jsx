import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { fetchProducts } from '../services/api';

const ProductShowcase = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    const receivedType = typeof data;
                    const preview = data && typeof data === 'string' ? data.substring(0, 50) : JSON.stringify(data).substring(0, 50);
                    setError(`Invalid data format (Received: ${receivedType}). ${preview}...`);
                    setProducts([]);
                }
            } catch (err) {
                console.error("Failed to load products", err);
                setError(err.message || "Connection to gallery failed");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    if (loading) {
        return (
            <section id="products" className="py-32 px-4 md:px-8 relative max-w-7xl mx-auto">
                <h2 className="text-6xl md:text-7xl font-serif font-bold text-center text-[#F5E6D3] mb-4">Our Signature Blends</h2>
                <div className="h-1 w-24 bg-[#D4A574] mx-auto mb-16 rounded-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-[#D4A574] border border-[#D4A574]/20 rounded-xl max-w-lg mx-auto bg-[#1A0F0A]">
                <p className="text-lg font-serif mb-2">Notice from the Roastery</p>
                <p className="text-sm opacity-60 px-4">{error}</p>
                <p className="text-xs mt-4 opacity-40">Please check your network or refresh the page.</p>
            </div>
        );
    }

    return (
        <section id="products" className="py-32 px-4 md:px-8 relative max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-serif font-bold text-center text-[#F5E6D3] mb-4"
            >
                Our Signature Blends
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 100 }}
                viewport={{ once: true }}
                className="h-1 bg-[#D4A574] mx-auto mb-16 rounded-full"
            />

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-2 md:px-0"
            >
                {Array.isArray(products) && products.map((product, index) => (
                    <motion.div key={product.id || index} variants={item}>
                        <ProductCard product={product} index={index} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ProductShowcase;
