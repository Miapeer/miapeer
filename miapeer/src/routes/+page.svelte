<script>
	import Applications from './Applications.svelte';
    import Slides from './Slides.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
	<title>Miapeer: Home</title>
</svelte:head>

<Slides />

<Applications applications={data.applications} />
