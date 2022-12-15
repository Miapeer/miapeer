/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
    const accessToken = cookies.get("MAT");

    return {
        accessToken,
        isAuthenticated: !!accessToken
    };
}
