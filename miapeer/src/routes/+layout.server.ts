import jose from 'jose'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
    let accessToken = cookies.get("MAT");
    let userName;

    try {
        const decodedAccessToken = jose.decodeJwt(accessToken);
        userName = decodedAccessToken.sub;
    }
    catch {
        accessToken = null
        userName = null
    }

    return {
        isAuthenticated: !!accessToken,
        accessToken,
        userName,
    };
}
