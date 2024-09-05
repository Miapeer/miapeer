<script lang="ts">
    import QuantumTable from '@quantum/QuantumTable.svelte';
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { formatMoney, formatDate } from '@quantum/util';
    import { importErrors } from '$lib/stores';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    export let data: PageData;

    const groupNameCurrent = 'Current';
    const modalStore = getModalStore();
    const dateOptions = { month: 'long', year: 'numeric' };
    let groupedTransactions = {};
    let nextForecastedTransactions = [];

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

    const handleCreateTransaction = async (scheduledTransactionId) => {
        const createTransactionRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${scheduledTransactionId}/createtransaction`,
            {
                method: 'POST'
            }
        );

        if (createTransactionRequest.ok) {
            invalidate('quantum:transactions');
            setTimeout(organizeTransactions, 100);
        } else {
            console.error('NOT ok');
        }
    };

    const handleSkipIteration = async (scheduledTransactionId) => {
        const skipIterationRequest = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${scheduledTransactionId}/skipiteration`,
            {
                method: 'POST'
            }
        );

        if (skipIterationRequest.ok) {
            invalidate('quantum:transactions');
            setTimeout(organizeTransactions, 100);
        } else {
            console.error('NOT ok');
        }
    };

    const handleClearImportError = async (importErrorIndex) => {
        $importErrors.splice(importErrorIndex, 1);
        importErrors.set($importErrors);
    };

    const handleOpenToggle = () => {
        setTimeout(() => {
            Array.prototype.forEach.call(
                document.getElementsByClassName('accordion-panel'),
                (el) => {
                    el.classList.remove('space-y-4');
                }
            );
        }, 0);
    };

    const groupTransactions = () => {
        groupedTransactions = {};

        const today = new Date();
        const currentMonthString = `${today.getFullYear()}-${today.getMonth() < 9 ? 0 : ''}${today.getMonth() + 1}-01`;
        const currentMonth = new Date(currentMonthString);

        for (
            let transactionIndex = 0;
            transactionIndex < data.transactions.length;
            transactionIndex++
        ) {
            let transaction = data.transactions[transactionIndex];
            let clearDate = transaction.clear_date ? new Date(transaction.clear_date) : null;
            let grouping =
                clearDate && clearDate < currentMonth
                    ? formatDate(clearDate, dateOptions)
                    : groupNameCurrent;

            if (!(grouping in groupedTransactions)) {
                groupedTransactions[grouping] = [];
            }

            groupedTransactions[grouping].push(transaction);
        }
    };

    const compileNextForecastedTransactions = () => {
        nextForecastedTransactions = [];

        let reviewedScheduledTransactions = [];

        for (
            let transactionIndex = 0;
            transactionIndex < data.transactions.length;
            transactionIndex++
        ) {
            let transaction = data.transactions[transactionIndex];
            let scheduledTransactionId = transaction.forecast_from_scheduled_transaction_id;

            if (
                scheduledTransactionId &&
                !reviewedScheduledTransactions.includes(scheduledTransactionId)
            ) {
                reviewedScheduledTransactions.push(scheduledTransactionId);
                nextForecastedTransactions.push(transaction);
            }
        }
    };

    const flagFutureMarkerTransaction = () => {
        const isAfterFutureMarker = (date) => {
            const msToDays = 1000 * 60 * 60 * 24;
            const futureMarkerDays = $page.url.searchParams.get('marker') ?? 7;

            const msMarkDate = new Date().getTime() + msToDays * futureMarkerDays;
            const msDate = new Date(formatDate(date)).getTime();

            return msDate > msMarkDate;
        };

        for (
            let transactionIndex = 0;
            transactionIndex < groupedTransactions[groupNameCurrent].length;
            transactionIndex++
        ) {
            let transaction = groupedTransactions[groupNameCurrent][transactionIndex];

            if (isAfterFutureMarker(transaction.transaction_date)) {
                transaction.future_marker = true;
                return;
            }
        }
    };

    const flagLowestBalanceWithinGroups = () => {
        for (
            let groupIndex = 0;
            groupIndex < Object.keys(groupedTransactions).length;
            groupIndex++
        ) {
            const group = Object.keys(groupedTransactions)[groupIndex];
            let minBalance = Number.MAX_VALUE;
            let minBalanceTransaction = null;

            for (
                let transactionIndex = 0;
                transactionIndex < groupedTransactions[group].length;
                transactionIndex++
            ) {
                let transaction = groupedTransactions[group][transactionIndex];

                if (transaction.balance < minBalance) {
                    minBalance = transaction.balance;
                    minBalanceTransaction = transaction;
                }
            }

            minBalanceTransaction.has_lowest_balance = true;
        }
    };

    const organizeTransactions = () => {
        groupTransactions();
        compileNextForecastedTransactions();
        flagFutureMarkerTransaction();
        flagLowestBalanceWithinGroups();
    };

    const getBackgroundColorClass = (index, balance) => {
        let scale = index % 2 ? 700 : 800;
        let color = 'surface';

        if (balance <= 0) {
            color = 'red';
        }

        return `bg-${color}-${scale}`;
    };

    const gridRowDef =
        'grid grid-cols-[100px_100px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_80px_80px_15px_15px_15px_50px] gap-4 p-4 ml-2 mr-2';

    onMount(() => {
        handleOpenToggle();
        organizeTransactions();
    });
