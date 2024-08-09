import { convertArrayToObject } from '@quantum/util';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals, params }) => {
    // Get account details
    // TODO: Do I really need to fetch the account details? Why can't I just pass it from the parent page?
    const accountResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}`,
        {
            method: 'GET',
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
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!accountTransactionResponse.ok) {
        console.error(accountTransactionResponse.statusText);
        return { transactions: {} };
    }

    const data = await accountTransactionResponse.json();
    const indexedData = convertArrayToObject(data, 'transaction_id');
    return { transactions: indexedData };
};
