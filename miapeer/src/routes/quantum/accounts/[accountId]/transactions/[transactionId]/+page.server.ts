import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const transactionResponse = await fetch(
        `${locals.app.quantumApiBase}/accounts/${params.accountId}/transactions/${params.transactionId}`,
        {
            headers: locals.auth.headers
        }
    );

    if (!transactionResponse.ok) {
        console.error(transactionResponse.statusText);
        return;
    }

    const transaction = await transactionResponse.json();

    return { transaction };
};
