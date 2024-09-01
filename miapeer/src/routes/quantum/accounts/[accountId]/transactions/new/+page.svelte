<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import TransactionForm from '../TransactionForm.svelte';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: New Transaction" headline="Create a new Transaction" {data}>
    <TransactionForm accountId={$page.params.accountId} {data} />
</QuantumPage>
