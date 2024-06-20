import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { categoryId, categoryName } = await request.json();

    const requestData = {
        name: categoryName
    };

    const response = await fetch(`${locals.app.quantumApiBase}/categories/${categoryId}`, {
        headers: locals.auth.headers,
        method: 'PATCH',
        body: JSON.stringify(requestData)
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    return json({
		request: {
            categoryId,
			categoryName,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