</script>

<QuantumTable
    pageTitle="Quantum: Transactions"
    headline={`${data.indexedAccounts[$page.params.accountId].name} Transactions`}
    newItemHref="./transactions/new"
    {data}
>
    <svelte:fragment slot="tableHeader">
        {#if data.transactions.length > 0}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>
                <div>Date</div>
                <div>Cleared</div>
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
        {/if}
    </svelte:fragment>

    {#if $importErrors?.length}
        <div>
            <h3 class="h3">Import errors</h3>
            {#each $importErrors as importError, errorIndex}
                <div class={errorIndex % 2 ? 'bg-red-600' : 'bg-red-700'}>
                    <a href="#" class="m-2" on:click={() => handleClearImportError(errorIndex)}>x</a
                    >
                    {`Transaction Date: ${importError['Transaction Date']} - Payee: ${importError['Payee']} - Category: ${importError['Category']} - Amount: ${importError['Amount']}`}
                </div>
            {/each}
        </div>
    {/if}

    {#if data.transactions.length > 0}
        <Accordion
            regionControl="border mt-4 bg-surface-500"
            regionPanel="border-x border-b bg-surface-500"
        >
            {#each Object.keys(groupedTransactions) as grouping}
                <AccordionItem open={grouping === 'Current'} on:toggle={handleOpenToggle}>
                    <svelte:fragment slot="summary">{grouping}</svelte:fragment>
                    <svelte:fragment slot="content">
                        {#each groupedTransactions[grouping] as transaction, transactionIndex}
                            <div
                                class={`${gridRowDef} ${getBackgroundColorClass(transactionIndex, transaction.balance)} ${transactionIndex === data.transactions.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900 ${transaction.forecast_from_scheduled_transaction_id ? 'text-orange-500' : ''} ${transaction.future_marker ? 'mt-4' : ''} min-h-20 ${transaction.has_lowest_balance ? 'outline' : ''}`}
                            >
                                <div class="content-center">{transaction.transaction_date}</div>
                                <div class="content-center">{transaction.clear_date || ''}</div>
                                <div class="content-center">
                                    {data.indexedTransactionTypes[transaction.transaction_type_id]
                                        ?.name || ''}
                                </div>
                                <div class="content-center">
                                    {data.indexedPayees[transaction.payee_id]?.name || ''}
                                </div>
                                <div class="content-center">
                                    {data.indexedCategories[transaction.category_id]?.name || ''}
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
                                                target: `accountTransactionsCheckNumber${transactionIndex}`,
                                                placement: 'top'
                                            }}
                                        ></i>
                                        <div
                                            class="card p-4 w-72 shadow-xl"
                                            data-popup={`accountTransactionsCheckNumber${transactionIndex}`}
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
                                                target: `accountTransactionsNotes${transactionIndex}`,
                                                placement: 'top'
                                            }}
                                        ></i>
                                        <div
                                            class="card p-4 w-72 shadow-xl"
                                            data-popup={`accountTransactionsNotes${transactionIndex}`}
                                        >
                                            <div><p>{transaction.notes}</p></div>
                                            <div class="arrow bg-surface-100-800-token" />
                                        </div>
                                    {/if}
                                </div>

                                <div class="content-center">
                                    {#if !transaction.forecast_from_scheduled_transaction_id || nextForecastedTransactions.includes(transaction)}
                                        <div>
                                            <button
                                                type="button"
                                                class="btn-icon variant-filled"
                                                use:popup={{
                                                    event: 'click',
                                                    target:
                                                        'transaction-actions-' + transactionIndex,
                                                    placement: 'left'
                                                }}><i class="fa-solid fa-ellipsis-v" /></button
                                            >
                                            <div
                                                data-popup="transaction-actions-{transactionIndex}"
                                            >
                                                <div class="btn-group variant-filled">
                                                    {#if transaction.forecast_from_scheduled_transaction_id}
                                                        <button
                                                            on:click={() =>
                                                                handleCreateTransaction(
                                                                    transaction.forecast_from_scheduled_transaction_id
                                                                )}
                                                            ><i class="fa fa-play"></i></button
                                                        >
                                                        <button
                                                            on:click={() =>
                                                                handleSkipIteration(
                                                                    transaction.forecast_from_scheduled_transaction_id
                                                                )}
                                                            ><i class="fa fa-fast-forward"
                                                            ></i></button
                                                        >
                                                    {:else}
                                                        <a
                                                            href={`./transactions/${transaction.transaction_id}`}
                                                            ><i
                                                                class="fa-solid fa-pen-to-square"
                                                            /></a
                                                        >
                                                        <button
                                                            on:click={() =>
                                                                handleConfirmDelete(transaction)}
                                                            ><i class="fa-solid fa-trash" /></button
                                                        >
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </svelte:fragment>
                </AccordionItem>
            {/each}
        </Accordion>
    {:else}
        <h3 class="h3">
            You haven't added any transactions yet. Click the button at the top-right to create one.
        </h3>
        <div>
            or <a class="anchor" href="./import">import your existing data from CSV</a>.
        </div>
    {/if}
</QuantumTable>

<div class="popovers">
    <div class="card p-4 w-72 shadow-xl" data-popup="accountTransactionsExcluded">
        <div><p>This transaction is excluded from forecast calculations</p></div>
        <div class="arrow bg-surface-100-800-token" />
    </div>
</div>
