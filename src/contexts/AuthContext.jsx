/**
 * Authentication Context Provider
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, setToStorage, removeFromStorage } from '../utils/storage';
import { APP_CONFIG } from '../config/app.config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      try {
        const authData = getFromStorage(APP_CONFIG.storageKeys.auth);
        
        if (authData?.token && authData?.user) {
          // Check if token is expired
          if (isTokenValid(authData.token)) {
            setToken(authData.token);
            setUser(authData.user);
            setIsAuthenticated(true);
          } else {
            // Token expired, clear auth
            logout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Check if token is still valid
  const isTokenValid = (token) => {
    try {
      if (!token) return false;
      
      // Decode JWT token (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      
      return Date.now() < expirationTime;
    } catch (error) {
      return false;
    }
  };

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    
    // Store in localStorage
    setToStorage(APP_CONFIG.storageKeys.auth, {
      user: userData,
      token: authToken,
      timestamp: Date.now(),
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    removeFromStorage(APP_CONFIG.storageKeys.auth);
    removeFromStorage(APP_CONFIG.storageKeys.cart); // Clear cart on logout
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    const authData = getFromStorage(APP_CONFIG.storageKeys.auth);
    if (authData) {
      setToStorage(APP_CONFIG.storageKeys.auth, {
        ...authData,
        user: userData,
      });
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
