import React, { useState } from 'react'
import googleLogo from '../../images/google-social-icon.svg';
import facebookLogo from '../../images/fb-social-icon.svg';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const loginPasswordShowHide = () => {
        setShowPassword(!showPassword);
        let eyeColor = document.querySelector('.hide_pswd_icon');
        let passwordInput = document.getElementById('passwordField');
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        if (showPassword) {
            eyeColor.style.color = 'Gray';
        } else {
            eyeColor.style.color = '#2e7d32';
        }
    }

    const login = () => {
        if (email === '') {
            setEmailErr(true);
            setPassErr(false);
            return;
        }
        else if (password === '') {
            setEmailErr(false);
            setPassErr(true);
            return;
        } else {
            setEmailErr(false);
            setPassErr(false);
            const userdata = {
                email,
                password
            }
            setLoading(true);
            axios
                .post(`${process.env.REACT_APP_API_KEY}/user/login`, userdata)
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar('Logged in Successfully.', { variant: 'success' });
                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    enqueueSnackbar(error.response.data.message, { variant: 'error' })
                })
        }

    }

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
                                    maxLength="100"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>
                            <span style={{ color: 'red' }}>{emailErr ? 'Please enter email.' : ''}</span>
                            <div className="login-pwd">
                                <input type="password"
                                    name="password"
                                    id='passwordField'
                                    className="login_password"
                                    placeholder="Password"
                                    maxLength="100"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} hide_pswd_icon`} onClick={loginPasswordShowHide}></i>

                            </div>
                            <span style={{ color: 'red' }}>{passErr ? 'Please enter password.' : ''}</span>
                            <div className="login_button_block">

                                {!loading ?
                                    <button className="login_button" onClick={login}>Login</button>
                                    :
                                    <button disabled className="login_button" ><i class="fa-solid fa-circle-notch fa-spin"></i></button>

                                }

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