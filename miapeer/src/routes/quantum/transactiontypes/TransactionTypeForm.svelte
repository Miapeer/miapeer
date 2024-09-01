<script lang="ts">
    import type { PageData } from './[transactionTypeId]/$types';
    import { goto, invalidate } from '$app/navigation';
    import { createTransactionType, updateTransactionType } from '@quantum/api';

    export let portfolioId;
    export let transactionType = null;
    export let data;

    let isCreatingNew = !!transactionType;

    let selectedTransactionTypeName = transactionType?.name || '';

    const handleCancel = () => {
        goto('.');
    };

    const handleProcessTransactionType = async () => {
        const fnTransactionType = isCreatingNew ? createTransactionType : updateTransactionType;

        let returnedTransactionType = await fnTransactionType({
            portfolioId,
            transactionTypeId: transaction?.transaction_id,
            transactionTypeName: selectedTransactionTypeName
        });
        if (returnedTransactionType) {
            invalidate('quantum:transactiontypes');
            goto('.');
        }
    };
</script>

<div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
        <div class="input-group-shim">Transaction Type Name</div>
        <input type="text" bind:value={selectedTransactionTypeName} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!selectedTransactionTypeName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleProcessTransactionType}
        >
            {`${isCreatingNew ? 'Create' : 'Update'} Transaction Type`}
        </button>
    </div>
</div>
