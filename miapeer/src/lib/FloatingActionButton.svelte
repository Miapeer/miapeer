<script>
    import { goto } from '$app/navigation';

    export let size = 'medium';
    export let href = null;
</script>

<div class="button-wrapper">
    <button
        class:extra-small={size === 'extra-small'}
        class:small={size === 'small'}
        class:large={size === 'large'}
        on:click={() => {
            if (href) {
                goto(href);
            }
        }}
    >
        <slot />
    </button>
</div>

<style>
    .button-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 3em;
        height: 3em;
        position: absolute;
        bottom: 1.5em;
        right: 0.5em;
    }

    button {
        grid-area: button;
        color: var(--text-accent);
        background-color: rgba(var(--bg-accent-rgb), 0.1);
        border: 1px solid var(--bg-accent);
        border-radius: 100%;
        cursor: pointer;
        height: 100%;
        width: 100%;
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
