<script>
    export let caption = '';
    export let disabled = false;
    export let waiting = false;
    export let fullWidth = false;
    export let onClick = null;
</script>

<div class="button-wrapper">
    <button
        class={[
            fullWidth ? 'full-width' : '',
            disabled ? 'disabled' : '',
            waiting ? 'waiting' : ''
        ].join(' ')}
        on:click={disabled || waiting ? null : onClick}
    >
        <slot />
    </button>
    <i class="fa fa-hourglass-start" />
    <i class="fa fa-hourglass-half" />
    <i class="fa fa-hourglass-end" />
</div>

<style>
    .button-wrapper {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-areas: 'left button right';
        place-items: center;
    }

    button {
        grid-area: button;
        color: var(--text-accent);
        background-color: rgba(var(--bg-accent-rgb), 0.1);
        padding: 1em 2em;
        border: 1px solid var(--bg-accent);
        border-radius: 2em;
        text-transform: uppercase;
        letter-spacing: inherit;
        cursor: pointer;
        width: fit-content;
        transition-property: width, border-radius, background-color, border-color, padding;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
    }

    button.full-width {
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
        height: 3.5em;
        width: 3.5em;
        border-radius: 50%;
        border-color: rgba(var(--bg-accent-rgb), 0.5);
        border-top-color: var(--bg-accent);
        animation: spin 2s linear infinite;
        animation-delay: 200ms;
    }

    .fa-hourglass-start,
    .fa-hourglass-half,
    .fa-hourglass-end {
        grid-area: button;
        pointer-events: none;
        position: relative;
        color: var(--text-accent);
        font-size: 1.5em;
        display: none;
        transition: all 200ms ease-in-out;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-start {
        display: block;
        animation: stepped-spin-start 2s linear infinite;
        animation-delay: 200ms;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-half {
        display: block;
        animation: stepped-spin-half 2s linear infinite;
        animation-delay: 200ms;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-end {
        display: block;
        animation: stepped-spin-end 2s linear infinite;
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

    @keyframes stepped-spin-start {
        0% {
            opacity: 0;
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        75% {
            opacity: 0;
        }
        100% {
            opacity: 0;
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
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes stepped-spin-end {
        0% {
            opacity: 1;
            transform: rotate(0deg);
            left: -1px;
        }
        25% {
            opacity: 1;
            transform: rotate(180deg);
        }
        50% {
            opacity: 0;
            transform: rotate(180deg);
        }
        75% {
            opacity: 0;
            transform: rotate(0deg);
        }
        100% {
            opacity: 1;
            transform: rotate(0deg);
        }
    }
</style>
