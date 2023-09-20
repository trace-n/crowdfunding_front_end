async function postPledge(amount, comment, anonymous, project ) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const userToken = window.localStorage.getItem('token');

    const response = await fetch(url, { method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken,               
        },
        body: JSON.stringify({
            'amount': amount,
            'comment': comment,
            'anonymous': anonymous,
            'project': project,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;

        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postPledge;