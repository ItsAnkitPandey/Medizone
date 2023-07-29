import React from 'react';
import { Link } from 'react-router-dom';
import './popup.css'
const Popup = ({ setShowPopup, cart, setCart }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Added to Cart</h2>
        <p>Item has been successfully added to your cart.</p>
        <button className='pop-btn' onClick={() => setShowPopup(false)}>Close</button>
        <Link to = "/cart" >
        <button className='pop-btn'  onClick={() => setShowPopup(false)}>Go To Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
