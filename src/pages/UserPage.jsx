
import './UserPage.css'
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';
import useUser from '../hooks/use-user';
import { useParams, Link } from 'react-router-dom';
// import EditUserForm from '../components/EditUserForm';

const UserPage = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();

    // console.log("auth", auth);
    console.log("auth id",auth.id);
    console.log("userid from useparams", id);

    // rename the parameters for unique reference 
    const { user, isLoading: isLoadingUser, error: errorUser } = useUser(id);
    if (isLoadingUser) {
        return (<p>LOADING...</p>);
    }

    if (errorUser) {
        console.log("errorUser", errorUser);
        return (<p>{errorUser.message}</p>);
    }

    // const [credentials, setCredentials] = useState({
    //     username: '',
    //     password: '',
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     image: '',
    // });

    // const handleChange = (event) => {
    //     const { id, value } = event.target;
    //     setCredentials((prevCredentials) => ({
    //         ...prevCredentials,
    //         [id]: value,
    //     }));
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (credentials.username && credentials.password) {
            // putUser(
            //     credentials.username,
            //     credentials.password,
            //     credentials.first_name,
            //     credentials.last_name,
            //     credentials.email,
            //     credentials.image,
            // ).then((response) => {
            //     // Navigate to signup page on successful login
            //     navigate('/login');
            // });
        // }
    };

    return (

        <div className='user-page'>
            { auth.token ? (
                <>
                    
                    <img src={user.image} alt='avatar' className='avatar' />                          
                        <h3 className='login-text'>Welcome {user.username}</h3> 
                        {/* <EditUserForm userId={auth.id}/> */}
                    <form className='user-form' onSubmit={handleSubmit}>
 
                        <div className='label'>
                        <label htmlFor='first_name'>First Name</label>
                        </div>
                        <div>
                            <input 
                                type='text' 
                                id='first_name' 
                                placeholder='First Name' 
                                // onChange = {handleChange}
                                required
                                disabled
                                value={user.first_name}
                                size='30'
                            />
                        </div>
                        <div className='label'>
                        <label htmlFor='last_name'>Last Name</label>                 
                        </div>
                        <div className='label'>           
                            <input 
                                type='text' 
                                id='last_name' 
                                placeholder='Last Name' 
                                // onChange = {handleChange}
                                required
                                disabled
                                value={user.last_name}
                                size='30'
                            />
                        </div>
                        <div className='label'>
                        <label htmlFor='email'>Email</label>
                        </div><div>
                            <input 
                                type='email' 
                                id='email' 
                                placeholder='Email' 
                                // onChange = {handleChange}
                                required
                                disabled
                                value={user.email}    
                                size='30'                            
                            />
                        </div> 
                        <div className='label'>
                        <label htmlFor='image'>Image</label>
                        </div><div>
                            <input 
                                type='url' 
                                id='image' 
                                placeholder='Image URL' 
                                // onChange = {handleChange}
                                required
                                disabled
                                value={user.image}
                                size='30'
                            />
                        </div>                                                
                        <button type='submit'>EDIT</button>
                    </form>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default UserPage;