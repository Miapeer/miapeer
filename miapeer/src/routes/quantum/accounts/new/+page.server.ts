import { redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const portfolioId = data.get('portfolioId');
        const accountName = data.get('accountName');
        const startingBalance = unformatMoney(data.get('startingBalance'));

        const requestData = {
            portfolio_id: portfolioId,
            name: accountName,
            starting_balance: startingBalance
        };

        const response = await fetch(`${locals.app.quantumApiBase}/accounts`, {
            method: 'POST',
            headers: locals.auth.headers,
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error(response);
            return fail(401, responseData);
        }

        redirect(303, '.');
    }
};
