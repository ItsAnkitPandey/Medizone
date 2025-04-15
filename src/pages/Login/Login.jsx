import React from 'react'
import googleLogo from '../../images/google-social-icon.svg';
import facebookLogo from '../../images/fb-social-icon.svg';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <>
            <div className="login_wrapper">
                <div className="login_container">
                    <div className="newloginBody">
                        <div className="userData">
                            <div className="header_section">
                                <h1>Sign in with Medizone</h1>
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
                            <div className="login-email">
                                <input
                                    type="text"
                                    name="email"
                                    className="login_email"
                                    placeholder="Email address"
                                    maxLength="100" />
                            </div>
                            <div className="login-pwd">
                                <input type="password"
                                    name="password"
                                    className="login_password"
                                    placeholder="Password"
                                    maxLength="100" />
                                <span className="hide_pswd_icon" onClick="loginpasswordshowhide(this)"></span>

                            </div>
                            <div className="login_button_block">

                                <button className="login_button">Sign in</button>

                            </div>
                            <div className="forget_pswd">
                                <Link to="/forgotPassword">Forgot your password ?</Link>
                            </div>
                        </div>
                        <div className="newregister_content">
                    
                    <h2>New to Medizone? <Link to="/signup">
                    <span>Sign Up</span>
                    </Link></h2>
                    
                </div>

                    </div>
                </div>
               
            </div>
            <div className="ai-gradient"></div>
        </>
    )
}

export default Login