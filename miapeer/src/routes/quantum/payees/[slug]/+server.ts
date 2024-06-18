import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { payeeId, payeeName } = await request.json();

    const requestData = {
        name: payeeName
    };

    const response = await fetch(`${locals.app.quantumApiBase}/payees/${payeeId}`, {
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
            payeeId,
			payeeName,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
