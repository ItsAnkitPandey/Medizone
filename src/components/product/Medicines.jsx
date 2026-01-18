import React from 'react'
import Button from '../common/Button/Button';
// import medicineContext from '../context/medicines/medicineContext';

const Medicines = ({medicine, addToCart,view}) => {
   
    const { name, price, img } = medicine;

    return (
        <>
                    <div className={`${view === 'desktop' ? 'med-item' : 'mob-med-item' } jc-center ai-center d-flex  fd-column m-10 `}>
                        <div className="med-image-wrapper">
                            <img src={img} alt={name} className='m-5'/>
                            <div className="med-badge">Popular</div>
                        </div>
                        <div className="med-details">
                            <h3 className='med-name'>{name}</h3>
                            <div className="med-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <span className="rating-count">(4.0)</span>
                            </div>
                            <div className="med-price-section">
                                <h4 className='med-price m-5'>&#8377; {price}</h4>
                                <span className="med-discount">20% off</span>
                            </div>
                            <p className="med-description">Trusted quality medicine</p>
                        </div>
                       <Button name={'Add to cart'} onClick={() => addToCart(medicine)} />
                    </div>
                
        </>
    )
}

export default Medicines