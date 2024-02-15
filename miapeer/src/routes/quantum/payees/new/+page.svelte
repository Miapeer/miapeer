<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';

    let payeeName;
    let startingBalance;
    let creatingPayee;

    const handleCreatePayee = async () => {
        creatingPayee = true;

        const requestData = {
            portfolioId: data.portfolioId,
            payeeName
        };
        const res = await fetch('/quantum/payees/new', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            await invalidate('quantum:payees');
            goto(data.redirectUrl ?? '/quantum/payees');
        } else {
            console.error('NOT ok');
        }
    };

    export let data: PageData;
</script>

<div class="new-payee-wrapper">
    <h1>Create a new payee</h1>

    <TextField placeholder="Payee Name" bind:value={payeeName} />

    <Button disabled={!payeeName} waiting={creatingPayee} onClick={handleCreatePayee}>
        Create Payee
    </Button>
</div>

<style>
    .new-payee-wrapper {
        display: grid;
        gap: 1em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>
