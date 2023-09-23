import { useState, useEffect } from 'react';
import { getUser, getUsers } from '../api/users';

export function useUsers() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUsers(users);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return {users, isLoading, error };
}

export function useUser(userId) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        
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

    return { user, isLoading, error, setUser };
}