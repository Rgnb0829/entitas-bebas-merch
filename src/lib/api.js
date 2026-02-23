import axios from 'axios';

// In development, VITE_API_URL is empty so Vite proxy handles /api requests.
// In production (Vercel), VITE_API_URL points to the Railway backend URL.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;
