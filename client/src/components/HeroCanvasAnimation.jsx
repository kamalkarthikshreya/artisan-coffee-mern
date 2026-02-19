import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroCanvasAnimation = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const { scrollY } = useScroll();
    const opacityResults = useTransform(scrollY, [0, 300], [1, 0]);
    const textYResults = useTransform(scrollY, [0, 300], [0, 100]);

    // Handle video loading
    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

    const handleVideoError = (e) => {
        console.error("Video failed to load", e);
    };

    return (
        <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#1A0F0A]">
            {/* Loading Screen - Simplified */}
            {!videoLoaded && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1A0F0A]">
                    <div className="relative w-24 h-24 mb-8">
                        <div className="absolute inset-0 border-4 border-[#3D2418] border-t-[#D4A574] rounded-full animate-spin"></div>
                        <img
                            src="/coffee/loader-bean.svg"
                            alt="Loading..."
                            className="absolute inset-0 w-full h-full object-contain animate-pulse"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                </div>
            )}

            <motion.div
                style={{ opacity: opacityResults }}
                className={`relative h-full w-full transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    onCanPlayThrough={handleVideoLoad}
                    onError={handleVideoError}
                    className="absolute inset-0 h-full w-full object-cover md:object-cover sm:object-cover mobile-video-fix will-change-transform"
                    poster="/coffee/hero-placeholder.svg"
                    style={{ objectPosition: 'center' }}
                    preload="auto"
                >
                    <source src="/video/hero-coffee.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Hero Content */}
                <motion.div
                    style={{ y: textYResults }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 will-change-transform"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-[#F5E6D3] mb-6 tracking-tighter"
                    >
                        Artisan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-lg md:text-xl lg:text-2xl text-[#D4A574] font-light tracking-widest uppercase"
                    >
                        Experience the stored coffee
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 2, duration: 1 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[#F5E6D3]/60 text-xs uppercase tracking-[0.2em] font-light">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4A574] to-transparent" />
            </motion.div>
        </div>
    );
};

export default HeroCanvasAnimation;
