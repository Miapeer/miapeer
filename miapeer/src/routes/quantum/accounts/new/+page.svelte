<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    let accountName;
    let startingBalance;
    let creatingAccount;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '..');
    };

    const handleCreateAccount = async () => {
        creatingAccount = true;

        const simplified_starting_balance = Math.floor(startingBalance * 100);

        const requestData = {
            portfolioId: data.portfolioId,
            accountName,
            startingBalance: simplified_starting_balance
        };
        const res = await fetch('/quantum/accounts/new', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            await invalidate('quantum:accounts');
            goto(data.redirectUrl ?? '..');
        } else {
            console.error('NOT ok');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateAccount();
        }
    };

    export let data: PageData;
</script>

<div class="login-form grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new account</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Account Name</div>
        <input type="text" bind:value={accountName} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Starting Balance</div>
        <input type="text" bind:value={startingBalance} on:keypress={handleKeyPress} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!accountName || !startingBalance}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleCreateAccount}
        >
            Update Account
        </button>
    </div>
</div>
