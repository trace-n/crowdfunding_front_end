async function getProjects() {
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

export default getProjects;