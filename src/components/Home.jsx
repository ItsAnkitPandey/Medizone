import React from 'react'
import Medicines from './Medicines'
import { products } from './Products'
import ProductCarousel from './ProductCarousel'
import { Link } from 'react-router-dom'

const Home = ({ addToCart, loading }) => {

    return (
        <div>
                <div> <ProductCarousel />
                    <div className="med-container">
                        <div className="med-heading ">
                            <h2>Medicines</h2>
                            <div className='line'></div>
                        </div>
                        <div className="medicines d-flex  jc-center">
                            {products.slice(0,10).map((medicine) => {
                                return <Medicines key={medicine.id} {...medicine} medicine={medicine} addToCart={addToCart} />
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
