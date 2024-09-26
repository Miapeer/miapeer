import { redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
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
            `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions`,
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
