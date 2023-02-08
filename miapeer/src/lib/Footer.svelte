<script>
    import Link from '$lib/Link.svelte';

    export let lastUpdate;
</script>

<footer>
    <span>&copy; 2015-{new Date().getFullYear()}, Miapeer LLC</span>
    {#if lastUpdate}
        <span>Updated: {lastUpdate === 'dev' ? 'dev' : new Date(lastUpdate).toLocaleString()}</span>
    {/if}
    <Link href="/portfolio">Jeff Navarra's Portfolio</Link>
</footer>

<style>
    footer {
        color: var(--text-primary-negative);
        background-color: rgba(var(--bg-primary-negative-rgb), 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: var(--footer-height);
        max-height: var(--footer-height);
        z-index: 999;
    }
</style>
