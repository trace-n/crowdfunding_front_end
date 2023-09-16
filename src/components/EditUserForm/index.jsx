import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import putUser from '../../api/put-user';
// import getUser from '../../api/get-user';
import useUser from '../../hooks/use-user';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../LoginForm';
import { useParams } from 'react-router-dom';


const EditUserForm = () => {

    const {auth, setAuth} = useAuth();
    // const userId = props.userId;
    const { id } = useParams();
    const { user, isLoading: isLoadingUser, error: errorUser, setUser } = useUser(id);
    // set initial userForm state to get user hook 
    // const[userForm, setUserForm] = useState(user);


    if (isLoadingUser) {
        return (<p>LOADING...</p>);
    }

    if (errorUser) {
        console.log("errorUser", errorUser);
        return (<p>{errorUser.message}</p>);
    }


    // console.log("user", user);
    
    const handleChange = (event) => {
        const { id, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
        
        // console.log("user after setUser", userForm);

    };

    const handleSubmit = (event) => {
        // console.log("got to handleSubmit",userId);
        event.preventDefault();
        // if (pledge.amount && pledge.comment) {
            // if (pledge) {
                putUser(
                    id,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.image,
                ).then((response) => {
                    // navigate(`project/${projectId}`);
                    console.log("user details updated");
                });
            // }
        // } 
    };

    // console.log('edit form auth id and user id from props', auth.id, id )

    if ( auth.token ) {
        if (auth.id == id) {
            return (
                // changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
                <div className='user-page'>
                    <>
                        
                    <img 
                        src={user.image} 
                        alt='avatar' 
                        className='avatar' 
                    />                          
                    <h3>EDIT USER PROFILE</h3>
                    <h3 className='login-text'>Welcome {user.username}</h3> 
                    <form className='user-form' onSubmit={handleSubmit}>
            
                        <li className='label'>
                            <label htmlFor='first_name'>First Name</label>
                            </li><li className='label'>
                            <input 
                                type='text' 
                                required
                                id='first_name' 
                                // name='first_name'
                                defaultValue={user.first_name}
                                onChange = {handleChange}
                                size='30'
                            />
                            </li>
            
                            <li className='label'>
                            <label htmlFor='last_name'>Last Name</label>
                            </li><li className='label'>
                            <input 
                                type='text' 
                                id='last_name' 
                                required
                                defaultValue={user.last_name}
                                onChange = {handleChange}
                                size='30'
                                // className='anon-button'
                            />
                            </li>
                                    
                            <li className='label'>
                                <label htmlFor='email'>Email</label>
                            </li><li>
                                <input 
                                    type='email' 
                                    id='email' 
                                    placeholder='Email' 
                                    onChange = {handleChange}
                                    required
                                    // disabled
                                    defaultValue={user.email}    
                                    size='30'                            
                                />
                            </li> 
                            <li className='label'>
                            <label htmlFor='image'>Image</label>
                            </li><li>
                                <input 
                                    type='url' 
                                    id='image' 
                                    placeholder='Image URL' 
                                    onChange = {handleChange}
                                    required
                                    defaultValue={user.image}
                                    size='30'
                                />
                            </li>     
                        <button type='submit'>SAVE</button>
                    </form>
                    </>
                </div>
            );
        } else {
            return (
                <p>Not authorised</p>
            );
        }
    } else {
        return (
            <div>
            <LoginForm />
            </div>
        );
    }
}

{/* 

    return (
// changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
        <div className='user-page'>
        { auth.token && (auth.id == userId) ? (
            <>
                
                <img src={user.image} alt='avatar' className='avatar' />                          
                    <h3>'Edit User'</h3>
                    <h3 className='login-text'>Welcome {user.username}</h3> 
        <form className='user-form' onSubmit={handleSubmit}>

            <li className='label'>
                <label htmlFor='first_name'>First Name</label>
                </li><li className='label'>
                <input 
                    type='text' 
                    required
                    id='first_name' 
                    // name='first_name'
                    defaultValue={user.first_name}
                    onChange = {handleChange}
                />
                </li>

                <li className='label'>
                <label htmlFor='last_name'>Last Name</label>
                </li><li className='label'>
                <input 
                    type='text' 
                    id='last_name' 
                    required
                    defaultValue={user.last_name}
                    onChange = {handleChange}
                    // className='anon-button'
                />
                </li>
                      
                        <li className='label'>
                            <label htmlFor='email'>Email</label>
                        </li><li>
                            <input 
                                type='email' 
                                id='email' 
                                placeholder='Email' 
                                onChange = {handleChange}
                                required
                                // disabled
                                defaultValue={user.email}    
                                size='30'                            
                            />
                        </li> 
                        <li className='label'>
                        <label htmlFor='image'>Image</label>
                        </li><li>
                            <input 
                                type='url' 
                                id='image' 
                                placeholder='Image URL' 
                                onChange = {handleChange}
                                required
                                // disabled
                                defaultValue={user.image}
                                size='30'
                            />
                        </li>     
            <button type='submit'>SAVE</button>
        </form>
        </>
                ) : (

                )}
        </div>
    ); */
} 

export default EditUserForm;