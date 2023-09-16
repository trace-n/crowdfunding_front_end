async function putProject(id, title, description, goal, image, date_end ) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${id}/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            title,
            description,
            goal,
            image,
            date_end,
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

export default putProject;