import React, { useRef, useState } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import { validateLoginForm, sanitizeInput } from '../../utils/validation';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const eyeColor = useRef(null);
    const passwordInput = useRef(null);
    const emailInput = useRef(null);

    // Get the redirect path if user was redirected from a protected route
    const from = location.state?.from?.pathname || '/';

    const loginPasswordShowHide = () => {
        setShowPassword(!showPassword);

        const isPassword = passwordInput.current.type === 'password';
        passwordInput.current.type = isPassword ? 'text' : 'password';
        if (showPassword) {
            eyeColor.current.style.color = 'Gray';
        } else {
            eyeColor.current.style.color = '#2e7d32';
        }
    };

    const handleLogin = async (e) => {
        e?.preventDefault();

        setErrors({});

        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);

        // Validate form
        const validation = validateLoginForm(sanitizedEmail, sanitizedPassword);
        if (!validation.isValid) {
            setErrors(validation.errors);
            // Focus on first error field
            if (validation.errors.email) {
                emailInput.current?.focus();
            } else if (validation.errors.password) {
                passwordInput.current?.focus();
            }
            return;
        }

        const userdata = {
            email: sanitizedEmail,
            password: sanitizedPassword,
        };

        setLoading(true);

        try {
            const response = await authAPI.login(userdata);
            const { token, user } = response.data;

            // Store auth data using context
            login(user, token);

            enqueueSnackbar('Logged in successfully!', { variant: 'success' });
            
            // Redirect to the page user was trying to access or home
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = 
                error.response?.data?.message || 
                error.response?.data?.error ||
                'Login failed. Please try again.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await authAPI.googleAuth(credentialResponse.credential);
            const { token, user } = response.data;

            login(user, token);
            enqueueSnackbar('Logged in with Google successfully!', { variant: 'success' });
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google login error:', error);
            const errorMessage = 
                error.response?.data?.message || 
                'Google login failed. Please try again.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleGoogleError = () => {
        enqueueSnackbar('Google login failed. Please try again.', { variant: 'error' });
    };

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
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        useOneTap
                                        text="signin_with"
                                        shape="rectangular"
                                        theme="outline"
                                        size="large"
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="social_login_division">
                                <hr className="social_login_division_hr" />
                                <span style={{ color: "#B4B4B4" }}>or</span>
                                <hr className="social_login_division_hr" />
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="login-email">
                                    <input
                                        type="text"
                                        name="email"
                                        className="login_email"
                                        placeholder="Email address"
                                        maxLength="100"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        ref={emailInput}
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
                                        id="passwordField"
                                        className="login_password"
                                        placeholder="Password"
                                        maxLength="100"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        ref={passwordInput}
                                        autoComplete="current-password"
                                        disabled={loading}
                                    />
                                    <i
                                        className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} hide_pswd_icon`}
                                        onClick={loginPasswordShowHide}
                                        ref={eyeColor}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: '14px' }}>
                                    {errors.password || ''}
                                </span>

                                <div className="login_button_block">
                                    <button
                                        type="submit"
                                        className="login_button"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <i className="fa-solid fa-circle-notch fa-spin" />
                                        ) : (
                                            'Login'
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="forget_pswd">
                                <Link to="/forgotPassword">Forgot your password?</Link>
                            </div>
                        </div>
                        <div className="newregister_content">
                            <h2>
                                New to Medizone?{' '}
                                <Link to="/signup">
                                    <span>Sign Up</span>
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

export default Login;