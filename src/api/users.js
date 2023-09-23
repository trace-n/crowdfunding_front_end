export async function getUser(userId) {
    // GET single project id
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching user id ${userId}`;
        console.log("response",response);

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        let errorMessage = data?.detail ?? fallbackError;

        errorMessage = `${response.status} - ${errorMessage}`; 
        
        throw new Error(errorMessage);
    }

    return await response.json();
}


export async function getUsers() {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching users`;
        
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        
        const errorMessage = data?.detail ?? fallbackError;

        throw new Error(errorMessage);
    }

    return await response.json();
}


export async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, { method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to login`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        let errorMessage = data?.non_field_errors ?? fallbackError;

        errorMessage = Object.values(data)[0].toString();
        throw new Error(errorMessage);
    }

    return await response.json();
}


export async function postSignup(username, password, first_name, last_name, email, image ) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, { method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'image': image,
            'password': password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to signup`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function putUser(userId, firstName, lastName, email, image ) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'image': image,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update account`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

