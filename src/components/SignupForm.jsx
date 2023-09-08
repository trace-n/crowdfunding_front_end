import './LoginForm.css';
import { useState } from 'react';
import postSignup from '../api/post-signup';
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
                // console.log(response);
                // allows storage of auth token in browser
                // window.localStorage.setItem('token', response.token);
                // setAuth({
                //     token: response.token,
                // });
                // Navigate to login page
                navigate('/login');
            });
        }
    };

    return (

        <form className='login-form'>
            <div>
                <h3 className='login-text'>SIGN UP</h3>
                {/* <label htmlFor='username'>Username:</label> */}
                <input 
                    type='text' 
                    id='username' 
                    placeholder='Username' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='first_name' 
                    placeholder='First Name' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='last_name' 
                    placeholder='Last Name' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='email' 
                    placeholder='Email' 
                    onChange = {handleChange}
                />
            </div> 
            <div>
                <input 
                    type='text' 
                    id='image' 
                    placeholder='Image URL' 
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
            <button type='submit' onClick={handleSubmit}>SIGN UP</button>
        </form>
    );
}

export default SignupForm;