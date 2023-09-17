import { useState, useEffect } from 'react';
import { getPledge } from '../api/pledges';

export function usePledge(pledgeId) {
    const [pledge, setPledge] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Pass pledgeId to getPledge function
        getPledge(pledgeId)
            .then((pledge) => {
                setPledge(pledge);
                setIsLoading(false);
               
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass pledgeId to dependency array so hook will re-run if pledgeId changes 
    }, [pledgeId]);

    return { pledge, isLoading, error, setPledge };
}