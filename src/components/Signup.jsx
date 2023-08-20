import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Url } from '../utils/Url';
import axios from 'axios';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            email: email,
            firstName: name,
            password: password
        };
        try {
            const response = await axios.post("https://cdde-2401-4900-1c3c-b4c8-e802-a2de-8a8-cede.ngrok-free.app/api/SignUp", userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            if (response?.status === 201) {
                alert('Thanks for Registering with Medizone');
                navigate('/login');
            } else {
                alert(response?.data?.message);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
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