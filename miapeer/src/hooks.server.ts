import type { Handle, HandleFetch } from '@sveltejs/kit';
import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public';
import * as jose from 'jose';
import lastUpdate from '../last_update.json';

const tokenExpired = (token) => {
    return Date.now() >= token.exp * 1000;
};

export const handle: Handle = async ({ event, resolve }) => {
    // Apply CORS header for API routes
    // if (event.url.pathname.startsWith('/api')) {
    // Required for CORS to work
    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }
    // }

    let accessToken = event.cookies.get('MAT');
    let decodedAccessToken;
    let userName;

    try {
        decodedAccessToken = jose.decodeJwt(accessToken);

        userName = decodedAccessToken.sub;
    } catch {
        accessToken = null;
        userName = null;
    }

    if (!accessToken || tokenExpired(decodedAccessToken)) {
        // Delete the cookie
        event.cookies.set('MAT', '', {
            path: '/',
            expires: new Date(0)
        });

        if (['/', '/login', '/register', '/logout', '/portfolio'].includes(event.url.pathname)) {
            // Allow anonymous access
            accessToken = null;
            userName = null;
        } else {
            event.locals.user = {
                ...event.locals.user,
                isAuthenticated: false
            };

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
        ...event.locals.user,
        isAuthenticated: !!accessToken,
        userName
    };

    const response = await resolve(event);
    // if (event.url.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', `*`);
    // }
    return response;
};
