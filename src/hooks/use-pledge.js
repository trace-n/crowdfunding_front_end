import { useState, useEffect } from 'react';
import { getPledge, getPledges } from '../api/pledges';

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

export function usePledges() {
    const [pledges, setPledges] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Pass  to getPledge function
        getPledges()
            .then((pledges) => {
                setPledges(pledges);
                setIsLoading(false);
               
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass  to dependency array so hook will re-run if  changes 
    }, []);

    return { pledges, isLoading, error, setPledges };
}