import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, parent }) {
    const { accessToken } = await parent();
    console.log(accessToken);

    const quantum_api_base = `${PUBLIC_MIAPEER_API_HOST}/quantum/v1/`;

    let accounts = [];

    // if (!isAuthenticated) {
    //     return {applications};
    // }

    const headers = {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqZXBuMTNAZ21haWwuY29tIiwiZXhwIjoxNjczMjM2ODM5fQ.oWjX4RDbKDkWRrjAZlPM6aL5abXalfBucwUPT7PyTEg'
    };

    const response = await fetch(`${quantum_api_base}/accounts`, { headers });
    // const response = await fetch(`http://localhost:8000/quantum/v1/accounts`, { method: 'GET', headers })
    // if (!response.ok) {
    //     console.log(response);
    //     console.log(response.statusText);
    //     return;
    // }

    accounts = await response.json();
    console.log(accounts);

    return { quantum_api_base, accounts: [] };
}
