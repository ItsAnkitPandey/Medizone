import React, { useState } from 'react'
import '../Login/Login.css'
import googleLogo from '../../images/google-social-icon.svg';
import facebookLogo from '../../images/fb-social-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();



    const signupPasswordShowHide = () => {
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

    const register = () => {
        if(name === ''){
            setNameErr(true);
            setEmailErr(false);
            setPassErr(false);
            return;
        }
        else if (email === '') {
            setEmailErr(true);
            setPassErr(false);
            setNameErr(false);
            return;
        }
        else if (password === '') {
            setEmailErr(false);
            setPassErr(true);
            setNameErr(false);
            return;
        } else {
            const userData = {
                email,
                name,
                password
            };
            setLoading(true);
            axios
                .post(`{process.env.REACT_APP_API_KEY}/user/signup`, userData)
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar('User Registered Successfully.', { variant: 'success' });
                    navigate('/login');
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    enqueueSnackbar(error.response.data.error, { variant: 'error' })
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
                                    onChange={(e) => setName(e.target.value)}
                                    maxlength="100" />
                            </div>
                            <span style={{color:'red'}}>{nameErr ? 'Please enter name.' : ''}</span>
                            <div className="login-email">
                                <input
                                    type="email"
                                    name="email"
                                    className="login_email"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxlength="100" />
                            </div>
                            <span style={{color:'red'}}>{emailErr ? 'Please enter email.' : ''}</span>
                            <div className="login-pwd">
                                <input type="password"
                                    name="password"
                                    className="login_password"
                                    id='passwordField'
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    maxlength="100" />
                                <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} hide_pswd_icon`} onClick={signupPasswordShowHide}></i>

                            </div>
                            <span style={{color:'red'}}>{passErr ? 'Please enter password.' : ''}</span>
                            <div className="login_button_block">
                                {!loading ?
                                    <button className="login_button" onClick={register}>Sign up</button>
                                    :
                                    <button disabled className="login_button"><i class="fa-solid fa-circle-notch fa-spin"></i></button>

                                }

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