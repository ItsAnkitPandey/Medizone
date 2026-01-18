import React from 'react'
import './Services.css'

const Services = () => {
    return (
        <>
            <section className="services-section">
                <div className="services-container">
                    <div className="section-header">
                        <h2>Why Choose Medizone?</h2>
                        <p>Your trusted healthcare partner</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <i className="fa-solid fa-truck-fast fa-3x"></i>
                            <h3>Fast Delivery</h3>
                            <p>Get your medicines delivered within 24 hours across India</p>
                        </div>
                        <div className="service-card">
                            <i className="fa-solid fa-shield-halved fa-3x"></i>
                            <h3>Authentic Products</h3>
                            <p>100% genuine medicines from verified manufacturers</p>
                        </div>
                        <div className="service-card">
                            <i className="fa-solid fa-user-doctor fa-3x"></i>
                            <h3>Expert Consultation</h3>
                            <p>Get advice from qualified pharmacists and healthcare experts</p>
                        </div>
                        <div className="service-card">
                            <i className="fa-solid fa-lock fa-3x"></i>
                            <h3>Secure Payment</h3>
                            <p>Safe and secure payment options with data protection</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services