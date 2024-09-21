import { redirect, fail } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const portfolioId = data.get('portfolioId');
        const payeeName = data.get('payeeName');

        const requestData = {
            portfolio_id: portfolioId,
            name: payeeName
        };

        const response = await fetch(`${locals.app.quantumApiBase}/payees`, {
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
