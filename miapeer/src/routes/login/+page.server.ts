import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types'

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    const { isAuthenticated } = await parent();

    if (isAuthenticated) {
        throw redirect(303, '/');
    }
}

/** @type {import('./$types').Actions} */
// const login: Action = async ({ cookies, request }) => {
export const actions = {
    default: async ({ cookies, request, url }) => {
        const formData = await request.formData();

        var requestData = new URLSearchParams();
        requestData.append('username', formData.get('email'));
        requestData.append('password', formData.get('password'));
        requestData.append('grant_type', 'password');

        // TODO: Why does protocol switch to http on its own? This is causing errors.

        console.log('new');
        // const response = await fetch(`${PUBLIC_MIAPEER_API_HOST}/miapeer/v1/auth/token`, {
        const response = await fetch("https://api.miapeer.com/miapeer/v1/auth/token", {
			method: 'POST',
			body: requestData
		})

        console.log(response);

        if (response.status !== 200) {
            console.error(response);
            return;
        }

        // TODO
        const responseData = await response.json();
        if (responseData['token_type'] !== 'bearer') {
            console.error(responseData);
            // return fail(400, { email: "something", missing: true });
            throw error(400, { email: "something", missing: true })
        }

        const accessToken = responseData['access_token']

        // if (!user) {
        //     return fail(400, { email, missing: true });
        // }

        // if (user.password !== hash(password)) {
        //     return fail(400, { email, incorrect: true });
        // }


        // Success

        cookies.set('MAT', accessToken, {
            path: '/',  // send cookie for every page
            httpOnly: true, // server side only cookie so you can't use `document.cookie`
            sameSite: 'strict', // only requests from same site can send cookies (https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
            secure: process.env.NODE_ENV === 'production',  // only sent over HTTPS in production
            maxAge: 60 * 60 * 24 * 7,  // set cookie to expire after a week
          })

        // Go to the place we were told to go
		if (url.searchParams.has('redirectTo')) {
			throw redirect(303, url.searchParams.get('redirectTo'));
		}

        // Return to the home page
        throw redirect(303, '/');
    }
}