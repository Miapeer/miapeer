<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import TransactionTypeForm from '../TransactionTypeForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage
    pageTitle="Quantum: New Transaction Type"
    headline="Create a new Transaction Type"
    {data}
>
    <TransactionTypeForm portfolioId={data.portfolioId} {data} />
</QuantumPage>
