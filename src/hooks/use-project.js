import { useState, useEffect } from 'react';
import getProject from '../api/get-project';

export default function useProject(projectId) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Pass projectId to getProject function
        getProject(projectId)
            .then((project) => {
                setProject(project);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass projectId to dependency array so hook will re-run if projectId changes 
    }, [projectId]);

    return { project, isLoading, error };
}