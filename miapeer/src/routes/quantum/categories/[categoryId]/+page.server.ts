import type { PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
    const categoryResponse = await fetch(
        `${locals.app.quantumApiBase}/categories/${params.categoryId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!categoryResponse.ok) {
        console.error(categoryResponse.statusText);
        return;
    }

    const category = await categoryResponse.json();

    return { category };
};

export const actions: Actions = {
    update: async ({ request, locals, params }) => {
        const data = await request.formData();
        const categoryName = data.get('categoryName');

        const requestData = {
            name: categoryName
        };

        const response = await fetch(
            `${locals.app.quantumApiBase}/categories/${params.categoryId}`,
            {
                method: 'PATCH',
                headers: locals.auth.headers,
                body: JSON.stringify(requestData)
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            console.error(response);
            return fail(401, responseData);
        }

        redirect(303, '.');
    },

    delete: async ({ request, locals, params }) => {
        const response = await fetch(
            `${locals.app.quantumApiBase}/categories/${params.categoryId}`,
            {
                method: 'DELETE',
                headers: locals.auth.headers
            }
        );

        if (!response) {
            throw error(500, 'Invalid request data');
        } else if (!response.ok) {
            throw error(response?.status, await response?.json());
        }

        return { success: true };
    }
};
