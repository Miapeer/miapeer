<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import BudgetForm from '../BudgetForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: New Budget" headline="Create a new Budget" {data}>
    <BudgetForm portfolioId={data.portfolioId} budget={data.budget} {data} />
</QuantumPage>
