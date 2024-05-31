<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    let transactionTypeName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/transactiontypes');
    };

    const handleCreateTransactionType = async () => {
        const requestData = {
            portfolioId: data.portfolioId,
            transactionTypeName
        };
        const res = await fetch('/quantum/transactiontypes/new', {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateTransactionType();
        }
    };

    export let data: PageData;
</script>

<div class="login-form grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new transaction type</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
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
