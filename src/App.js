import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './Auth/ProtectedRoute';
import { initializeChatbotStyles } from './utils/chatbotStyles';
import { getFromStorage, setToStorage } from './utils/storage';
import { APP_CONFIG } from './config/app.config';
import { useAuth } from './contexts/AuthContext';

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const AllMedicines = lazy(() => import('./components/product/AllMedicines'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Thankyou = lazy(() => import('./pages/Thankyou/Thankyou'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const Popup = lazy(() => import('./components/common/Popup'));

// Constants
const STORAGE_KEYS = APP_CONFIG.storageKeys;
// const LOADER_TIMEOUT = APP_CONFIG.loaderTimeout;

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Authentication handlers removed - now handled by AuthContext

  // Cart management
  const addToCart = (data) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === data.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...data, quantity: 1 }];
      }

      // Update localStorage with the new cart state
      setToStorage(STORAGE_KEYS.cart, updatedCart);
      return updatedCart;
    });

    setShowPopup(true);
  };

  // Initialize app on mount
  useEffect(() => {
    // Restore cart from localStorage
    const storedCart = getFromStorage(STORAGE_KEYS.cart);
    if (storedCart && Array.isArray(storedCart)) {
      setCart(storedCart);
    }

    // Initialize chatbot styles
    const cleanupChatbot = initializeChatbotStyles();

    // Hide loader immediately after initialization
    // No artificial delay needed - let React Suspense handle lazy loading
    setLoading(false);

    // Cleanup
    return () => {
      if (cleanupChatbot) cleanupChatbot();
    };
  }, []);

  // Sync cart to localStorage when it changes
  useEffect(() => {
    if (cart.length > 0) {
      setToStorage(STORAGE_KEYS.cart, cart);
    }
  }, [cart]);



  return (
    <ErrorBoundary>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Navbar cart={cart} loggedIn={isAuthenticated} handleLogout={logout} />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} loading={loading} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/allmedicines"
                element={
                  <ProtectedRoute>
                    <AllMedicines addToCart={addToCart} />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart cart={cart} setCart={setCart} />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout cart={cart} />
                  </ProtectedRoute>
                }
              />
              <Route path="/thankyou" element={<Thankyou />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          {showPopup && <Popup setShowPopup={setShowPopup} cart={cart} setCart={setCart} />}
        </Router>
      )}
    </ErrorBoundary>
  );
}

export default App;
