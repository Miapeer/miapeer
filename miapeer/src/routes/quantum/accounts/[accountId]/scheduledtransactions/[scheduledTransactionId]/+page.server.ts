import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const scheduledTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions/${params.scheduledTransactionId}`,
        {
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
