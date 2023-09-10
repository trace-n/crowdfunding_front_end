async function deletePledge(pledgeId) {
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

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default deletePledge;