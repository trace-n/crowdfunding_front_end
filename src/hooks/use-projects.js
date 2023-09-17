import { useState, useEffect } from 'react';
import getProjects from '../api/get-projects';

export default function useProjects() {
    // Use useState hook to create state variable called projects and a 
    // function to update called setProjects.
    // Initialise state variables wtih empty array
    const [projects, setProjects] = useState([]);
    // Create state variable called isLoading and error to keep track
    // of loading state and errors that may occur
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    // useEffect hook to fetch projects from API and update state vars
    // useEffect runs only once, when component this hook used in is mounted
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

    // Return state variables and error. As state in hook changes, it will
    // update these values and component using this hook will re-render.
    return {projects, isLoading, error };
}