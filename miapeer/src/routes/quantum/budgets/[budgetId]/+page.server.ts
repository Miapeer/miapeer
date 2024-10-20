import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { unformatMoney } from '@quantum/util';

export const load: PageServerLoad = async ({ locals, params }) => {
    const budgetResponse = await fetch(`${locals.app.quantumApiBase}/budgets/${params.budgetId}`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!budgetResponse.ok) {
        console.error(budgetResponse.statusText);
        return;
    }

    const budget = await budgetResponse.json();

    return { budget };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
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

        const response = await fetch(`${locals.app.quantumApiBase}/budgets/${params.budgetId}`, {
            method: 'PATCH',
            headers: locals.auth.headers,
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error(response);
            return fail(401, responseData);
        }

        redirect(303, '.');
    },

    delete: async ({ request, locals, params }) => {
        const response = await fetch(`${locals.app.quantumApiBase}/budgets/${params.budgetId}`, {
            method: 'DELETE',
            headers: locals.auth.headers
        });

        if (!response) {
            throw error(500, 'Invalid request data');
        } else if (!response.ok) {
            throw error(response?.status, await response?.json());
        }

        return { success: true };
    }
};
