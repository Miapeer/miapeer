import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { portfolioId, accountName, startingBalance } = await request.json();

    const requestData = {
        portfolio_id: portfolioId,
        name: accountName,
        starting_balance: startingBalance
    };

    const response = await fetch(`${locals.app.quantumApiBase}/accounts`, {
        headers: locals.auth.headers,
        method: 'POST',
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
			accountName,
			startingBalance,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
