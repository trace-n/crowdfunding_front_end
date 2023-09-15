// import './HomePage.css'
// import MyProjects from "../components/MyProjects";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import useProjects from "../hooks/use-projects";


const MyProjectsPage = () => {

    const {auth, setAuth} = useAuth();
    const { projects, isLoading: isLoadingProjects, error: errorProjects } = useProjects();
    const userId = auth.id;

    if (isLoadingProjects) {
        return (<p>Loading ...</p>);
    }

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    }    

    const filteredProjects = projects.filter((project) => project.owner == userId );

        return (
            <div>
            { auth.token ? (
                <>            
                    <div id='project-list'>            
                        {filteredProjects.map((projectData, key) => {
                            return <ProjectCard key={key} projectData={projectData} />
                        })}
                    </div>                    
                </>
            ) : (
                <LoginForm />
            ) }
            </div>
        ) 
}

export default MyProjectsPage;