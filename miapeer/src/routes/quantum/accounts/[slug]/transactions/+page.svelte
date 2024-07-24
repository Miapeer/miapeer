<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    export let data: PageData;

    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'top'
    };

    const handleConfirmDelete = (payee) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the transaction named "${'zzz' ?? ''}"?`,
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
        const deletePayeeRequest = await fetch('/quantum/payees', {
            method: 'DELETE',
            body: JSON.stringify({ payeeId: payee?.payee_id })
        });

        if (deletePayeeRequest.ok) {
            invalidate('quantum:payees');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">{data.account.name}</h1>

    <div class="popovers">
        <div class="card p-4 w-72 shadow-xl" data-popup="accountTransactionsExcluded">
            <div><p>This transaction is excluded from forecast calculations</p></div>
            <div class="arrow bg-surface-100-800-token" />
        </div>
    </div>

    {#if data.transactions.length > 0}
        <div
            class="grid grid-cols-[100px_100px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_80px_80px_15px_15px_15px_50px] gap-4 hover"
        >
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

            {#each data.transactions as transaction}
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
                    {(transaction.amount / 100).toLocaleString(navigator.language, {
                        minimumFractionDigits: 2
                    })}
                </div>
                <div class="content-center text-right">
                    {(0 / 100).toLocaleString(navigator.language, {
                        minimumFractionDigits: 2
                    })}
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
                <div class="text-center">
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

                <div>
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
            {/each}
        </div>
    {:else}
        <h3 class="h3">
            You haven't added any transactions yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./transactions/new"><i class="fa-solid fa-plus" /></FloatingActionButton
>
