import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const {
        transactionTypeId,
        payeeId,
        categoryId,
        fixedAmount,
        estimateOccurrences,
        promptDays,
        startDate,
        endDate,
        limitOccurrences,
        repeatOptionId,
        onAutopay,
        notes
    } = await request.json();

    const requestData = {
        transaction_type_id: transactionTypeId,
        payee_id: payeeId,
        category_id: categoryId,
        fixed_amount: fixedAmount,
        estimate_occurrences: estimateOccurrences,
        prompt_days: promptDays,
        start_date: startDate,
        end_date: endDate,
        limit_occurrences: limitOccurrences,
        repeat_option_id: repeatOptionId,
        on_autopay: onAutopay,
        notes
    };

    const response = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}`,
        {
            headers: locals.auth.headers,
            method: 'PATCH',
            body: JSON.stringify(requestData)
        }
    );

    const responseData = await response.json();

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    return json({
		request: requestData,
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
