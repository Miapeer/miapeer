import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const { transactionTypeName } = await request.json();

    const requestData = {
        name: transactionTypeName
    };

    const response = await fetch(
        `${locals.app.quantumApiBase}/transaction-types/${params.transactionTypeId}`,
        {
            method: 'PATCH',
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
		request: {
			transactionTypeName,
		},
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
