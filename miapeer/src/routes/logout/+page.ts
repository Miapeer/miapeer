import { redirect } from '@sveltejs/kit';
import { invalidate, invalidateAll } from '$app/navigation';
import { goto } from '$app/navigation';

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load() {
    invalidateAll();
}
