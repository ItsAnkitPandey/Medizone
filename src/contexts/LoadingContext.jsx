import React, { createContext, useContext, useState } from 'react';
import GlobalLoader from '../components/GlobalLoader';

const LoadingContext = createContext(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [, setLoadingCount] = useState(0);

  // Show loader
  const showLoading = () => {
    setLoadingCount((prev) => {
      const newCount = prev + 1;
      if (newCount > 0) {
        setLoading(true);
      }
      return newCount;
    });
  };

  // Hide loader
  const hideLoading = () => {
    setLoadingCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      if (newCount === 0) {
        setLoading(false);
      }
      return newCount;
    });
  };

  const value = {
    loading,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {loading && (
        <GlobalLoader />
      )}
    </LoadingContext.Provider>
  );
};
