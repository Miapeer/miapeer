import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url, params }) => {
    const {
        transactionDate,
        clearDate,
        transactionTypeId,
        payeeId,
        categoryId,
        excludeFromForecast,
        amount,
        checkNumber,
        notes
    } = await request.json();

    const requestData = {
        transaction_date: transactionDate ? transactionDate : new Date().toISOString().slice(0, 10),
        clear_date: clearDate,
        transaction_type_id: transactionTypeId,
        payee_id: payeeId,
        category_id: categoryId,
        exclude_from_forecast: excludeFromForecast,
        amount: amount ? amount : 0,
        check_number: checkNumber,
        notes
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
        throw error(401, responseData);
    }

    return json({
		request: { accountId: params.accountId, transactionTypeId, payeeId, categoryId, excludeFromForecast, amount, transactionDate, clearDate, checkNumber, notes },
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
