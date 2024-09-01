<script lang="ts">
    import QuantumPage from './QuantumPage.svelte';
    import { page } from '$app/stores';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
    export let pageTitle = 'Quantum';
    export let headline = '';
    export let newItemHref = '';

    let transactionMonthLimit = $page.url.searchParams.get('limitmonths') ?? 3;
    let forecastMonthLimit = $page.url.searchParams.get('forecastmonths') ?? 1;

    const updateLimits = async () => {
        window.location = `/quantum/accounts/${$page.params.accountId}/transactions?limitmonths=${transactionMonthLimit}&forecastmonths=${forecastMonthLimit}`;
    };
</script>

<QuantumPage {pageTitle} {headline} {data}>
    <div class="bg-surface-900 fixed w-full z-10">
        <slot name="tableHeader" />
    </div>

    <div class="pt-14">
        <slot />
    </div>
</QuantumPage>

{#if newItemHref}
    <FloatingActionButton href={newItemHref}><i class="fa-solid fa-plus" /></FloatingActionButton>
{/if}
