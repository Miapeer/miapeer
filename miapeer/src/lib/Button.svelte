<script>
    export let disabled = false;
    export let waiting = false;
    export let fullWidth = false;
    export let size = 'medium';
    export let onClick = null;
</script>

<div class="button-wrapper">
    <button
        class:fullWidth
        class:disabled
        class:waiting
        class:small={size === 'small'}
        class:large={size === 'large'}
        on:click={disabled || waiting ? null : onClick}
    >
        <slot />
    </button>
    <i class="fa-solid fa-hourglass" />
    <i class="fa-solid fa-hourglass-half" />
    <i class="fa-solid fa-hourglass-end" />
</div>

<style>
    .button-wrapper {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-areas: 'left button right';
        place-items: center;

        --animation-duration: 2s;
    }

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

    button.small {
        font-size: 0.6em;
    }

    button.large {
        font-size: 1em;
    }

    button.fullWidth {
        width: 100%;
        grid-column: left / right;
    }

    button:hover {
        background-color: rgba(var(--bg-accent-rgb), 0.3);
    }

    button:active {
        background-color: var(--bg-accent);
        color: var(--text-primary-negative);
    }

    button.disabled {
        cursor: default;
        color: rgba(var(--text-accent-rgb), 0.5);
        background-color: transparent;
        border-color: rgba(var(--bg-accent-rgb), 0.5);
        animation: none;
    }

    button.waiting:not(.disabled) {
        cursor: default;
        background-color: transparent;
        padding: 0;
        color: transparent;
        height: 3em;
        width: 3em;
        border-color: rgba(var(--bg-accent-rgb), 0.5);
        border-top-color: var(--bg-accent);
        animation: spin var(--animation-duration) linear infinite;
        animation-delay: 200ms;
    }

    button.large.waiting:not(.disabled) {
        height: 3.5em;
        width: 3.5em;
    }

    .fa-hourglass,
    .fa-hourglass-half,
    .fa-hourglass-end {
        --faded: 0.7;

        grid-area: button;
        pointer-events: none;
        position: relative;
        color: var(--text-accent);
        font-size: 1.5em;
        display: none;
    }

    button.small ~ .fa-hourglass,
    button.small ~ .fa-hourglass-half,
    button.small ~ .fa-hourglass-end {
        font-size: 1em;
    }

    button.large ~ .fa-hourglass,
    button.large ~ .fa-hourglass-half,
    button.large ~ .fa-hourglass-end {
        font-size: 2em;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass {
        display: block;
        animation: stepped-spin-main var(--animation-duration) linear infinite;
        animation-delay: 200ms;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-half {
        display: block;
        animation: stepped-spin-half var(--animation-duration) linear infinite;
        animation-delay: 200ms;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-end {
        display: block;
        animation: stepped-spin-end var(--animation-duration) linear infinite;
        animation-delay: 200ms;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes stepped-spin-main {
        0% {
            transform: rotate(0deg);
            left: 0px;
        }
        25% {
            transform: rotate(180deg);
            left: -1px;
        }
        50% {
            transform: rotate(180deg);
            left: -1px;
        }
        50.0001% {
            transform: rotate(0deg);
            left: 0px;
        }
        75% {
            transform: rotate(0deg);
            left: 0px;
        }
        100% {
            transform: rotate(0deg);
            left: 0px;
        }
    }

    @keyframes stepped-spin-half {
        0% {
            opacity: 0;
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: var(--faded);
        }
        75% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes stepped-spin-end {
        0% {
            opacity: var(--faded);
            transform: rotate(0deg);
            left: 0px;
        }
        25% {
            opacity: var(--faded);
            transform: rotate(180deg);
            left: -1px;
        }
        50% {
            opacity: 0;
            transform: rotate(180deg);
            left: 0px;
        }
        51% {
            opacity: 0;
            transform: rotate(0deg);
            left: 0px;
        }
        75% {
            opacity: var(--faded);
            transform: rotate(0deg);
            left: 0px;
        }
        100% {
            opacity: var(--faded);
            transform: rotate(0deg);
            left: 0px;
        }
    }
</style>
