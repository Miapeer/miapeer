import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies }) => {
    cookies.set('MAT', '', {
        path: '/',
        expires: new Date(0)
    });

    return json({
        redirectUrl: '/'
    });

    // prettier-ignore
}) satisfies RequestHandler;
