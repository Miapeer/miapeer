<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';

    import { page } from '$app/stores';

    let accountId = $page.params.slug;

    let selectedTransactionType;
    let selectedPayee;
    let selectedCategory;
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
        const requestData = {
            accountId,
            transactionTypeId: data.transactionTypes.find(
                (tt) => tt.name.toLowerCase() === selectedTransactionType?.toLowerCase()
            )?.transaction_type_id,
            payeeId: data.payees.find((p) => p.name.toLowerCase() === selectedPayee?.toLowerCase())
                ?.payee_id,
            categoryId: data.categories.find(
                (c) => c.name.toLowerCase() === selectedCategory?.toLowerCase()
            )?.category_id,
            excludeFromForecast: selectedExcludeFromForecast,
            amount: selectedAmount,
            transactionDate: selectedTransactionDate,
            clearDate: selectedClearDate,
            checkNumber: selectedCheckNumber,
            note: selectedNote
        };
        const res = await fetch(`/quantum/accounts/${accountId}/transactions/new`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();

            console.log(data);

            // await invalidate('quantum:accounts');
            // goto(data.redirectUrl ?? '/quantum/accounts');
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
        <input type="text" bind:value={selectedTransactionDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Clear Date</div>
        <input type="text" bind:value={selectedClearDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Transaction Type</div>
        <input
            type="text"
            bind:value={selectedTransactionType}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newTransactionTransactionTypePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    {#if selectedTransactionType?.toLowerCase() === 'check'}
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
            bind:value={selectedPayee}
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
            bind:value={selectedCategory}
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
            disabled={!selectedTransactionType &&
                !selectedPayee &&
                !selectedCategory &&
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
                bind:group={selectedTransactionType}
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
            <ListBoxItem bind:group={selectedPayee} name="medium" value={payee.name}
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
            <ListBoxItem bind:group={selectedCategory} name="medium" value={category.name}
                >{category.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
