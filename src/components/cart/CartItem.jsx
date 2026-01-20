import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useCart } from '../../contexts/CartContext'

const CartItem = ({ name, img, quantity, price, id, stock }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { removeFromCart, updateCartItem } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleRemove = async () => {
    setUpdating(true);
    await removeFromCart(id);
    setUpdating(false);
  };

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    if (stock && newQuantity > stock) {
      enqueueSnackbar(`Only ${stock} units available in stock`, { variant: 'warning' });
      return;
    }

    setUpdating(true);
    await updateCartItem(id, newQuantity);
    setUpdating(false);
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;
    
    const newQuantity = quantity - 1;
    setUpdating(true);
    await updateCartItem(id, newQuantity);
    setUpdating(false);
  };
  return (
    <div className="cart-item-row" style={{ opacity: updating ? 0.6 : 1, pointerEvents: updating ? 'none' : 'auto' }}>
      <div className="product">
        <i className="fa-regular fa-trash-can" onClick={handleRemove} style={{ cursor: 'pointer' }}></i>
        <img className="cart-img" src={img} alt="medicine" />
        <span className='product_name'>{name}</span>
      </div>
      <div className="price-cart">&#8377;{price}</div>
      <div className="quantity">
        <i className="fa-solid fa-minus" onClick={handleDecrease} style={{ cursor: quantity > 1 ? 'pointer' : 'not-allowed', opacity: quantity > 1 ? 1 : 0.5 }}></i> 
        <span>{quantity}</span>
        <i className="fa-solid fa-plus" onClick={handleIncrease} style={{ cursor: 'pointer' }}></i> 
      </div>
      <div className="total">
        &#8377;{(quantity * price).toFixed(2)}
      </div>
    </div>
  )
}

export default CartItem
