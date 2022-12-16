import { redirect } from '@sveltejs/kit';
import { invalidate } from '$app/navigation';

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    cookies.set('MAT', '', {
        path: '/',
        expires: new Date(0)
    });
}
