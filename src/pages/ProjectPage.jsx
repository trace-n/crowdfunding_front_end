// import { oneProject } from '../data';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';
import './ProjectPage.css';

const ProjectPage = () => {
    // use hook in react router called `useParams` to get id from URL to pass to useProject hook

    const { id } = useParams();
    // useProject returns 3 params
    const { project, isLoading, error } = useProject(id);

    // console.log(isLoading);

    if (isLoading) {
        return (<p>loading...</p>);
    }

    if (error) {
        return (<p>{error.message}</p>);
    }

    // console.log(project.pledges, project)
    const today = Date.parse(new Date());
    const endDate = Date.parse(project.date_end);
    // console.log(today, endDate);
    // console.log(today > endDate);
    let daysToGo;
    if ( today < endDate ) {
        // convert the time difference in milliseconds back to days
        daysToGo = Math.ceil((endDate - today) / (1000 * 3600 * 24));
        // console.log(daysToGo);
    } 

    return (
        <div>
        <div>
            <h2>{project.title}</h2>
        </div>    
        <div className='project-detail'>
            {/* <h2>{oneProject.title}</h2>
            <h3>Created at: {oneProject.date_created}</h3>
            <h3>{`Status: ${oneProject.is_open}`}</h3>
            <h3>Pledges:</h3>
            <ul>
                {oneProject.pledges.map((pledgeData, key) => { */}
            <section><img src={project.image} alt='project image'></img></section>
            <section>

            <h2>Goal: $ {project.goal}</h2>
            <h3>Created By: {project.owner}</h3>
            <h3>Created at: {project.date_created}</h3>
            <h3>Changed at: {project.date_changed}</h3>
            
            <h3>End Date: {project.date_end}</h3>
            {/* <h3>{`Status: ${project.is_open}`}</h3> */}
            <h3>{`${ today < endDate ? `Days to Go: ${daysToGo}`: 'Project Ended'}`}</h3>
            <p>{project.description}</p>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            </section>
        </div>
        </div>
    );
}

export default ProjectPage;