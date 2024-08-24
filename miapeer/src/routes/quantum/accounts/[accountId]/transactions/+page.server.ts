import { convertArrayToObject } from '@quantum/util';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals, params }) => {
    depends('quantum:transactions');

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
    return { transactions: data, indexedTransactions: indexedData };
};
