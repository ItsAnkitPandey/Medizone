/**
 * Application configuration
 * Centralized configuration for the application
 */

export const APP_CONFIG = {
  // Application metadata
  name: 'MediZone',
  version: '1.1.0',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Storage keys (prefixed to avoid conflicts)
  storageKeys: {
    cart: 'medizone_cart',
    auth: 'medizone_auth',
    user: 'medizone_user',
  },
  
  // Timeouts and intervals
  loaderTimeout: 2500,
  sessionTimeout: 3600000, // 1 hour in milliseconds
  
  // API configuration (if you add backend)
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'https://medizone-backend.onrender.com',
    timeout: 30000,
  },
  
  // Feature flags
  features: {
    enableChatbot: true,
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableErrorReporting: process.env.NODE_ENV === 'production',
  },
  
  // UI settings
  ui: {
    mobileBreakpoint: 769,
    itemsPerPage: 12,
  },
};

export default APP_CONFIG;
