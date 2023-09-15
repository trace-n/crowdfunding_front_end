import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import putUser from '../../api/put-user';
// import getUser from '../../api/get-user';
import useUser from '../../hooks/use-user';
import { useAuth } from '../../hooks/use-auth';

const EditUserForm = (props) => {

    const {auth, setAuth} = useAuth();
    const userId = props.userId;
    const { user, isLoading: isLoadingUser, error: errorUser } = useUser(userId);
    // set initial userForm state to get user hook 
    const[userForm, setUserForm] = useState(user);

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
        setUserForm((prevUserForm) => ({
            ...prevUserForm,
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
                    userId,
                    userForm.first_name,
                    userForm.last_name,
                    userForm.email,
                    userForm.image,
                ).then((response) => {
                    // navigate(`project/${projectId}`);
                    console.log("user details updated");
                });
            // }
        // } 
    };

    console.log('edit form auth id and user id from props', auth.id, userId )

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
                    <LoginForm />
                ) }
        </div>
    );
}

export default EditUserForm;