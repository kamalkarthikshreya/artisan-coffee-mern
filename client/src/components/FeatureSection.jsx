import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, Droplets, Zap } from 'lucide-react';

const features = [
    {
        icon: <Award className="w-8 h-8 text-[#D4A574]" />,
        title: "Master Roasters",
        description: "Small batches roasted daily by award-winning artisans."
    },
    {
        icon: <Leaf className="w-8 h-8 text-[#D4A574]" />,
        title: "Ethically Sourced",
        description: "Direct trade partnerships ensuring fair wages for farmers."
    },
    {
        icon: <Droplets className="w-8 h-8 text-[#D4A574]" />,
        title: "Precision Brewing",
        description: "Equipment and guidance for the perfect extraction."
    },
    {
        icon: <Zap className="w-8 h-8 text-[#D4A574]" />,
        title: "Peak Freshness",
        description: "Nitrogen-flushed packaging to lock in aroma."
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeatureSection = () => {
    return (
        <section id="about" className="py-32 bg-[#120a06] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3D2418] to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F5E6D3] mb-4">Why Artisan?</h2>
                    <div className="w-24 h-1 bg-[#D4A574] mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            variants={item}
                            key={index}
                            className="bg-[#1A0F0A] p-8 rounded-2xl border border-[#3D2418] hover:border-[#D4A574] hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(212,165,116,0.1)]"
                        >
                            <div className="mb-6 bg-[#0A0503] w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-[#D4A574]/10 group-hover:scale-110 transition-all duration-300 border border-[#3D2418] group-hover:border-[#D4A574]/50">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#F5E6D3] mb-3 group-hover:text-[#D4A574] transition-colors">{feature.title}</h3>
                            <p className="text-[#D4A574]/60 leading-relaxed font-light text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
