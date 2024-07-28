<script lang="ts">
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

    const handleConfirmDelete = (scheduledTransaction) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the scheduled transaction: ${data.payees[scheduledTransaction.payee_id]?.name || ''}?`,
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
                method: 'DELETE',
                body: JSON.stringify({
                    scheduledTransactionId: scheduledTransaction?.scheduled_transaction_id
                })
            }
        );

        if (deleteScheduledTransactionRequest.ok) {
            invalidate('quantum:scheduledtransactions');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">{`${data.accounts[$page.params.accountId].name} Scheduled Transactions`}</h1>

    <div class="popovers">
        <div class="card p-4 w-72 shadow-xl" data-popup="accountTransactionsExcluded">
            <div><p>This transaction is excluded from forecast calculations</p></div>
            <div class="arrow bg-surface-100-800-token" />
        </div>
    </div>

    {#if data.scheduledTransactions.length > 0}
        <div
            class="grid grid-cols-[100px_150px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_80px_80px_80px] gap-4 hover"
        >
            <div>Next Date</div>
            <div>Repeat Option</div>
            <div>Type</div>
            <div>Payee</div>
            <div>Category</div>
            <div class="text-right">Next Amount</div>
            <div></div>
            <div></div>

            {#each data.scheduledTransactions as scheduledTransaction}
                <div class="content-center">{scheduledTransaction.start_date}</div>
                <div class="content-center">{scheduledTransaction.end_date || ''}</div>
                <div class="content-center">
                    {data.transactionTypes[scheduledTransaction.transaction_type_id]?.name || ''}
                </div>
                <div class="content-center">
                    {data.payees[scheduledTransaction.payee_id]?.name || ''}
                </div>
                <div class="content-center">
                    {data.categories[scheduledTransaction.category_id]?.name || ''}
                </div>
                <div class="content-center text-right">
                    {formatMoney(0)}
                </div>
                <div class="content-center">
                    {#if scheduledTransaction.notes}
                        <i
                            class="fa fa-clipboard-list"
                            use:popup={{
                                event: 'hover',
                                target: `accountTransactionsNotes${scheduledTransaction.transaction_id}`,
                                placement: 'top'
                            }}
                        ></i>
                        <div
                            class="card p-4 w-72 shadow-xl"
                            data-popup={`accountTransactionsNotes${scheduledTransaction.transaction_id}`}
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
                                <a
                                    href={`./scheduledtransactions/${scheduledTransaction.scheduled_transaction_id}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(scheduledTransaction)}
                                    ><i class="fa-solid fa-trash" /></button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <h3 class="h3">
            You haven't added any scheduled transactions yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./transactions/new"><i class="fa-solid fa-plus" /></FloatingActionButton
>
