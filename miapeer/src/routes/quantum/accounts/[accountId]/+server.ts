import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const { accountName, startingBalance } = await request.json();

    const requestData = {
        name: accountName,
        starting_balance: startingBalance
    };

    const response = await fetch(`${locals.app.quantumApiBase}/accounts/${params.accountId}`, {
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
			accountName,
			startingBalance,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
