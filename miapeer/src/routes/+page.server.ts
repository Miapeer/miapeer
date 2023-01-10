import { env } from '$env/dynamic/private';

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

    const response = await fetch(`${env.miapeerApiBase}/applications`);

    applications = await response.json();
    
    const filtered_applications = applications.filter((app) => app.display);

    return {applications: filtered_applications};
}
