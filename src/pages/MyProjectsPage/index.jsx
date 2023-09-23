import './style.css'
import { Link } from 'react-router-dom';
import ProjectCard from "../../components/ProjectCard";
import { useAuth } from "../../hooks/use-auth";
import LoginForm from "../../components/LoginForm";
import { useProjects } from "../../hooks/use-projects";
import Spinner from '../../components/Spinner';
import MessageCard from '../../components/MessageCard';
import { deleteProject } from '../../api/projects';


const MyProjectsPage = () => {

    const {auth, setAuth} = useAuth();
    const { projects, isLoading: isLoadingProjects, error: errorProjects, setProjects } = useProjects();
    const userId = auth.id;

    if (isLoadingProjects) {
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
                        <div className='project-start'> 
                        <MessageCard 
                            message='You have no projects' messageType='header' 
                            />
                         <Link to='/project'>Start a project today</Link>  
                         </div>
                    ) }                    
                </>
            ) : (
                <LoginForm />
            ) }
            </div>
        ) 
}

export default MyProjectsPage;