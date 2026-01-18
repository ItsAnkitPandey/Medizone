import React from 'react'
import Medicines from '../../components/product/Medicines'
import { products } from '../../utils/Products'
import ProductCarousel from '../../components/product/Carousel/ProductCarousel'
import Category from '../../components/product/Category'
import './Home.css'
import Services from '../../components/sections/Services/Services'
import HealthTips from '../../components/sections/HealthTipsSection/HealthTips'
// import Button from '../../components/common/Button/Button.jsx'
import { Link } from 'react-router-dom'
import Stats from '../../components/sections/Stats/Stats.jsx'
import ChatbotPromo from '../../components/chatbot/ChatbotPromo/ChatbotPromo.jsx'
import MainFeatures from '../../components/sections/MainFeatures/MainFeatures.jsx'

const Home = ({ addToCart, loading }) => {
    return (
        <div>
            <div>
                <ProductCarousel />
            </div>
            <MainFeatures />
            <Category />
            <Services/>

            <div className="med-container">
                <div className="med-heading">
                    <h2>Popular Medicines</h2>
                    <div className='line'></div>
                </div>
                <div className="medicines d-flex jc-center hide-for-mobile">
                    {products.slice(0, 10).map((medicine) => {
                        return <Medicines key={medicine.id} {...medicine} medicine={medicine} addToCart={addToCart} view='desktop' />
                    })}
                </div>
                <div className="mob-medicines d-flex jc-center hide-for-desktop">
                    {products.slice(0, 10).map((medicine) => {
                        return <Medicines key={medicine.id} {...medicine} medicine={medicine} addToCart={addToCart} view='mobile' />
                    })}
                </div>
                <div className='all-meds'>
                    <Link className='m-5 p-10 common-btn' to='/allmedicines'>View All</Link>
                </div>
            </div>

            {/* Health Tips Section */}
            <HealthTips/>

            {/* Statistics Section */}
           <Stats/>

            {/* AI Chatbot Promotion Section */}
          <ChatbotPromo />

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2>Stay Updated with Health News</h2>
                        <p>Subscribe to our newsletter for the latest health tips and medicine updates</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" />
                            <button type="submit">Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home