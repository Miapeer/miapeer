<script>
    export let caption = '';
    export let disabled = false;
    export let waiting = false;
    export let onClick = null;
</script>

<div class="wrapper">
    <button
        class={[disabled ? 'disabled' : '', waiting ? 'waiting' : ''].join(' ')}
        on:click={disabled || waiting ? null : onClick}
    >
        <slot />
    </button>
</div>

<style>
    .wrapper {
        text-align: center;
    }

    button {
        width: 100%;
        margin: 0.5rem 0;
        color: var(--text-accent);
        background-color: rgba(var(--bg-accent-rgb), 0.1);
        padding: 1rem 2rem;
        border: 1px solid var(--bg-accent);
        border-radius: 2rem;
        text-transform: uppercase;
        letter-spacing: inherit;
        transition: all 0.2s ease;

        cursor: pointer;
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

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
