<script>
	import ApplicationCard from "./ApplicationCard.svelte";

    export let applications;
</script>

<section>
    {#each applications as application}
    <ApplicationCard application={application} />
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 1rem;
    }

    @media (max-width: 640px) {
        section {
            flex-direction: column;
        }
    }
</style>
