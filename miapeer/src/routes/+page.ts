import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, parent }) {
    const { isAuthenticated } = await parent();

    let applications = [];

    console.log('new');
    // console.log(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/applications`);
    console.log("https://api.miapeer.com/miapeer/v1/applications");

    if (!isAuthenticated) {
        return {applications};
    }

    // const response = await fetch(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/applications`)
    const response = await fetch("https://api.miapeer.com/miapeer/v1/applications")
    console.log(response);
    applications = await response.json();
    console.log(applications);
    
    const filtered_applications = applications.filter((app) => app.display);

    return {applications: filtered_applications};
}
