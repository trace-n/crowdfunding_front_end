import './HomePage.css'
import { Link } from 'react-router-dom';
// import MyProjects from "../components/MyProjects";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import { useProjects } from "../hooks/use-projects";
import Spinner from '../components/Spinner';
import MessageCard from '../components/MessageCard';
// import { useState } from 'react';
import { deleteProject } from '../api/projects';


const MyProjectsPage = () => {

    const {auth, setAuth} = useAuth();
    const { projects, isLoading: isLoadingProjects, error: errorProjects, setProjects } = useProjects();
    const userId = auth.id;
    // const [ myProjects, setMyProjects ] = useState('');

    if (isLoadingProjects) {
        // return (<p>Loading ...</p>);
        return (<Spinner />)
    }

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    }    

    const filteredProjects = projects.filter((project) => project.owner == userId );

    const deleteSingleProject = (id) => {
        if (id) {
            deleteProject(
                id
            ).then((response) => {
                const myProjects = filteredProjects.filter((projectData) => projectData.id !== id);
                setProjects(myProjects);
                // console.log('after set my proj', projects);
            }); 
        }
    }; 


        return (
            <div className='home-box'>
                <h2>My Projects</h2>
            { auth.token ? (
                <>  { filteredProjects.length > 0 ? (      
                    <div id='project-list'>            
                        {filteredProjects.map((projectData, key) => {
                            return <ProjectCard 
                                        key={key} 
                                        projectData={projectData} 
                                        onClick={deleteSingleProject} 
                                    />
                        })}
                    </div>    
                    ) : (
                        <> 
                        <MessageCard 
                            message='You have no projects' messageType='header' 
                            />
                         <Link to='/project'>Start a project today</Link>  
                         </>
                    ) }                    
                </>
            ) : (
                <LoginForm />
            ) }
            </div>
        ) 
}

export default MyProjectsPage;