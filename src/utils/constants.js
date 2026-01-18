// Application Constants

// Theme Colors
export const COLORS = {
  primary: '#2e7d32',
  primaryLight: '#5bd261',
  primaryDark: '#1b5e20',
  secondary: '#04c454',
  secondaryLight: '#2ace6e',
  gradientStart: '#2ace6e',
  gradientEnd: '#04c454',
  white: '#ffffff',
  black: '#000000',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  background: '#f5f5f5',
  border: '#e0e0e0',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
  info: '#2196f3',
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  USERS: '/api/users',
  PRODUCTS: '/api/products',
  CART: '/api/cart',
  ORDERS: '/api/orders',
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  CHATBOT: '/api/chatbot',
};

// Product Categories
export const CATEGORIES = {
  MEDICINES: 'Medicines',
  BABY_CARE: 'Baby Care',
  PERSONAL_CARE: 'Personal Care',
  COVID_ESSENTIALS: 'Covid Essentials',
  EQUIPMENTS: 'Equipments',
};

// Cart Constants
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  LOGGED_IN: 'loggedIn',
  CART: 'cart',
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1280px',
};

// App Configuration
export const APP_CONFIG = {
  appName: 'Medizone',
  appDescription: 'Your trusted medical e-commerce platform',
  defaultPageSize: 12,
  maxCartQuantity: 10,
  minPasswordLength: 8,
  sessionTimeout: 3600000, // 1 hour in milliseconds
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please login to continue.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: `Password must be at least ${APP_CONFIG.minPasswordLength} characters.`,
  CART_EMPTY: 'Your cart is empty.',
  PRODUCT_NOT_FOUND: 'Product not found.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  CART_ADDED: 'Item added to cart.',
  CART_REMOVED: 'Item removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  PASSWORD_RESET: 'Password reset email sent.',
};
