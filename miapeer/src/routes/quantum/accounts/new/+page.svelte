<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';

    let accountName;
    let startingBalance;
    let creatingAccount;

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

    export let data: PageData;
</script>

<div class="new-account-wrapper">
    <h1>Create a new account</h1>

    <TextField placeholder="Account Name" bind:value={accountName} />

    <TextField type="number" placeholder="Starting Balance" bind:value={startingBalance} />

    <Button
        disabled={!accountName || !startingBalance}
        waiting={creatingAccount}
        onClick={handleCreateAccount}
    >
        Create Account
    </Button>
</div>

<style>
    .new-account-wrapper {
        display: grid;
        gap: 1em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>
