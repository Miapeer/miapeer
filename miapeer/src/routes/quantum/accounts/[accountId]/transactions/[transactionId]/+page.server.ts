import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const load: PageServerLoad = async ({ locals, params }) => {
    const transactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions/${params.transactionId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!transactionResponse.ok) {
        console.error(transactionResponse.statusText);
        return;
    }

    const transaction = await transactionResponse.json();

    return { transaction };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const transactionDate = data.get('transactionDate');
        const clearDate = data.get('clearDate');
        const transactionTypeId = data.get('transactionTypeId');
        const transactionTypeName = data.get('transactionTypeName');
        const payeeId = data.get('payeeId');
        const payeeName = data.get('payeeName');
        const categoryId = data.get('categoryId');
        const categoryName = data.get('categoryName');
        const excludeFromForecast = data.get('excludeFromForecast');
        const amount = unformatMoney(data.get('amount'));
        const checkNumber = data.get('checkNumber');
        const notes = data.get('notes');

        const requestData = {
            transaction_date: transactionDate
                ? transactionDate
                : new Date().toISOString().slice(0, 10),
            clear_date: clearDate || null,
            transaction_type_id: transactionTypeId || null,
            transaction_type_name: transactionTypeName || null,
            payee_id: payeeId || null,
            payee_name: payeeName || null,
            category_id: categoryId || null,
            category_name: categoryName || null,
            exclude_from_forecast: !!excludeFromForecast,
            amount: amount ? amount : 0,
            check_number: checkNumber || null,
            notes: notes || null
        };

        const response = await fetch(
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions/${params.transactionId}`,
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

    delete: async ({ locals, params }) => {
        const response = await fetch(
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions/${params.transactionId}`,
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
