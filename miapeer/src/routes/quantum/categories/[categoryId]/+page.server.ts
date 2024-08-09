import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const categoryResponse = await fetch(
        `${locals.app.quantumApiBase}/categories/${params.categoryId}`,
        {
            method: 'GET',
            headers: locals.auth.headers
        }
    );

    if (!categoryResponse.ok) {
        console.error(categoryResponse.statusText);
        return;
    }

    const category = await categoryResponse.json();

    return { category };
};
