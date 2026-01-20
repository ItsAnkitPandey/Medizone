/**
 * Cart Context Provider
 * Manages shopping cart state and operations across the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();

  // Update cart count whenever cart changes
  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      if (response.data.success) {
        const mappedCart = response.data.cartItems.map(item => ({
          id: item._id,
          medicineId: item.medicine._id,
          name: item.medicine.title,
          img: item.medicine.imgUrl,
          price: item.medicine.price,
          quantity: item.quantity,
          stock: item.medicine.stockQuantity
        }));
        setCart(mappedCart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status !== 401) {
        enqueueSnackbar('Failed to load cart', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, enqueueSnackbar]);

  // Load cart on mount and when authentication changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = async (medicineData, quantity = 1) => {
    if (!isAuthenticated) {
      enqueueSnackbar('Please login to add items to cart', { variant: 'warning' });
      return false;
    }

    try {
      // Optimistic update
      const existingItem = cart.find((item) => item.medicineId === medicineData.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (medicineData.stock && newQuantity > medicineData.stock) {
          enqueueSnackbar(`Only ${medicineData.stock} units available in stock`, { variant: 'warning' });
          return false;
        }
      }

      // Call backend API
      const response = await cartAPI.addToCart(medicineData.id, quantity);
      
      if (response.data.success) {
        // Refresh cart from backend to ensure sync
        await fetchCart();
        enqueueSnackbar('Item added to cart successfully', { variant: 'success' });
        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to add item to cart',
        { variant: 'error' }
      );
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      await cartAPI.removeFromCart(cartItemId);
      const updatedCart = cart.filter((item) => item.id !== cartItemId);
      setCart(updatedCart);
      enqueueSnackbar('Item removed from cart', { variant: 'success' });
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to remove item',
        { variant: 'error' }
      );
      return false;
    }
  };

  // Update item quantity
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      await cartAPI.updateCart(cartItemId, quantity);
      const updatedCart = cart.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to update quantity',
        { variant: 'error' }
      );
      return false;
    }
  };

  // Clear cart (useful after successful checkout)
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    setCart,
    loading,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    fetchCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
