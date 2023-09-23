import './style.css';
import { useProjects, useStatistics } from '../../hooks/use-projects';
import { useUsers } from '../../hooks/use-users';
import { useAuth } from '../../hooks/use-auth';
import ProjectCard from '../../components/ProjectCard';
import fundlingLogoHeader from '../../assets/logo-no-background-no-icon.png';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';
import Spinner from '../../components/Spinner';
import { deleteProject } from '../../api/projects';

const HomePage = () => {
    
    const {auth, setAuth} = useAuth();
    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();
    const { statistics, isLoading: isLoadingStats, error: errorStats } = useStatistics();
    const { projects, isLoading: isLoadingProjects, error: errorProjects, setProjects } = useProjects();

    if (isLoadingStats || isLoadingProjects || isLoadingUsers) {
        return (<Spinner />)
    }

    if (errorStats) {
        return (<p>{errorStats.message}</p>);
    }    

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    }    

    if (errorUsers) {
        return (<p>{errorUsers.message}</p>);
    }    

    const today = Date.parse(new Date());
    let endDate = '';

    const projectsSortedDesc = [...projects].sort((a,b) => b.id - a.id);
    const projectsSortedFiltered = projectsSortedDesc.filter((project) => Date.parse(project.date_end) > today);
    const projectsSortedRecent = projectsSortedFiltered.slice(0, 6);

    const deleteSingleProject = (id) => {
        if (id) {
            deleteProject(
                id
            ).then((response) => {
                const myProjects = projects.filter((project) => project.id !== id);
                setProjects(myProjects);
            }); 
        }
    }; 

    return (
        <div className='home-box'>
            <section className='headline display-none'>    
                <img src={fundlingLogoHeader} alt='Fundling Logo header' className='headline-image'></img>
                <img src={fundlingLogoCol} alt='Fundling Logo Icon' className='headline-image-icon'></img>
            </section>
            <div className='statistics-card'>
                <section>
                <h2>{statistics.project_count.toLocaleString()}</h2>
                <h3>PROJECTS</h3>
                </section>
                <section>
                <h2>$ {statistics.pledge_amount.toLocaleString()}</h2>
                <h3>AMOUNT RAISED</h3>
                </section>
                <section>
                <h2>{statistics.pledge_count.toLocaleString()}</h2>
                <h3>PLEDGES</h3> 
                </section>
                
            </div>
            <>

                <h2>Recent Projects</h2>   
                <div id='project-list'> 
                    { projectsSortedRecent.map((projectData, key) => {
                            return <ProjectCard 
                                        key={key} 
                                        projectData={projectData} 
                                        onClick={deleteSingleProject} 
                                    />
                    })}
                </div>

                <h2>All Projects</h2>    
                <div id='project-list'> 
       
                    { projects.map((projectData, key) => {
                        endDate = Date.parse(projectData.date_end);
                        if (today < endDate) {
                        // only return open projects
                            return <ProjectCard 
                                        key={key} 
                                        projectData={projectData} 
                                        onClick={deleteSingleProject} 
                                    />
                        }
                    })}

                </div>
            </>
        </div>
    );
}

export default HomePage;