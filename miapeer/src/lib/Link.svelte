<script lang="ts">
    export let href = '';
    export let openNewTab = false;
</script>

<a
    {href}
    target={openNewTab ? "_blank" : null}
    rel={openNewTab ? "noreferrer noopener" : null}
    {...$$restProps}
    on:click
>
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
