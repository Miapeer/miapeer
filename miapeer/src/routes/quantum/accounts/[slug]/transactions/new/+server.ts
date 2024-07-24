import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const {
        accountId,
        transactionTypeId,
        payeeId,
        categoryId,
        excludeFromForecast,
        amount,
        transactionDate,
        clearDate,
        checkNumber,
        note
    } = await request.json();

    console.log(request);
    console.log(url);

    const requestData = {
        transaction_type_id: transactionTypeId,
        payee_id: payeeId,
        category_id: categoryId,
        exclude_from_forecast: excludeFromForecast,
        amount,
        transaction_date: transactionDate,
        clear_date: clearDate,
        check_number: checkNumber,
        note
    };

    console.log(accountId);
    console.log(JSON.stringify(requestData));

    const response = await fetch(
        `${locals.app.quantumApiBase}/accounts/${accountId}/transactions`,
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
		request: { accountId, transactionTypeId, payeeId, categoryId, excludeFromForecast, amount, transactionDate, clearDate, checkNumber, note },
		response: responseData
	});

    // prettier-ignore
}) satisfies RequestHandler;
