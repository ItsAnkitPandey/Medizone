import React from 'react'
import './MainFeatures.css'

const MainFeatures = () => {
    return (
        <section className="main-features-section">
            <div className="main-features-container">
                <div className="features-header">
                    <h2>Innovative Healthcare Solutions</h2>
                    <p>Experience the future of online pharmacy with our cutting-edge features</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-camera fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>Prescription Scanner</h3>
                            <p>Simply snap a photo of your prescription and our AI will automatically identify and add medicines to your cart</p>
                            <button className="feature-btn">Try Now</button>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-robot fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>AI Health Assistant</h3>
                            <p>Get instant answers to your health queries with our intelligent chatbot available 24/7</p>
                            <button className="feature-btn">Chat Now</button>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-prescription-bottle-medical fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>Medicine Reminder</h3>
                            <p>Never miss a dose with smart medication reminders sent directly to your phone</p>
                            <button className="feature-btn">Set Reminder</button>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-video fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>Virtual Consultation</h3>
                            <p>Connect with certified doctors online for instant medical advice and e-prescriptions</p>
                            <button className="feature-btn">Book Now</button>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-clock-rotate-left fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>Easy Reorder</h3>
                            <p>Quickly reorder your regular medicines with just one click from your order history</p>
                            <button className="feature-btn">View History</button>
                        </div>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-heart-pulse fa-2x"></i>
                        </div>
                        <div className="feature-content">
                            <h3>Health Records</h3>
                            <p>Store and manage all your medical records, prescriptions, and reports securely in one place</p>
                            <button className="feature-btn">Access Records</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainFeatures
