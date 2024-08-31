<script>
    import { goto } from '$app/navigation';

    export let size = 'md';
    export let href = null;
</script>

<button
    type="button"
    class={`btn-icon variant-ghost-primary btn-icon-${size} absolute top-40 right-4 z-10`}
    on:click={() => {
        if (href) {
            goto(href);
        }
    }}
>
    <slot />
</button>
