import { Link } from 'react-router-dom';
import './style.css';
import { useAuth } from '../../hooks/use-auth';
import DeleteProjectButton from '../DeleteProjectButton';

import { useState } from 'react';

const ProjectCard = (props) => {
    const { projectData } = props;
    const {auth, setAuth} = useAuth();
       
    const editProjectLink = `/editProject/${projectData.id}`;
    const projectLink = `/project/${projectData.id}`;

    const today = Date.parse(new Date());
    const endDate = Date.parse(projectData.date_end);

    return (
        <div className='project-card'>
            <Link to={projectLink}>
                <img src={projectData.image} />
            </Link>    
                <h3>
                <Link to={projectLink}>
                    {projectData.title}
                    { ( today > endDate && 
                        ` (ended)`
                    )}
                </Link>    
                    { parseInt(auth.id) === projectData.owner && 
                    <div className='project-icons'>
                        <Link to={editProjectLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="small-icons">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                        </Link>
                        <DeleteProjectButton 
                                id={projectData.id}
                                onClick={() => props.onClick(projectData.id)}
                        />                              
                    </div>
                      }
                </h3>
        </div>
    );
}

export default ProjectCard;