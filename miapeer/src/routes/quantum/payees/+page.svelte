<script lang="ts">
    import type { PageData } from './$types';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import { popup } from '@skeletonlabs/skeleton';

    import { invalidate } from '$app/navigation';

    export let data: PageData;

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    const handleConfirmDelete = (payee) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the payee named "${payee.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(payee);
                }
            }
        };

        modalStore.trigger(modal);
    };
    const handleDelete = async (payee) => {
        const deletePayeeRequest = await fetch(`/quantum/payees/${payee.payee_id}`, {
            method: 'DELETE'
        });

        if (deletePayeeRequest.ok) {
            invalidate('quantum:payees');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">Payees</h1>

    {#if Object.keys(data.payees).length}
        {@const gridDef = 'grid grid-cols-[minmax(200px,_1fr)_50px] gap-4 p-4 ml-2 mr-2'}

        <div class={`${gridDef} mt-4 bg-surface-600 rounded-t-lg font-bold`}></div>

        {#each Object.keys(data.payees) as payeeId, payeeIndex}
            {@const payee = data.payees[payeeId]}
            <div
                class={`${gridDef} ${payeeIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${payeeIndex === Object.keys(data.payees).length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div class="content-center">{payee.name}</div>
                <div class="action-cell text-right">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'payee-actions-' + payeeId,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="payee-actions-{payeeId}">
                            <div class="btn-group variant-filled">
                                <a href={`./payees/${payeeId}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(payee)}
                                    ><i class="fa-solid fa-trash" /></button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">You haven't set up any payees yet. Click the button below to create one.</h3>
    {/if}
</section>

<FloatingActionButton href="./payees/new"><i class="fa-solid fa-plus" /></FloatingActionButton>
