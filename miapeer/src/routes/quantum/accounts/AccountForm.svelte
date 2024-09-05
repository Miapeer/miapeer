<script lang="ts">
    import { goto, invalidate } from '$app/navigation';
    import { createAccount, updateAccount } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';

    export let portfolioId;
    export let account = null;

    $: isCreatingNew = !account;

    let selectedAccountName = account?.name || '';
    let selectedStartingBalance = formatMoney(account?.starting_balance || 0);

    const handleCancel = () => {
        goto('.');
    };

    const handleProcessAccount = async () => {
        const fnAccount = isCreatingNew ? createAccount : updateAccount;

        let returnedAccount = await fnAccount({
            portfolioId,
            accountId: account?.account_id,
            accountName: selectedAccountName,
            startingBalance: unformatMoney(selectedStartingBalance)
        });
        if (returnedAccount) {
            await invalidate('quantum:accounts');
            goto('.');
        }
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[12rem_auto]';
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <div class={gridRowDef}>
        <div class="input-group-shim">Account Name</div>
        <input type="text" bind:value={selectedAccountName} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Starting Balance</div>
        <input type="text" bind:value={selectedStartingBalance} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!selectedAccountName || !selectedStartingBalance}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleProcessAccount}
        >
            Update Account
        </button>
    </div>
</div>
