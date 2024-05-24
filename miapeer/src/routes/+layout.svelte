<script lang="ts">
    import '../app.postcss';
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import logoLong from '$lib/images/miapeer-logo-long.svg';

    // Highlight JS
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import xml from 'highlight.js/lib/languages/xml'; // for HTML
    import css from 'highlight.js/lib/languages/css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';

    hljs.registerLanguage('xml', xml); // for HTML
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    storeHighlightJs.set(hljs);

    // Floating UI for Popups
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    import type { LayoutData } from './$types';
    export let data: LayoutData;

    import { goto, invalidateAll } from '$app/navigation';

    const handleLogout = async () => {
        const res = await fetch('/logout', {
            method: 'POST'
        });

        if (res.ok) {
            const data = await res.json();
            invalidateAll();
            goto(data.redirectUrl ?? '/');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/" alt="Logo"><img src={logoLong} class="logo-img" alt="Logo" /></a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                {#if data.isAuthenticated}
                    <a class="btn btn-sm variant-ghost-surface" href="/quantum"> Quantum </a>
                    <a class="btn btn-sm variant-ghost-surface" href="/users"> User Management </a>
                    <button class="btn btn-sm variant-ghost-surface" on:click={handleLogout}>
                        Log Out
                    </button>
                {:else}
                    <a class="btn btn-sm variant-ghost-surface" href="/login">
                        Log In / Register
                    </a>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />

    <svelte:fragment slot="footer">
        <AppBar
            gridColumns="grid-cols-3"
            slotDefault="place-self-center"
            slotTrail="place-content-end"
        >
            <svelte:fragment slot="lead">
                <span>&copy; 2015-{new Date().getFullYear()}, Miapeer LLC</span>
            </svelte:fragment>

            {#if data.lastUpdate}
                <span
                    >Updated: {data.lastUpdate === 'dev'
                        ? 'DEV'
                        : new Date(data.lastUpdate).toLocaleString()}</span
                >
            {/if}

            <svelte:fragment slot="trail">
                <a class="anchor" href="/portfolio"> Jeff Navarra's Portfolio </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>

<style type="postcss">
    .logo-img {
        @apply bg-primary-500;
        border: 1px solid black;
        border-radius: 1em;
        height: 3.5em;
        padding: 0.5em;
    }
</style>
