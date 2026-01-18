import React from 'react'
import './HealthTips.css'

const HealthTips = () => {
    return (
        <>
            <section className="health-tips-section">
                <div className="health-tips-container">
                    <div className="health-section-header">
                        <h2>Health Tips & Wellness</h2>
                        <p>Stay healthy with expert advice</p>
                    </div>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400" alt="Stay Hydrated" />
                            <div className="tip-content">
                                <h3>Stay Hydrated</h3>
                                <p>Drink at least 8 glasses of water daily for optimal health</p>
                            </div>
                        </div>
                        <div className="tip-card">
                            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" alt="Regular Exercise" />
                            <div className="tip-content">
                                <h3>Regular Exercise</h3>
                                <p>30 minutes of daily exercise can improve your overall well-being</p>
                            </div>
                        </div>
                        <div className="tip-card">
                            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400" alt="Balanced Diet" />
                            <div className="tip-content">
                                <h3>Balanced Diet</h3>
                                <p>Include fruits, vegetables, and proteins in your daily meals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HealthTips