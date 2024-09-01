<script lang="ts">
    import type { PageData } from './$types';
    import MiapeerPage from './MiapeerPage.svelte';

    export let data;
</script>

<MiapeerPage pageTitle="Miapeer: Home" {data}>
    <div class="container h-full mx-auto flex justify-center items-center">
        {#each data.applications as application}
            <a href={application.url} class="card card-hover p-4 w-80 m-5 text-center">
                <header class="card-header">
                    <i class={`icon bg-primary-500 ${application.icon}`} />
                </header>
                <section class="p-4 text-4xl font-bold">{application.name}</section>
                <footer class="card-footer">{@html application.description}</footer>
            </a>
        {/each}
    </div>
</MiapeerPage>

<style type="postcss">
    .card .icon {
        border-radius: 100%;
        font-size: 3rem;
        text-align: center;
        line-height: 4rem;
        height: 4rem;
        width: 4rem;
        text-indent: 4px;
    }
</style>
