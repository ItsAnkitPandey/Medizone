import React from 'react'


const TotalPrice = ({cart}) => {
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    
        <div className="grandTotalContainer">
			<h4 className="grandTotalTitle">TOTAL</h4>
			<h4 className="grandTotal">₹{(totalPrice).toFixed(2)}</h4>
		</div>
    
  )
}

export default TotalPrice