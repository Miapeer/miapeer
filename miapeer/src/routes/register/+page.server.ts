import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user.isAuthenticated) {
        // User is already logged in, send them to the home page
        throw redirect(303, '/');
    }
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const requestData = {
            email,
            password,
            disabled: false
        };

        const response = await fetch(`${locals.app.miapeerApiBase}/users`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error(response);
            return fail(401, responseData);
        }

        redirect(303, '/login');
    }
};
