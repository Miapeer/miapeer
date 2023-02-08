<script>
    export let caption = '';
    export let disabled = false;
    export let onClick = null;
</script>

<button class={disabled ? 'disabled' : ''} on:click={disabled ? null : onClick}>
    <slot />
</button>

<style>
    button {
        margin: 0.5rem 0;
        color: var(--text-accent);
        background-color: rgba(var(--theme-primary-rgb), 0.1);
        padding: 1rem 2rem;
        border: 1px solid var(--theme-primary);
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: inherit;
        transition-property: background-color, color;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--theme-primary);
        color: var(--text-dark);
    }

    button:active {
        background-color: red;
        color: var(--text-dark);
    }

    button.disabled {
        color: rgba(var(--text-accent-rgb), 0.5);
        background-color: transparent;
        border-color: rgba(var(--theme-primary-rgb), 0.5);
        cursor: default;
    }
</style>
