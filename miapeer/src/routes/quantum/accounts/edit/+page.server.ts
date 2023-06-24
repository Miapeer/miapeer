import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals }) => {
    // depends('quantum:accounts');
    // // Accounts
    // const accountsResponse = await fetch(`${locals.app.quantumApiBase}/accounts/`, {
    //     headers: locals.auth.headers
    // });
    // if (!accountsResponse.ok) {
    //     console.error(accountsResponse.statusText);
    //     return;
    // }
    // const accounts = accountsResponse.json();
    // console.log(accounts);
    // return { accounts };
};
