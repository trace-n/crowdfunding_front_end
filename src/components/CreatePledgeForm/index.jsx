import './style.css';

const CreatePledgeForm = (props) => {

    const projectId = props.projectId;

    return (
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
                    onChange={props.onChange}
                />
            </div>         
            <div>
                <label htmlFor='anonymous'>Anonymous</label>
                <input 
                    type='checkbox' 
                    id='anonymous' 
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