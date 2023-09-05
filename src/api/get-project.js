async function getProject(projectId) {
    // GET single project id
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fecthing project with id ${projectId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getProject;