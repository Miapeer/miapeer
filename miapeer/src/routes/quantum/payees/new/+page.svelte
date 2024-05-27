<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    let payeeName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/payees');
    };

    const handleCreatePayee = async () => {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreatePayee();
        }
    };

    export let data: PageData;
</script>

<div class="login-form grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new payee</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Payee Name</div>
        <input type="text" bind:value={payeeName} on:keypress={handleKeyPress} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!payeeName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleCreatePayee}
        >
            Create Payee
        </button>
    </div>
</div>
