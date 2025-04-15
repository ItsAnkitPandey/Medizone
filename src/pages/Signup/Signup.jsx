import React from 'react'
import '../Login/Login.css'
import googleLogo from '../../images/google-social-icon.svg';
import facebookLogo from '../../images/fb-social-icon.svg';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
    <div className="login_wrapper">
        <div className="login_container">
            <div className="newloginBody">
                <div className="userData">
                    <div className="header_section">
                        <h1>Join Medizone Family!</h1>
                    </div>
                    <div className="social_area">
                        <div>
                            <a href="/" className='googleLogin'>
                                <button>
                                    Google
                                    <img src={googleLogo} alt="Google" className="login-social-icons" />
                                </button>
                            </a>
                        </div>
                        <div>
                            <a href="/" className='facebookLogin'>
                                <button>
                                    Facebook
                                    <img src={facebookLogo} alt="Facebook" className="login-social-icons" />
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="social_login_division">
                        <hr className="social_login_division_hr" />
                        <span style={{ color: "#B4B4B4" }}>or</span>
                        <hr className="social_login_division_hr" />
                    </div>
                    <div className="login-name">
                        <input
                            type="text"
                            name="username"
                            className="login_name"
                            placeholder="Enter Your Name"
                            maxlength="100" />
                    </div>
                    <div className="login-email">
                        <input
                            type="email"
                            name="email"
                            className="login_email"
                            placeholder="Email address"
                            maxlength="100" />
                    </div>
                    <div className="login-pwd">
                        <input type="password"
                            name="password"
                            className="login_password"
                            placeholder="Password"
                            maxlength="100" />
                        <span className="hide_pswd_icon" onclick="loginpasswordshowhide(this)"></span>

                    </div>
                    <div className="login_button_block">

                        <button className="login_button">Sign up</button>

                    </div>
                </div>
                <div className="newregister_content">
            
            <h2>Already have an account? <Link to="/login">
            <span>Log In</span>
            </Link></h2>
            
        </div>

            </div>
        </div>
       
    </div>
    <div className="ai-gradient"></div>
</>
  )
}

export default Signup