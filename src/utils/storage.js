/**
 * Safe localStorage utility functions
 * Provides error-handled wrappers for localStorage operations
 */

/**
 * Safely get an item from localStorage and parse it as JSON
 * @param {string} key - The storage key
 * @returns {any|null} Parsed value or null if not found/error
 */
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error reading ${key} from localStorage:`, error);
    }
    return null;
  }
};

/**
 * Safely set an item in localStorage as JSON
 * @param {string} key - The storage key
 * @param {any} value - The value to store (will be JSON stringified)
 * @returns {boolean} Success status
 */
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
    return false;
  }
};

/**
 * Safely remove an item from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} Success status
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} Success status
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error clearing localStorage:', error);
    }
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is accessible
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
