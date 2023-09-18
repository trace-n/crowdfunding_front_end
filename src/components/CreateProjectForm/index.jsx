import './style.css';
import { useState } from 'react';
// import postProject from '../../api/post-project';
import { postProject } from '../../api/projects';
import { useNavigate } from 'react-router-dom';

const CreateProjectForm = () => {

    const navigate = useNavigate();
    
    const [project, setProject] = useState({
        title: '',
        description: '',
        goal: '10',
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
                <li className='label'>
                        <label htmlFor='title'>Title</label>
                        </li>
                <li className='label'>
                    <input 
                        className='form-input'
                        type='text' 
                        id='title' 
                        // placeholder='Title' 
                        onChange = {handleChange}
                        required
                    />
                </li>
                <li className='label'>
                        <label htmlFor='description'>Description</label>
                </li>
                <li className='label'>                
                    <textarea
                        className='form-textarea'
                        type='text' 
                        id='description' 
                        onChange = {handleChange}
                        required
                        rows='10'
                        cols='35'                    
                    />
                </li>
                <li className='label'>
                    <label htmlFor='goal'>Goal</label>
                </li>
                <li className='label'>               
                    <input 
                        className='form-input'
                        type='number' 
                        id='goal' 
                        onChange = {handleChange}
                        required
                        min='1'
                        defaultValue='10'
                    />
                </li> 
                <li className='label'>
                    <label htmlFor='image'>Image</label>
                </li>
                <li className='label'>           
                    <input 
                        className='form-input'
                        type='url' 
                        id='image' 
                        // placeholder='Image URL' 
                        onChange = {handleChange}
                        required
                    />
                </li>    
                <li className='label'>
                    <label htmlFor='date_end'>End Date</label>
                </li>
                <li className='label'>                
                    <input 
                        className='form-input'
                        type='date' 
                        id='date_end' 
                        placeholder='End Date' 
                        onChange = {handleChange}
                        required
                    />
                </li>    
                <button className='btn-wide' type='submit'>CREATE</button>
            </form>
        </div>
    );
}

export default CreateProjectForm;