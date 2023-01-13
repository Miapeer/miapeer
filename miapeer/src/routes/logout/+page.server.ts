import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
    console.log('logout');

    cookies.set('MAT', '', {
        path: '/',
        expires: new Date(0)
    });

    throw redirect(303, '/');
}
