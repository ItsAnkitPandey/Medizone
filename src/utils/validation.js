/**
 * Input Validation Utilities
 * Validates and sanitizes user inputs
 */

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: null };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 100) {
    return { isValid: false, error: 'Password is too long' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, error: null };
};

// Name validation
export const validateName = (name) => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'Name is too long' };
  }
  
  // Allow only letters, spaces, and common name characters
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }
  
  return { isValid: true, error: null };
};

// Sanitize string input - Remove potentially harmful characters
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Phone number validation (optional)
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true, error: null }; // Optional field
  }
  
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, error: null };
};

// Password strength checker
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  if (strength <= 2) return { level: 'weak', color: '#ff4444', text: 'Weak' };
  if (strength <= 4) return { level: 'medium', color: '#ffaa00', text: 'Medium' };
  return { level: 'strong', color: '#00aa00', text: 'Strong' };
};

// Validate full form
export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  if (!password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignupForm = (name, email, password) => {
  const errors = {};
  
  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
