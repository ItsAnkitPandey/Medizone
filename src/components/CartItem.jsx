import React from 'react'

const CartItem = ({ name, img, quantity, price, id, cart, setCart }) => {
  const handleRemove = () => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncrease = () => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrease = () => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  return (
    <>
      <div className="product">
      <i class="fa-regular fa-trash-can" onClick={handleRemove}></i>
        <img className="cart-img" src={img} alt="medicine" />
        <span className='product_name'>{name}</span>
      </div>
      <div className="price-cart">&#8377;{price}</div>
      <div className="quantity">
      <i class="fa-solid fa-minus" onClick={handleDecrease}></i> 
        <span>{quantity}</span>
        <i class="fa-solid fa-plus" onClick={handleIncrease} ></i> 
      </div>
      <div className="total">
        &#8377;{quantity * price}
      </div>
    </>
  )
}

export default CartItem
