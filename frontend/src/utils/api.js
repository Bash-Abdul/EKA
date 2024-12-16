import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend base URL
});

// Attach token to headers for authenticated requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Assuming token is stored here
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
