import React, { useEffect, useState, useRef } from 'react'
import logo from '../../../images/updatedLogo.png'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useCart } from '../../../contexts/CartContext';

const Navbar = ({ loggedIn, handleLogout }) => {
  const storedUser = JSON.parse(localStorage.getItem('medizone_auth'))?.user;
  const { cartCount } = useCart();
  let [selected, setSelected] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { pathname } = useLocation();
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })

    const root = document.getElementById("root");
    let footer = root?.querySelector('.footer-wrapper');
    let dummyColor = root?.querySelector('.dummycolor');
    let navBg = root?.querySelector('.navheader');
    console.log(footer);
    if (pathname === "/login" || pathname === '/signup' || pathname === '/forgotPassword') {
      if (footer) footer.style.display = "none";
      if (dummyColor) dummyColor.style.display = "none";
      if (navBg) navBg.style.backgroundColor = "transparent";
    }
    // cleanup showing footer again when leaving the page 
    return () => {
      if (footer) footer.style.display = "";
      if (dummyColor) dummyColor.style.display = "";
      if (navBg) navBg.style.backgroundColor = "white";
    }
  }, [pathname])

  return (
    <div className="navheader">
      <div className='container hide-for-mobile'>
        <div className="logo ">
          <Link to="/"><motion.img whileTap={{ scale: 0.75 }} src={logo} alt="" /></Link>
        </div>
        <div className='nav ' >
          <Link className={`${selected === 0 ? 'active' : ''}`} to="/" onClick={() => setSelected(0)}><i className='fa-solid fa-house'></i></Link>
          <Link className={`${selected === 1 ? 'active' : ''}`} to="/allmedicines" onClick={() => setSelected(1)}>Medicines</Link>
          <Link className={`${selected === 2 ? 'active' : ''}`} to="/about" onClick={() => setSelected(2)}>About Us</Link>
          
          {loggedIn ? (
            <div className="profile-dropdown" ref={profileMenuRef}>
              <button 
                className="profile-btn" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <i className="fa-solid fa-user-circle"></i>
                <span>{storedUser?.name || 'Profile'}</span>
                <i className={`fa-solid fa-chevron-${showProfileMenu ? 'up' : 'down'}`}></i>
              </button>
              
              {showProfileMenu && (
                <motion.div 
                  className="profile-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/profile" className="profile-menu-item" onClick={() => { setShowProfileMenu(false); setSelected(3); }}>
                    <i className="fa-solid fa-user"></i>
                    <span>View Profile</span>
                  </Link>
                  <Link to="/profile/edit" className="profile-menu-item" onClick={() => { setShowProfileMenu(false); setSelected(3); }}>
                    <i className="fa-solid fa-edit"></i>
                    <span>Update Profile</span>
                  </Link>
                  <div className="profile-menu-divider"></div>
                  <button className="profile-menu-item logout-btn" onClick={() => { handleLogout(); setShowProfileMenu(false); }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link className={`${selected === 3 ? 'active' : ''}`} to="/login" onClick={() => setSelected(3)}>Login</Link>
          )}
          
          <Link to="/contact" className={`${selected === 4 ? 'active' : ''}`} onClick={() => setSelected(4)}>Contact Us</Link>
          <Link className={`${selected === 5 ? 'active' : ''}`} to={loggedIn ? '/cart' : '/login'} onClick={() => setSelected(5)}> <i className="fa-solid fa-cart-shopping"></i><span className='item-count'>{cartCount}</span></Link>
        </div>
      </div>

      {/* For mobile menu  */}
      <div className='container hide-for-desktop'>
        <div className="logo ">
          <Link to="/"><motion.img whileTap={{ scale: 0.75 }} src={logo} alt="" /></Link>

        </div>
        <div className='nav-mob ' >
          <Link className={`${selected === 5 ? 'active' : ''}`} to={loggedIn ? '/cart' : '/login'} onClick={() => setSelected(5)}> <i className="fa-solid fa-cart-shopping"></i><span className='item-count'>{cartCount}</span></Link>
        </div>
      </div>
      <div className="mobile-nav hide-for-desktop">
        <nav className=' d-flex jc-spacearound'>

          <Link to={"/"} className={`${selected === 0 ? 'active' : ''}`} onClick={() => { setSelected(0) }}>
            <i className= "fa-solid fa-home fa-lg" />
          </Link>

          <Link to={"/allmedicines"} className={`${selected === 1 ? 'active' : ''}`} onClick={() => { setSelected(1) }}>
            <i className='fa-solid fa-capsules fa-lg'onClick={() => { setSelected(1) }} />
          </Link>

          {loggedIn ? (
            <div className="mobile-profile-dropdown" ref={profileMenuRef}>
              <button 
                className={`mobile-profile-btn ${selected === 2 ? 'active' : ''}`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <i className='fa-solid fa-user fa-lg' />
              </button>
              
              {showProfileMenu && (
                <motion.div 
                  className="mobile-profile-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mobile-profile-header">
                    <i className="fa-solid fa-user-circle"></i>
                    <span>{storedUser?.name || 'Profile'}</span>
                  </div>
                  <Link to="/profile" className="mobile-profile-item" onClick={() => { setShowProfileMenu(false); setSelected(2); }}>
                    <i className="fa-solid fa-user"></i>
                    <span>View Profile</span>
                  </Link>
                  <Link to="/profile/edit" className="mobile-profile-item" onClick={() => { setShowProfileMenu(false); setSelected(2); }}>
                    <i className="fa-solid fa-edit"></i>
                    <span>Update Profile</span>
                  </Link>
                  <div className="mobile-profile-divider"></div>
                  <button className="mobile-profile-item mobile-logout-btn" onClick={() => { handleLogout(); setShowProfileMenu(false); }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to={"/login"} className={`${selected === 2 ? 'active' : ''}`} onClick={() => { setSelected(2) }}>
              <i className='fa-solid fa-user fa-lg' />
            </Link>
          )}

          <Link to={"/about"} className={`${selected === 3 ? 'active' : ''}`} onClick={() => { setSelected(3) }}>
            <i className='fa-solid fa-address-card fa-lg' onClick={() => { setSelected(3) }} />
          </Link>

          <Link to={"/contact"} className={`${selected === 4 ? 'active' : ''}`} onClick={() => { setSelected(4) }}>
            <i className='fa-solid fa-headset fa-lg' />
          </Link>

        </nav>
      </div>
    </div>
  )
}

export default Navbar
