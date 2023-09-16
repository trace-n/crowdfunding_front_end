import './style.css';
import { useState } from 'react';
import postLogin from '../../api/post-login';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import useUsers from '../../hooks/use-users';

const LoginForm = () => {

    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    
    let userId = '';

    if (isLoadingUsers) {
        return (<p>LOADING...</p>);
    }

    if (errorUsers) {
        return (<p>{errorUsers.message}</p>);
    }



    window.localStorage.setItem('id', userId);

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
                // console.log('credentials uname', credentials.username);
                if (credentials.username) {

                    // if (auth.username){
                        userId = users.find(user => user.username === credentials.username).id;
                        // console.log("userid", userId);
                    // }
                }
                //  Set the username on then on the main landing page, can check the name of user and id from get all users for using in the nav bar
                window.localStorage.setItem('username', credentials.username);
                window.localStorage.setItem('token', response.token);

                // console.log('resp token', response.token);
                // console.log('credentials uname', credentials.username);
                setAuth({
                    token: response.token,
                    username: credentials.username,
                    id: userId,
                });
                // console.log("auth",auth);
                // Navigate back to home page
                navigate('/');
            }).catch((error) => {
                console.log("error",error);
            });
        }
    };

    return (
        <div className='login-form-section'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <h3 className='login-text'>LOGIN</h3>
                    {/* <label htmlFor='username'>Username:</label> */}
                    <input 
                        type='text' 
                        id='username' 
                        placeholder='Enter username' 
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
                    />
                </div>
                {/* <button type='submit' onClick={handleSubmit}>LOG IN</button> */}
                <button type='submit'>LOG IN</button>
            </form>
            <p className='signup-text'>Don't have an account?</p>
                <Link to='/signup'>SIGN UP</Link>
        </div>        
    );
}

export default LoginForm;