async function getProject(projectId) {
    // GET single project id
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        const fallbackError = `Error fetching project with id ${projectId}`;

        const data = await response.json().catch(() => {
            console.log("awaitput project error response status", response,  data, response.status, response.statusText);
            throw new Error(fallbackError);
        });

        let errorMessage = data?.detail ?? fallbackError;
        // console.log("error message put project response.json", response, data, response.status, response.statusText);
        errorMessage = `${response.status} - ${errorMessage}`; 
        // return (errorMessage, response.status);
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getProject;