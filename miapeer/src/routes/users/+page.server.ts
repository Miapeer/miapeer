import { error, fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // TODO: Move headers into private env var or something of the like

    const headers = {
        Authorization: `Bearer ${env.accessToken}`
    }

    // Applications
    const applicationsResponse = await fetch(`${env.miapeerApiBase}/applications`, { headers });

    if (!applicationsResponse.ok) {
        console.error(applicationsResponse.statusText);
        return;
    }

    const applications = applicationsResponse.json();

    // Roles
    const rolesResponse = await fetch(`${env.miapeerApiBase}/roles`, { headers });

    if (!rolesResponse.ok) {
        console.error(rolesResponse.statusText);
        return;
    }

    const roles = rolesResponse.json();

    // Application Roles
    const applicationRolesResponse = await fetch(`${env.miapeerApiBase}/application-roles`, { headers });

    if (!applicationRolesResponse.ok) {
        console.error(applicationRolesResponse.statusText);
        return;
    }

    const applicationRoles = applicationRolesResponse.json();

    // Users
    const usersResponse = await fetch(`${env.miapeerApiBase}/users`, { headers });

    if (!usersResponse.ok) {
        console.error(usersResponse.statusText);
        return;
    }

    const users = usersResponse.json();

    // Permissions
    const permissionsResponse = await fetch(`${env.miapeerApiBase}/permissions`, { headers });

    if (!permissionsResponse.ok) {
        console.error(permissionsResponse.statusText);
        return;
    }

    const permissions = permissionsResponse.json();


    return {applications, roles, applicationRoles, users, permissions};

    // // TODO
    // const responseData = await response.json();
    // if (responseData['token_type'] !== 'bearer') {
    //     console.error(responseData);
    //     // return fail(400, { email: "something", missing: true });
    //     throw error(400, { email: "something", missing: true })
    // }

    // const accessToken = responseData['access_token']

    // // if (!user) {
    // //     return fail(400, { email, missing: true });
    // // }

    // // if (user.password !== hash(password)) {
    // //     return fail(400, { email, incorrect: true });
    // // }


    // // Success

    // cookies.set('MAT', accessToken, {
    //     path: '/',  // send cookie for every page
    //     httpOnly: true, // server side only cookie so you can't use `document.cookie`
    //     sameSite: 'strict', // only requests from same site can send cookies (https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
    //     secure: process.env.NODE_ENV === 'production',  // only sent over HTTPS in production
    //     maxAge: 60 * 60 * 24 * 7,  // set cookie to expire after a week
    //     })

    // // Go to the place we were told to go
    // if (url.searchParams.has('redirectTo')) {
    //     throw redirect(303, url.searchParams.get('redirectTo'));
    // }

    // // Return to the home page
    // throw redirect(303, '/');
}
