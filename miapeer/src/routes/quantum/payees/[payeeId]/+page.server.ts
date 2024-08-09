import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const payeeResponse = await fetch(`${locals.app.quantumApiBase}/payees/${params.payeeId}`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!payeeResponse.ok) {
        console.error(payeeResponse.statusText);
        return;
    }

    const payee = await payeeResponse.json();

    return { payee };
};
