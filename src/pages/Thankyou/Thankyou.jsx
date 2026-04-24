import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './thankyou.css'

const Thankyou = () => {
    const location = useLocation();
    const { order, orderNumber } = location.state || {};
    const [count, setCount] = useState(10);

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            window.location.href = "/";
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
        <div className='thank-container'>
            <div className="thank">
                <i className="fa-solid fa-circle-check fa-4x" style={{color:'#09a706'}}></i>
                <h1>Order Placed Successfully!</h1>
                {orderNumber && (
                  <div className="order-details">
                    <p className="order-number">Order Number: <strong>#{orderNumber.slice(-8).toUpperCase()}</strong></p>
                    <p>Thank you for your order. We've sent a confirmation email with your order details.</p>
                  </div>
                )}
                <p className="thank-message">We will always be there for you.</p>
            </div>
            {order && (
              <div className="order-summary-box">
                <h3>Order Summary</h3>
                <p>Total Amount: ₹{order.totalAmount?.toFixed(2)}</p>
                <p>Payment Method: {order.paymentMode}</p>
                <p>Status: {order.status}</p>
              </div>
            )}
            <p className="redirect-timer">This page will redirect in <span id="timer">{count}</span>s.</p>
            <Link to='/' className="home-link">Go To Home</Link>
        </div>
    )
}

export default Thankyou