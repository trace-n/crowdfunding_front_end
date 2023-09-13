import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import postPledge from '../../api/post-pledge';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/use-auth';

const CreatePledgeForm = (props) => {

    // const navigate = useNavigate();
    // const { register } useformContext;
    // const {auth, setAuth} = useAuth();

    const projectId = props.projectId;
    // console.log("id from the create pledge form", projectId);

    // const [pledge, setPledge] = useState({
    //     amount: '',
    //     comment: '',
    //     anonymous: '',
    //     project: '',
    // });

    // const handleChange = (event) => {
    //     const { id, value } = event.target;
    //     setPledge((prevPledge) => ({
    //         ...prevPledge,
    //         [id]: value,
    //     }));
    // };

    // const handleSubmit = (event) => {
    //     console.log("got here");
    //     event.preventDefault();
    //     if (pledge.amount && pledge.comment) {
    //         if (pledge) {
    //             if ( !pledge.anonymous ) {
    //                 pledge.anonymous = false;
    //             }

    //             pledge.project = projectId;

    //             postPledge(
    //                 pledge.amount,
    //                 pledge.comment,
    //                 pledge.anonymous,
    //                 pledge.project,
    //             ).then((response) => {
    //                 // navigate(`project/${projectId}`);
    //             });
    //         }
    //     } 
    // };

    return (
// changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
        // <form className='donate-form' onSubmit={handleSubmit}>
        // onSubmit - change this to be a function that references the props.onClick property. 
        // otherwise this ends up calling the function during referecne of this component in a parent
        <form className='donate-form' onSubmit={() => props.onClick(projectId)}>
            <div>
                {/* <h3 className='login-text'>DONATE</h3> */}
                <label htmlFor='amount'>Amount* $</label>
                <input 
                    type='number'         
                    id='amount' 
                    placeholder='10'
                    // use defaultValue instead of value so the value can be changed
                    // defaultValue='10'
                    // onChange = {handleChange}
                    onChange={props.onChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='comment'>Comment*</label>
                <input 
                    type='text' 
                    required
                    id='comment' 
                    // placeholder='Comment' 
                    // onChange = {handleChange}
                    onChange={props.onChange}
                />
            </div>         
            <div>
                <label htmlFor='anonymous'>Anonymous</label>
                <input 
                    type='checkbox' 
                    id='anonymous' 
                    // onChange = {handleChange}
                    onChange={props.onChange}
                    className='anon-button'
                />
            </div>           
            <button type='submit' className='donate-button'>
                DONATE
            </button>
        </form>
    );
}

export default CreatePledgeForm;