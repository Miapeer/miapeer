import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
    const payeeResponse = await fetch(`${locals.app.quantumApiBase}/payees/${params.payeeId}`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!payeeResponse.ok) {
        console.error(payeeResponse.statusText);
        return;
    }

    const payee = await payeeResponse.json();

    return { payee };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const payeeName = data.get('payeeName');

        const requestData = {
            name: payeeName
        };

        const response = await fetch(`${locals.app.quantumApiBase}/payees/${params.payeeId}`, {
            method: 'PATCH',
            headers: locals.auth.headers,
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error(response);
            return fail(401, responseData);
        }

        redirect(303, '.');
    },

    delete: async ({ request, locals, params }) => {
        const response = await fetch(`${locals.app.quantumApiBase}/payees/${params.payeeId}`, {
            method: 'DELETE',
            headers: locals.auth.headers
        });

        if (!response) {
            throw error(500, 'Invalid request data');
        } else if (!response.ok) {
            throw error(response?.status, await response?.json());
        }

        return { success: true };
    }
};
