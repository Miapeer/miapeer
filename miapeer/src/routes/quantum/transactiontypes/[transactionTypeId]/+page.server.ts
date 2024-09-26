import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
    const transactionTypeResponse = await fetch(
        `${locals.app.quantumApiBase}/transaction-types/${params.transactionTypeId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!transactionTypeResponse.ok) {
        console.error(transactionTypeResponse.statusText);
        return;
    }

    const transactionType = await transactionTypeResponse.json();

    return { transactionType };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const transactionTypeName = data.get('transactionTypeName');

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
            return fail(401, responseData);
        }

        redirect(303, '.');
    },

    delete: async ({ request, locals, params }) => {
        const response = await fetch(
            `${locals.app.quantumApiBase}/transaction-types/${params.transactionTypeId}`,
            {
                method: 'DELETE',
                headers: locals.auth.headers
            }
        );

        if (!response) {
            throw error(500, 'Invalid request data');
        } else if (!response.ok) {
            throw error(response?.status, await response?.json());
        }

        return { success: true };
    }
};
