<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import { formatMoney, unformatMoney } from '@quantum/util';

    import { page } from '$app/stores';

    let accountId = $page.params.accountId;

    export let data: PageData;

    let accountName = data.account.name;
    let startingBalance = formatMoney(data.account.starting_balance);

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/accounts');
    };

    const handleEditAccount = async () => {
        const cleanedStartingBalance = unformatMoney(startingBalance);
        const requestData = {
            accountName,
            startingBalance: cleanedStartingBalance
        };

        const res = await fetch(`/quantum/accounts/${accountId}`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            invalidate('quantum:accounts');
            goto(data.redirectUrl ?? '/quantum/accounts');
        } else {
            console.error('NOT ok');
        }
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[12rem_auto]';
</script>

<QuantumPage pageTitle="Quantum: Edit Account" headline="Edit Account" {data}>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <div class={gridRowDef}>
            <div class="input-group-shim">Account Name</div>
            <input type="text" bind:value={accountName} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Starting Balance</div>
            <input type="text" bind:value={startingBalance} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
                Cancel
            </button>

            <button
                disabled={!accountName || !startingBalance}
                type="button"
                class="btn variant-filled-primary"
                on:click={handleEditAccount}
            >
                Update Account
            </button>
        </div>
    </div>
</QuantumPage>
