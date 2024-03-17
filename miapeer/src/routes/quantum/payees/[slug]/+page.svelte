<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';

    export let data: PageData;

    let payeeName = data.payee.name;
    let creatingPayee;

    const handleEditPayee = async () => {
        creatingPayee = true;

        const requestData = { portfolioId: data.portfolioId, payeeName };
        const res = await fetch('/quantum/payees/new', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            await invalidate('quantum:payees');
            goto(data.redirectUrl ?? '..');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<h1>Edit payee</h1>

<div class="edit-payee-wrapper">
    <TextField placeholder="Payee Name" bind:value={data.payee.name} />
    <Button disabled={!data.payee.name} waiting={creatingPayee} onClick={handleEditPayee}
        >Create Payee</Button
    >
</div>
