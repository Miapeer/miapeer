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
        margin: 0.5rem 0;
        height: 3rem;
    }

    input {
        width: 100%;
        border: none;
        border: 1px solid var(--bg-secondary);
        background-color: transparent;
        color: var(--text-primary);
        border-radius: 5px;
        padding: 1rem;
        box-sizing: border-box;
        height: 3rem;
    }

    .placeholder {
        pointer-events: none;
        position: relative;
        left: 1rem;
        top: -2rem;
        padding: 0 0.5rem;
        z-index: 1;
        background-color: var(--bg-primary);
        color: var(--text-secondary);
        height: 1rem;
        width: fit-content;
        transition-property: top, font-size;
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .wrapper:focus-within .placeholder,
    input:valid + .placeholder {
        top: -3.5rem;
        font-size: 0.8rem;
    }
</style>
