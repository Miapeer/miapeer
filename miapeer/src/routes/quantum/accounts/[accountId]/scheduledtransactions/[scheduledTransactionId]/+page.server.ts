import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const load: PageServerLoad = async ({ locals, params }) => {
    const scheduledTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!scheduledTransactionResponse.ok) {
        console.error(scheduledTransactionResponse.statusText);
        return;
    }

    const scheduledTransaction = await scheduledTransactionResponse.json();
    return { scheduledTransaction };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const transactionTypeId = data.get('transactionTypeId');
        const transactionTypeName = data.get('transactionTypeName');
        const payeeId = data.get('payeeId');
        const payeeName = data.get('payeeName');
        const categoryId = data.get('categoryId');
        const categoryName = data.get('categoryName');
        const fixedAmount = unformatMoney(data.get('fixedAmount'));
        const estimateOccurrences = data.get('estimateOccurrences');
        const promptDays = data.get('promptDays');
        const startDate = data.get('startDate');
        const endDate = data.get('endDate');
        const limitOccurrences = data.get('limitOccurrences');
        const repeatOptionId = data.get('repeatOptionId');
        const onAutopay = data.get('onAutopay');
        const notes = data.get('notes');

        const requestData = {
            transaction_type_id: transactionTypeId || null,
            transaction_type_name: transactionTypeName || null,
            payee_id: payeeId || null,
            payee_name: payeeName || null,
            category_id: categoryId || null,
            category_name: categoryName || null,
            fixed_amount: fixedAmount || null,
            estimate_occurrences: estimateOccurrences || null,
            prompt_days: promptDays || null,
            start_date: startDate ? startDate : new Date().toISOString().slice(0, 10),
            end_date: endDate || null,
            limit_occurrences: limitOccurrences || null,
            repeat_option_id: repeatOptionId || null,
            on_autopay: !!onAutopay,
            notes: notes || null
        };

        const response = await fetch(
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}`,
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
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}`,
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
    },

    createtransaction: async ({ locals, params }) => {
        const requestData = {
            override_transaction_data: null
        };

        // TODO: override_transaction_data

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
            return fail(401, responseData);
        }

        redirect(303, `/quantum/accounts/${params.accountId}/transactions/${responseData.transaction_id}`);

        return { success: true };
    },

    skipiteration: async ({ request, locals, params }) => {
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
            return fail(401, responseData);
        }

        return { success: true };
    }
};
