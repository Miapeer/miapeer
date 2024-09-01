<script lang="ts">
    import { goto, invalidate } from '$app/navigation';
    import { createPayee, updatePayee } from '@quantum/api';

    export let portfolioId;
    export let payee = null;

    let isCreatingNew = !!payee;

    let selectedPayeeName = payee?.name || '';

    const handleCancel = () => {
        goto('.');
    };

    const handleProcessPayee = async () => {
        const fnPayee = isCreatingNew ? createPayee : updatePayee;

        let returnedPayee = await fnPayee({
            portfolioId,
            payeeId: payee?.payee_id,
            payeeName: selectedPayeeName
        });
        if (returnedPayee) {
            invalidate('quantum:payees');
            goto('.');
        }
    };
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Payee Name</div>
        <input type="text" bind:value={selectedPayeeName} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!selectedPayeeName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleProcessPayee}
        >
            {`${isCreatingNew ? 'Create' : 'Update'} Payee`}
        </button>
    </div>
</div>
