import { createContext, useState } from 'react';

// Create context for authprovider to know if user has logged in
export const AuthContext = createContext();

// Create component to wrap app so all children can access teh context with this hook
export const AuthProvider = (props) => {
    // Using object for the state, add more properties to the state later like user id
    const [auth, setAuth] = useState({
        // Initialise the context with token from local storage even if user refreshes
        token: window.localStorage.getItem('token'),
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
}