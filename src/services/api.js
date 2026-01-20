/**
 * API Service
 * Centralized API calls with authentication and error handling
 */

import axios from 'axios';
import { APP_CONFIG } from '../config/app.config';

// Create axios instance with default config
const api = axios.create({
  baseURL: APP_CONFIG.api.baseUrl,
  timeout: APP_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem(APP_CONFIG.storageKeys.auth);
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem(APP_CONFIG.storageKeys.auth);
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/user/login', credentials),
  signup: (userData) => api.post('/user/signup', userData),
  forgotPassword: (email) => api.post('/user/forgot-password', { email }),
  resetPassword: (token, newPassword) => 
    api.post('/user/reset-password', { token, newPassword }),
  verifyToken: () => api.get('/user/verify-token'),
  refreshToken: () => api.post('/user/refresh-token'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/change-password', data),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
};

// Cart API calls
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (medicineId, quantity = 1) => api.post('/cart/add', { medicineId, quantity }),
  updateCart: (itemId, quantity) => api.put('/cart/update', { itemId, quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/remove/${itemId}`),
};

// Medicine API calls
export const medicineAPI = {
  getAllMedicines: (params) => api.get('/medicines', { params }),
  getMedicineById: (id) => api.get(`/medicines/${id}`),
  searchMedicines: (search) => api.get('/medicines', { params: { search } }),
};

// Category API calls
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  getMedicinesByCategory: (id, params) => api.get(`/categories/${id}/medicines`, { params }),
};

export default api;
