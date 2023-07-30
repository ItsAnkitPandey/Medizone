import React, { useState } from 'react'
import logo from '../mdlogo.jpg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


const Navbar = ({ cart, loggedIn, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // calculate total items in cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`container ${showMenu ? 'active' : ''}`}>
      <div className="logo ">
        <Link to="/"><motion.img whileTap={{ scale: 0.75 }} src={logo} alt="" /></Link>
        {loggedIn ? <p style={{ marginLeft: '5px' }}> {storedUser.name}</p> : ''}
      </div>
      <div className={`nav ${showMenu ? 'active' : ''}`}>
        <Link to="/"><i className='fa-solid fa-house'></i></Link>
        <Link to="/allmedicines">Medicines</Link>
        <Link to="/about">About Us</Link>
        {loggedIn ? <Link onClick={handleLogout}>Logout</Link> : <Link to="/login">Login</Link>}
        <Link to="/contact">Contact Us</Link>
        <Link to="mailto:ankitpandey.272003@gmail.com" target="_blank"><i class="fa-regular fa-paper-plane"></i></Link>
        <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i><span className='item-count'>{totalItemsInCart}</span></Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${showMenu ? 'active' : ''}`} />
        <div className={`bar ${showMenu ? 'active' : ''}`} />
        <div className={`bar ${showMenu ? 'active' : ''}`} />
      </div>
    </div>
  )
}

export default Navbar
