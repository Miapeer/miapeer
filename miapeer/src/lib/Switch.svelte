<script>
    export let containButton = false;
    export let checked = false;
    export let onClick = null;
    export let onSwitchOn = null;
    export let onSwitchOff = null;
</script>

<div
    class="switch-wrapper"
    class:contained={containButton}
    class:checked
    on:click={(e) => {
        checked = !checked;

        if (onClick) {
            onClick(e);
        }
        if (checked) {
            if (onSwitchOn) {
                onSwitchOn(e);
            }
        } else {
            if (onSwitchOff) {
                onSwitchOff(e);
            }
        }
    }}
>
    <div class="slide">
        <div class="button" />
        <div class="label"><slot>&nbsp;</slot></div>
    </div>
</div>

<style>
    .switch-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        min-height: 100%;
        cursor: pointer;
        position: relative;
        user-select: none;
    }

    .slide {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-secondary);
        border-radius: 1em;
        height: 65%;
        line-height: 65%;
        width: 100%;
        color: var(--text-primary);

        transition-property: background-color, opacity, color, left;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
    }

    .switch-wrapper.contained .slide {
        height: 100%;
    }

    .button {
        content: '';
        border-radius: 50%;
        position: absolute;
        background-color: var(--bg-primary-negative);
        box-shadow: 1px 1px 5px black;
        height: 100%;
        aspect-ratio: 1 / 1;
        left: 0em;

        transition-property: background-color, opacity, left, transform;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
    }

    .switch-wrapper.checked .button {
        left: 100%;
        transform: translateX(-100%);
    }

    .switch-wrapper.checked .slide {
        background-color: rgba(var(--bg-accent-rgb), 0.8);
        color: var(--text-primary-negative);
    }

    .switch-wrapper.checked .button {
        background-color: var(--bg-accent);
    }
</style>
