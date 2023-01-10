import { PUBLIC_MIAPEER_API_HOST } from '$env/static/public';
import * as jose from 'jose'
import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
    let accessToken = cookies.get("MAT");
    const miapeerApiBase = `${PUBLIC_MIAPEER_API_HOST}/miapeer/v1`

    let userName;

    try {
        const decodedAccessToken = jose.decodeJwt(accessToken);
        userName = decodedAccessToken.sub;
    }
    catch {
        accessToken = null
        userName = null
    }

    // TODO: Is this ok, or does it share with other users?
    env['miapeerApiBase'] = miapeerApiBase
    env['accessToken'] = accessToken

    return {
        isAuthenticated: !!accessToken,
        userName,
    };
}
