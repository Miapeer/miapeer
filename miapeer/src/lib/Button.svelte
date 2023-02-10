<script>
    export let caption = '';
    export let disabled = false;
    export let waiting = false;
    export let fullWidth = false;
    export let onClick = null;
</script>

<div class="wrapper">
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
    .wrapper {
        text-align: center;
    }

    button {
        color: var(--text-accent);
        background-color: rgba(var(--bg-accent-rgb), 0.1);
        padding: 1rem 2rem;
        border: 1px solid var(--bg-accent);
        border-radius: 2rem;
        text-transform: uppercase;
        letter-spacing: inherit;
        cursor: pointer;
        transition-property: width, border-radius, background-color, border-color;
        transition-duration: 0.2s;
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
        font-size: 0rem;
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        border-color: rgba(var(--bg-accent-rgb), 0.5);
        border-top-color: var(--bg-accent);
        animation: spin 2s linear infinite;
        animation-delay: 0.2s;
    }

    button.full-width {
        width: 100%;
    }

    .fa-hourglass-start {
        top: -2.5rem;
    }

    .fa-hourglass-half {
        top: -4rem;
    }

    .fa-hourglass-end {
        top: -5.5rem;
    }

    .fa-hourglass-start,
    .fa-hourglass-half,
    .fa-hourglass-end {
        pointer-events: none;
        position: relative;
        color: var(--text-accent);
        font-size: 1.5rem;
        display: none;
        transition: all 0.2s ease;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-start {
        display: block;
        animation: stepped-spin-start 2s linear infinite;
        animation-delay: 0.2s;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-half {
        display: block;
        animation: stepped-spin-half 2s linear infinite;
        animation-delay: 0.2s;
    }

    button.waiting:not(.disabled) ~ .fa-hourglass-end {
        display: block;
        animation: stepped-spin-end 2s linear infinite;
        animation-delay: 0.2s;
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
            opacity: 1;
            transform: rotate(180deg);
        }
        20% {
            transform: rotate(360deg);
        }
        40% {
            opacity: 1;
        }
        80% {
            opacity: 0;
        }
        99% {
            transform: rotate(360deg);
        }
        100% {
            opacity: 0;
            transform: rotate(180deg);
        }
    }

    @keyframes stepped-spin-half {
        0% {
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        90% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes stepped-spin-end {
        0% {
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        40% {
            opacity: 0;
        }
        60% {
            opacity: 0;
        }
        80% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
</style>
