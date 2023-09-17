
import './UserPage.css'
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';
import useUser from '../hooks/use-users';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';
// import EditUserForm from '../components/EditUserForm';

const UserPage = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    const [editing, setEditing] = useState(false);

    const [userForm, setUserForm] = useState({
        // username: '',
        // password: '',
        first_name: '',
        last_name: '',
        email: '',
        image: '',
    });

    let viewMode = {};
    let editMode = {};
    if (editMode) {
        viewMode.display = 'none'; 
    } else {
        editMode.display = 'none'; 
    }

    // console.log("auth", auth);
    // console.log("auth id",auth.id);
    // console.log("userid from useparams", id);

    // rename the parameters for unique reference 
    const { user, isLoading: isLoadingUser, error: errorUser } = useUser(id);
    if (isLoadingUser) {
        // return (<p>LOADING...</p>);
        return (<Spinner />)
    }

    if (errorUser) {
        console.log("errorUser", errorUser);
        return (<p>{errorUser.message}</p>);
    }



    const handleChange = (event) => {
        const { id, value } = event.target;
        setUserForm((prevUserForm) => ({
            ...prevUserForm,
            [id]: value,
        }));
    };


    const handleEditMode = () => {
        console.log("seteditmode before", editing)
        
        setEditing(true);
        console.log("seteditmode after", editing)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userForm.username && userForm.password) {
            putUser(
                id,
                userForm.first_name,
                userForm.last_name,
                userForm.email,
                userForm.image,
            ).then((response) => {
                // Navigate to signup page on successful login
                console.log("submit completed successfully");
                // navigate('/login');
            });
        }
    };

    return (

        <div className='user-page'>
            { auth.token ? (
                <>
                    
                    <img src={user.image} alt='avatar' className='avatar' />                          
                        <h3>{!editing ? 'Display User' : 'Edit User'}</h3>
                        <h3 className='login-text'>Welcome {user.username}</h3> 
                        {/* <EditUserForm userId={auth.id}/> */}
                    {/* <form className='user-form' */}
                    <form
                     onSubmit={handleSubmit}
                     >
                    {/* <ul> */}
                        <li className='label'>
                        <label htmlFor='first_name'>First Name</label>
                        </li>
                        <li>
                            <input 
                                type='text' 
                                id='first_name' 
                                name='first_name'
                                placeholder='First Name' 
                                onChange = {handleChange}
                                required
                                // readOnly='false'
                                // disabled
                                // style={editMode}
                                value={user.first_name}
                                size='30'
                            />
                        </li>
                        <li className='label'>
                        <label htmlFor='last_name'>Last Name</label>                 
                        </li>
                        <li className='label'>           
                            <input 
                                type='text' 
                                id='last_name' 
                                placeholder='Last Name' 
                                onChange = {handleChange}
                                required
                                // disabled
                                value={user.last_name}
                                size='30'
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
                                value={user.email}    
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
                                value={user.image}
                                size='30'
                            />
                        </li>     
                        {/* </ul>                                 */}
                        <button type='submit' onClick={handleEditMode}>EDIT</button>
                        
                    </form>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default UserPage;