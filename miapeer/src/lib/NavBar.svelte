<script lang="ts">
</script>

<nav {...$$restProps}>
    <slot />
</nav>

<style type="scss">
    nav > :global(ul > li) {
        display: inline;
    }
</style>
