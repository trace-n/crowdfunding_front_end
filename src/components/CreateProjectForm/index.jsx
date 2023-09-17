import './style.css';
import { useState } from 'react';
import postProject from '../../api/post-project';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/use-auth';

const CreateProjectForm = () => {

    const navigate = useNavigate();
    // const {auth, setAuth} = useAuth();

    const [project, setProject] = useState({
        title: '',
        description: '',
        goal: '',
        image: '',
        date_end: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (project.title && project.goal) {
            postProject(
                project.title,
                project.description,
                project.goal,
                project.image,
                project.date_end,
            ).then((response) => {
                navigate('/');
            });
        }
    };

    return (
        <div className='project-page'>
                <h3>GOT AN IDEA?</h3>
                <p className='project-text'>Get cracking and start a new project for your crowdfunding idea!</p>              
            <form className='project-form' onSubmit={handleSubmit}>

                {/* <label htmlFor='username'>Username:</label> */}
                <li className='label'>
                        <label htmlFor='title'>Title</label>
                        </li>
                <li className='label'>
                    <input 
                        type='text' 
                        id='title' 
                        // placeholder='Title' 
                        onChange = {handleChange}
                        required
                    />
                </li>
            {/* <div> */}
                {/* <input  */}
                <li className='label'>
                        <label htmlFor='description'>Description</label>
                </li>
                <li className='label'>                
                    <textarea
                        type='text' 
                        id='description' 
                        // placeholder='Description' 
                        onChange = {handleChange}
                        required
                        rows='10'
                        cols='35'                    
                    />
                </li>
                <li className='label'>
                    <label htmlFor='goal'>Goal</label>
                </li>
                <li>               
            {/* </div> */}
            {/* <div> */}
                    <input 
                        type='number' 
                        id='goal' 
                        // placeholder='Goal' 
                        onChange = {handleChange}
                        required
                    />
                </li> 
                <li className='label'>
                    <label htmlFor='image'>Image</label>
                </li>
                <li>           
                {/* </div> 
                <div> */}
                    <input 
                        type='url' 
                        id='image' 
                        placeholder='Image URL' 
                        onChange = {handleChange}
                        required
                    />
                {/* </div>                                         <div> */}
                    {/* <label htmlFor='password'>Password:</label> */}
                </li>    
                <li className='label'>
                    <label htmlFor='date_end'>End Date</label>
                </li>
                <li>                
                    <input 
                        type='date' 
                        id='date_end' 
                        placeholder='End Date' 
                        onChange = {handleChange}
                        required
                    />
                </li>    
            {/* </div> */}
                <button type='submit'>CREATE</button>
            </form>
        </div>
    );
}

export default CreateProjectForm;