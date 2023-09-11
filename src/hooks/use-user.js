import { useState, useEffect } from 'react';
import getUser from '../api/get-user';

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Pass projectId to getProject function
        getUser(userId)
            .then((user) => {
                setUser(user);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
            
            // Pass userId to dependency array so hook will re-run if userId changes 
    }, [userId]);

    return { user, isLoading, error };
}