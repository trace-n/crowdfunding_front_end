export async function deletePledge(pledgeId) {
    // DELETE single pledge
    const userToken = window.localStorage.getItem('token');
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`;

    const response = await fetch(url, { method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        }, 
    });
    
    if (!response.ok) {
        const fallbackError = `Error deleting pledge with id ${pledgeId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        let errorMessage = data?.detail ?? fallbackError;
        errorMessage = `${response.status} - ${errorMessage}`; 
        throw new Error(errorMessage);
    }

    return await response.status;
}

// export default deletePledge;

export async function getPledge(id) {
    // GET single project id
    const url = `${import.meta.env.VITE_API_URL}/pledges/${id}/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching pledge with id ${id}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        let errorMessage = data?.detail ?? fallbackError;
        errorMessage = `${response.status} - ${errorMessage}`; 
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function getPledges() {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching pledges`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        let errorMessage = data?.detail ?? fallbackError;
        errorMessage = `${response.status} - ${errorMessage}`; 
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function postPledge(amount, comment, anonymous, project ) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            'amount': amount,
            'comment': comment,
            'anonymous': anonymous,
            'project': project,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        let errorMessage = data?.detail ?? fallbackError;
        errorMessage = `${response.status} - ${Object.keys(data)[0].toString()} ${Object.values(data)[0].toString()}`; 
        throw new Error(errorMessage);
    }

    return await response.json();
}

// export default postPledge;

export async function putPledge(id, amount, comment, anonymous, project ) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/${id}/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            'amount': amount,
            'comment': comment,
            'anonymous': anonymous,
            'project': project,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

// export default putPledge;