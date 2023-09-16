import './style.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import putUser from '../../api/put-user';
// import getUser from '../../api/get-user';
import useUser from '../../hooks/use-user';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../LoginForm';
import { useParams } from 'react-router-dom';
import useProject from '../../hooks/use-project';
import putProject from '../../api/put-project';


const EditProjectForm = () => {

    const {auth, setAuth} = useAuth();
    // const userId = props.userId;
    const { id } = useParams();

    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setProject, setPledges } = useProject(id);
    // const { user, isLoading: isLoadingUser, error: errorUser } = useUser(id);
    // set initial userForm state to get user hook 
    // const[projectForm, setProjectForm] = useState(project);
    // const[userForm, setUserForm] = useState(user);

    if (isLoadingProject) {
        return (<p>LOADING...</p>);
    }

    if (errorProject) {
        console.log("errorProject", errorProject);
        return (<p>{errorProject.message}</p>);
    }


    // console.log("user", user);
    
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
        
        console.log("user after setUser", project);

    };

    const handleSubmit = (event) => {
        console.log("got to handleSubmit",project);
        event.preventDefault();
        // if (pledge.amount && pledge.comment) {
            // if (pledge) {
                putProject(
                    project.id,
                    project.title,
                    project.description,
                    project.goal,
                    project.image,
                    project.date_end,
                ).then((response) => {
                    // navigate(`project/${projectId}`);
                    console.log("project details updated");
                });
            // }
        // } 
    };

    console.log('project', project )

    if ( auth.token ) {
        if (auth.id == project.owner) {
            return (
                // changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
                <div className='user-page'>
                    <>
                        
                        {/* <img src={user.image} alt='avatar' className='avatar' />                           */}
                            <h3>'Edit Project'</h3>
                            <h3 className='login-text'>Welcome {project.owner}</h3> 
                <form className='project-form' onSubmit={handleSubmit}>
        
                    <li className='label'>
                        <label htmlFor='title'>Title</label>
                        </li><li className='label'>
                        <input 
                            type='text' 
                            required
                            id='title' 
                            // name='first_name'
                            defaultValue={project.title}
                            onChange = {handleChange}
                        />
                        </li>
        
                        <li className='label'>
                        <label htmlFor='description'>Description</label>
                        </li><li className='label'>
                        <input 
                            type='text' 
                            id='description' 
                            // required
                            defaultValue={project.description}
                            onChange = {handleChange}
                            // className='anon-button'
                        />
                        </li>
                                
                                <li className='label'>
                                    <label htmlFor='goal'>goal</label>
                                </li><li>
                                    <input 
                                        type='number' 
                                        id='goal' 
                                        // placeholder='Email' 
                                        onChange = {handleChange}
                                        required
                                        // disabled
                                        defaultValue={project.goal}    
                                        min='1'
                                        // size='30'                            
                                    />
                                </li> 
                                <li className='label'>
                                <label htmlFor='image'>Image</label>
                                </li><li>
                                    <input 
                                        type='url' 
                                        id='image' 
                                        // placeholder='Image URL' 
                                        onChange = {handleChange}
                                        required
                                        // disabled
                                        defaultValue={project.image}
                                        size='30'
                                    />
                                </li> 
                                <li className='label'>
                                <label htmlFor='date_end'>End Date</label>
                                </li><li>
                                    <input 
                                        type='date' 
                                        id='date_end' 
                                        // placeholder='Image URL' 
                                        onChange = {handleChange}
                                        required
                                        // disabled
                                        defaultValue={project.date_end}
                                        // size='30'
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




export default EditProjectForm;