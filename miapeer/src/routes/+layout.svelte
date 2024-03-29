<script type="typescript">
    import './styles.css';

    import Link from '$lib/Link.svelte';
    import logoLong from '$lib/images/miapeer-logo-long.svg';
    import LogInButton from '../routes/login/LogInButton.svelte';
    import LogOutButton from '../routes/logout/LogOutButton.svelte';

    import type { LayoutData } from './$types';
    export let data: LayoutData;
</script>

<svelte:head>
    <meta
        name="description"
        content="Welcome to Miapeer, the home of Quantum. How can I be of assistance?"
    />
    <meta name="author" content="Jeffery Navarra" />
    <meta name="mobile-web-app-capable" content="yes" />

    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700%7CMontserrat:400,700%7CRaleway:300,400,600"
    />
</svelte:head>

<div class="app">
    <header>
        <Link href="/"><img src={logoLong} class="logo-img long" alt="Logo" /></Link>

        {#if data.isAuthenticated}
            <Link href="/quantum">Quantum</Link>
            <Link href="/users">User Management</Link>
            <LogOutButton userName={data.userName} />
        {:else}
            <LogInButton />
        {/if}
    </header>

    <div class="main-and-footer">
        <main>
            <slot />
        </main>

        <footer>
            <span>&copy; 2015-{new Date().getFullYear()}, Miapeer LLC</span>
            {#if data.lastUpdate}
                <span
                    >Updated: {data.lastUpdate === 'dev'
                        ? 'DEV'
                        : new Date(data.lastUpdate).toLocaleString()}</span
                >
            {/if}
            <Link href="/portfolio">Jeff Navarra's Portfolio</Link>
        </footer>
    </div>
</div>

<style>
    .app {
        height: 100vh;
        height: 100dvh;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            'header'
            'main-and-footer';
    }

    header {
        grid-area: header;
        background-color: rgba(var(--bg-primary-rgb), 0.9);

        box-shadow: 0 0 1em black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25em 1em;
        text-transform: uppercase;

        z-index: 1;
    }

    .logo-img {
        background-color: var(--theme-primary);
        border: 1px solid black;
        border-radius: 1em;
        height: 3.5em;
        padding: 0.5em;
    }

    .main-and-footer {
        grid-area: main-and-footer;
        overflow: auto;

        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 1em 1fr 1em;
        grid-template-areas:
            'gutter-left main gutter-right'
            'footer footer footer';
    }

    main {
        grid-area: main;
    }

    footer {
        grid-area: footer;
        color: var(--text-primary-negative);
        background-color: rgba(var(--bg-primary-negative-rgb), 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
    }
</style>
