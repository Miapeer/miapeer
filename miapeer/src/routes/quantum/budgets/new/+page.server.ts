import { redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const portfolioId = data.get('portfolioId');
        const budgetName = data.get('budgetName');
        const categoryId = data.get('categoryId');
        const categoryName = data.get('categoryName');
        const amount = unformatMoney(data.get('amount'));

        const requestData = {
            portfolio_id: portfolioId,
            name: budgetName,
            category_id: categoryId || null,
            category_name: categoryName || null,
            amount: amount ? amount : 0
        };

        const response = await fetch(`${locals.app.quantumApiBase}/budgets`, {
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
