import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const response = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}/skip-iteration`,
        {
            method: 'POST',
            headers: locals.auth.headers
        }
    );

    const responseData = await response.json();

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    return json({
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
