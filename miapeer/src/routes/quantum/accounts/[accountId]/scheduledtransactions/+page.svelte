<script lang="ts">
    import QuantumTable from '@quantum/QuantumTable.svelte';
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { formatMoney } from '@quantum/util';

    export let data: PageData;
    import { page } from '$app/stores';

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'top'
    };

    const handleCreateTransaction = async (scheduledTransaction) => {
        const createTransactionRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${scheduledTransaction.scheduled_transaction_id}/createtransaction`,
            {
                method: 'POST'
            }
        );

        if (createTransactionRequest.ok) {
            invalidate('quantum:scheduledtransactions');
            invalidate('quantum:transactions');
        } else {
            console.error('NOT ok');
        }
    };

    const handleSkipIteration = async (scheduledTransaction) => {
        const skipIterationRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${scheduledTransaction.scheduled_transaction_id}/skipiteration`,
            {
                method: 'POST'
            }
        );

        if (skipIterationRequest.ok) {
            invalidate('quantum:scheduledtransactions');
        } else {
            console.error('NOT ok');
        }
    };

    const handleConfirmDelete = (scheduledTransaction) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the scheduled transaction: ${data.indexedPayees[scheduledTransaction.payee_id]?.name || ''}?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(scheduledTransaction);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const handleDelete = async (scheduledTransaction) => {
        const deleteScheduledTransactionRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${scheduledTransaction.scheduled_transaction_id}`,
            {
                method: 'DELETE'
            }
        );

        if (deleteScheduledTransactionRequest.ok) {
            invalidate('quantum:scheduledtransactions');
        } else {
            console.error('NOT ok');
        }
    };

    const gridRowDef =
        'grid grid-cols-[100px_150px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_120px_15px_80px] gap-4 p-4 ml-2 mr-2';
</script>

<QuantumTable
    pageTitle="Quantum: Scheduled Transactions"
    headline={`${data.indexedAccounts[$page.params.accountId].name} Scheduled Transactions`}
    newItemHref="./scheduledtransactions/new"
    {data}
>
    <svelte:fragment slot="tableHeader">
        {#if data.scheduledTransactions.length > 0}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>
                <div>Next Date</div>
                <div>Repeat Option</div>
                <div>Type</div>
                <div>Payee</div>
                <div>Category</div>
                <div class="text-right">Next Amount</div>
                <div></div>
                <div></div>
            </div>
        {/if}
    </svelte:fragment>

    {#if data.scheduledTransactions.length > 0}
        {#each data.scheduledTransactions as scheduledTransaction, scheduledTransactionIndex}
            <div
                class={`${gridRowDef} ${scheduledTransactionIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${scheduledTransactionIndex === data.scheduledTransactions.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div class="content-center">{scheduledTransaction.start_date}</div>
                <div class="content-center">
                    {data.indexedRepeatOptions[scheduledTransaction.repeat_option_id]?.name || ''}
                </div>
                <div class="content-center">
                    {data.indexedTransactionTypes[scheduledTransaction.transaction_type_id]?.name ||
                        ''}
                </div>
                <div class="content-center">
                    {data.indexedPayees[scheduledTransaction.payee_id]?.name || ''}
                </div>
                <div class="content-center">
                    {data.indexedCategories[scheduledTransaction.category_id]?.name || ''}
                </div>
                <div class="content-center text-right">
                    {scheduledTransaction.next_transaction
                        ? formatMoney(scheduledTransaction.next_transaction.amount)
                        : ''}
                </div>
                <div class="content-center">
                    {#if scheduledTransaction.notes}
                        <i
                            class="fa fa-clipboard-list"
                            use:popup={{
                                event: 'hover',
                                target: `accountTransactionsNotes${scheduledTransaction.scheduled_transaction_id}`,
                                placement: 'top'
                            }}
                        ></i>
                        <div
                            class="card p-4 w-72 shadow-xl"
                            data-popup={`accountTransactionsNotes${scheduledTransaction.scheduled_transaction_id}`}
                        >
                            <div><p>{scheduledTransaction.notes}</p></div>
                            <div class="arrow bg-surface-100-800-token" />
                        </div>
                    {/if}
                </div>

                <div>
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target:
                                    'transaction-actions-' +
                                    scheduledTransaction.scheduled_transaction_id,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div
                            data-popup="transaction-actions-{scheduledTransaction.scheduled_transaction_id}"
                        >
                            <div class="btn-group variant-filled">
                                <button
                                    on:click={() => handleCreateTransaction(scheduledTransaction)}
                                    ><i class="fa fa-play"></i></button
                                >
                                <button on:click={() => handleSkipIteration(scheduledTransaction)}
                                    ><i class="fa fa-fast-forward"></i></button
                                >
                                <a
                                    href={`./scheduledtransactions/${scheduledTransaction.scheduled_transaction_id}`}
                                    ><i class="fa-solid fa-pen-to-square"></i></a
                                >
                                <button on:click={() => handleConfirmDelete(scheduledTransaction)}
                                    ><i class="fa-solid fa-trash"></i></button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">
            You haven't added any scheduled transactions yet. Click the button below to create one.
        </h3>
    {/if}
</QuantumTable>

<div class="popovers">
    <div class="card p-4 w-72 shadow-xl" data-popup="accountTransactionsExcluded">
        <div><p>This transaction is excluded from forecast calculations</p></div>
        <div class="arrow bg-surface-100-800-token" />
    </div>
</div>
