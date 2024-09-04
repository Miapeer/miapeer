<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import TransactionTypeForm from '../TransactionTypeForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: Edit Transaction Type" headline="Edit Transaction Type" {data}>
    <TransactionTypeForm
        portfolioId={data.portfolioId}
        transactionType={data.transactionType}
        {data}
    />
</QuantumPage>
