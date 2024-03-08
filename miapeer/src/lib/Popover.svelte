<script>
    import { onMount } from 'svelte';

    let popover;

    export let open = false;
    export let target = '';
    export let anchor = 'top-left';
    export let manualControl = false;

    let targetElement;

    onMount(() => {
        targetElement = typeof target === 'string' ? document.getElementById(target) : target;

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            let popoverRect = popover.getBoundingClientRect();

            popover.style.width = `${Math.max(rect.width, popoverRect.width)}px`;
            popoverRect = popover.getBoundingClientRect();

            switch (anchor) {
                case 'bottom-center':
                    popover.style.top = `${rect.bottom}px`;
                    popover.style.left = `${rect.left + (rect.width - popoverRect.width) / 2}px`;
                    break;

                case 'bottom-right':
                    popover.style.top = `${rect.bottom}px`;
                    popover.style.left = `${rect.right - popoverRect.width}px`;
                    break;

                case 'bottom-left':
                    popover.style.top = `${rect.bottom}px`;
                    popover.style.left = `${rect.left}px`;
                    break;

                case 'top-center':
                    popover.style.top = `${rect.top}px`;
                    popover.style.left = `${rect.left + (rect.width - popoverRect.width) / 2}px`;
                    break;

                case 'top-right':
                    popover.style.top = `${rect.top}px`;
                    popover.style.left = `${rect.right - popoverRect.width}px`;
                    break;

                case 'top-left':
                default:
                    popover.style.top = `${rect.top}px`;
                    popover.style.left = `${rect.left}px`;
            }
        }
    });

    $: {
        if (!manualControl && open && popover) {
            setTimeout(() => {
                popover.focus();
            }, 0);
        }
    }

    var handleFocusOut = () => {
        if (!manualControl) {
            open = false;
        }
    };
</script>

<div
    class="popover"
    class:open
    bind:this={popover}
    tabindex="0"
    {...$$restProps}
    on:focusout={handleFocusOut}
>
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
