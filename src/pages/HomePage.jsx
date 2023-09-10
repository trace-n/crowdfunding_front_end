// import { allProjects } from '../data';
import useProjects from '../hooks/use-projects';
import useStatistics from '../hooks/use-statistics';
import ProjectCard from '../components/ProjectCard';
import './HomePage.css';
import fundlingLogo from '../assets/logo-no-background.png';

// import StatisticsCard from '../components/StatisticsCard';

const HomePage = () => {
    
    // make sure to declare the calls to hooks first before checking the isloading and errors

    const { statistics, isLoading: isLoadingStats, error: errorStats } = useStatistics();
    const { projects, isLoading: isLoadingProjects, error: errorProjects } = useProjects();

    // console.log("looking for stats",isLoading,"error message", error);
    if (isLoadingStats || isLoadingProjects) {
        return (<p>Loading ...</p>);
    }

    if (errorStats) {
        console.log(errorStats.message);
        return (<p>{errorStats.message}</p>);
    }    

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    }    
    
    // const pledge_amount_formatted = parseInt(statistics.pledge_amount).toLocaleString();

    return (
        <div className='home-box'>
        <section className='headline'>    
            <img src={fundlingLogo} alt='Fundling Logo'></img>
        </section>
        <div className='statistics-card'>
            {/* <div> */}
            {/* header block */}
            {/* <section className='statistics-card'> */}
            <h2>{statistics.project_count.toLocaleString()}</h2>
            <h2>$ {statistics.pledge_amount.toLocaleString()}</h2>
            {/* <h2>$ {pledge_amount_formatted}</h2> */}
            <h2>{statistics.pledge_count.toLocaleString()}</h2>
            <h3>PROJECTS</h3>
            <h3>AMOUNT RAISED</h3>
            <h3>PLEDGES</h3>      
                 
            {/* </section> */}
            </div>
            {/* {allProjects.map((projectData, key) => { */}
            <div id='project-list'>            
                {projects.map((projectData, key) => {
                    // return <div key={key}>{projectData.title}</div>;
                    return <ProjectCard key={key} projectData={projectData} />
                })}

            </div>
        </div>
    );
}

export default HomePage;