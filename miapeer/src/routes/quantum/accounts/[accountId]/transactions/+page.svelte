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

    const handleConfirmDelete = (transaction) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the transaction on ${transaction.transaction_date} for ${formatMoney(transaction.amount)}?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(transaction);
                }
            }
        };

        modalStore.trigger(modal);
    };
    const handleDelete = async (transaction) => {
        const deleteTransactionRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/transactions/${transaction.transaction_id}`,
            {
                method: 'DELETE'
            }
        );

        if (deleteTransactionRequest.ok) {
            invalidate('quantum:transactions');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">{`${data.accounts[$page.params.accountId].name} Transactions`}</h1>

    <div class="popovers">
        <div class="card p-4 w-72 shadow-xl" data-popup="accountTransactionsExcluded">
            <div><p>This transaction is excluded from forecast calculations</p></div>
            <div class="arrow bg-surface-100-800-token" />
        </div>
    </div>

    {#if Object.keys(data.transactions).length > 0}
        {@const gridDef =
            'grid grid-cols-[100px_100px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_80px_80px_15px_15px_15px_50px] gap-4 p-4 ml-2 mr-2'}
        <div class={`${gridDef} mt-4 bg-surface-600 rounded-t-lg font-bold`}>
            <div>Date</div>
            <div>Clear</div>
            <div>Type</div>
            <div>Payee</div>
            <div>Category</div>
            <div class="text-right">Amount</div>
            <div class="text-right">Balance</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {#each Object.keys(data.transactions) as transactionId, transactionIndex}
            {@const transaction = data.transactions[transactionId]}
            <div
                class={`${gridDef} ${transactionIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${transactionIndex === Object.keys(data.transactions).length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div class="content-center">{transaction.transaction_date}</div>
                <div class="content-center">{transaction.clear_date || ''}</div>
                <div class="content-center">
                    {data.transactionTypes[transaction.transaction_type_id]?.name || ''}
                </div>
                <div class="content-center">{data.payees[transaction.payee_id]?.name || ''}</div>
                <div class="content-center">
                    {data.categories[transaction.category_id]?.name || ''}
                </div>
                <div class="content-center text-right">
                    {formatMoney(transaction.amount)}
                </div>
                <div class="content-center text-right">
                    {formatMoney(transaction.balance)}
                </div>

                <div class="content-center">
                    {#if transaction.exclude_from_forecast}
                        <i
                            class="fa fa-calculator"
                            use:popup={{
                                event: 'hover',
                                target: 'accountTransactionsExcluded',
                                placement: 'top'
                            }}
                        ></i>
                    {/if}
                </div>
                <div class="content-center text-right">
                    {#if transaction.check_number}
                        <i
                            class="fa fa-check-square"
                            use:popup={{
                                event: 'hover',
                                target: `accountTransactionsCheckNumber${transaction.transaction_id}`,
                                placement: 'top'
                            }}
                        ></i>
                        <div
                            class="card p-4 w-72 shadow-xl"
                            data-popup={`accountTransactionsCheckNumber${transaction.transaction_id}`}
                        >
                            <div><p>{transaction.check_number}</p></div>
                            <div class="arrow bg-surface-100-800-token" />
                        </div>
                    {/if}
                </div>
                <div class="content-center">
                    {#if transaction.notes}
                        <i
                            class="fa fa-clipboard-list"
                            use:popup={{
                                event: 'hover',
                                target: `accountTransactionsNotes${transaction.transaction_id}`,
                                placement: 'top'
                            }}
                        ></i>
                        <div
                            class="card p-4 w-72 shadow-xl"
                            data-popup={`accountTransactionsNotes${transaction.transaction_id}`}
                        >
                            <div><p>{transaction.notes}</p></div>
                            <div class="arrow bg-surface-100-800-token" />
                        </div>
                    {/if}
                </div>

                <div class="content-center">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'transaction-actions-' + transaction.transaction_id,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="transaction-actions-{transaction.transaction_id}">
                            <div class="btn-group variant-filled">
                                <a href={`./transactions/${transaction.transaction_id}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(transaction)}
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
            You haven't added any transactions yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./transactions/new"><i class="fa-solid fa-plus" /></FloatingActionButton
>
