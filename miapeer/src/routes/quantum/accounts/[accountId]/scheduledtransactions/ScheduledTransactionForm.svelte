<script lang="ts">
    import { goto, invalidate } from '$app/navigation';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import {
        createTransactionType,
        createPayee,
        createCategory,
        createScheduledTransaction,
        updateScheduledTransaction
    } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';

    export let accountId;
    export let scheduledTransaction = null;
    export let data;

    $: isCreatingNew = !scheduledTransaction;

    let selectedTransactionTypeName =
        data.indexedTransactionTypes[scheduledTransaction?.transaction_type_id]?.name || '';
    $: selectedTransactionType = data.transactionTypes.find(
        (tt) => tt.name.toLowerCase() === selectedTransactionTypeName?.toLowerCase()
    );
    $: if (selectedTransactionType) {
        updateTransactionTypeName();
    }

    let selectedPayeeName = data.indexedPayees[scheduledTransaction?.payee_id]?.name || '';
    $: selectedPayee = data.payees.find(
        (p) => p.name.toLowerCase() === selectedPayeeName?.toLowerCase()
    );
    $: if (selectedPayee) {
        updatePayeeName();
    }

    let selectedCategoryName =
        data.indexedCategories[scheduledTransaction?.category_id]?.name || '';
    $: selectedCategory = data.categories.find(
        (c) => c.name.toLowerCase() === selectedCategoryName?.toLowerCase()
    );
    $: if (selectedCategory) {
        updateCategoryName();
    }

    let selectedFixedAmount = formatMoney(scheduledTransaction?.fixed_amount);
    let selectedEstimateOccurrences = scheduledTransaction?.estimate_occurrences;
    let selectedPromptDays = scheduledTransaction?.prompt_days;
    let selectedStartDate = scheduledTransaction?.start_date;
    let selectedEndDate = scheduledTransaction?.end_date;
    let selectedlimitOccurrences = scheduledTransaction?.limit_occurrences;
    let selectedRepeatOptionName =
        data.indexedRepeatOptions[scheduledTransaction?.repeat_option_id]?.name || '';
    $: selectedRepeatOption = data.repeatOptions.find(
        (ro) => ro.name.toLowerCase() === selectedRepeatOptionName?.toLowerCase()
    );
    $: if (selectedRepeatOption) {
        updateRepeatOptionName();
    }
    let selectedNote = scheduledTransaction?.notes;
    let selectedOnAutopay = scheduledTransaction?.on_autopay;

    const handleCancel = () => {
        goto('.');
    };

    const handleProcessScheduledTransaction = async () => {
        if (!selectedTransactionType) {
            await createTransactionType({
                portfolioId: data.portfolioId,
                transactionTypeName: selectedTransactionTypeName
            });
        }
        if (!selectedPayee) {
            await createPayee({ portfolioId: data.portfolioId, payeeName: selectedPayeeName });
        }
        if (!selectedCategory) {
            await createCategory({
                portfolioId: data.portfolioId,
                categoryName: selectedCategoryName
            });
        }

        const fnScheduledTransaction = isCreatingNew
            ? createScheduledTransaction
            : updateScheduledTransaction;

        let returnedScheduledTransaction = await fnScheduledTransaction({
            accountId,
            scheduledTransactionId: scheduledTransaction?.scheduled_transaction_id,
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
        });
        if (returnedScheduledTransaction) {
            await invalidate('quantum:scheduledtransactions');
            goto('.');
        }
    };

    const updateTransactionTypeName = () => {
        setTimeout(() => {
            if (typeof document === 'undefined') {
                return;
            }

            if (selectedTransactionType) {
                selectedTransactionTypeName = selectedTransactionType.name;
            }

            const selectedElements = [
                ...document.querySelectorAll(
                    '[data-popup=scheduledTransactionTypePopupCombobox] .listbox-label-content'
                )
            ].filter((a) =>
                a.textContent?.toLowerCase().includes(selectedTransactionTypeName.toLowerCase())
            );
            if (selectedElements.length) {
                selectedElements[0].scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, 0);
    };

    const updatePayeeName = () => {
        setTimeout(() => {
            if (typeof document === 'undefined') {
                return;
            }

            if (selectedPayee) {
                selectedPayeeName = selectedPayee.name;
            }

            const selectedElements = [
                ...document.querySelectorAll(
                    '[data-popup=scheduledTransactionPayeePopupCombobox] .listbox-label-content'
                )
            ].filter((a) => a.textContent?.toLowerCase().includes(selectedPayeeName.toLowerCase()));
            if (selectedElements.length) {
                selectedElements[0].scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, 0);
    };

    const updateCategoryName = () => {
        setTimeout(() => {
            if (typeof document === 'undefined') {
                return;
            }

            if (selectedCategory) {
                selectedCategoryName = selectedCategory.name;
            }

            const selectedElements = [
                ...document.querySelectorAll(
                    '[data-popup=scheduledTransactionCategoryPopupCombobox] .listbox-label-content'
                )
            ].filter((a) =>
                a.textContent?.toLowerCase().includes(selectedCategoryName.toLowerCase())
            );
            if (selectedElements.length) {
                selectedElements[0].scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, 0);
    };

    const updateRepeatOptionName = () => {
        setTimeout(() => {
            if (typeof document === 'undefined') {
                return;
            }

            if (selectedRepeatOption) {
                selectedRepeatOptionName = selectedRepeatOption.name;
            }

            const selectedElements = [
                ...document.querySelectorAll(
                    '[data-popup=scheduledTransactionRepeatOptionPopupCombobox] .listbox-label-content'
                )
            ].filter((a) =>
                a.textContent?.toLowerCase().includes(selectedRepeatOptionName.toLowerCase())
            );
            if (selectedElements.length) {
                selectedElements[0].scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, 0);
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[14rem_auto]';
</script>

<div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
    <div class={gridRowDef}>
        <div class="input-group-shim">Transaction Type</div>
        <input
            type="text"
            bind:value={selectedTransactionTypeName}
            on:keypress={updateTransactionTypeName}
            use:popup={{
                event: 'click',
                target: 'scheduledTransactionTypePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item',
                state: (e) => {
                    if (e) {
                        updateTransactionTypeName();
                    }
                }
            }}
        />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Payee</div>
        <input
            type="text"
            bind:value={selectedPayeeName}
            on:keypress={updatePayeeName}
            use:popup={{
                event: 'click',
                target: 'scheduledTransactionPayeePopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item',
                state: (e) => {
                    if (e) {
                        updatePayeeName();
                    }
                }
            }}
        />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Category</div>
        <input
            type="text"
            bind:value={selectedCategoryName}
            on:keypress={updateCategoryName}
            use:popup={{
                event: 'click',
                target: 'scheduledTransactionCategoryPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item',
                state: (e) => {
                    if (e) {
                        updateCategoryName();
                    }
                }
            }}
        />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Fixed Amount</div>
        <input type="text" bind:value={selectedFixedAmount} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Estimated Occurrences</div>
        <input type="number" bind:value={selectedEstimateOccurrences} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Prompt Days</div>
        <input type="number" bind:value={selectedPromptDays} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Start Date</div>
        <input type="date" bind:value={selectedStartDate} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">End Date</div>
        <input type="date" bind:value={selectedEndDate} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Limit Occurrences</div>
        <input type="number" bind:value={selectedlimitOccurrences} />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Repeat</div>
        <input
            type="text"
            bind:value={selectedRepeatOptionName}
            on:keypress={updateRepeatOptionName}
            use:popup={{
                event: 'click',
                target: 'scheduledTransactionRepeatOptionPopupCombobox',
                placement: 'bottom',
                closeQuery: '.listbox-item',
                state: (e) => {
                    if (e) {
                        updateRepeatOptionName();
                    }
                }
            }}
        />
    </div>

    <div class={gridRowDef}>
        <div class="input-group-shim">Notes</div>
        <input type="text" bind:value={selectedNote} />
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
            on:click={handleProcessScheduledTransaction}
        >
            {`${isCreatingNew ? 'Create' : 'Update'} Scheduled Transaction`}
        </button>
    </div>
</div>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="scheduledTransactionTypePopupCombobox"
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
    data-popup="scheduledTransactionPayeePopupCombobox"
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
    data-popup="scheduledTransactionCategoryPopupCombobox"
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
    data-popup="scheduledTransactionRepeatOptionPopupCombobox"
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
