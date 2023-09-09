import './LoginForm.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import postPledge from '../api/post-pledge';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/use-auth';

const CreatePledgeForm = () => {

    const navigate = useNavigate();
    // const {auth, setAuth} = useAuth();

    // const { id } = userParams();

    const [pledge, setPledge] = useState({
        supporter: '',
        amount: '',
        comment: '',
        anonymous: '',
        project: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (pledge.amount && pledge.project) {
            if (pledge) {
                if ( !pledge.anonymous ) {
                    pledge.anonymous = false;
                }


            postPledge(
                pledge.supporter,
                pledge.amount,
                pledge.comment,
                pledge.anonymous,
                pledge.project,
            ).then((response) => {
                navigate('/');
            });
        }
    };

    return (

        <form className='login-form'>
            <div>
                <h3 className='login-text'>DONATE</h3>
                {/* <label htmlFor='username'>Username:</label> */}
                <input 
                    type='number' 
                    id='amount' 
                    placeholder='Amount' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='comment' 
                    placeholder='Comment' 
                    onChange = {handleChange}
                />
            </div>         
            <div>
                <label htmlFor='anonymous'>Anonymous</label>
                <input 
                    type='checkbox' 
                    id='anonymous' 
                    // placeholder='Comment' 
                    onChange = {handleChange}
                />
            </div>                                 
            <button type='submit' onClick={handleSubmit}>DONATE</button>
        </form>
    );
}

export default CreatePledgeForm;