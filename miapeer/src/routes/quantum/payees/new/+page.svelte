<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { createPayee } from '@quantum/api';

    let payeeName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/payees');
    };

    const handleCreatePayee = async () => {
        let newPayee = await createPayee(data.portfolioId, payeeName);
        if (newPayee) {
            goto(data.redirectUrl ?? '/quantum/payees');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreatePayee();
        }
    };

    export let data: PageData;
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new payee</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Payee Name</div>
        <input type="text" bind:value={payeeName} on:keypress={handleKeyPress} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!payeeName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleCreatePayee}
        >
            Create Payee
        </button>
    </div>
</div>
