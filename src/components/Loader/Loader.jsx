import React from 'react';
import './Loader.css'
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="greeting-text">
        Welcome to Medizone
      </div>
    </div>
  );
};

export default Loader;
