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

        <form className='project-form'>
            <div>
                <h3 className='project-text'>CREATE PROJECT</h3>
                {/* <label htmlFor='username'>Username:</label> */}
                <input 
                    type='text' 
                    id='title' 
                    placeholder='Title' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='text' 
                    id='description' 
                    placeholder='Description' 
                    onChange = {handleChange}
                />
            </div>
            <div>
                <input 
                    type='number' 
                    id='goal' 
                    placeholder='Goal' 
                    onChange = {handleChange}
                />
            </div> 
            <div>
                <input 
                    type='url' 
                    id='image' 
                    placeholder='Image URL' 
                    onChange = {handleChange}
                />
            </div>                                                
            <div>
                {/* <label htmlFor='password'>Password:</label> */}
                <input 
                    type='date' 
                    id='date_end' 
                    placeholder='End Date' 
                    onChange = {handleChange}
                />
            </div>
            <button type='submit' onClick={handleSubmit}>CREATE</button>
        </form>
    );
}

export default CreateProjectForm;