import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer/Footer';
import AllMedicines from './components/AllMedicines';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { useState, useEffect } from 'react'
import Loader from './components/Loader/Loader';
// import Login from './components/Login';
import Popup from './components/Popup';
import Checkout from './components/Checkout';
import Thankyou from './components/Thankyou';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn'); // Remove the login status from local storage
  };


  const addToCart = (data) => {
    const existingItem = cart.find((item) => item.id === data.id);

    if (existingItem) {
      // If the item exists, update the quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart((prevCart) => [...prevCart, { ...data, quantity: 1 }]);
    }

    localStorage.setItem('cart', JSON.stringify(cart));   // Adding items to local storage. It can helps in when we refresh page the items will show there as it it.
    // alert("Added to cart");
    setShowPopup(true);
  }


  useEffect(() => {
    // Retrieve the cart items from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    // Retrieve the login status from local storage
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
    // Hide the loader after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // setting custom css for chatbot - starts
    const updateStyle = ()=>{
      const dfMessenger = document.querySelector('df-messenger');
      const shadow = dfMessenger?.shadowRoot;
      const widgetIcon = shadow?.getElementById("widgetIcon");
      if (!widgetIcon) return;
        if(window.innerWidth > 769){
          widgetIcon.style.bottom = "0";
        }else{
          widgetIcon.style.bottom = "50px";
        }
    
  }

    const interval = setInterval(() => {
      const dfMessenger = document.querySelector('df-messenger');
      const shadow = dfMessenger?.shadowRoot;
      const widgetIcon = shadow?.getElementById("widgetIcon");
      console.log(widgetIcon);
      
      if (widgetIcon) {
        updateStyle();
        clearInterval(interval);
      }
    }, 100);

    //Reapply on resize
    window.addEventListener('resize', updateStyle);
    // setting custom css for chatbot - ends
    // Cleanup the timer when the component unmounts or when loading becomes false
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("resize", updateStyle)
    }
  }, []);




  return (
    <>
      {loading ? <Loader /> :
        <Router>
          <Navbar cart={cart} loggedIn={loggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route exact path="/" element={<Home addToCart={addToCart} loading={loading} />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/allmedicines" element={<AllMedicines addToCart={addToCart} />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route exact path="/login" element={<Login onLogin={handleLogin} />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/checkout" element={<Checkout cart={cart} />}></Route>
            <Route exact path="/thankyou" element={<Thankyou />}></Route>
            <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route  path="*" element={<PageNotFound/>}></Route>
          </Routes>
          <Footer />
          {showPopup && <Popup setShowPopup={setShowPopup} cart={cart} setCart={setCart} />}
        </Router>
      }
    </>
  );
}

export default App;
