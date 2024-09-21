<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import PayeeForm from '../PayeeForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: New Payee" headline="Create a new Payee" {data}>
    <PayeeForm portfolioId={data.portfolioId} />
</QuantumPage>
