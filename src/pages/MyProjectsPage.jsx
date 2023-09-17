import './HomePage.css'
import { Link } from 'react-router-dom';
// import MyProjects from "../components/MyProjects";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import { useProjects } from "../hooks/use-projects";
import Spinner from '../components/Spinner';
import MessageCard from '../components/MessageCard';


const MyProjectsPage = () => {

    const {auth, setAuth} = useAuth();
    const { projects, isLoading: isLoadingProjects, error: errorProjects } = useProjects();
    const userId = auth.id;

    if (isLoadingProjects) {
        // return (<p>Loading ...</p>);
        return (<Spinner />)
    }

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    }    

    const filteredProjects = projects.filter((project) => project.owner == userId );

        return (
            <div className='home-box'>
            { auth.token ? (
                <>  { filteredProjects.length > 0 ? (      
                    <div id='project-list'>            
                        {filteredProjects.map((projectData, key) => {
                            return <ProjectCard key={key} projectData={projectData} />
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