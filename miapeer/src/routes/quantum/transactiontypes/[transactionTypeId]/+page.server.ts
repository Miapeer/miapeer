import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const transactionTypeResponse = await fetch(
        `${locals.app.quantumApiBase}/transaction-types/${params.transactionTypeId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!transactionTypeResponse.ok) {
        console.error(transactionTypeResponse.statusText);
        return;
    }

    const transactionType = await transactionTypeResponse.json();

    return { transactionType };
};
