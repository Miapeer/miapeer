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
        text-shadow: 0.05em 0.05em var(--text-primary);
        transition: color 0.2s linear, text-shadow 0.2s linear;
    }
</style>
