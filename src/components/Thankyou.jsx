import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './thankyou.css'
const Thankyou = () => {
    const [count, setCount] = useState(7);
    const redirect = "https://medizon.netlify.app"; // The redirection's landing page.

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            window.location.href = redirect;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [redirect]);
    return (
        <div className='thank-container'>
            <div className="thank">
                <i className="fa-solid fa-circle-check fa-4x" style={{color:'#09a706'}}></i>
                <h1>Order Placed Successfully.</h1>
                <p>We will always there for you.</p>
            </div>
            <p>This page will redirect in <span id="timer">{count}</span>s.</p>
            <Link to='./'>Go To Home</Link>

        </div>
    )
}

export default Thankyou