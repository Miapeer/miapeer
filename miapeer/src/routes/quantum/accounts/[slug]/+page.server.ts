import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const accountResponse = await fetch(`${locals.app.quantumApiBase}/accounts/${params.slug}`, {
        headers: locals.auth.headers
    });

    if (!accountResponse.ok) {
        console.error(accountResponse.statusText);
        return;
    }

    const account = await accountResponse.json();

    return { account };
};
