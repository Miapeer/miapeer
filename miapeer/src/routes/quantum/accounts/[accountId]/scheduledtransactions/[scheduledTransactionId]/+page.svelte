<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { createTransactionType, createPayee, createCategory } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';

    import { page } from '$app/stores';

    let accountId = $page.params.accountId;

    let selectedTransactionTypeName;
    $: selectedTransactionTypeId = Object.keys(data.transactionTypes).find(
        (key) => data.transactionTypes[key].name === selectedTransactionTypeName
    );
    let selectedPayeeName;
    $: selectedPayeeId = Object.keys(data.payees).find(
        (key) => data.payees[key].name === selectedPayeeName
    );
    let selectedCategoryName;
    $: selectedCategoryId = Object.keys(data.categories).find(
        (key) => data.categories[key].name === selectedCategoryName
    );
    let selectedFixedAmount;
    let selectedEstimateOccurrences;
    let selectedPromptDays;
    let selectedStartDate;
    let selectedEndDate;
    let selectedlimitOccurrences;
    let selectedRepeatOptionName;
    $: selectedRepeatOptionId = Object.keys(data.repeatOptions).find(
        (key) => data.repeatOptions[key].name === selectedRepeatOptionName
    );
    let selectedNote;
    let selectedOnAutopay;

    const handleCancel = () => {
        goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/scheduledtransactions`);
    };

    const handleEditScheduledTransaction = async () => {
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
            fixedAmount: unformatMoney(selectedFixedAmount),
            estimateOccurrences: selectedEstimateOccurrences,
            promptDays: selectedPromptDays,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            limitOccurrences: selectedlimitOccurrences,
            repeatOptionId: selectedRepeatOptionId,
            onAutopay: selectedOnAutopay,
            notes: selectedNote
        };
        const res = await fetch(
            `/quantum/accounts/${$page.params.accountId}/scheduledtransactions/${data.scheduledTransaction.scheduled_transaction_id}`,
            {
                method: 'POST',
                body: JSON.stringify(requestData)
            }
        );

        if (res.ok) {
            const data = await res.json();
            goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/scheduledtransactions`);
        } else {
            console.error('NOT ok');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditScheduledTransaction();
        }
    };

    export let data: PageData;
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <h1 class="h1">Edit Scheduled Transaction</h1>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Transaction Type</div>
        <input
            type="text"
            bind:value={selectedTransactionTypeName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newScheduledTransactionTransactionTypePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Payee</div>
        <input
            type="text"
            bind:value={selectedPayeeName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newScheduledTransactionPayeePopupCombobox',
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
                target: 'newScheduledTransactionCategoryPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Fixed Amount</div>
        <input type="number" bind:value={selectedFixedAmount} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Estimated Occurrences</div>
        <input
            type="number"
            bind:value={selectedEstimateOccurrences}
            on:keypress={handleKeyPress}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Prompt Days</div>
        <input type="number" bind:value={selectedPromptDays} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Start Date</div>
        <input type="date" bind:value={selectedStartDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">End Date</div>
        <input type="date" bind:value={selectedEndDate} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Limit Occurrences</div>
        <input type="number" bind:value={selectedlimitOccurrences} on:keypress={handleKeyPress} />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Repeat</div>
        <input
            type="text"
            bind:value={selectedRepeatOptionName}
            on:keypress={handleKeyPress}
            use:popup={{
                event: 'click',
                target: 'newScheduledTransactionRepeatOptionPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Notes</div>
        <input type="text" bind:value={selectedNote} on:keypress={handleKeyPress} />
    </div>

    <div class="text-right">
        <SlideToggle class="" bind:checked={selectedOnAutopay} active="bg-primary-500"
            >On Autopay</SlideToggle
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
                !selectedFixedAmount &&
                !selectedEstimateOccurrences &&
                !selectedPromptDays &&
                !selectedStartDate &&
                !selectedEndDate &&
                !selectedlimitOccurrences &&
                !selectedRepeatOptionName &&
                !selectedNote}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleEditScheduledTransaction}
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
