import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {
    const { userId, applicationRoleId, permissionId, permit } = await request.json();

    let response;

    if (permit) {
        if (userId && applicationRoleId) {
            const data = JSON.stringify({
                user_id: userId,
                application_role_id: applicationRoleId,
            });

            response = await fetch(`${locals.app.miapeerApiBase}/permissions`, {
                method: 'POST',
                body: data,
                headers: locals.auth.headers,
            })
        }
    }
    else {
        if (permissionId) {
            response = await fetch(`${locals.app.miapeerApiBase}/permissions/${permissionId}`, {
                method: 'DELETE'
            })
        }
    }

    if (!response) {
        throw error(500, "Invalid request data");
    }
    else if (!response.ok) {
        throw error(response?.status, await response?.json());
    }

    return json({success: true});
}) satisfies RequestHandler;