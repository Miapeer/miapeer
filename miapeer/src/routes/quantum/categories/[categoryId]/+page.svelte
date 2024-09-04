<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import CategoryForm from '../CategoryForm.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<QuantumPage pageTitle="Quantum: Edit Category" headline="Edit Category" {data}>
    <CategoryForm portfolioId={data.portfolioId} category={data.category} {data} />
</QuantumPage>
