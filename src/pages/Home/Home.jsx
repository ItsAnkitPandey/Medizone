import React from 'react'
import Medicines from '../../components/Medicines'
import { products } from '../../utils/Products'
import ProductCarousel from '../../components/Carousel/ProductCarousel'
import { Link } from 'react-router-dom'
import Category from '../../components/Category'

const Home = ({ addToCart, loading }) => {

    return (
        <div>
            <div>
                <ProductCarousel />
                <Category />
                <div className="med-container">
                    <div className="med-heading ">
                        <h2>Medicines</h2>
                        <div className='line'></div>
                    </div>
                    <div className="medicines d-flex  jc-center hide-for-mobile">
                        {products.slice(0, 10).map((medicine) => {
                            return <Medicines key={medicine.id} {...medicine} medicine={medicine} addToCart={addToCart} view='desktop' />
                        })}
                    </div>
                    <div className="mob-medicines d-flex  jc-center hide-for-desktop">
                        {products.slice(0, 10).map((medicine) => {
                            return <Medicines key={medicine.id} {...medicine} medicine={medicine} addToCart={addToCart} view='mobile' />
                        })}
                    </div>
                    <div className='all-meds'>
                        <Link to='/allmedicines'>All Medicines</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
