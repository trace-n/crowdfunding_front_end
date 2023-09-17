// import { allProjects } from '../data';
import './HomePage.css';
import { useProjects, useStatistics } from '../hooks/use-projects';
// import useStatistics from '../hooks/use-projects';
import { useUsers } from '../hooks/use-users';
import { useAuth } from '../hooks/use-auth';
import ProjectCard from '../components/ProjectCard';
import fundlingLogoHeader from '../assets/logo-no-background-no-icon.png';
import fundlingLogoCol from '../assets/fundling-website-favicon-color.png';
import Spinner from '../components/Spinner';

// import StatisticsCard from '../components/StatisticsCard';

const HomePage = () => {
    
    // make sure to declare the calls to hooks first before checking the isloading and errors
    const {auth, setAuth} = useAuth();
    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();
    const { statistics, isLoading: isLoadingStats, error: errorStats } = useStatistics();
    const { projects, isLoading: isLoadingProjects, error: errorProjects } = useProjects();

    // console.log("looking for stats",isLoading,"error message", error);
    if (isLoadingStats || isLoadingProjects || isLoadingUsers) {
        // return (<p>Loading ...</p>);
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
    
    // const pledge_amount_formatted = parseInt(statistics.pledge_amount).toLocaleString();

    // after login, reroute to home, take username and store the user Id so that it can be used
    // console.log("auth",auth);
    if (auth.token) {
        let userId = '';
        if (auth.username){
            userId = users.filter(user => user.username === auth.username)[0].id;
            // console.log("userid", userId);
        }

    window.localStorage.setItem('id', userId);
    // setAuth({
    //     token: auth.token,
    //     username: auth.username,
    //     id: userId,
    // });
    }

    const today = Date.parse(new Date());
    let endDate = '';

    const projectsSortedDesc = [...projects].sort((a,b) => b.id - a.id);
    const projectsSortedFiltered = projectsSortedDesc.filter((project) => Date.parse(project.date_end) > today);
    const projectsSortedRecent = projectsSortedFiltered.slice(0, 6);

    return (
        <div className='home-box'>
            <section className='headline'>    
                <img src={fundlingLogoHeader} alt='Fundling Logo header' className='headline-image'></img>
                <img src={fundlingLogoCol} alt='Fundling Logo Icon' className='headline-image-icon'></img>
            </section>
            <div className='statistics-card'>
                <h2>{statistics.project_count.toLocaleString()}</h2>
                <h2>$ {statistics.pledge_amount.toLocaleString()}</h2>
                <h2>{statistics.pledge_count.toLocaleString()}</h2>
                <h3>PROJECTS</h3>
                <h3>AMOUNT RAISED</h3>
                <h3>PLEDGES</h3>      
                    
            </div>
            {/* {allProjects.map((projectData, key) => { */}
            <>

                <h2>Recent Projects</h2>   
                <div id='project-list'> 
                    { projectsSortedRecent.map((projectData, key) => {
                            return <ProjectCard key={key} projectData={projectData} />
                    })}
                </div>

                <h2>All Projects</h2>    
                <div id='project-list'> 
       
                    { projects.map((projectData, key) => {
                        endDate = Date.parse(projectData.date_end);
                        if (today < endDate) {
                        // only return open projects
                        // return <div key={key}>{projectData.title}</div>;
                            return <ProjectCard key={key} projectData={projectData} />

                        }
                    })}

                </div>
            </>
        </div>
    );
}

export default HomePage;