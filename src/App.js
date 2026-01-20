import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './Auth/ProtectedRoute';
import { initializeChatbotStyles } from './utils/chatbotStyles';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';

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
const Profile = lazy(() => import('./pages/Profile/Profile'));
const EditProfile = lazy(() => import('./pages/Profile/EditProfile'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const Popup = lazy(() => import('./components/common/Popup'));

function App() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { cart, addToCart } = useCart();

  // Initialize app on mount
  useEffect(() => {
    // Initialize chatbot styles
    const cleanupChatbot = initializeChatbotStyles();

    // Hide loader immediately after initialization
    setLoading(false);

    // Cleanup
    return () => {
      if (cleanupChatbot) cleanupChatbot();
    };
  }, []);

  // Show popup when item is added to cart
  const handleAddToCart = async (data) => {
    const success = await addToCart(data);
    if (success) {
      setShowPopup(true);
    }
  };



  return (
    <ErrorBoundary>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Navbar loggedIn={isAuthenticated} handleLogout={logout} />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home addToCart={handleAddToCart} loading={loading} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/allmedicines"
                element={
                  <ProtectedRoute>
                    <AllMedicines addToCart={handleAddToCart} />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
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
          {showPopup && <Popup setShowPopup={setShowPopup} />}
        </Router>
      )}
    </ErrorBoundary>
  );
}

export default App;
