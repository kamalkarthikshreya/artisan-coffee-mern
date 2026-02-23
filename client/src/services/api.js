import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'https://artisan-coffee-mern-production.up.railway.app/api';

// Resilience: Force Railway URL on Vercel if the local/relative fallback is detected
if (window.location.hostname !== 'localhost' && (!API_URL.startsWith('http') || API_URL.includes('localhost'))) {
    API_URL = 'https://artisan-coffee-mern-production.up.railway.app/api';
}

if (!API_URL.endsWith('/')) API_URL += '/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProducts = async () => {
    const response = await api.get('products', { params: { _t: Date.now() } });
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await api.get(`products/${id}`);
    return response.data;
};

// Checkout function with Stripe
export const createCheckoutSession = async (items, customer) => {
    const response = await api.post('checkout', { items, customer });
    return response.data;
};

export const sendContactMessage = async (data) => {
    const response = await api.post('contact', data);
    return response.data;
};

export default api;
