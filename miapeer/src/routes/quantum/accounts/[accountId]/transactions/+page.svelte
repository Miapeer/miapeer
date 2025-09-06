<script lang="ts">
    import QuantumTable from '@quantum/QuantumTable.svelte';
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';
    import { enhance, applyAction, deserialize } from '$app/forms';
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

    $: groupedTransactions = ((transactions) => {
        if (!transactions) {
            return {};
        }

        const groupedTransactions = {};

        const today = new Date();
        const currentMonthString = `${today.getFullYear()}-${today.getMonth() < 9 ? 0 : ''}${today.getMonth() + 1}-01`;
        const currentMonth = new Date(currentMonthString);

        for (let transactionIndex = 0; transactionIndex < transactions.length; transactionIndex++) {
            let transaction = transactions[transactionIndex];
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

        return groupedTransactions;
    })(data.transactions);

    $: flagFutureMarkerTransaction(groupedTransactions);

    $: flagLowestBalanceWithinGroups(groupedTransactions);

    $: nextForecastedTransactions = ((transactions) => {
        const nextForecastedTransactions = [];

        let reviewedScheduledTransactions = [];

        for (let transactionIndex = 0; transactionIndex < transactions.length; transactionIndex++) {
            let transaction = transactions[transactionIndex];
            let scheduledTransactionId = transaction.forecast_from_scheduled_transaction_id;

            if (
                scheduledTransactionId &&
                !reviewedScheduledTransactions.includes(scheduledTransactionId)
            ) {
                reviewedScheduledTransactions.push(scheduledTransactionId);
                nextForecastedTransactions.push(transaction);
            }
        }

        return nextForecastedTransactions;
    })(data.transactions);

    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'top'
    };

    const handleConfirmDelete = (event, transaction) => {
        const targetElement = event.currentTarget;

        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the transaction on ${transaction.transaction_date} for ${formatMoney(transaction.amount)}?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    deleteTransaction(targetElement);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const deleteTransaction = async (targetElement) => {
        const data = new FormData(targetElement);

        const response = await fetch(targetElement.action, {
            method: 'POST',
            body: data
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());

        if (result.type === 'success') {
            await invalidate('quantum:transactions');
        } else {
            console.error('NOT ok');
        }

        applyAction(result);
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

    const flagFutureMarkerTransaction = (groupedTransactions) => {
        // Flag the transaction after the "future marker" (eg. 7 days out)

        if (!Object.keys(groupedTransactions).length) {
            return;
        }

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

    const flagLowestBalanceWithinGroups = (groupedTransactions) => {
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

    const getBackgroundColorClass = (index, balance) => {
        let scale = index % 2 ? 700 : 800;
        let color = 'surface';

        if (balance <= 0) {
            color = 'red';
        }

        return `bg-${color}-${scale}`;
    };

    const gridColSizes =
        'grid-cols-[1fr_1fr_1fr_50px] md:grid-cols-[100px_100px_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(200px,_2fr)_80px_80px_15px_15px_15px_50px]';
    const gridTemplateAreas =
        "[grid-template-areas:'date_cleared_cleared_actions''category_category_category_check-number''payee_payee_payee_notes''type_amount_balance_exclude-forecast'] md:[grid-template-areas:'date_cleared_type_payee_category_amount_balance_exclude-forecast_check-number_notes_actions']";
    const gridRowDef = `grid ${gridColSizes} ${gridTemplateAreas} gap-2 md:gap-4 md:p-4 md:ml-2 md:mr-2`;

    onMount(() => {
        handleOpenToggle();
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
                <div style="grid-area: date" class="hidden md:block">Date</div>
                <div style="grid-area: cleared" class="hidden md:block">Cleared</div>
                <div style="grid-area: type" class="hidden md:block">Type</div>
                <div style="grid-area: payee" class="hidden md:block">Payee</div>
                <div style="grid-area: category" class="hidden md:block">Category</div>
                <div style="grid-area: amount md:text-right" class="hidden md:block">Amount</div>
                <div style="grid-area: balance md:text-right" class="hidden md:block">Balance</div>
                <div style="grid-area: exclude-forecast" class="hidden md:block"></div>
                <div style="grid-area: check-number" class="hidden md:block"></div>
                <div style="grid-area: notes" class="hidden md:block"></div>
                <div style="grid-area: actions" class="hidden md:block"></div>
                <div style="grid-area: notes" class="block md:hidden h-[1.75rem]"></div>
            </div>
        {/if}
    </svelte:fragment>

    {#if $importErrors?.length}
        <div>
            <h3 class="h3">Import errors</h3>
            {#each $importErrors as importError, errorIndex}
                <div class={errorIndex % 2 ? 'bg-red-700' : 'bg-red-800'}>
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
                                <div style="grid-area: date" class="content-center">
                                    {transaction.transaction_date}
                                </div>
                                <div style="grid-area: cleared" class="content-center">
                                    {transaction.clear_date || ''}
                                </div>
                                <div style="grid-area: type" class="content-center">
                                    {data.indexedTransactionTypes[transaction.transaction_type_id]
                                        ?.name || ''}
                                </div>
                                <div style="grid-area: payee" class="content-center">
                                    {data.indexedPayees[transaction.payee_id]?.name || ''}
                                </div>
                                <div style="grid-area: category" class="content-center">
                                    {data.indexedCategories[transaction.category_id]?.name || ''}
                                </div>
                                <div style="grid-area: amount" class="content-center text-right">
                                    {formatMoney(transaction.amount)}
                                </div>
                                <div style="grid-area: balance" class="content-center text-right">
                                    {formatMoney(transaction.balance)}
                                </div>

                                <div style="grid-area: exclude-forecast" class="content-center">
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
                                <div
                                    style="grid-area: check-number"
                                    class="content-center text-right"
                                >
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
                                <div style="grid-area: notes" class="content-center">
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

                                <div style="grid-area: actions" class="content-center">
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
                                                <form
                                                    method="POST"
                                                    on:submit|preventDefault={(event) => {
                                                        handleConfirmDelete(event, transaction);
                                                    }}
                                                    action={`transactions/${transaction.transaction_id}?/delete`}
                                                >
                                                    <div class="btn-group variant-filled">
                                                        {#if transaction.forecast_from_scheduled_transaction_id}
                                                            <form
                                                                method="POST"
                                                                action={`./scheduledtransactions/${transaction.forecast_from_scheduled_transaction_id}?/createtransaction`}
                                                                use:enhance
                                                            >
                                                                <button type="submit"
                                                                    ><i class="fa fa-play"
                                                                    ></i></button
                                                                >
                                                            </form>
                                                            <form
                                                                method="POST"
                                                                action={`./scheduledtransactions/${transaction.forecast_from_scheduled_transaction_id}?/skipiteration`}
                                                                use:enhance
                                                            >
                                                                <button type="submit"
                                                                    ><i class="fa fa-fast-forward"
                                                                    ></i></button
                                                                >
                                                            </form>
                                                        {:else}
                                                            <a
                                                                href={`./transactions/${transaction.transaction_id}`}
                                                                ><i
                                                                    class="fa-solid fa-pen-to-square"
                                                                /></a
                                                            >
                                                            <button type="submit"
                                                                ><i
                                                                    class="fa-solid fa-trash"
                                                                /></button
                                                            >
                                                        {/if}
                                                    </div>
                                                </form>
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
