import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CartItem from '../../components/cart/CartItem'
import TotalPrice from '../../components/cart/TotalPrice'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import './Cart.css'

const Cart = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    
    const handleCheckout = async () => {
        try {
            setIsProcessing(true);
            setError(null);
            // Simulate checkout processing
            await new Promise(resolve => setTimeout(resolve, 500));
            navigate('/checkout');
        } catch (err) {
            setError('Failed to proceed to checkout. Please try again.');
            console.error('Checkout error:', err);
        } finally {
            setIsProcessing(false);
        }
    }
    
    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-main-title">Shopping Cart</h1>
                
                {error && (
                    <div className="cart-error" role="alert" aria-live="assertive">
                        <i className="fa-solid fa-exclamation-circle"></i>
                        <span>{error}</span>
                        <button 
                            onClick={() => setError(null)}
                            aria-label="Dismiss error"
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                )}
                
                {cart.length === 0 ? (
                    <div className="empty-cart" role="status">
                        <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                        <h2>Your Cart is Empty</h2>
                        <p>Add some medicines to get started!</p>
                        <motion.button 
                            whileTap={{ scale: 0.95 }} 
                            className="continue-shopping-btn"
                            onClick={() => navigate('/allmedicines')}
                            aria-label="Continue shopping for medicines"
                        >
                            Continue Shopping
                        </motion.button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            <div className="product-header" role="row">
                                <h5 className="product-title" role="columnheader">PRODUCT</h5>
                                <h5 className="price-cart" role="columnheader">PRICE</h5>
                                <h5 className="quantity" role="columnheader">QUANTITY</h5>
                                <h5 className="total" role="columnheader">TOTAL</h5>
                            </div>
                            <div className="products" role="list" aria-label="Cart items">
                                {cart.map((medicine) => {
                                    return <CartItem key={medicine.id} {...medicine} />
                                })}
                            </div>
                        </div>
                        
                        <aside className="cart-summary" aria-label="Order summary">
                            <h2 className="summary-title">Order Summary</h2>
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                                    <span aria-label="Subtotal price">₹{(cart.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Delivery Charges</span>
                                    <span className="free-delivery" aria-label="Free delivery">FREE</span>
                                </div>
                                <div className="summary-divider" role="separator"></div>
                                <TotalPrice cart={cart} />
                            </div>
                            <motion.button 
                                whileTap={{ scale: 0.95 }} 
                                whileHover={{ scale: 1.02 }}
                                className="proceed" 
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                aria-label="Proceed to checkout"
                                aria-busy={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Processing...
                                    </>
                                ) : (
                                    'Proceed To Checkout'
                                )}
                            </motion.button>
                            <motion.button 
                                whileTap={{ scale: 0.95 }} 
                                className="continue-shopping"
                                onClick={() => navigate('/allmedicines')}
                                disabled={isProcessing}
                                aria-label="Continue shopping for more items"
                            >
                                Continue Shopping
                            </motion.button>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
