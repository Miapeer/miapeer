import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, cookies, url }) => {
    const { email, password } = await request.json();

    console.log(email);

    // let response;

    // if (permit) {
    //     if (userId && applicationRoleId) {
    //         const data = JSON.stringify({
    //             user_id: userId,
    //             application_role_id: applicationRoleId
    //         });

    //         response = await fetch(`${locals.app.miapeerApiBase}/permissions/`, {
    //             method: 'POST',
    //             body: data,
    //             headers: locals.auth.headers
    //         });
    //     }
    // } else {
    //     if (permissionId) {
    //         response = await fetch(`${locals.app.miapeerApiBase}/permissions/${permissionId}`, {
    //             method: 'DELETE',
    //             headers: locals.auth.headers
    //         });
    //     }
    // }

    // if (!response) {
    //     throw error(500, 'Invalid request data');
    // } else if (!response.ok) {
    //     throw error(response?.status, await response?.json());
    // }

    // return json({
    // 	request: {
    // 		userId,
    // 		applicationRoleId,
    // 		permissionId,
    // 		permit
    // 	},
    // 	response: await response.json()
    // });

    var requestData = new URLSearchParams();
    requestData.append('username', email);
    requestData.append('password', password);
    requestData.append('grant_type', 'password');

    const response = await fetch(`${locals.app.miapeerApiBase}/auth/token`, {
        method: 'POST',
        body: requestData
    });

    const responseData = await response.json();

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
