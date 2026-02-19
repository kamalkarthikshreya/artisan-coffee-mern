import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// Checkout function with Stripe
export const createCheckoutSession = async (items, customer) => {
    const response = await api.post('/checkout', { items, customer });
    return response.data;
};

export const sendContactMessage = async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
};

export default api;
