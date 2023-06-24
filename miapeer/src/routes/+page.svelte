<script>
    import Applications from './Applications.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Miapeer: Home</title>
</svelte:head>

<Applications applications={data.applications} />
