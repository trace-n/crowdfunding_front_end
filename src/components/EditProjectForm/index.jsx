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
import Spinner from '../Spinner';
import MessageCard from '../MessageCard';


const EditProjectForm = () => {

    const {auth, setAuth} = useAuth();
    // const userId = props.userId;
    const { id } = useParams();

    const [messageBlock, setMessageBlock] = useState(false);

    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setProject, setPledges } = useProject(id);
    // const { user, isLoading: isLoadingUser, error: errorUser } = useUser(id);
    // set initial userForm state to get user hook 
    // const[projectForm, setProjectForm] = useState(project);
    // const[userForm, setUserForm] = useState(user);
    
    if (isLoadingProject) {
        // return (<p>LOADING...</p>);
        return (<Spinner />)
    }

    if (errorProject) {
        console.log("errorProject", errorProject);
        return (
            <MessageCard 
                message={`Error with project - ${errorProject.message}`} 
                messageType='header' 
            />
        );
        // <p>{errorProject.message}</p>);
    }


    // console.log("user", user);
    
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
        
        // console.log("user after setUser", project);

    };

    const handleSubmit = (event) => {
        // console.log("got to handleSubmit",project);
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
                    // debugger
                    setMessageBlock(true);
                                     
                });
            // }
        // } 
    };

    // console.log('project', project )
    // const endDate = (project.date_end);
    // console.log('project end date', typeof(project.date_end), project.date_end);
    const dateStrip = project.date_end.substr(0, 10);
    // console.log(dateStrip);


    if ( auth.token ) {
        if (auth.id == project.owner) {
            return (
                // changed the handleSubmit to form onSubmit rather than on button onClick to  use standard HTML user input required validation
                <div className='user-page'>
                    <>
                        
                        {/* <img src={user.image} alt='avatar' className='avatar' />                           */}
                            <h3>EDIT PROJECT</h3>
                            <h3 className='login-text'>Welcome {project.owner}</h3> 
                <form className='user-form' onSubmit={handleSubmit}>
        
                    <li className='label'>
                        <label htmlFor='title'>Title</label>
                        </li><li className='label'>
                        <input className='form-input'
                            type='text' 
                            required
                            id='title' 
                            // size='35'
                            defaultValue={project.title}
                            onChange = {handleChange}
                        />
                        </li>
        
                        <li className='label'>
                        <label htmlFor='description'>Description</label>
                        </li><li className='label'>
                        {/* <input  */}
                        <textarea
                            className='form-textarea'
                            type='text' 
                            id='description' 
                            required
                            rows='10'
                            cols='36'
                            defaultValue={project.description}
                            onChange = {handleChange}
                            // className='anon-button'
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
                        </li>
                        <li className='label'>
                            <input 
                                className='form-input'
                                type='url' 
                                id='image' 
                                // placeholder='Image URL' 
                                onChange = {handleChange}
                                required
                                // disabled
                                defaultValue={project.image}
                                // size='35'
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
                                // disabled
                                defaultValue={dateStrip}
                                // size='30'
                            />
                        </li> 
                                                  
                    <button type='submit'>SAVE</button>
                    { messageBlock ? (
                        <li className='message'><MessageCard message='Project updated  successfully' />
                        </li>
                    ) :( null ) }     
                </form>

                        </>
                        </div>
                        );
        } else {
            return (
                <MessageCard message='Not authorised to edit project' messageType='header' />
                // <p>Not authorised</p>
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