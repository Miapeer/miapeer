import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user.isAuthenticated) {
        throw redirect(303, '/');
    }
}

export const actions: Actions = {
    default: async ({ cookies, request, url, locals }) => {
        const formData = await request.formData();

        var requestData = new URLSearchParams();
        requestData.append('username', formData.get('email'));
        requestData.append('password', formData.get('password'));
        requestData.append('grant_type', 'password');

        // TODO: Why does protocol switch to http on its own? This is causing errors.

        url = `${locals.app.miapeerApiBase}/auth/token`
        console.log(url);

        const response = await fetch(`${locals.app.miapeerApiBase}/auth/token`, {
			method: 'POST',
			body: requestData
		})

        console.log(response);

        const responseData = await response.json();

        console.log(1);
        if (!response.ok) {
            console.error(response);
            throw error(401, responseData);
        }
        console.log(2);

        // TODO
        if (responseData['token_type'] !== 'bearer') {
            console.error(responseData);
            // return fail(400, { email: "something", missing: true });
            throw error(400, { email: "something", missing: true });
        }

        // throw error(403, JSON.stringify(responseData));
        const accessToken = responseData['access_token'];
        // throw error(404, JSON.stringify(responseData));

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
		if (url.searchParams?.has('ReturnUrl')) {
			throw redirect(303, url.searchParams.get('ReturnUrl'));
		}

        // throw error(406, JSON.stringify(responseData));
        
        // Return to the home page
        throw redirect(303, '/');
    }
}