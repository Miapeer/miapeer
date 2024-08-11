<script lang="ts">
    import type { PageData } from './$types';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import { popup } from '@skeletonlabs/skeleton';

    import { invalidate } from '$app/navigation';

    export let data: PageData;

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

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
</script>

<section>
    <h1 class="h1">Transaction Types</h1>

    {#if Object.keys(data.transactionTypes).length}
        {@const gridDef = 'grid grid-cols-[minmax(200px,_1fr)_50px] gap-4 p-4 ml-2 mr-2'}

        <div class={`${gridDef} mt-4 bg-surface-600 rounded-t-lg font-bold`}></div>

        {#each Object.keys(data.transactionTypes) as transactionTypeId, transactionTypeIndex}
            {@const transactionType = data.transactionTypes[transactionTypeId]}
            <div
                class={`${gridDef} ${transactionTypeIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${transactionTypeIndex === Object.keys(data.transactionTypes).length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
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
            You haven't set up any transaction types yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./transactiontypes/new"
    ><i class="fa-solid fa-plus" /></FloatingActionButton
>
