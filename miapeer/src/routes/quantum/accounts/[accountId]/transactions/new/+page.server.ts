import { redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
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
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions`,
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

        redirect(303, '.');
    }
};
