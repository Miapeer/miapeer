<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';

    export let data: PageData;

    let accountName = data.account.name;
    let startingBalance;
    let creatingAccount;

    const handleCreateAccount = async () => {
        creatingAccount = true;

        const requestData = { portfolioId: data.portfolioId, accountName, startingBalance };
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
</script>

<h1>Edit account</h1>

<div class="edit-account-wrapper">
    <TextField placeholder="Account Name" bind:value={data.account.name} />
    <TextField
        type="number"
        placeholder="Starting Balance"
        bind:value={data.account.starting_balance}
    />
    <Button
        disabled={!data.account.name || !data.account.starting_balance}
        waiting={creatingAccount}
        onClick={handleCreateAccount}>Create Account</Button
    >
</div>
