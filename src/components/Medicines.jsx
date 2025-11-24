import React from 'react'
import Button from './Button/Button';
// import medicineContext from '../context/medicines/medicineContext';

const Medicines = ({medicine, addToCart,view}) => {
   
    const { name, price, img } = medicine;

    return (
        <>
                    <div className={`${view === 'desktop' ? 'med-item' : 'mob-med-item' } jc-center ai-center d-flex  fd-column m-10 `}>
                        <img src={img} alt="" className='m-5'/>
                        <h2 className='m-5'>{name}</h2>
                        <h4 className='m-5'>&#8377; {price}</h4>
                       <Button name={'Add to cart'} onClick={() => addToCart(medicine)} />
                    </div>
                
        </>
    )
}

export default Medicines