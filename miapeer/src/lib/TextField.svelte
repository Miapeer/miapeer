<script>
    export let type = 'text';
    export let placeholder = '';
    export let value = null;
    export let filled = false;

    const updateFilled = () => {
        filled = !!value;
    };

    const handleInput = (e) => {
        value = e.target.value;
        updateFilled();
    };

    updateFilled();
</script>

<div class="wrapper">
    <input {type} class:filled {value} on:input={handleInput} />
    <label>{placeholder}</label>
</div>

<style>
    .wrapper {
        height: 3em;
    }

    input {
        width: 100%;
        border: 1px solid var(--bg-secondary);
        background-color: transparent;
        color: var(--text-primary);
        border-radius: 0.5em;
        padding: 1em;
        box-sizing: border-box;
        height: 3em;
    }

    label {
        pointer-events: none;
        position: relative;
        left: 1em;
        top: -2.1em;
        padding: 0.25em 0.5em;
        z-index: 1;
        background-color: var(--bg-primary);
        color: var(--text-secondary);
        height: 1em;
        width: fit-content;
        border-radius: 1em;
        transition-property: top, font-size;
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .wrapper:focus-within label,
    input.filled + label {
        top: -4.5em;
        font-size: 0.8em;
    }
</style>
