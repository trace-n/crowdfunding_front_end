import './style.css';
import { useState } from 'react';
import { postLogin } from '../../api/users';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useUsers } from '../../hooks/use-users';
import Spinner from '../Spinner';
import MessageCard from '../MessageCard';

const LoginForm = () => {

    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const [messageBlock, setMessageBlock] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');

    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    
    let userId = '';
    
    if (isLoadingUsers) {
        
        return (<Spinner />)
    }

    if (errorUsers) {
        
        return (
            <MessageCard 
                message={`Error with login - ${errorUsers.message}`} 
                messageType='header' 
            />
            );
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
                if (credentials.username) {
                    userId = users.find(user => user.username === credentials.username).id;
                }
                
                window.localStorage.setItem('username', credentials.username);
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('id', userId);

                setAuth({
                    token: response.token,
                    username: credentials.username,
                    id: userId,
                });

                navigate('/');

            }).catch((error) => {
                
                setMessageBlock(true);
                setErrorLogin(error.message);
                
            });
        }
    };

    return (
        <div className='login-form-section'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <h3 className='login-text'>LOGIN</h3>
                    
                    <input 
                        type='text' 
                        id='username' 
                        placeholder='Enter username' 
                        onChange = {handleChange}
                        required
                    />
                </div>
                <div>
                    
                    <input 
                        type='password' 
                        id='password' 
                        placeholder='Password' 
                        onChange = {handleChange}
                        required
                    />
                </div>
                
                <button type='submit'>LOG IN</button>
                
                { messageBlock ? ( 
                    
                        <div className='message'>
                            
                            <MessageCard message={errorLogin}  />
                        </div>
                    ) :( null ) }  
            </form>
            <p className='signup-text'>Don't have an account?</p>
                <Link to='/signup'>SIGN UP</Link>
        </div>        
    );
}

export default LoginForm;