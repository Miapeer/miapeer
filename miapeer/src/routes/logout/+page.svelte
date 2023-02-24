<!-- import { redirect } from '@sveltejs/kit';
import { invalidate, invalidateAll } from '$app/navigation';
import { goto } from '$app/navigation';

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load() {
    // invalidateAll();
} -->
<script>
    import { goto, invalidateAll } from '$app/navigation';
    import Button from '$lib/Button.svelte';

    const handleLogout = async () => {
        const res = await fetch('/logout', {
            method: 'POST'
        });

        if (res.ok) {
            const data = await res.json();
            invalidateAll();
            goto(data.redirectUrl ?? '/');
        } else {
            console.log('NOT ok');
        }
    };
</script>

Turn this into a profile/settings page with logout button

<Button onClick={handleLogout}>Log Out</Button>
