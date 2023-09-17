import { useState, useEffect } from 'react';
import { getUser, getUsers } from '../api/users';
// import getUser from '../api/users';

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

// import { useState, useEffect } from 'react';
// import getUser from '../api/users';

export function useUser(userId) {
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
                // console.log('use-user error', error);
            });
            
            // Pass userId to dependency array so hook will re-run if userId changes 
    }, [userId]);

    return { user, isLoading, error, setUser };
}