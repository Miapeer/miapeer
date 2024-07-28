<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';

    import { page } from '$app/stores';
    import { createTransactionType, createPayee, createCategory } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';

    let accountId = $page.params.accountId;

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
    let selectedExcludeFromForecast;
    let selectedAmount;
    let selectedTransactionDate;
    let selectedClearDate;
    let selectedCheckNumber;
    let selectedNote;

    const handleCancel = () => {
        goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/transactions`);
    };

    const handleCreateTransaction = async () => {
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
            transactionTypeId: selectedTransactionTypeId,
            payeeId: selectedPayeeId,
            categoryId: selectedCategoryId,
            excludeFromForecast: selectedExcludeFromForecast,
            amount: unformatMoney(selectedAmount),
            transactionDate: selectedTransactionDate,
            clearDate: selectedClearDate,
            checkNumber: selectedCheckNumber,
            notes: selectedNote
        };
        const res = await fetch(`/quantum/accounts/${accountId}/transactions/new`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();

            goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/transactions`);
        } else {
            console.error('NOT ok');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateAccount();
        }
    };

    export let data: PageData;
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new transaction</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Transaction Date</div>
        <input type="date" bind:value={selectedTransactionDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Clear Date</div>
        <input type="date" bind:value={selectedClearDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Transaction Type</div>
        <input
            type="text"
            bind:value={selectedTransactionTypeName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newTransactionTransactionTypePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    {#if selectedTransactionTypeName?.toLowerCase() === 'check'}
        <div class="pl-12">
            <div class="input-group input-group-divider grid-cols-[12rem_auto]">
                <div class="input-group-shim">Check Number</div>
                <input type="text" bind:value={selectedCheckNumber} on:keypress={handleKeyPress} />
            </div>
        </div>
    {/if}

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Payee</div>
        <input
            type="text"
            bind:value={selectedPayeeName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newTransactionPayeePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Category</div>
        <input
            type="text"
            bind:value={selectedCategoryName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newTransactionCategoryPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Amount</div>
        <input type="number" bind:value={selectedAmount} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Notes</div>
        <input type="text" bind:value={selectedNote} on:keypress={handleKeyPress} />
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
                !selectedNote}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleCreateTransaction}
        >
            Create Transaction
        </button>
    </div>
</div>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="newTransactionTransactionTypePopupCombobox"
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
    data-popup="newTransactionPayeePopupCombobox"
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
    data-popup="newTransactionCategoryPopupCombobox"
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
