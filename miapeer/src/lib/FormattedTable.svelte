<script>
    export let title = '';
</script>

<div class="table-wrapper">
    {#if title}
        <div class="title">{title}</div>
    {/if}
    <slot name="table" />
    <div class="actions">
        <slot name="actions" />
    </div>
</div>

<style id="new">
    .table-wrapper {
        color: var(--text-primary-negative);
    }

    .title {
        padding: 0.5em 0.75em 0 0.75em;
        font-weight: bold;
        font-size: 1.2em;
        color: var(--text-primary);
        display: inline;
        background-color: var(--bg-neutral);
        border-radius: 0.25em 0.25em 0 0;
    }

    .actions {
        background-color: var(--bg-neutral);
        border-radius: 0 0 0.25em 0.25em;
        display: flex;
        justify-content: right;
        padding: 0.25em 0.5em;
    }

    :global(table) {
        width: 100%;
        border-spacing: 0;
        border-left: 3px solid var(--bg-neutral);
        border-right: 3px solid var(--bg-neutral);
        border-radius: 0 0.25em 0 0;
        background-color: var(--bg-neutral);
    }

    :global(table > thead) {
        text-align: left;
    }

    :global(table > tbody) {
        color: var(--text-primary);
        border: 1px solid var(--bg-neutral);
    }

    :global(table > tbody > tr) {
        background-color: var(--bg-secondary);
        transition-property: box-shadow, transform;
        transition-duration: 100ms;
    }

    :global(table > tbody > tr:not(.suppress-hover):hover) {
        box-shadow: 0 0 10px -1px var(--bg-primary-negative);
    }

    :global(table > tbody > tr:nth-child(even)) {
        background-color: var(--bg-tertiary);
    }

    :global(table > tbody > tr > td) {
        padding: 0.25em;
    }
</style>
