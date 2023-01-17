import type { Handle } from '@sveltejs/kit'
import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public';
import * as jose from 'jose'
import { redirect } from '@sveltejs/kit';

const tokenExpired = (token) => {
    return Date.now() >= token.exp * 1000
}

export const handle: Handle = async ({ event, resolve }) => {
    let accessToken = event.cookies.get("MAT");
    let decodedAccessToken;
    let userName;

    try {
        decodedAccessToken = jose.decodeJwt(accessToken);
        
        userName = decodedAccessToken.sub;
    }
    catch {
        accessToken = null
        userName = null
    }

    if (!accessToken || tokenExpired(decodedAccessToken)) {
        event.cookies.set('MAT', '', {
            path: '/',
            expires: new Date(0)
        });
        
        if (['/', '/login', '/logout'].includes(event.url.pathname)) {
            accessToken = null
            userName = null
        }
        else {
            return Response.redirect(`${event.url.origin}/login?ReturnUrl=${event.url.pathname}`,303)
        }
    }

    event.locals.app = {
        miapeerApiBase: `${PUBLIC_MIAPEER_API_HOST}/miapeer/v1`,
    }

    event.locals.auth = {
        accessToken,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }

    event.locals.user = {
        isAuthenticated: !!accessToken,
        userName,
    }

    // Load page as normal
    return await resolve(event)
}
