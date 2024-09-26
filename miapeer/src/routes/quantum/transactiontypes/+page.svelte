<script lang="ts">
    import QuantumTable from '../QuantumTable.svelte';
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';
    import { enhance, applyAction, deserialize } from '$app/forms';
    import { popup, getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    export let data: PageData;

    const handleConfirmDelete = (event, transactionType) => {
        const targetElement = event.currentTarget;

        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the transaction type named "${transactionType.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    deleteTransactionType(targetElement);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const deleteTransactionType = async (targetElement) => {
        const data = new FormData(targetElement);

        const response = await fetch(targetElement.action, {
            method: 'POST',
            body: data
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());

        if (result.type === 'success') {
            invalidate('quantum:transactiontypes');
        } else {
            console.error('NOT ok');
        }

        applyAction(result);
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
                            <form
                                method="POST"
                                on:submit|preventDefault={(event) => {
                                    handleConfirmDelete(event, transactionType);
                                }}
                                action={`transactiontypes/${transactionType.transaction_type_id}?/delete`}
                                use:enhance
                            >
                                <div class="btn-group variant-filled">
                                    <a
                                        href={`./transactiontypes/${transactionType.transaction_type_id}`}
                                        ><i class="fa-solid fa-pen-to-square" /></a
                                    >
                                    <button type="submit"><i class="fa-solid fa-trash" /></button>
                                </div>
                            </form>
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
