// import { useAuth } from '../hooks/use-auth';

async function postProject(title, description, goal, image, date_end ) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const userToken = window.localStorage.getItem('token');
    
    const response = await fetch(url, { method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,            
            // 'Authentication': 'Bearer ' + userToken,   
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
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postProject;