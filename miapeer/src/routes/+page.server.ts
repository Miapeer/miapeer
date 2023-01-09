import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public'

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, parent }) {
    const { isAuthenticated } = await parent();

    let applications = [];

    // TODO: Why does protocol switch to http on its own? This is causing errors.

    // console.log(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/applications`);
    // console.log("https://api.miapeer.com/miapeer/v1/applications");

    if (!isAuthenticated) {
        return {applications};
    }



    const response = await fetch(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/applications`);
    // const response = await fetch("https://api.miapeer.com/miapeer/v1/applications");
    // const response = await fetch("https://api.ipify.org?format=json");
    // const res = await response.json();
    // console.log(res);

    applications = await response.json();
    
    const filtered_applications = applications.filter((app) => app.display);
    // const filtered_applications = applications.filter((app) => true);

    return {applications: filtered_applications};
}
