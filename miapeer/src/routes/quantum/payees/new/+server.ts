import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { portfolioId, payeeName } = await request.json();

    const requestData = {
        portfolio_id: portfolioId,
        name: payeeName
    };

    const response = await fetch(`${locals.app.quantumApiBase}/payees`, {
        method: 'POST',
        headers: locals.auth.headers,
        body: JSON.stringify(requestData)
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    return json({
		request: {
            portfolioId,
			payeeName,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
