import { convertArrayToObject } from '@quantum/util';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals, params, url }) => {
    console.log('load');

    depends('quantum:transactions');

    // Get account transactions
    const limitMonths = url.searchParams.get('limitmonths') ?? 6;

    console.log('limitMonths: ' + limitMonths);

    const accountTransactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions?limit_months=${limitMonths}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    console.log('accountTransactionResponse: ' + JSON.stringify(accountTransactionResponse));

    // if (!accountTransactionResponse.ok) {
    //     console.error(accountTransactionResponse.statusText);
    //     return { transactions: {} };
    // }

    // console.log('response status ok');

    // const data = await accountTransactionResponse.json();

    // console.log(data);

    // const indexedData = convertArrayToObject(data, 'transaction_id');

    // console.log(indexedData);

    // return { transactions: data, indexedTransactions: indexedData };
    return { transactions: [], indexedTransactions: {} };
};
