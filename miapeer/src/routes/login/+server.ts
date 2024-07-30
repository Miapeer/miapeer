import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    console.log('login POST');

    console.log('get params');
    const { email, password } = await request.json();

    console.log('request build');
    const requestData = new URLSearchParams();
    requestData.append('username', email);
    requestData.append('password', password);
    requestData.append('grant_type', 'password');

    console.log(`${locals.app.miapeerApiBase}/auth/token`);

    console.log('request begin');
    const response = await fetch(`${locals.app.miapeerApiBase}/auth/token`, {
        method: 'POST',
        body: requestData
    });
    console.log('request end');

    let responseData;

    try {
        console.log('try json');
        responseData = await response.json();
        console.log('ok json: ' + responseData);
    } catch (err) {
        console.log(err);

        console.log('try text');
        responseData = await response.text();
        console.log('ok text: ' + responseData);
    }

    if (!response.ok) {
        console.error(response);
        throw error(401, responseData);
    }

    // TODO
    if (responseData['token_type'] !== 'bearer') {
        console.error(responseData);
        throw error(400, { email: 'something', missing: true });
    }

    const accessToken = responseData['access_token'];

    console.log('Access token from login: ' + accessToken);

    // Success
    cookies.set('MAT', accessToken, {
        path: '/', // send cookie for every page
        httpOnly: true, // server side only cookie so you can't use `document.cookie`
        sameSite: 'strict', // only requests from same site can send cookies (https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
        secure: process.env.NODE_ENV === 'production', // only sent over HTTPS in production
        maxAge: 60 * 60 * 24 * 7 // set cookie to expire after a week
    });

    // Go to the place we were told to go
    if (url.searchParams.has('ReturnUrl')) {
        throw redirect(303, url.searchParams.get('ReturnUrl'));
    }

    return json({
        redirectUrl: url.searchParams.get('ReturnUrl') ?? '/'
    });

    // prettier-ignore
}) satisfies RequestHandler;
