import './style.css';
import { useState } from 'react';
import postSignup from '../../api/post-signup';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/use-auth';

const SignupForm = () => {

    const navigate = useNavigate();
    // const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        image: '',
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
            postSignup(
                credentials.username,
                credentials.password,
                credentials.first_name,
                credentials.last_name,
                credentials.email,
                credentials.image,
            ).then((response) => {
                // Navigate to signup page on successful login
                navigate('/login');
            });
        }
    };

    return (

        <form className='signup-form' onSubmit={handleSubmit}>
            <div>
                <h3>SIGN UP</h3>
                {/* <label htmlFor='username'>Username:</label> */}
                <input 
                    type='text' 
                    id='username' 
                    placeholder='Username' 
                    onChange = {handleChange}
                    required
                    autoComplete='off'
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='first_name' 
                    placeholder='First Name' 
                    onChange = {handleChange}
                    required
                    autoComplete='given-name'
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='last_name' 
                    placeholder='Last Name' 
                    onChange = {handleChange}
                    required
                    autoComplete='family-name'
                />
            </div>
            <div>
                <input 
                    type='email' 
                    id='email' 
                    placeholder='Email' 
                    onChange = {handleChange}
                    required
                    autoComplete='email'
                />
            </div> 
            <div>
                <input 
                    type='url' 
                    id='image' 
                    placeholder='Image URL' 
                    onChange = {handleChange}
                    required
                />
            </div>                                                
            <div>
                {/* <label htmlFor='password'>Password:</label> */}
                <input 
                    type='password' 
                    id='password' 
                    placeholder='Password' 
                    onChange = {handleChange}
                    required
                    autoComplete='off'
                />
            </div>
            <button type='submit'>SIGN UP</button>
        </form>
    );
}

export default SignupForm;