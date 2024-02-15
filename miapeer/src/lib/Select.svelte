<script>
    import TextField from '$lib/TextField.svelte';
    import Popover from '$lib/Popover.svelte';

    export let label = 'Select';
    export let open = false;
    export let options = {};
    export let showSelection = true;

    let textField;
    let textFieldFocused = false;
    let popoverOpen = false;
    let selection = '';
    let value = '';

    const handleSelection = (option) => {
        if (showSelection) {
            selection = option.label;
            value = option.value;
        }

        if (typeof option.action === 'function') {
            option.action();
        }
    };

    $: {
        if (textFieldFocused) {
            popoverOpen = textFieldFocused;
            open = textFieldFocused;
        }
    }

    $: {
        if (textFieldFocused === false) {
            setTimeout(() => {
                open = false;
                textFieldFocused = false;
                popoverOpen = false;
            }, 100);
        }
    }
</script>

<div class="select-wrapper" class:opened={open}>
    <div id="text-field">
        <TextField
            placeholder={label}
            editable={false}
            bind:value={selection}
            bind:focused={textFieldFocused}
            bind:this={textField}
        />
    </div>
    <i class="close-icon fa fa-angle-down"></i>

    <Popover bind:open={popoverOpen} target={textField} anchor="bottom-center" manualControl={true}>
        {#each options as option}
            <div
                class="option"
                on:click={() => {
                    handleSelection(option);
                }}
            >
                {option.label}
            </div>
        {/each}
    </Popover>
</div>

<style type="scss">
    .select-wrapper {
        display: inline-grid;
        grid-template-rows: 1fr;
        grid-template-columns: auto 3em;
        grid-template-areas: '. right';
        place-items: center;

        & > .close-icon,
        & > .open-icon {
            visibility: visible;
            grid-area: right;
            pointer-events: none;
            transition-duration: 200ms;
        }

        &.opened .close-icon {
            rotate: 180deg;
        }
    }

    #text-field {
        grid-area: 1 / 1 / auto / span 2;
        width: 10em;
    }

    .option {
        padding: 0.25em;
        cursor: pointer;
    }
</style>
