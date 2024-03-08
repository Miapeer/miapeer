<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';

    export let data: PageData;

    let accountName = data.account.name;
    let startingBalance = (data.account.starting_balance / 100).toLocaleString(navigator.language);
    let updatingAccount;

    const handleEditAccount = async () => {
        updatingAccount = true;

        const cleanedStartingBalance =
            Number(startingBalance.replace(/[^0-9\.-]+/g, '')).toFixed(2) * 100;
        const requestData = {
            accountId: data.account.account_id,
            accountName,
            startingBalance: cleanedStartingBalance
        };

        const res = await fetch(`/quantum/accounts/${data.accountId}`, {
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
    <TextField placeholder="Starting Balance" bind:value={startingBalance} />
    <Button
        disabled={!data.account.name || !data.account.starting_balance}
        waiting={updatingAccount}
        onClick={handleEditAccount}>Update Account</Button
    >
</div>
