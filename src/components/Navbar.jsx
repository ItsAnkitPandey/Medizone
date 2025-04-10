import React, { useState } from 'react'
import logo from '../images/updatedLogo.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


const Navbar = ({ cart, loggedIn, handleLogout }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  let [selected, setSelected] = useState(0);

  // calculate total items in cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navheader">
      <div className='container hide-for-mobile'>
        <div className="logo ">
          <Link to="/"><motion.img whileTap={{ scale: 0.75 }} src={logo} alt="" /></Link>

          {loggedIn ? <p style={{ marginLeft: '10px' }}><i className="fa-solid fa-user" style={{ marginRight: '5px' }}></i> {storedUser.name}</p> : ''}
        </div>
        <div className='nav ' >
          <Link className={`${selected === 0 ? 'active' : ''}`} to="/" onClick={() => setSelected(0)}><i className='fa-solid fa-house'></i></Link>
          <Link className={`${selected === 1 ? 'active' : ''}`} to="/allmedicines" onClick={() => setSelected(1)}>Medicines</Link>
          <Link className={`${selected === 2 ? 'active' : ''}`} to="/about" onClick={() => setSelected(2)}>About Us</Link>
          {loggedIn ? <Link className={`${selected === 3 ? 'active' : ''}`} onClick={handleLogout} >Logout</Link> : <Link className={`${selected === 3 ? 'active' : ''}`} to="/login" onClick={() => setSelected(3)}>Login</Link>}
          <Link to="/contact" className={`${selected === 4 ? 'active' : ''}`} onClick={() => setSelected(4)}>Contact Us</Link>
          <Link className={`${selected === 5 ? 'active' : ''}`} to="/cart" onClick={() => setSelected(5)}> <i className="fa-solid fa-cart-shopping"></i><span className='item-count'>{totalItemsInCart}</span></Link>
        </div>
      </div>

      {/* For mobile menu  */}
      <div className='container hide-for-desktop'>
        <div className="logo ">
          <Link to="/"><motion.img whileTap={{ scale: 0.75 }} src={logo} alt="" /></Link>

          {loggedIn ? <p style={{ marginLeft: '10px' }}><i className="fa-solid fa-user" style={{ marginRight: '5px' }}></i> {storedUser.name}</p> : ''}
        </div>
        <div className='nav-mob ' >
          <Link className={`${selected === 5 ? 'active' : ''}`} to="/cart" onClick={() => setSelected(5)}> <i className="fa-solid fa-cart-shopping"></i><span className='item-count'>{totalItemsInCart}</span></Link>
        </div>
      </div>
      <div className="mobile-nav hide-for-desktop">
        <nav className=' d-flex jc-spacearound'>

          <Link to={"/"}>
            <i className={`${selected === 0 ? 'active' : ''} fa-solid fa-home fa-lg`} onClick={() => { setSelected(0) }} />
          </Link>

          <Link to={"/allmedicines"}>
          <i className={`${selected === 1 ? 'active' : ''} fa-solid fa-capsules fa-lg`} onClick={() => { setSelected(1) }} />
          </Link>

          <Link to={"/login"}>
          <i className={`${selected === 2 ? 'active' : ''} fa-solid fa-user fa-lg`} onClick={() => { setSelected(2) }} />
          </Link>

          <Link to={"/about"}>
          <i className={`${selected === 3 ? 'active' : ''} fa-solid fa-address-card fa-lg`} onClick={() => { setSelected(3) }} />
          </Link>

          <Link to={"/contact"}>
          <i className={`${selected === 4 ? 'active' : ''} fa-solid fa-headset fa-lg`} onClick={() => { setSelected(4) }} />
          </Link>

        </nav>
      </div>
    </div>
  )
}

export default Navbar
