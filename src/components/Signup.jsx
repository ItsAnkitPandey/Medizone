import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
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
            await axios.post("https://ed18-2401-4900-1f3d-9f41-3984-f344-1df4-6889.ngrok-free.app/api/SignUp",
                userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                }
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                })

            if (response?.status === 200) {
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