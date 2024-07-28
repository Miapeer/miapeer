<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import { page } from '$app/stores';

    let transactionTypeId = $page.params.transactionTypeId;

    export let data: PageData;

    let transactionTypeName = data.transactionType.name;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/transactiontypes');
    };

    const handleEditTransactionType = async () => {
        const requestData = {
            transactionTypeName
        };
        const res = await fetch(`/quantum/transactiontypes/${$page.params.transactionTypeId}`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            await invalidate('quantum:transactiontypes');
            goto(data.redirectUrl ?? '/quantum/transactiontypes');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
    <h1 class="h1">Edit transaction type</h1>

    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
        <div class="input-group-shim">Transaction Type Name</div>
        <input type="text" bind:value={transactionTypeName} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!data.transactionType.name}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleEditTransactionType}
        >
            Update Transaction Type
        </button>
    </div>
</div>
