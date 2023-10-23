import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from './Spinner/Spinner';


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

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
            email,
            name,
            password
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/user/signup', userData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('User Registered Successfully.', { variant: 'success' });
                navigate('/login');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                enqueueSnackbar('some error occured', { variant: 'error' })
            })
    };

    return (
        <div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Signup to Medizone</h2>
                    <input type="text" id="name" placeholder='Enter Full Name' name="name" value={name} onChange={handleNameChange} required />
                    <input type="email" id="email" placeholder='Enter Email' name="email" value={email} onChange={handleEmailChange} required />
                    <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={handlePasswordChange} required />
                    {loading ? <Spinner /> : (<button type="submit">Signup</button>)}
                    <div className='sign'>
                        <Link to="/login"><p>Already have Account? Login</p></Link>
                    </div>
                </form>


            </div>

        </div>
    )
}

export default Signup