import React from 'react'
// import medicineContext from '../context/medicines/medicineContext';

const Medicines = ({medicine, addToCart}) => {
   
    const { name, price, img } = medicine;

    return (
        <>
                    <div className="med-item jc-center ai-center d-flex  fd-column m-10">
                        <img src={img} alt="" className='m-5'/>
                        <h2 className='m-5'>{name}</h2>
                        <h4 className='m-5'>&#8377; {price}</h4>
                        <button className='m-5 p-10 ' onClick={()=> {addToCart(medicine)}} >Add to cart</button>
                    </div>
                
        </>
    )
}

export default Medicines