<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import ScheduledTransactionForm from '../ScheduledTransactionForm.svelte';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<QuantumPage
    pageTitle="Quantum: New Scheduled Transaction"
    headline="Create a new Scheduled Transaction"
    {data}
>
    <ScheduledTransactionForm accountId={$page.params.accountId} {data} />
</QuantumPage>
