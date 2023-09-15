import { Link } from 'react-router-dom';
import './style.css';

const ProjectCard = (props) => {
    const { projectData } = props;
    const projectLink = `/project/${projectData.id}`;

    return (
        <div className='project-card'>
            {/* <Link to='/project'> */}
            <Link to={projectLink}>
                <img src={projectData.image} />
                <h3>{projectData.title}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;