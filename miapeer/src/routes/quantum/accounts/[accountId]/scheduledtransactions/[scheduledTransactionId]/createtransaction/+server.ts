import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const requestData = {
        override_transaction_data: null
    };

    // override_transaction_data

    const response = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}/create-transaction`,
        {
            method: 'POST',
            headers: locals.auth.headers,
            body: JSON.stringify(requestData)
        }
    );

    const responseData = await response.json();

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    return json({
		request: requestData,
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
