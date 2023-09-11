// import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import putUser from '../../api/put-user';
import getUser from '../../api/get-user';
import { useAuth } from '../../hooks/use-auth';

const GetUserForm = (props) => {

    // const navigate = useNavigate();
    // const { register } useformContext;
    const {auth, setAuth} = useAuth();

    const userId = props.userId;
    // console.log("id from the create pledge form", projectId);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        image: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        // console.log("got here");
        event.preventDefault();
        // if (pledge.amount && pledge.comment) {
            // if (pledge) {
                putUser(
                    userId,
                    firstName,
                    lastName,
                    email,
                    image,
                ).then((response) => {
                    // navigate(`project/${projectId}`);
                });
            // }
        // } 
    };

    return (
// changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
        <form className='user-form' onSubmit={handleSubmit}>
            <div>
                {/* <h3 className='login-text'>DONATE</h3> */}
                <label htmlFor='username'>Username</label>
                <input 
                    type='text'         
                    id='username' 
                    // readOnly='true'
                    disabled
                    value={auth.username}
                    // placeholder='Amount' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    type='text' 
                    required
                    id='firstName' 
                    // placeholder='' 
                    onChange = {handleChange}
                />
            </div>         
            <div>
                <label htmlFor='lastName'>Last Name</label>
                <input 
                    type='text' 
                    id='lastName' 
                    required
                    onChange = {handleChange}
                    // className='anon-button'
                />
            </div>           
            <button type='submit'>SAVE</button>
        </form>
    );
}

export default EditUserForm;