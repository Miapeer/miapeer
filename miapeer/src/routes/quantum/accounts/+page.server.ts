import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, parent }) {
    // const { accessToken } = await parent();
    // console.log(accessToken);

    // let accounts = [];

    // // if (!isAuthenticated) {
    // //     return {applications};
    // // }

    // // const response = await fetch(`${PUBLIC_MIAPEER_API_HOST}/quantum/v1/accounts`, { headers })
    // const response = await fetch(`http://localhost:8000/quantum/v1/accounts`, { method: 'GET', headers: {
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqZXBuMTNAZ21haWwuY29tIiwiZXhwIjoxNjczMTk5OTEyfQ.NuIOLgFiXT6B8SPtfpIMsaP_hlqNl310IRS3dGjBcMs',
    // } })
    // if (!response.ok) {
    //     console.log(response);
    //     console.log(response.statusText);
    //     return;
    // }

    // accounts = await response.json();
    // console.log(accounts);
    
    // const filtered_applications = applications.filter((app) => app.display);

    // return {applications: filtered_applications};

    return {applications: null}
}
