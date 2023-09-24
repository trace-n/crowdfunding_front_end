import './style.css';
import { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useParams } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { useProject } from '../../hooks/use-projects';
import { putProject } from '../../api/projects';
import Spinner from '../Spinner';
import MessageCard from '../MessageCard';


const EditProjectForm = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();

    const [messageBlock, setMessageBlock] = useState(false);

    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setProject, setPledges } = useProject(id);
    
    if (isLoadingProject) {
        return (<Spinner />)
    }

    if (errorProject) {
        return (
            <div className='project-error'>
                <MessageCard 
                    message={`Error with project - ${errorProject.message}`} 
                    messageType='header' 
                />
            </div>                
        );
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
                putProject(
                    project.id,
                    project.title,
                    project.description,
                    project.goal,
                    project.image,
                    project.date_end,
                ).then((response) => {
                    setMessageBlock(true);
                });
    };

    const dateStrip = project.date_end.substr(0, 10);
    const today = Date.parse(new Date());
    const endDate = Date.parse(project.date_end);
    
    if ( auth.token ) {
        if (auth.id == project.owner) {
            return (
                <div className='project-page'>
                    <>
                    <h3 className='project-header'>Need to finetune your project?</h3>
                    <form className='project-form' onSubmit={handleSubmit}>
        
                    <li className='label'>
                        <label htmlFor='title'>Title</label>
                        </li><li className='label'>
                        <input className='form-input'
                            type='text' 
                            required
                            id='title' 
                            defaultValue={project.title}
                            onChange = {handleChange}
                        />
                        </li>
        
                        <li className='label'>
                        <label htmlFor='description'>Description</label>
                        </li><li className='label'>
                        <textarea
                            className='form-textarea'
                            type='text' 
                            id='description' 
                            required
                            rows='10'
                            cols='36'
                            defaultValue={project.description}
                            onChange = {handleChange}
                        />
                        </li>
                        <li className='label'>
                            <label htmlFor='goal'>Goal $</label>
                        </li>
                        <li className='label'>
                            <input 
                                className='form-input'
                                type='number' 
                                id='goal' 
                                onChange = {handleChange}
                                required
                                defaultValue={project.goal}    
                                min='1'                          
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
                                onChange = {handleChange}
                                required
                                defaultValue={project.image}
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
                                onChange = {handleChange}
                                required
                                defaultValue={dateStrip}
                            />
                        </li> 
                        { today > endDate && 
                            <>
                                <li className='message-end'></li>
                                <li className='label message-end'>
                                    <MessageCard 
                                        message='Project has ended' 
                                    />
                                </li> 
                            </>
                        }
                                                  
                    <button type='submit' className='btn-wide'>SAVE</button>
                    { messageBlock &&
                        <li className='message'>
                            <MessageCard 
                                message='Project updated  successfully' 
                            />
                        </li>
                    }     
                </form>

                </>
                </div>
            );
        } else {
            return (
                <div className='project-error'>
                    <MessageCard message='Not authorised to edit project' messageType='header' />
                </div>
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

export default EditProjectForm;