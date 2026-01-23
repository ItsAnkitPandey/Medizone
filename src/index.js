import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/GlobalLoader.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { setLoadingHandlers } from './services/api';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

// AppWrapper to set loading handlers
const AppWrapper = () => {
  return (
    <LoadingProvider>
      <LoadingHandlerSetter />
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

// Component to set loading handlers from context
const LoadingHandlerSetter = () => {
  const { showLoading, hideLoading } = require('./contexts/LoadingContext').useLoading();
  
  React.useEffect(() => {
    setLoadingHandlers(showLoading, hideLoading);
  }, [showLoading, hideLoading]);
  
  return null;
};

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    </SnackbarProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
