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

    let accountId = $page.params.accountId;

    let selectedTransactionTypeName =
        data.indexedTransactionTypes[data.scheduledTransaction.transaction_type_id]?.name;
    $: selectedTransactionType = data.transactionTypes.find(
        (tt) => tt.name === selectedTransactionTypeName
    );
    let selectedPayeeName = data.indexedPayees[data.scheduledTransaction.payee_id]?.name;
    $: selectedPayee = data.payees.find((p) => p.name === selectedPayeeName);
    let selectedCategoryName = data.indexedCategories[data.scheduledTransaction.category_id]?.name;
    $: selectedCategory = data.categories.find((c) => c.name === selectedCategoryName);
    let selectedFixedAmount = formatMoney(data.scheduledTransaction.fixed_amount);
    let selectedEstimateOccurrences = data.scheduledTransaction.estimate_occurrences;
    let selectedPromptDays = data.scheduledTransaction.prompt_days;
    let selectedStartDate = data.scheduledTransaction.start_date;
    let selectedEndDate = data.scheduledTransaction.end_date;
    let selectedlimitOccurrences = data.scheduledTransaction.limit_occurrences;
    let selectedRepeatOptionName =
        data.indexedRepeatOptions[data.scheduledTransaction.repeat_option_id]?.name;
    $: selectedRepeatOption = data.repeatOptions.find((ro) => ro.name === selectedRepeatOptionName);
    let selectedNote = data.scheduledTransaction.notes;
    let selectedOnAutopay = data.scheduledTransaction.on_autopay;

    const handleCancel = () => {
        goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/scheduledtransactions`);
    };

    const handleEditScheduledTransaction = async () => {
        if (!selectedTransactionType) {
            await createTransactionType(data.portfolioId, selectedTransactionTypeName);
        }
        if (!selectedPayee) {
            await createPayee(data.portfolioId, selectedPayeeName);
        }
        if (!selectedCategory) {
            await createCategory(data.portfolioId, selectedCategoryName);
        }

        const requestData = {
            transactionTypeId: selectedTransactionType?.transaction_type_id,
            payeeId: selectedPayee?.payee_id,
            categoryId: selectedCategory?.category_id,
            fixedAmount: unformatMoney(selectedFixedAmount),
            estimateOccurrences: selectedEstimateOccurrences,
            promptDays: selectedPromptDays,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            limitOccurrences: selectedlimitOccurrences,
            repeatOptionId: selectedRepeatOption?.repeat_option_id,
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
                target: 'editScheduledTransactionTypePopupCombobox',
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
                target: 'editScheduledTransactionPayeePopupCombobox',
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
                target: 'editScheduledTransactionCategoryPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item'
            }}
        />
    </div>

    <div class="input-group input-group-divider grid-cols-[12rem_auto]">
        <div class="input-group-shim">Fixed Amount</div>
        <input type="text" bind:value={selectedFixedAmount} on:keypress={handleKeyPress} />
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
                target: 'editScheduledTransactionRepeatOptionPopupCombobox',
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
            Update Scheduled Transaction
        </button>
    </div>
</div>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editScheduledTransactionTypePopupCombobox"
>
    <ListBox>
        {#each data.transactionTypes as transactionType}
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
    data-popup="editScheduledTransactionPayeePopupCombobox"
>
    <ListBox>
        {#each data.payees as payee}
            <ListBoxItem bind:group={selectedPayeeName} name="medium" value={payee.name}
                >{payee.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editScheduledTransactionCategoryPopupCombobox"
>
    <ListBox>
        {#each data.categories as category}
            <ListBoxItem bind:group={selectedCategoryName} name="medium" value={category.name}
                >{category.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="editScheduledTransactionRepeatOptionPopupCombobox"
>
    <ListBox>
        {#each data.repeatOptions as repeatOption}
            <ListBoxItem
                bind:group={selectedRepeatOptionName}
                name="medium"
                value={repeatOption.name}>{repeatOption.name}</ListBoxItem
            >
        {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
</div>
