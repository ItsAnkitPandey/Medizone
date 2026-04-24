import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { orderAPI, cartAPI } from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import './checkout.css'

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { clearCart, fetchCart } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    cn: '',
    selection: '',
    houseadd: '',
    apartment: '',
    postcodecity: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    fname: '',
    lname: '',
    selection: '',
    houseadd: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    paymentOption: '',
  });
  const [paymentOption, setPaymentOption] = useState('');

  // Check form completion and update active step


  // Update progress when form data changes
  useEffect(() => {
     const checkFormProgress = () => {
    const hasPersonalInfo = formData.fname && formData.lname;
    const hasAddress = formData.selection !== 'select' && formData.houseadd && formData.city && formData.state && formData.postcode;
    const hasContact = formData.phone && formData.email;
    
    if (paymentOption) {
      setActiveStep(3);
    } else if (hasPersonalInfo && hasAddress && hasContact) {
      setActiveStep(2);
    } else {
      setActiveStep(1);
    }
  };
  checkFormProgress();
  }, [formData, paymentOption]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation here
    const errors = {};
    if (formData.fname.trim() === '') {
      errors.fname = 'First Name is required';
    }
    if (formData.lname.trim() === '') {
      errors.lname = 'Last Name is required';
    }
    if (formData.selection === 'select') {
      errors.selection = 'Please select a country';
    }
    if (formData.houseadd.trim() === '') {
      errors.houseadd = 'Street Address is required';
    }
    if (formData.city.trim() === '') {
      errors.city = 'Town / City is required';
    }
    if (formData.state.trim() === '') {
      errors.state = 'State / County is required';
    }
    if (formData.postcode.trim() === '') {
      errors.postcode = 'Postcode / ZIP is required';
    }
    if (formData.phone.trim() === '') {
      errors.phone = 'Phone is required';
    }
    if (formData.email.trim() === '') {
      errors.email = 'Email Address is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    // Check if the payment option is selected
    if (paymentOption === '') {
      errors.paymentOption = 'Please select a payment option';
    }
    
    // If there are errors, set them in the state and prevent navigation
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      enqueueSnackbar('Please fill all required fields', { variant: 'error' });
      return;
    }

    // No errors, create order
    setLoading(true);
    try {
      const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
      const tax = subtotal * 0.18;
      const totalAmount = subtotal + tax;

      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          id: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: {
          name: `${formData.fname} ${formData.lname}`,
          street: formData.houseadd,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postcode,
          country: formData.selection,
          phoneNumber: formData.phone,
        },
        paymentMode: paymentOption === 'cd' ? 'COD' : 'CARD',
        totalAmount: totalAmount,
        subtotal: subtotal,
        tax: tax
      };

      const response = await orderAPI.createOrder(orderData);
      
      if (response.data.success) {
        enqueueSnackbar('Order placed successfully!', { variant: 'success' });
        
        // Clear cart from backend
        try {
          await cartAPI.clearCart();
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
        
        // Clear cart from frontend context and localStorage
        clearCart();
        localStorage.removeItem('cart');
        
        // Navigate to thank you page with order details
        navigate('/thankyou', { 
          state: { 
            order: response.data.order,
            orderNumber: response.data.order._id 
          } 
        });
      }
    } catch (error) {
      console.error('Order creation error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  
  return (
    <div className="checkout-container">
      <div className="checkout-progress">
        <div className={`progress-step ${activeStep >= 1 ? 'active' : ''} ${activeStep > 1 ? 'completed' : ''}`}>
          <div className="step-circle">
            {activeStep > 1 ? <i className="fa-solid fa-check"></i> : '1'}
          </div>
          <span>Shipping Details</span>
        </div>
        <div className={`progress-line ${activeStep > 1 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 2 ? 'active' : ''} ${activeStep > 2 ? 'completed' : ''}`}>
          <div className="step-circle">
            {activeStep > 2 ? <i className="fa-solid fa-check"></i> : '2'}
          </div>
          <span>Order Review</span>
        </div>
        <div className={`progress-line ${activeStep > 2 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <span>Payment</span>
        </div>
      </div>
      
      <div className="title">
        <i className="fa-solid fa-clipboard-list"></i>
        <h2>Product Order Form</h2>
      </div>
      
      <div className="checkout-d-flex">
        <form action="" method="">
          <div className="form-section">
            <h3 className="section-title">
              <i className="fa-solid fa-user"></i>
              Personal Information
            </h3>
            <div className="form-row">
              <label className="form-field">
                <span className="field-label">First Name <span className="required">*</span></span>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input type="text" name="fname" placeholder="Enter your first name" value={formData.fname} onChange={(e) => setFormData({ ...formData, fname: e.target.value })} className={formErrors.fname ? 'error-input' : ''} />
                </div>
                {formErrors.fname && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.fname}</span>}
              </label>
              <label className="form-field">
                <span className="field-label">Last Name <span className="required">*</span></span>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input type="text" name="lname" placeholder="Enter your last name" value={formData.lname} onChange={(e) => setFormData({ ...formData, lname: e.target.value })} className={formErrors.lname ? 'error-input' : ''} />
                </div>
                {formErrors.lname && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.lname}</span>}
              </label>
            </div>
            <label className="form-field">
              <span className="field-label">Medical Store Name (Optional)</span>
              <div className="input-wrapper">
                <i className="fa-solid fa-store input-icon"></i>
                <input type="text" name="cn" placeholder="Enter store name if applicable" />
              </div>
            </label>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fa-solid fa-location-dot"></i>
              Shipping Address
            </h3>
            <label className="form-field">
              <span className="field-label">Country <span className="required">*</span></span>
              <div className="input-wrapper">
                <i className="fa-solid fa-globe input-icon"></i>
                <select name="selection" value={formData.selection} onChange={(e) => setFormData({ ...formData, selection: e.target.value })} className={formErrors.selection ? 'error-input' : ''}>
              <option value="select">Select a country...</option>
              <option value="IND">India</option>
              <option value="USA">United States</option>
              <option value="GBR">United Kingdom</option>
              <option value="CAN">Canada</option>
              <option value="AUS">Australia</option>
                </select>
              </div>
              {formErrors.selection && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.selection}</span>}
            </label>
            <label className="form-field">
              <span className="field-label">Street Address <span className="required">*</span></span>
              <div className="input-wrapper">
                <i className="fa-solid fa-house input-icon"></i>
                <input type="text" name="houseadd" placeholder="House number and street name" value={formData.houseadd} onChange={(e) => setFormData({ ...formData, houseadd: e.target.value })} className={formErrors.houseadd ? 'error-input' : ''} />
              </div>
              {formErrors.houseadd && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.houseadd}</span>}
            </label>
            <label className="form-field">
              <span className="field-label">Apartment, Suite, Unit (Optional)</span>
              <div className="input-wrapper">
                <i className="fa-solid fa-building input-icon"></i>
                <input type="text" name="apartment" placeholder="Apartment, suite, unit etc." value={formData.apartment} onChange={(e) => setFormData({ ...formData, apartment: e.target.value })} />
              </div>
            </label>
            <div className="form-row">
              <label className="form-field">
                <span className="field-label">Town / City <span className="required">*</span></span>
                <div className="input-wrapper">
                  <i className="fa-solid fa-city input-icon"></i>
                  <input type="text" name="city" placeholder="Enter city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={formErrors.city ? 'error-input' : ''} />
                </div>
                {formErrors.city && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.city}</span>}
              </label>
              <label className="form-field">
                <span className="field-label">State / County <span className="required">*</span></span>
                <div className="input-wrapper">
                  <i className="fa-solid fa-map input-icon"></i>
                  <input type="text" name="state" placeholder="Enter state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={formErrors.state ? 'error-input' : ''} />
                </div>
                {formErrors.state && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.state}</span>}
              </label>
            </div>
            <label className="form-field">
              <span className="field-label">Postcode / ZIP <span className="required">*</span></span>
              <div className="input-wrapper">
                <i className="fa-solid fa-map-pin input-icon"></i>
                <input type="text" name="postcode" placeholder="Enter postcode" value={formData.postcode} onChange={(e) => setFormData({ ...formData, postcode: e.target.value })} className={formErrors.postcode ? 'error-input' : ''} />
              </div>
              {formErrors.postcode && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.postcode}</span>}
            </label>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fa-solid fa-address-book"></i>
              Contact Information
            </h3>
            <label className="form-field">
              <span className="field-label">Phone <span className="required">*</span></span>
              <div className="input-wrapper">
                <i className="fa-solid fa-phone input-icon"></i>
                <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={formErrors.phone ? 'error-input' : ''} />
              </div>
              {formErrors.phone && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.phone}</span>}
            </label>
            <label className="form-field">
              <span className="field-label">Email Address <span className="required">*</span></span>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={formErrors.email ? 'error-input' : ''} />
              </div>
              {formErrors.email && <span className="error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.email}</span>}
            </label>
          </div>
        </form>
        
        <div className="Yorder">
          <h3 className="order-title">
            <i className="fa-solid fa-shopping-cart"></i>
            Your Order Summary
          </h3>
          <div className="check-table">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Product Details</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td><b>{item.name}</b> <span className="quantity-badge">x{item.quantity}</span></td>
                      <td className="item-price">₹{item.quantity * item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="order-subtotal">
                  <td>Subtotal</td>
                  <td>₹{subtotal.toFixed(2)}</td>
                </tr>
                <tr className="order-tax">
                  <td>GST (18%)</td>
                  <td>₹{(subtotal * 18 / 100).toFixed(2)}</td>
                </tr>
                <tr className="order-shipping">
                  <td><i className="fa-solid fa-truck"></i> Shipping</td>
                  <td className="free-shipping">Free</td>
                </tr>
                <tr className="order-total">
                  <td><b>Total Amount</b></td>
                  <td><b>₹{(subtotal + (subtotal * 18 / 100)).toFixed(2)}</b></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="payment-section">
            <h4 className="payment-title">
              <i className="fa-solid fa-credit-card"></i>
              Payment Method
            </h4>
            <label className="payment-option">
              <input type="radio" name="payment" value="cd" checked={paymentOption === 'cd'}
              onChange={(e) => setPaymentOption(e.target.value)} />
              <div className="payment-content">
                <i className="fa-solid fa-money-bill-wave"></i>
                <span>Cash on Delivery</span>
              </div>
              <i className="fa-solid fa-check-circle check-icon"></i>
            </label>
            {formErrors.paymentOption && <span className="error payment-error"><i className="fa-solid fa-circle-exclamation"></i> {formErrors.paymentOption}</span>}
          </div>
          
          <button type="submit" onClick={handleSubmit} className="place-order-btn" disabled={loading}>
            <i className={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-lock"}></i>
            {loading ? 'Processing Order...' : 'Place Order Securely'}
          </button>
          <p className="secure-note">
            <i className="fa-solid fa-shield-halved"></i>
            Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
