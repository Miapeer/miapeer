<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import AccountForm from '../AccountForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: New Account" headline="Create a new Account" {data}>
    <AccountForm portfolioId={data.portfolioId} account={data.account} {data} />
</QuantumPage>
