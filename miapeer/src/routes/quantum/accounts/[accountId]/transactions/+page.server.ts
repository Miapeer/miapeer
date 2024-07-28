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

    // Get account transactions
    const accountTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions`,
        {
            headers: locals.auth.headers
        }
    );

    if (!accountTransactionResponse.ok) {
        console.error(accountTransactionResponse.statusText);
        return;
    }

    const transactions = await accountTransactionResponse.json();

    return { transactions };
};
