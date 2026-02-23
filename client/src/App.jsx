import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#1A0F0A',
                                color: '#F5E6D3',
                                border: '1px solid rgba(212,165,116,0.2)',
                                borderRadius: '12px',
                                fontFamily: 'sans-serif',
                            },
                            success: {
                                iconTheme: { primary: '#D4A574', secondary: '#1A0F0A' },
                            },
                            error: {
                                iconTheme: { primary: '#ef4444', secondary: '#1A0F0A' },
                            },
                        }}
                    />
                    <AnimatedRoutes />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
                <Route path="/success" element={<PageWrapper><Success /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/orders" element={<PageWrapper><OrderHistory /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
    >
        {children}
    </motion.div>
);

export default App;
