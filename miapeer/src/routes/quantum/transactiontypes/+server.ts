import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ request, locals }) => {
    const { transactionTypeId: transactionTypeId } = await request.json();

    let response;

    if (transactionTypeId) {
        response = await fetch(
            `${locals.app.quantumApiBase}/transaction-types/${transactionTypeId}`,
            {
                method: 'DELETE',
                headers: locals.auth.headers
            }
        );
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
