import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setStatus('error');
            return;
        }

        const verifyOrder = async () => {
            try {
                // Call verification endpoint
                const response = await api.post('/checkout/verify', { sessionId });
                if (response.data.success) {
                    setStatus('success');
                    setOrderId(response.data.orderId);
                    clearCart();
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Verification failed", error);
                setStatus('error');
            }
        };

        verifyOrder();
    }, [sessionId]);

    return (
        <div className="bg-[#1A0F0A] min-h-screen flex items-center justify-center text-[#F5E6D3] p-4">
            <div className="max-w-lg w-full bg-[#0A0503] border border-[#3D2418] rounded-2xl p-8 text-center shadow-2xl">
                {status === 'verifying' && (
                    <div className="space-y-6">
                        <div className="animate-spin w-16 h-16 border-4 border-[#D4A574] border-t-transparent rounded-full mx-auto"></div>
                        <h2 className="text-2xl font-serif text-[#F5E6D3]">Verifying Payment...</h2>
                        <p className="text-[#D4A574]/60">Please wait while we confirm your order.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-serif text-[#F5E6D3]">Order Confirmed!</h2>
                        <p className="text-[#D4A574]/80">Thank you for your purchase. Your coffee is being prepared.</p>

                        <div className="bg-[#1A0F0A] p-4 rounded-lg inline-block border border-[#3D2418]">
                            <span className="block text-xs uppercase tracking-wider text-[#D4A574]/50 mb-1">Order ID</span>
                            <span className="font-mono text-lg">{orderId}</span>
                        </div>

                        <p className="text-sm text-[#F5E6D3]/40">A confirmation email has been sent to your inbox.</p>

                        <Link to="/" className="inline-flex items-center gap-2 bg-[#D4A574] text-[#1A0F0A] px-8 py-3 rounded-full font-bold hover:bg-white transition-colors mt-4">
                            <Home size={20} /> Return Home
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500">
                            <CheckCircle size={40} className="rotate-45" />
                        </div>
                        <h2 className="text-2xl font-serif text-[#F5E6D3]">Something went wrong</h2>
                        <p className="text-[#D4A574]/60">We couldn't verify your payment. If you were charged, please contact support.</p>
                        <Link to="/" className="inline-block text-[#D4A574] underline underline-offset-4 mt-4">
                            Return to Shop
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Success;
