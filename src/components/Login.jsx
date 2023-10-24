import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner/Spinner';
import { useSnackbar } from 'notistack';

const Login = ({ onLogin }) => {
    const naviagte = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        }
        setLoading(true)
        axios
            .post('http://localhost:5555/user/login', data)
            .then((res) => {
                if (res.data.success === true) {
                    onLogin();
                    localStorage.setItem('user', JSON.stringify({ name: res.data.username }));
                    naviagte('/cart')
                    setLoading(false);
                    enqueueSnackbar('Successfully logged in', {variant:'success'})
                }
               
            })
            .catch((error) => {
                if (error.response) {
                  if (error.response.status === 404) {
                    enqueueSnackbar('User Not Found!', { variant: 'warning' });
                  } else if (error.response.status === 401) {
                    enqueueSnackbar('Incorrect Password', { variant: 'error' });
                  } 
                } else {
                  // Handle non-HTTP errors here, if needed
                  enqueueSnackbar('An error occurred', { variant: 'error' });
                }
                
                setLoginError(true);
                setLoading(false);
                console.log(error.response);
              });
    }

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>
                <h2>Login to Medizone</h2>
                <input type="email" id="username" placeholder='Enter  Username or Email' name="email" value={email} onChange={handleUsernameChange} required />

                <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={handlePasswordChange} minLength={5} required />
                {loginError && <p style={{ color: 'red' }}>Invalid credentials. Please try again.</p>}

                {loading ? (<Spinner />) : (<button type="submit">Login</button>)}
                <div className='sign'>
                    <Link to=""><p>Forgot Password?</p></Link>
                    <Link to="/signup"><p>Create New Account?</p></Link>
                </div>
            </form>


        </div>
    );
};

export default Login;
