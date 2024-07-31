import type { Handle, HandleFetch } from '@sveltejs/kit';
import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public';
import * as jose from 'jose';
import lastUpdate from '../last_update.json';

const tokenExpired = (token) => {
    return Date.now() >= token.exp * 1000;
};

export const handle: Handle = async ({ event, resolve }) => {
    let accessToken = event.cookies.get('MAT');
    let decodedAccessToken;
    let userName;

    console.log('Access token: ' + accessToken);
    console.log(JSON.stringify(event));

    try {
        decodedAccessToken = jose.decodeJwt(accessToken);

        userName = decodedAccessToken.sub;
    } catch {
        accessToken = null;
        userName = null;
    }

    if (!accessToken || tokenExpired(decodedAccessToken)) {
        console.log('Clearing cookie');

        // Delete the cookie
        event.cookies.set('MAT', '', {
            path: '/',
            expires: new Date(0)
        });

        if (['/', '/login', '/logout', '/portfolio'].includes(event.url.pathname)) {
            // Allow anonymous access
            accessToken = null;
            userName = null;
        } else {
            // Send user to the login page
            return Response.redirect(
                `${event.url.origin}/login?ReturnUrl=${event.url.pathname}`,
                303
            );
        }
    }

    event.locals.app = {
        lastUpdate: lastUpdate.lastUpdate,
        miapeerApiBase: `${PUBLIC_MIAPEER_API_HOST}/miapeer/v1`,
        quantumApiBase: `${PUBLIC_MIAPEER_API_HOST}/quantum/v1`
    };

    event.locals.auth = {
        accessToken,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    event.locals.user = {
        isAuthenticated: !!accessToken,
        userName
    };

    // Load page as normal
    return await resolve(event);
};
