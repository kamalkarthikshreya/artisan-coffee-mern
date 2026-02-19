import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../services/api';

const ContactSection = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Contact failed", error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 px-6 bg-[#0A0503]">
            <div className="max-w-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-serif font-bold text-[#F5E6D3] mb-4">Get in Touch</h2>
                    <p className="text-[#D4A574]/60">Have questions about our blends? We'd love to hear from you.</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#1A0F0A] p-8 rounded-2xl border border-[#3D2418]">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-4 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-4 text-[#F5E6D3] focus:border-[#D4A574] outline-none"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-[#0A0503] border border-[#3D2418] rounded-lg p-4 text-[#F5E6D3] focus:border-[#D4A574] outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-[#D4A574] text-[#1A0F0A] font-bold py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-500 text-center text-sm">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-500 text-center text-sm">Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
