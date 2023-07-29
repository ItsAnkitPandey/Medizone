import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
    const naviagte = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === username && storedUser.password === password) {
            alert('Successfuly Logged In');
            setLoginError(false);
            onLogin()
            naviagte('/allmedicines')
        } else {
           setLoginError(true);
        }
        if (!storedUser || storedUser.email !== username){
            alert('Please Create A New Account')
        }
    };

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>
                <h2>Login to Medizone</h2>
                <input type="text" id="username" placeholder='Enter  Username or Email' name="username" value={username} onChange={handleUsernameChange} required />

                <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={handlePasswordChange} required />
                {loginError && <p style={{ color: 'red' }}>Invalid credentials. Please try again.</p>}

                <button type="submit">Login</button>
                <div className='sign'>
                    <Link to=""><p>Forgot Password?</p></Link>
                    <Link to="/signup"><p>Create New Account?</p></Link>
                </div>
            </form>


        </div>
    );
};

export default Login;
