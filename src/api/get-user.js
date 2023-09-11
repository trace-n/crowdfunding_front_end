async function getUser(userId) {
    // GET single project id
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching user id ${userId}`;
        console.log("response",response);

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getUser;