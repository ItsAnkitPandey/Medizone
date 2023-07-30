import React from 'react'
import { motion } from 'framer-motion'
import CartItem from './CartItem'
import TotalPrice from './TotalPrice'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart, setCart }) => {
    const navigate = useNavigate();
    const handleCheckout = ()=>{
        navigate('/checkout')
    }
    return (
        <div>
            <div className="product-container">
                <div className="product-header">
                    <h5 className="product-title">PRODUCT</h5>
                    <h5 className="price-cart">PRICE</h5>
                    <h5 className="quantity">QUANTITY</h5>
                    <h5 className="total">TOTAL</h5>
                </div>
                {cart.length === 0 ? (<h3>Cart is Empty</h3>) : (
                    <>
                        <div className="products">
                            {cart.map((medicine) => {
                                return <CartItem key={medicine.id} {...medicine} cart={cart} setCart={setCart} />
                            })}
                        </div>
                        <TotalPrice cart={cart} />
                        <motion.button whileTap={{ scale: 0.75 }} className="proceed" onClick={handleCheckout} >Proceed To Checkout</motion.button>
                    </>
                )}

            </div>
        </div>

    )
}

export default Cart
