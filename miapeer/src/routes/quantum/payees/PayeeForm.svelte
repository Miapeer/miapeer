<script lang="ts">
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    export let portfolioId;
    export let payee = null;

    $: isCreatingNew = !payee;

    let selectedPayeeName = payee?.name || '';
</script>

<form method="POST" action={isCreatingNew ? null : '?/update'} use:enhance>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <input type="text" name="portfolioId" hidden value={portfolioId} />

        <div class="input-group input-group-divider grid-cols-[12rem_auto]">
            <div class="input-group-shim">Payee Name</div>
            <input type="text" name="payeeName" bind:value={selectedPayeeName} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={() => goto('.')}>
                Cancel
            </button>

            <button disabled={!selectedPayeeName} type="submit" class="btn variant-filled-primary">
                {`${isCreatingNew ? 'Create' : 'Update'} Payee`}
            </button>
        </div>
    </div>
</form>
