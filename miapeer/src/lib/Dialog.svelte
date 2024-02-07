<script>
    export let open = false;
    export let title = '';
</script>

<div class="dialog-wrapper" class:open>
    <div class="dialog-overlay"></div>
    <div
        class="dialog-container"
        on:click={() => {
            open = false;
        }}
    >
        <div class="dialog" on:click|stopPropagation>
            <h3 class="title">{title}</h3>
            <slot />
            <div class="actions">
                <slot name="actions" />
            </div>
        </div>
    </div>
</div>

<style>
    .dialog-wrapper {
        visibility: hidden;
        opacity: 0;
    }

    .dialog-wrapper.open {
        visibility: visible;
        opacity: 1;
    }

    .dialog-overlay {
        position: absolute;
        inset: 0;
        background-color: var(--bg-primary-negative);
        opacity: 0.5;
        z-index: 11;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dialog-container {
        position: absolute;
        inset: 0;
        z-index: 12;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dialog {
        border-radius: 0.25em;
        box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
        background-color: var(--bg-primary);
        padding: 1em;
        opacity: 0;
        transition-property: 'opacity';
        transition-duration: 200ms;
    }

    .dialog-wrapper.open .dialog {
        opacity: 1;
    }

    .dialog > .title {
        margin-block-start: 0;
    }

    div.actions {
        display: flex;
        justify-content: flex-end;
        padding-top: 1em;
    }
</style>
