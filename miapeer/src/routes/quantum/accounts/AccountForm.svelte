<script lang="ts">
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import { formatMoney } from '@quantum/util';

    export let portfolioId;
    export let account = null;

    $: isCreatingNew = !account;

    let selectedAccountName = account?.name || '';
    let selectedStartingBalance = formatMoney(account?.starting_balance || 0);

    const gridRowDef = 'input-group input-group-divider grid-cols-[12rem_auto]';
</script>

<form method="POST" action={isCreatingNew ? null : '?/update'} use:enhance>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <input type="text" name="portfolioId" hidden value={portfolioId} />

        <div class={gridRowDef}>
            <div class="input-group-shim">Account Name</div>
            <input type="text" name="accountName" bind:value={selectedAccountName} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Starting Balance</div>
            <input type="text" name="startingBalance" bind:value={selectedStartingBalance} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={() => goto('.')}>
                Cancel
            </button>

            <button
                disabled={!selectedAccountName || !selectedStartingBalance}
                type="submit"
                class="btn variant-filled-primary"
            >
                {`${isCreatingNew ? 'Create' : 'Update'} Account`}
            </button>
        </div>
    </div>
</form>
