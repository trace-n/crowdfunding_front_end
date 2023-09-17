// import { Link } from 'react-router-dom';
// import './style.css';
// import useProjects from '../../hooks/use-projects';
// import ProjectCard from '../ProjectCard';

const MyProjects = (props) => {

    // ======= NOT USED ==========
    // const userId = props.userId;
    // const { projectData } = props.projectData;
    // console.log('props/ user id', props, props.userId);
    // const projectLink = `projectDetail/${projectData.id}`;
    // const { projects, isLoading: isLoadingProjects, error: errorProjects } = useProjects();
    // console.log("looking for stats",isLoading,"error message", error);
    // if (isLoadingProjects) {
    //     return (<p>Loading ...</p>);
    // }

    // if (errorProjects) {
    //     return (<p>{errorProjects.message}</p>);
    // }    

// filter out projects just for the single user
    // console.log("userid", userId,'props',props.userId);
    // const filteredProjects = projects.filter((project) => project.owner == userId );
    // console.log('filteredproje:', filteredProjects);
    return (
        <div
             className='project-card'>
            {/* <Link to='/project'> */}
            <h1>My Projects</h1>
{/* 
            {filteredProjects.map((projectData, key) => {
                        // return <div key={key}>{projectData.title}</div>;
                        // return <ProjectCard key={key} projectData={projectData} />
                    })}             */}
            {/* <Link to={projectLink}>
                <img src={projectData.image} />
                <h3>{projectData.title}</h3>
            </Link> */}
        </div>
    );
}

export default MyProjects;