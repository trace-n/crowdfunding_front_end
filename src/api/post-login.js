async function postLogin(username, password) {
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
        // console.log('first key', Object.entries(data)[0]) ; //.key, 'first value', Object.entries(data)[0].value )
        // console.log(' value', Object.values(data)[0].toString() ) ; //.key, 'first value', Object.entries(data)[0].value )
        // errorMessage = `${response.status} - ${errorMessage}`; 

        // console.log('resp:', response.json(), data);
        // console.log("data", data, "non field",data.non_field_errors);
        throw new Error(errorMessage);
    }

    //  then can handle this in the front end without throwing the error
    // return {
    //     errors: [],
    //     response: await response.json(),
    // }

    return await response.json();
}

export default postLogin;