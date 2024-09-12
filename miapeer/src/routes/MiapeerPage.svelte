<script lang="ts">
    import { AppShell, AppBar, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    import logoLong from '$lib/images/miapeer-logo-long.svg';
    import { goto, invalidateAll } from '$app/navigation';

    const drawerStore = getDrawerStore();

    export let data;
    export let pageTitle = 'Miapeer';
    export let headline = '';

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

    const openSettingsDrawer = () => {
        drawerStore.open();
    };
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<slot name="settingsDrawer">
    <Drawer position="top">No settings preset for this page</Drawer>
</slot>

<AppShell slotHeader="z-20">
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/" alt="Logo"
                    ><img
                        src={logoLong}
                        class="bg-primary-500 rounded-xl h-[3.5em] p-2 border border-black"
                        alt="Logo"
                    /></a
                >
            </svelte:fragment>

            <svelte:fragment slot="headline"
                ><h1 class="h1 text-center">{headline}</h1></svelte:fragment
            >

            <svelte:fragment slot="trail">
                {#if data.isAuthenticated}
                    {#if data.userName === 'jep.navarra@miapeer.com'}
                        <a class="btn btn-sm variant-ghost-surface" href="/users">
                            User Management
                        </a>
                    {/if}
                    <button
                        class="btn-icon btn-icon-sm variant-ghost-surface"
                        on:click={openSettingsDrawer}
                    >
                        <i class="fa fa-cog"></i>
                    </button>
                    <button class="btn btn-sm variant-ghost-surface" on:click={handleLogout}>
                        Log Out
                    </button>
                {:else}
                    <a class="btn btn-sm variant-ghost-surface" href="/login">
                        Log In / Register
                    </a>
                {/if}
            </svelte:fragment>

            <slot name="header"></slot>
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
                <span>&copy; {new Date().getFullYear()} Miapeer LLC</span>
            </svelte:fragment>

            {#if data.lastUpdate}
                <span
                    >Updated: {data.lastUpdate === 'dev'
                        ? 'DEV'
                        : new Date(data.lastUpdate).toLocaleString()}</span
                >
            {/if}

            <svelte:fragment slot="trail">
                {#if true}
                    <a class="anchor" href="/portfolio"> Jeff Navarra's Portfolio </a>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>
