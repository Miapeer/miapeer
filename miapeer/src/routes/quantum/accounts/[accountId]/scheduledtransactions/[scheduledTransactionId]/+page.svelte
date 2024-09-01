<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import ScheduledTransactionForm from '../ScheduledTransactionForm.svelte';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<QuantumPage
    pageTitle="Quantum: Edit Scheduled Transaction"
    headline="Edit Scheduled Transaction"
    {data}
>
    <ScheduledTransactionForm
        accountId={$page.params.accountId}
        scheduledTransaction={data.scheduledTransaction}
        {data}
    />
</QuantumPage>
