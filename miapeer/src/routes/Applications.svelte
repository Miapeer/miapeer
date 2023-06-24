<script>
    import ApplicationCard from './ApplicationCard.svelte';

    export let applications;
</script>

<section>
    {#each applications as application}
        <ApplicationCard {application} />
        <ApplicationCard {application} />
        <ApplicationCard {application} />
        <ApplicationCard {application} />
    {/each}
</section>

<style>
    section {
        display: grid;
        grid-auto-flow: row;
        /* flex-direction: row;
        justify-content: space-evenly;
        padding: 1rem; */
    }
    /*
    @media (max-width: 640px) {
        section {
            flex-direction: column;
            padding: 1rem 0.25rem;
        }
    } */
</style>
