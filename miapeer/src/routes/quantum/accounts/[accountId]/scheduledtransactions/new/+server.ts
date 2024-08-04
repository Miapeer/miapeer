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
        start_date: startDate ? startDate : new Date().toISOString().slice(0, 10),
        end_date: endDate,
        limit_occurrences: limitOccurrences,
        repeat_option_id: repeatOptionId,
        on_autopay: onAutopay,
        notes
    };

    const response = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions`,
        {
            headers: locals.auth.headers,
            method: 'POST',
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
            accountId,
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
            notes,
        },
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
