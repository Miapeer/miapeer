<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import PayeeForm from '../PayeeForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: Edit Payee" headline="Edit Payee" {data}>
    <PayeeForm portfolioId={data.portfolioId} payee={data.payee} />
</QuantumPage>
