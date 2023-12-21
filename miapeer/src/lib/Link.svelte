<script lang="ts">
    export let cssClass = '';
    export let href = '';
    export let openNewTab = false;
</script>

<a class={cssClass} {href} target={openNewTab ? "_blank" : null} rel={openNewTab ? "noreferrer noopener" : null}>
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
