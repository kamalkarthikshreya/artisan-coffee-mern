import React from 'react';
import HeroCanvasAnimation from '../components/HeroCanvasAnimation';
import FeatureSection from '../components/FeatureSection';
import ProductShowcase from '../components/ProductShowcase';
import FinalCTA from '../components/FinalCTA';
import ContactSection from '../components/ContactSection';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';

const Home = () => {
    return (
        <main className="bg-[#0A0503] min-h-screen text-[#F5E6D3] selection:bg-[#D4A574] selection:text-[#1A0F0A]">
            <Navbar />
            <CartSidebar />

            <HeroCanvasAnimation />

            <div className="relative z-10 bg-gradient-to-b from-[#0A0503] via-[#1A0F0A] to-[#0A0503]">
                <FeatureSection />
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />
                <ProductShowcase />
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent" />
                <ContactSection />
            </div>

            <FinalCTA />

            <footer className="py-12 text-center bg-[#050201] text-[#D4A574]/40 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-[#D4A574]/50 blur-[50px] rounded-full" />
                <p className="relative z-10 text-sm font-serif">© {new Date().getFullYear()} Artisan Coffee. Crafted with passion.</p>
                <p className="relative z-10 text-xs mt-2 text-[#D4A574]/30 tracking-widest uppercase">Designed & Built by Kamal Karthik</p>
            </footer>
        </main>
    );
};

export default Home;
