/**
 * Security Utilities
 * Additional security helpers for the application
 */

/**
 * Generate a secure random token
 * Useful for CSRF tokens, session IDs, etc.
 */
export const generateSecureToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Hash a string using SHA-256
 * Note: For actual password hashing, use backend bcrypt
 */
export const hashString = async (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Debounce function for rate limiting
 * Prevents too many rapid API calls
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function for rate limiting
 * Limits function execution frequency
 */
export const throttle = (func, limit = 1000) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if the current session is from the same browser
 * Helps detect session hijacking
 */
export const validateSession = () => {
  const browserFingerprint = getBrowserFingerprint();
  const storedFingerprint = sessionStorage.getItem('browser_fp');
  
  if (!storedFingerprint) {
    sessionStorage.setItem('browser_fp', browserFingerprint);
    return true;
  }
  
  return browserFingerprint === storedFingerprint;
};

/**
 * Simple browser fingerprinting
 * Not cryptographically secure, but useful for basic session validation
 */
const getBrowserFingerprint = () => {
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ].join('|');
  
  // Simple hash
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

/**
 * Detect suspicious activity
 * Check for common attack patterns
 */
export const detectSuspiciousActivity = (input) => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /expression\(/i,
    /<iframe/i,
    /document\.cookie/i,
    /document\.write/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};

/**
 * Log security events
 * Send to analytics or monitoring service
 */
export const logSecurityEvent = (eventType, details) => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    details,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };
  
  // In production, send to monitoring service (Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 Security Event:', event);
  }
  
  // TODO: Send to backend for logging
  // api.post('/security/log', event);
};

/**
 * Check password against common passwords list
 */
export const isCommonPassword = (password) => {
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
    'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
    'bailey', 'passw0rd', 'shadow', '123123', '654321'
  ];
  
  return commonPasswords.includes(password.toLowerCase());
};

/**
 * Mask sensitive data for display
 */
export const maskEmail = (email) => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedUsername = username.length > 2
    ? username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
    : username[0] + '*';
  
  return `${maskedUsername}@${domain}`;
};

export const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '***-***-$3');
};

export const maskCreditCard = (cardNumber) => {
  if (!cardNumber) return '';
  return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '****-****-****-$4');
};

/**
 * Encrypt data for local storage (basic XOR cipher)
 * Note: Not cryptographically secure, use only for non-critical data
 */
export const encryptData = (data, key = 'medizone_secret') => {
  const jsonStr = JSON.stringify(data);
  let encrypted = '';
  
  for (let i = 0; i < jsonStr.length; i++) {
    encrypted += String.fromCharCode(
      jsonStr.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  
  return btoa(encrypted);
};

export const decryptData = (encryptedData, key = 'medizone_secret') => {
  try {
    const encrypted = atob(encryptedData);
    let decrypted = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(
        encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

/**
 * Check if user is on a secure connection
 */
export const isSecureConnection = () => {
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost';
};

/**
 * Warn user if not on secure connection
 */
export const checkSecureConnection = () => {
  if (!isSecureConnection() && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Insecure connection detected. Please use HTTPS.');
    logSecurityEvent('INSECURE_CONNECTION', {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
    });
  }
};

export default {
  generateSecureToken,
  hashString,
  debounce,
  throttle,
  validateSession,
  detectSuspiciousActivity,
  logSecurityEvent,
  isCommonPassword,
  maskEmail,
  maskPhone,
  maskCreditCard,
  encryptData,
  decryptData,
  isSecureConnection,
  checkSecureConnection,
};
