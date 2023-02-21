import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
    let applications = [];

    // TODO: Why does protocol switch to http on its own? This is causing errors.

    // console.log(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/applications`);
    // console.log("https://api.miapeer.com/miapeer/v1/applications");

    if (!locals.user.isAuthenticated) {
        return { applications };
    }

    const response = await fetch(`${locals.app.miapeerApiBase}/applications/`, {
        headers: locals.auth.headers
    });

    applications = await response.json();

    const filtered_applications = applications.filter((app) => app.display);

    return { applications: filtered_applications };
};
