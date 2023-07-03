<script>
    export let size = 'medium';
</script>

<button
    class:extra-small={size === 'extra-small'}
    class:small={size === 'small'}
    class:large={size === 'large'}
>
    <slot />
</button>

<style>
    button {
        grid-area: button;
        color: var(--text-accent);
        background-color: rgba(var(--bg-accent-rgb), 0.1);
        padding: 0.75em 1.5em;
        border: 1px solid var(--bg-accent);
        border-radius: 2em;
        text-transform: uppercase;
        letter-spacing: inherit;
        cursor: pointer;
        width: fit-content;
        min-height: 3em;
        transition-property: width, border-radius, background-color, border-color, padding;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
        font-size: 0.8em;
    }

    button.extra-small {
        font-size: 0.4em;
    }

    button.small {
        font-size: 0.6em;
    }

    button.large {
        font-size: 1em;
    }

    button:hover {
        background-color: rgba(var(--bg-accent-rgb), 0.3);
    }

    @media (prefers-color-scheme: light) {
        button {
            color: var(--text-primary);
        }
    }
</style>
