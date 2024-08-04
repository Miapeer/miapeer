<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { createTransactionType, createPayee, createCategory } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';
    import { page } from '$app/stores';

    export let data: PageData;

    let selectedTransactionDate = data.transaction.transaction_date;
    let selectedClearDate = data.transaction.clear_date;
    let selectedTransactionTypeName =
        data.transactionTypes[data.transaction.transaction_type_id]?.name;
    $: selectedTransactionTypeId = Object.keys(data.transactionTypes).find(
        (key) => data.transactionTypes[key].name === selectedTransactionTypeName
    );
    let selectedPayeeName = data.payees[data.transaction.payee_id]?.name;
    $: selectedPayeeId = Object.keys(data.payees).find(
        (key) => data.payees[key].name === selectedPayeeName
    );
    let selectedCategoryName = data.categories[data.transaction.category_id]?.name;
    $: selectedCategoryId = Object.keys(data.categories).find(
        (key) => data.categories[key].name === selectedCategoryName
    );
    let selectedExcludeFromForecast = data.transaction.exclude_from_forecast;
    let selectedAmount = formatMoney(data.transaction.amount);
    let selectedCheckNumber = data.transaction.check_number;
    let selectedNotes = data.transaction.notes;

    const handleCancel = () => {
        goto(data.redirectUrl ?? `/quantum/accounts/${$page.params.accountId}/transactions`);
    };

    const handleEditTransaction = async () => {
        if (!selectedTransactionTypeId) {
            await createTransactionType(data.portfolioId, selectedTransactionTypeName);
        }
        if (!selectedPayeeId) {
            await createPayee(data.portfolioId, selectedPayeeName);
        }
        if (!selectedCategoryId) {
            await createCategory(data.portfolioId, selectedCategoryName);
        }

        const requestData = {
            transactionDate: selectedTransactionDate,
            clearDate: selectedClearDate,
            transactionTypeId: selectedTransactionTypeId,
            payeeId: selectedPayeeId,
            categoryId: selectedCategoryId,
            excludeFromForecast: selectedExcludeFromForecast,
            amount: unformatMoney(selectedAmount),
            checkNumber: selectedCheckNumber,
            notes: selectedNotes
        };

        const res = await fetch(
            `/quantum/accounts/${$page.params.accountId}/transactions/${$page.params.transactionId}`,
            {
                method: 'POST',
                body: JSON.stringify(requestData)
            }
        );

        if (res.ok) {
            const data = await res.json();
            goto(data.redirectUrl ?? `/quantum/accounts/${$page.params.accountId}/transactions`);
        } else {
            console.error('NOT ok');
        }
    };
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Edit Transaction</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Transaction Date</div>
        <input type="date" bind:value={selectedTransactionDate} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Clear Date</div>
        <input type="date" bind:value={selectedClearDate} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto_2.5rem]">
        <div class="input-group-shim">Transaction Type</div>
        <input
            type="text"
            bind:value={selectedTransactionTypeName}
            use:popup={{
                event: 'click',
                target: 'editTransactionTransactionTypePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
        {#if !selectedTransactionTypeId && selectedTransactionTypeName}
            <div
                class="text-primary-500"
                title="Transaction type doesn't exist, it will be created"
            >
                <i class="fa fa-exclamation"></i>
            </div>
        {/if}
    </div>

    {#if selectedTransactionTypeName?.toLowerCase() === 'check'}
        <div class="pl-12">
            <div class="input-group input-group-divider grid-cols-[12rem_auto]">
                <div class="input-group-shim">Check Number</div>
                <input type="text" bind:value={selectedCheckNumber} />
            </div>
        </div>
    {/if}

    <div class="input-group input-group-divider grid-cols-[12rem_auto_2.5rem]">
        <div class="input-group-shim">Payee</div>
        <input
            type="text"
            bind:value={selectedPayeeName}
            use:popup={{
                event: 'click',
                target: 'editTransactionPayeePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
        {#if !selectedPayeeId && selectedPayeeName}
            <div class="text-primary-500" title="Payee doesn't exist, it will be created">
                <i class="fa fa-exclamation"></i>
            </div>
        {/if}
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto_2.5rem]">
        <div class="input-group-shim">Category</div>
        <input
            type="text"
            bind:value={selectedCategoryName}
            use:popup={{
                event: 'click',
                target: 'editTransactionCategoryPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
        {#if !selectedCategoryId && selectedCategoryName}
            <div class="text-primary-500" title="Category doesn't exist, it will be created">
                <i class="fa fa-exclamation"></i>
            </div>
        {/if}
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Amount</div>
        <input type="number" bind:value={selectedAmount} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Notes</div>
        <input type="text" bind:value={selectedNotes} />
    </div>

    <div class="text-right">
        <SlideToggle class="" bind:checked={selectedExcludeFromForecast} active="bg-primary-500"
            >Exclude From Forecast</SlideToggle
        >
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!selectedTransactionTypeName &&
                !selectedPayeeName &&
                !selectedCategoryName &&
                !selectedAmount &&
                !selectedTransactionDate &&
                !selectedClearDate &&
                !selectedCheckNumber &&
                !selectedNotes}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleEditTransaction}
        >
            Update Transaction
        </button>
    </div>
</div>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editTransactionTransactionTypePopupCombobox"
>
    <ListBox>
        {#each Object.keys(data.transactionTypes) as transactionTypeKey}
            {@const transactionType = data.transactionTypes[transactionTypeKey]}
            <ListBoxItem
                bind:group={selectedTransactionTypeName}
                name="medium"
                value={transactionType.name}>{transactionType.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editTransactionPayeePopupCombobox"
>
    <ListBox>
        {#each Object.keys(data.payees) as payeeKey}
            {@const payee = data.payees[payeeKey]}
            <ListBoxItem bind:group={selectedPayeeName} name="medium" value={payee.name}
                >{payee.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editTransactionCategoryPopupCombobox"
>
    <ListBox>
        {#each Object.keys(data.categories) as categoryKey}
            {@const category = data.categories[categoryKey]}
            <ListBoxItem bind:group={selectedCategoryName} name="medium" value={category.name}
                >{category.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
