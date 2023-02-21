/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals }) {
    let accounts = [];

    const response = await fetch(`${locals.app.quantumApiBase}/accounts`, {
        headers: locals.auth.headers
    });

    accounts = await response.json();
    console.log(accounts);

    return { accounts };
}
