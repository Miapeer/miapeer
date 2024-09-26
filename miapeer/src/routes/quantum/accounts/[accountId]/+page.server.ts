import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const load: PageServerLoad = async ({ locals, params }) => {
    const accountResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!accountResponse.ok) {
        console.error(accountResponse.statusText);
        return;
    }

    const account = await accountResponse.json();

    return { account };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const accountName = data.get('accountName');
        const startingBalance = unformatMoney(data.get('startingBalance'));

        const requestData = {
            name: accountName,
            starting_balance: startingBalance
        };

        const response = await fetch(`${locals.app.quantumApiBase}/accounts/${params.accountId}`, {
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
        const response = await fetch(`${locals.app.quantumApiBase}/accounts/${params.accountId}`, {
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
