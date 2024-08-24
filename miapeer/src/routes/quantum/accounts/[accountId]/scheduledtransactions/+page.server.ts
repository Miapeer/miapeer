import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals, params }) => {
    depends('quantum:scheduledtransactions');

    // Get account scheduled transactions
    const accountScheduledTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!accountScheduledTransactionResponse.ok) {
        console.error(accountScheduledTransactionResponse.statusText);
        return;
    }

    const scheduledTransactions = await accountScheduledTransactionResponse.json();

    return { scheduledTransactions };
};
