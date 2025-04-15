import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'

const ForgotPassword = () => {
    let [isLinkSend, setIsLinkSend] = useState(false);
    useState(() => {
        setIsLinkSend(false);
    }, [])
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
                                        <div class="fpwd-email">
                                            <input
                                                type="text"
                                                name="email"
                                                class="fpwd_email"
                                                placeholder="Email address"
                                                maxlength="100" />
                                            <span className='email_icon'></span>
                                        </div>
                                        <div class="fpwd_button_block">
                                            <button class="fpwd_button">Submit</button>
                                        </div>
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