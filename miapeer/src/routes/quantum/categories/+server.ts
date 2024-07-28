import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ request, locals }) => {
    const { categoryId: categoryId } = await request.json();

    let response;

    if (categoryId) {
        response = await fetch(`${locals.app.quantumApiBase}/categories/${categoryId}`, {
            method: 'DELETE',
            headers: locals.auth.headers
        });
    }

    if (!response) {
        throw error(500, 'Invalid request data');
    } else if (!response.ok) {
        throw error(response?.status, await response?.json());
    }

    return json({
		response: await response.json()
	});

    // prettier-ignore
}) satisfies RequestHandler;
