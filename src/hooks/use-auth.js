import { useContext } from 'react';

import { AuthContext } from '../components/AuthProvider';

export const useAuth = () => {
    // pass in context and create a custom hook that returns context auth and setAuth
    return useContext(AuthContext);
};