import { useState, useEffect } from 'react';
import { getProjects, getProject, getStatistics } from '../api/projects';
// import getProject from '../api/projects';
// import getStatistics from '../api/projects';

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getProjects()
            .then((projects) => {
                setProjects(projects);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return {projects, isLoading, error, setProjects };

}

// import { useState, useEffect } from 'react';

export function useProject(projectId) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [pledges, setPledges] = useState([]);

    useEffect(() => {
        // Pass projectId to getProject function
        getProject(projectId)
            .then((project) => {
                setProject(project);
                setPledges(project.pledges);
                setIsLoading(false);
               
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass projectId to dependency array so hook will re-run if projectId changes 
    }, [projectId]);

    return { project, pledges, isLoading, error, setProject, setPledges };
}

// import { useState, useEffect } from 'react';
// import getStatistics from '../api/projects';

export function useStatistics() {
    const [statistics, setStatistics] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getStatistics()
            .then((statistics) => {
                setStatistics(statistics);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [] );

    return { statistics, isLoading, error };

}