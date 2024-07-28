import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user.isAuthenticated) {
        // User is already logged in, send them to the home page
        throw redirect(303, '/');
    }
};
