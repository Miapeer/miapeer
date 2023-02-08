<script>
    export let href = '';
</script>

<a {href}>
    <slot />
</a>

<style>
    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        color: var(--text-accent);
        text-shadow: 0.5px 0.5px var(--bs-link-text-shadow);
        transition: color 0.2s linear, text-shadow 0.2s linear;
    }
</style>
