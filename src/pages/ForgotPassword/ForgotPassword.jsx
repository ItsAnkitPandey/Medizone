import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
import { sanitizeInput, validateEmail } from '../../utils/validation'
import { useRef } from 'react'
import { useSnackbar } from 'notistack'
import { authAPI } from '../../services/api'


const ForgotPassword = () => {
    const [isLinkSend, setIsLinkSend] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    let emailRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedEmail = sanitizeInput(email);

        const validatedEmail = validateEmail(sanitizedEmail);
        if (!validatedEmail) {
            emailRef.current.focus();
            enqueueSnackbar('Please enter a valid email address.', { variant: 'error' });
            return;
        }
        
        setLoading(true);
        try {
            const response = await authAPI.forgotPassword(sanitizedEmail);
            enqueueSnackbar(response.data.message || 'Password reset link sent to your email.', { variant: 'success' });
            setIsLinkSend(true);
        } catch (error) {
            console.error('Error sending password reset link:', error);
            enqueueSnackbar(
                error.response?.data?.message || 'Failed to send password reset link.',
                { variant: 'error' }
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="fpwd_wrapper">
                <div className="fpwd_container">
                    <div className="newfpwdBody">
                        {
                            isLinkSend ?
                                (
                                    <div className="fpswdData">
                                        <div className="fpswd_header_section">
                                            <h1>You're almost there!</h1>
                                            <h2>We've emailed you a link to reset the password.
                                                Please check the spam or promotion folder,
                                                if you couldn't find it in your inbox.</h2>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className="fpswdData">
                                        <div className="fpswd_header_section">
                                            <h1>Forgot Password?</h1>
                                            <h2>No worried! Just tell the email address that you have registered with us.</h2>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="fpwd-email">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="fpwd_email"
                                                    value={email}
                                                    ref={emailRef}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="Email address"
                                                    maxLength="100"
                                                    disabled={loading}
                                                />
                                                <span className='email_icon'></span>
                                            </div>
                                            <div className="fpwd_button_block">
                                                <button 
                                                    type="submit" 
                                                    className="fpwd_button"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                                                        </>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )

                        }

                        <div class="fpwd_content">

                            <h2>Back to Login? <Link to="/login">
                                <span>Login</span>
                            </Link></h2>

                        </div>

                    </div>
                </div>

            </div>
            <div class="ai-gradient"></div>
        </>
    )
}

export default ForgotPassword