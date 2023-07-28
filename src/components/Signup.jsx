import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here, you can add your login logic and make API calls to authenticate the user
        // Save the user data to local storage
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Thank for regitering with Medizone');
        navigate('/login')
    };
    return (
        <div>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <h2>Signup to Medizone</h2>

                    <input type="text" id="name" placeholder='Enter Full Name' name="name" value={name} onChange={handleNameChange} required />
                    <input type="email" id="email" placeholder='Enter Email' name="email" value={email} onChange={handleEmailChange} required />
                    <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={handlePasswordChange} required />
                    <button type="submit">Signup</button>
                    <div className='sign'>
                        <Link to="/login"><p>Already have Account? Login</p></Link>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default Signup