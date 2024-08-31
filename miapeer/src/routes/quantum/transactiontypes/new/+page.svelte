<script lang="ts">
    import MiapeerPage from '../../../MiapeerPage.svelte';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { createTransactionType } from '@quantum/api';

    export let data: PageData;

    let transactionTypeName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/transactiontypes');
    };

    const handleCreateTransactionType = async () => {
        let newTransactionType = await createTransactionType(data.portfolioId, transactionTypeName);
        if (newTransactionType) {
            goto(data.redirectUrl ?? '/quantum/transactiontypes');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateTransactionType();
        }
    };
</script>

<MiapeerPage
    pageTitle="Quantum: New Transaction Type"
    headline="Create a new Transaction Type"
    {data}
>
    <div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
        <div class="input-group input-group-divider grid-cols-[14rem_auto]">
            <div class="input-group-shim">Transaction Type Name</div>
            <input type="text" bind:value={transactionTypeName} on:keypress={handleKeyPress} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
                Cancel
            </button>

            <button
                disabled={!transactionTypeName}
                type="button"
                class="btn variant-filled-primary"
                on:click={handleCreateTransactionType}
            >
                Create Transaction Type
            </button>
        </div>
    </div>
</MiapeerPage>
