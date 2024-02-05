<script>
    import { onMount } from 'svelte';

    let popover;

    export let open = false;
    export let targetElement = '';
    export let anchor = 'top-left';

    onMount(() => {
        let theTop = 0;
        let theLeft = 0;

        if (targetElement !== '') {
            const target = document.getElementById(targetElement);

            if (target) {
                const rect = target.getBoundingClientRect();

                switch (anchor) {
                    case 'top-right':
                        popover.style.top = `${rect.top}px`;
                        popover.style.right = `${rect.right - rect.left}px`;
                        break;

                    case 'top-left':
                    default:
                        popover.style.top = `${rect.top}px`;
                        popover.style.left = `${rect.left}px`;
                }
            }
        }
    });

    $: {
        if (open && popover) {
            setTimeout(() => {
                popover.focus();
            }, 0);
        }
    }
</script>

<div class="popover" class:open bind:this={popover} tabindex="0" {...$$restProps} on:focusout={() => { open = false }}>
    <slot />
</div>

<style>
    .popover {
        /* grid-area: button;
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
        font-size: 0.8em; */

        position: absolute;
        display: none;
        opacity: 0;
        transition-property: opacity;
        transition-duration: 200ms;
        outline: none;
        z-index: 9;

        background-color: green;
    }

    .popover.open {
        opacity: 1;
        display: inline;
    }

    @media (prefers-color-scheme: light) {
        div {
            color: var(--text-primary);
        }
    }
</style>
