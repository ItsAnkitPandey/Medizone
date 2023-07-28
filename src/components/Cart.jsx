import React from 'react'
import { motion } from 'framer-motion'
import CartItem from './CartItem'
import TotalPrice from './TotalPrice'

const Cart = ({ cart, setCart }) => {
    return (
        <div>
            <div className="product-container">
                <div className="product-header">
                    <h5 className="product-title">PRODUCT</h5>
                    <h5 className="price-cart">PRICE</h5>
                    <h5 className="quantity">QUANTITY</h5>
                    <h5 className="total">TOTAL</h5>
                </div>
                <>
                    <div className="products">
                        {cart.map((medicine) => {
                            return <CartItem key={medicine.id} {...medicine} cart={cart} setCart={setCart} />
                        })}
                    </div>
                    <TotalPrice cart={cart} />
                <motion.button whileTap={{ scale: 0.75 }} className="proceed"  >Proceed To Checkout</motion.button>
                </>
                
            </div>
        </div>

    )
}

export default Cart
