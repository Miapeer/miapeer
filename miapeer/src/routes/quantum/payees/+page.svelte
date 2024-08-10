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
        <div class="table-container px-2">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th />
                        <th class="w-16" />
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(data.payees) as payeeKey}
                        {@const payee = data.payees[payeeKey]}
                        <tr>
                            <td>{payee.name}</td>
                            <td class="action-cell text-right">
                                <div>
                                    <button
                                        type="button"
                                        class="btn-icon variant-filled"
                                        use:popup={{
                                            event: 'click',
                                            target: 'payee-actions-' + payee.payee_id,
                                            placement: 'left'
                                        }}><i class="fa-solid fa-ellipsis-v" /></button
                                    >
                                    <div data-popup="payee-actions-{payee.payee_id}">
                                        <div class="btn-group variant-filled">
                                            <a href={`./payees/${payee.payee_id}`}
                                                ><i class="fa-solid fa-pen-to-square" /></a
                                            >
                                            <button on:click={() => handleConfirmDelete(payee)}
                                                ><i class="fa-solid fa-trash" /></button
                                            >
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <h3 class="h3">You haven't set up any payees yet. Click the button below to create one.</h3>
    {/if}
</section>

<FloatingActionButton href="./payees/new"><i class="fa-solid fa-plus" /></FloatingActionButton>
