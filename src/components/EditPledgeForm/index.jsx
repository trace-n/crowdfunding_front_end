import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import getUser from '../../api/get-user';
// import useUser from '../../hooks/use-user';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../LoginForm';
import putPledge from '../../api/put-pledge';
// import getPledge from '../../api/get-pledge';
import usePledge from '../../hooks/use-pledge';
import { useParams } from 'react-router-dom';

const EditPledgeForm = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    const { pledge, isLoading: isLoadingPledge, error: errorPledge, setPledge } = usePledge(id);

    if (isLoadingPledge) {
        return (<p>LOADING...</p>);
    }

    if (errorPledge) {
        console.log("errorPledge", errorPledge);
        return (<p>{errorPledge.message}</p>);
    }
    
    const handleChange = (event) => {
        const { id, value } = event.target;

        if ( event.target.id == 'anonymous') {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [id]: event.target.checked,
            }))
        } else {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [event.target.id]: event.target.value,
            }));
        }
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pledge.amount && pledge.comment) {
            putPledge(
                id, 
                pledge.amount, 
                pledge.comment, 
                pledge.anonymous, 
                pledge.project,
            ).then((response) => {
                console.log("pledge updated");
            });
        }

    };

    
    if ( auth.token ) {
        if (auth.id == pledge.supporter) {
            return (
                // changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
                <div className='user-page'>
                    <>
                        
                        {/* <img src={user.image} alt='avatar' className='avatar' />                           */}
                            <h3>'Edit Pledge'</h3>
                            <h3 className='login-text'>Welcome {auth.username}</h3> 
                <form className='user-form' onSubmit={handleSubmit}>
        
                    <li className='label'>
                        <label htmlFor='amount'>Amount</label>
                        </li><li className='label'>
                        <input 
                            type='number' 
                            required
                            id='amount' 
                            min='1'
                            // name='first_name'
                            defaultValue={pledge.amount}
                            onChange = {handleChange}
                        />
                        </li>
        
                        <li className='label'>
                        <label htmlFor='comment'>Comment</label>
                        </li><li className='label'>
                        <input 
                            type='text' 
                            id='comment' 
                            required
                            defaultValue={pledge.comment}
                            onChange = {handleChange}
                            // className='anon-button'
                        />
                        </li>
                                
                                <li className='label'>
                                    <label htmlFor='anonymous'>Anonymous</label>
                                </li><li>
                                    <input 
                                        type='checkbox' 
                                        id='anonymous' 
                                        // placeholder='Email' 
                                        onChange = {handleChange}
                                        // required
                                        // disabled
                                        defaultValue={pledge.anonymous}    
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

 

export default EditPledgeForm;