import './style.css';
import { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../LoginForm';
import { putPledge } from '../../api/pledges';
import { usePledge } from '../../hooks/use-pledge';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import MessageCard from '../MessageCard';

const EditPledgeForm = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    const [messageBlock, setMessageBlock] = useState(false);

    const { pledge, isLoading: isLoadingPledge, error: errorPledge, setPledge } = usePledge(id);

    if (isLoadingPledge) {
        return (<Spinner />)
    }

    if (errorPledge) {
        return (
            <MessageCard 
                message={`Error with pledge - ${errorPledge.message}`} 
                messageType='header' 
            />
        );
    }
    
    const handleChange = (event) => {
        const { id, value } = event.target;

        if ( id == 'anonymous') {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [id]: event.target.checked,
            }))
        } else {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [id]: value,
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
                setMessageBlock(true);
            });
        }
    };
    
    if ( auth.token ) {
        if (auth.id == pledge.supporter) {
            return (
                <div className='project-page'>
                    <>
                            <h3 className='login-text'>Welcome {auth.username}</h3> 
                <form className='project-form' onSubmit={handleSubmit}>
        
                    <li className='label'>
                        <label htmlFor='amount'>Amount</label>
                        </li><li className='label'>
                        <input 
                            className='form-input'
                            type='number' 
                            required
                            id='amount' 
                            min='1'
                            defaultValue={pledge.amount}
                            onChange = {handleChange}
                        />
                        </li>
        
                        <li className='label'>
                        <label htmlFor='comment'>Comment</label>
                        </li><li className='label'>
                        <input 
                            className='form-input'
                            type='text' 
                            id='comment' 
                            required
                            defaultValue={pledge.comment}
                            onChange = {handleChange}
                        />
                        </li>
                                
                        <li className='label'>
                            <label htmlFor='anonymous'>Anonymous</label>
                        </li><li className='label'>
                            <input 
                                type='checkbox' 
                                id='anonymous' 
                                onChange = {handleChange}
                                checked = {pledge.anonymous}
                                // defaultValue={pledge.anonymous && 'checked'}    
                                className='anon-button'                   
                            />
                        </li> 
                    <button type='submit' className='btn-wide'>SAVE</button>
                    { messageBlock ? (
                        <li className='message'><MessageCard message='Pledge updated  successfully' />
                        </li>
                    ) :( null ) }                       
                </form>

                        </>
                        </div>
                        );
        } else {
            return (
                <MessageCard message='Not authorised to edit pledge' messageType='header' />
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