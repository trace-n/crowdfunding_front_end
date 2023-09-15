async function putUser(userId, firstName, lastName, email, image ) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'image': image,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update account`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putUser;