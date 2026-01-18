import React, { useState } from 'react';
import '../Login/Login.css';
import googleLogo from '../../images/google-social-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { authAPI } from '../../services/api';
import { validateSignupForm, sanitizeInput, getPasswordStrength } from '../../utils/validation';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(null);
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
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        // Update password strength indicator
        if (newPassword) {
            setPasswordStrength(getPasswordStrength(newPassword));
        } else {
            setPasswordStrength(null);
        }
    };

    const register = async (e) => {
        e?.preventDefault();

        // Clear previous errors
        setErrors({});

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);

        // Validate form
        const validation = validateSignupForm(sanitizedName, sanitizedEmail, sanitizedPassword);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        const userData = {
            name: sanitizedName,
            email: sanitizedEmail,
            password: sanitizedPassword,
        };

        setLoading(true);

        try {
            await authAPI.signup(userData);
            enqueueSnackbar('Account created successfully! Please login.', { variant: 'success' });
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            const errorMessage = 
                error.response?.data?.error || 
                error.response?.data?.message ||
                'Registration failed. Please try again.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            register();
        }
    };

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
                                    <a href='/' className="googleLogin" disabled>
                                        Google
                                        <img src={googleLogo} alt="Google" className="login-social-icons" />
                                    </a>
                                </div>
                            </div>
                            <div className="social_login_division">
                                <hr className="social_login_division_hr" />
                                <span style={{ color: "#B4B4B4" }}>or</span>
                                <hr className="social_login_division_hr" />
                            </div>
                            <form onSubmit={register}>
                                <div className="login-name">
                                    <input
                                        type="text"
                                        name="username"
                                        className="login_name"
                                        placeholder="Enter Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        maxLength="100"
                                        autoComplete="name"
                                        disabled={loading}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: '14px' }}>
                                    {errors.name || ''}
                                </span>

                                <div className="login-email">
                                    <input
                                        type="email"
                                        name="email"
                                        className="login_email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        maxLength="100"
                                        autoComplete="email"
                                        disabled={loading}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: '14px' }}>
                                    {errors.email || ''}
                                </span>

                                <div className="login-pwd">
                                    <input
                                        type="password"
                                        name="password"
                                        className="login_password"
                                        id="passwordField"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyPress={handleKeyPress}
                                        maxLength="100"
                                        autoComplete="new-password"
                                        disabled={loading}
                                    />
                                    <i
                                        className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} hide_pswd_icon`}
                                        onClick={signupPasswordShowHide}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: '14px' }}>
                                    {errors.password || ''}
                                </span>
                                
                                {passwordStrength && (
                                    <div style={{ marginTop: '8px', fontSize: '13px' }}>
                                        <span>Password strength: </span>
                                        <span style={{ color: passwordStrength.color, fontWeight: 'bold' }}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}

                                <div className="login_button_block">
                                    <button
                                        type="submit"
                                        className="login_button"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <i className="fa-solid fa-circle-notch fa-spin" />
                                        ) : (
                                            'Sign up'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="newregister_content">
                            <h2>
                                Already have an account?{' '}
                                <Link to="/login">
                                    <span>Log In</span>
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ai-gradient" />
        </>
    );
};

export default Signup;