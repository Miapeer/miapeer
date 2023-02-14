<script>
    export let type = 'text';
    export let placeholder = '';
    export let value = '';

    const handleInput = (e) => {
        // In here, you can switch on type and implement whatever behaviour you need
        value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
    };
</script>

<div class="wrapper">
    <input {type} required={true} {value} on:input={handleInput} />
    <div class="placeholder">{placeholder}</div>
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

    .placeholder {
        pointer-events: none;
        position: relative;
        left: 1em;
        top: -2.1em;
        padding: 0 0.5em;
        z-index: 1;
        background-color: var(--bg-primary);
        color: var(--text-secondary);
        height: 1em;
        width: fit-content;
        transition-property: top, font-size;
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .wrapper:focus-within .placeholder,
    input:valid + .placeholder {
        top: -4.5em;
        font-size: 0.8em;
    }
</style>
