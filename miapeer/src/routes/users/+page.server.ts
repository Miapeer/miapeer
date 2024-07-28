import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals }) => {
    depends('miapeer:permissions');

    // Applications
    const applicationsResponse = await fetch(`${locals.app.miapeerApiBase}/applications/`, {
        headers: locals.auth.headers
    });

    if (!applicationsResponse.ok) {
        console.error(applicationsResponse.statusText);
        return;
    }

    const applications = await applicationsResponse.json();

    // Roles
    const rolesResponse = await fetch(`${locals.app.miapeerApiBase}/roles/`, {
        headers: locals.auth.headers
    });

    if (!rolesResponse.ok) {
        console.error(rolesResponse.statusText);
        return;
    }

    const roles = await rolesResponse.json();

    // Application Roles
    const applicationRolesResponse = await fetch(
        `${locals.app.miapeerApiBase}/application-roles/`,
        { headers: locals.auth.headers }
    );

    if (!applicationRolesResponse.ok) {
        console.error(applicationRolesResponse.statusText);
        return;
    }

    const applicationRoles = await applicationRolesResponse.json();

    // Users
    const usersResponse = await fetch(`${locals.app.miapeerApiBase}/users/`, {
        headers: locals.auth.headers
    });

    if (!usersResponse.ok) {
        console.error(usersResponse.statusText);
        return;
    }

    const users = await usersResponse.json();

    // Permissions
    const permissionsResponse = await fetch(`${locals.app.miapeerApiBase}/permissions/`, {
        headers: locals.auth.headers
    });

    if (!permissionsResponse.ok) {
        console.error(permissionsResponse.statusText);
        return;
    }

    const permissions = await permissionsResponse.json();

    return { applications, roles, applicationRoles, users, permissions };
};
