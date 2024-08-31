<script lang="ts">
    import QuantumTable from '../QuantumTable.svelte';
    import type { PageData } from './$types';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import { popup } from '@skeletonlabs/skeleton';

    import { invalidate } from '$app/navigation';

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    export let data: PageData;

    const handleConfirmDelete = (transactionType) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the transaction type named "${transactionType.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(transactionType);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const handleDelete = async (transactionType) => {
        const deleteTransactionTypeRequest = await fetch(
            `/quantum/transactiontypes/${transactionType.transaction_type_id}`,
            {
                method: 'DELETE'
            }
        );

        if (deleteTransactionTypeRequest.ok) {
            invalidate('quantum:transactiontypes');
        } else {
            console.error('NOT ok');
        }
    };

    const gridRowDef = 'grid grid-cols-[minmax(200px,_1fr)_50px] gap-4 p-4 ml-2 mr-2';
</script>

<QuantumTable
    pageTitle="Quantum: Transaction Types"
    headline="Transaction Types"
    newItemHref="./transactiontypes/new"
    {data}
>
    <svelte:fragment slot="tableHeader">
        {#if data.transactionTypes.length}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>&nbsp;</div>
        {/if}
    </svelte:fragment>

    {#if data.transactionTypes.length}
        {#each data.transactionTypes as transactionType, transactionTypeIndex}
            <div
                class={`${gridRowDef} ${transactionTypeIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${transactionTypeIndex === data.transactionTypes.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div class="content-center">{transactionType.name}</div>
                <div class="action-cell text-right">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target:
                                    'transaction-type-actions-' +
                                    transactionType.transaction_type_id,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div
                            data-popup="transaction-type-actions-{transactionType.transaction_type_id}"
                        >
                            <div class="btn-group variant-filled">
                                <a
                                    href={`./transactiontypes/${transactionType.transaction_type_id}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(transactionType)}
                                    ><i class="fa-solid fa-trash" /></button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">
            You haven't set up any transaction types yet. Click the button at the top-right to
            create one.
        </h3>
    {/if}
</QuantumTable>
