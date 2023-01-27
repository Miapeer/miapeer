import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user.isAuthenticated) {
        throw redirect(303, '/');
    }
}

export const actions: Actions = {
    default: async ({ cookies }) => {
        console.log('logout');

        cookies.set('MAT', '', {
            path: '/',
            expires: new Date(0)
        });

        throw redirect(303, '/');    
    }
}