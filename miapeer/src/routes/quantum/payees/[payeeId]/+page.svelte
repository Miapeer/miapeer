<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    import { page } from '$app/stores';

    let payeeId = $page.params.payeeId;

    export let data: PageData;

    let payeeName = data.payee.name;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/payees');
    };

    const handleEditPayee = async () => {
        const requestData = { payeeName };
        const res = await fetch(`/quantum/payees/${$page.params.payeeId}`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            invalidate('quantum:payees');
            goto(data.redirectUrl ?? '/quantum/payees');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<QuantumPage pageTitle="Quantum: Edit Payee" headline="Edit Payee" {data}>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <div class="input-group input-group-divider grid-cols-[12rem_auto]">
            <div class="input-group-shim">Payee Name</div>
            <input type="text" bind:value={payeeName} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
                Cancel
            </button>

            <button
                disabled={!data.payee.name}
                type="button"
                class="btn variant-filled-primary"
                on:click={handleEditPayee}
            >
                Update Payee
            </button>
        </div>
    </div>
</QuantumPage>
