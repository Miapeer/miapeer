import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals, params }) => {
    // Get account details
    // TODO: Do I really need to fetch the account details? Why can't I just pass it from the parent page?
    const accountResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}`,
        {
            headers: locals.auth.headers
        }
    );

    if (!accountResponse.ok) {
        console.error(accountResponse.statusText);
        return;
    }

    const account = await accountResponse.json();

    // Get account scheduled transactions
    const accountScheduledTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/scheduled-transactions`,
        {
            headers: locals.auth.headers
        }
    );

    if (!accountScheduledTransactionResponse.ok) {
        console.error(accountScheduledTransactionResponse.statusText);
        return;
    }

    const scheduledTransactions = await accountScheduledTransactionResponse.json();

    return { account, scheduledTransactions };
};
