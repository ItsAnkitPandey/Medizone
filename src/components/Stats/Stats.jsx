import React from 'react'
import './Stats.css';


const Stats = () => {
       
  return (
    <>
     <section className="stats-section">
                <div className="stats-container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>50,000+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                            <h3>10,000+</h3>
                            <p>Medicines Available</p>
                        </div>
                        <div className="stat-item">
                            <h3>24/7</h3>
                            <p>Customer Support</p>
                        </div>
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>Cities Covered</p>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default Stats