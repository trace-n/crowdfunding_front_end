import './LoginForm.css';
import { useState } from 'react';
import postLogin from '../api/post-login';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const LoginForm = () => {

    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {

                // allows storage of auth token in browser
                window.localStorage.setItem('token', response.token);
                setAuth({
                    token: response.token,
                });
                // Navigate back to home page
                navigate('/');
            }).catch((error) => {
                console.log("error",error);
            });
        }
    };

    return (
        <div className='login-form'>
            <form className='login-form'>
                <div>
                    <h3 className='login-text'>LOGIN</h3>
                    {/* <label htmlFor='username'>Username:</label> */}
                    <input 
                        type='text' 
                        id='username' 
                        placeholder='Enter username' 
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    {/* <label htmlFor='password'>Password:</label> */}
                    <input 
                        type='password' 
                        id='password' 
                        placeholder='Password' 
                        onChange = {handleChange}
                    />
                </div>
                <button type='submit' onClick={handleSubmit}>LOG IN</button>
            </form>
            <p>Don't have an account?</p>
            <Link to='/signup' className='signup-button'>SIGN UP</Link>
        </div>        
    );
}

export default LoginForm;