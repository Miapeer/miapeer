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
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition-property: opacity;
        transition-duration: 100ms;
        transition-timing-function: ease-in-out;
        outline: none;
        z-index: 9;

        border: 2px solid var(--bg-neutral);
        border-radius: 0.25em;
        background-color: var(--bg-primary);
    }

    .popover.open {
        visibility: visible;
        opacity: 1;
    }
</style>
