import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { accountId, accountName, startingBalance } = await request.json();

    const requestData = {
        account_id: accountId,
        name: accountName,
        starting_balance: startingBalance
    };

    const response = await fetch(`${locals.app.quantumApiBase}/accounts/${accountId}`, {
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
            accountId,
			accountName,
			startingBalance,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
