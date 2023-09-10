import { useState, useEffect } from 'react';
import delPledge from '../api/del-pledge';

export default function useDelPledge(pledgeId) {
    const [pledge, setPledge] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Pass projectId to getProject function
        delPledge(pledgeId)
            .then((pledge) => {
                setPledge(pledge);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass pledgeId to dependency array so hook will re-run if projectId changes 
    }, [pledgeId]);

    return { pledge, isLoading, error };
}