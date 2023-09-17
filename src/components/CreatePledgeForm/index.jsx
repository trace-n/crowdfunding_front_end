import './style.css';
// import { useState } from 'react';
// import postPledge from '../../api/post-pledge';

const CreatePledgeForm = (props) => {

    const projectId = props.projectId;

    return (
        // onSubmit - change this to be a function that references the props.onClick property. 
        // otherwise this ends up calling the function during referecne of this component in a parent
        <form className='donate-form' onSubmit={(event) => props.onClick(projectId,event)}>
            <div>
                <label htmlFor='amount'>Amount* $</label>
                <input 
                    type='number'         
                    id='amount' 
                    min='1'
                    defaultValue='10'
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