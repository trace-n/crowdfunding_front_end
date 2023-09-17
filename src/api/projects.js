export async function getProject(projectId) {
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


// export default getProject;

export async function getProjects() {
    // create URL for request Vite environment variable and API endpoint
    const url = `${import.meta.env.VITE_API_URL}/projects/`;

    // call fetch function, pass in URL and method. Set 'GET' method to fetch data 
    // returns a "promise" 
    // If promise "resolves" (i.e. if backend response) we will get data we will get 
    // data we need in `response' variable. If back end fails to respond, we get an error
    const response = await fetch(url, { method: "GET" });

    // Use `ok` property on `response` to check if request successful
    // If not successful, return an error
    if (!response.ok) {
        const fallbackError = "Error fetching projects";

        // Use `await` keyword to signal to Javascript not to run code until 
        // `response` turned into JSON
        const data = await response.json().catch(() => {
            // If response is not JSON, throw a generic error. `catch` triggers 
            // if `response` not turned into JSON
                throw new Error(fallbackError);
        });

        // If error response *is* JSON, include the info from JSON in throw error
        // Usually, server sends error message in `detail` property. 
        // If not configured back edn to use `detail` property, can use property `message`
        // const errorMessage = data?.detail ?? fallbackError;
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    // if request successful, return data from response
    // Turn response to JSON takes time, use `awai` keyword
    return await response.json(); 

}

// export default getProjects;

export async function getStatistics() {
    const url = `${import.meta.env.VITE_API_URL}/projects/statistics/`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = `Error fetching project statistics`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

// export default getStatistics;

// import { useAuth } from '../hooks/use-auth';

export async function postProject(title, description, goal, image, date_end ) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const userToken = window.localStorage.getItem('token');
    
    const response = await fetch(url, { method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,            
            // 'Authentication': 'Token ' + userToken,   
            // 'mode': 'cors',
            // 'Access-Control-Allow-Origin':'*',         
        },
        body: JSON.stringify({
            'title': title,
            'description': description,
            'goal': goal,
            'image': image,
            'is_open': true,
            'date_end': date_end,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create new project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        console.log(response);
        throw new Error(errorMessage);
    }

    return await response.json();
}

// export default postProject;

export async function putProject(id, title, description, goal, image, date_end ) {
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

// export default putProject;