<script lang="ts">
    import { goto, invalidate } from '$app/navigation';
    import { enhance, applyAction, deserialize } from '$app/forms';
    import { popup, SlideToggle, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { formatMoney, unformatMoney } from '@quantum/util';

    export let accountId;
    export let transaction = null;
    export let data;

    $: isCreatingNew = !transaction;

    let selectedTransactionTypeName =
        data.indexedTransactionTypes[transaction?.transaction_type_id]?.name || '';
    $: selectedTransactionType = data.transactionTypes.find(
        (tt) => tt.name.toLowerCase() === selectedTransactionTypeName?.toLowerCase()
    );
    $: if (selectedTransactionType) {
        updateTransactionTypeName();
    }

    let selectedPayeeName = data.indexedPayees[transaction?.payee_id]?.name || '';
    $: selectedPayee = data.payees.find(
        (p) => p.name.toLowerCase() === selectedPayeeName?.toLowerCase()
    );
    $: if (selectedPayee) {
        updatePayeeName();
    }

    let selectedCategoryName = data.indexedCategories[transaction?.category_id]?.name || '';
    $: selectedCategory = data.categories.find(
        (c) => c.name.toLowerCase() === selectedCategoryName?.toLowerCase()
    );
    $: if (selectedCategory) {
        updateCategoryName();
    }

    let selectedExcludeFromForecast = transaction?.exclude_from_forecast;
    let selectedAmount = formatMoney(transaction?.amount);
    let selectedTransactionDate = transaction?.transaction_date;
    let selectedClearDate = transaction?.clear_date;
    let selectedCheckNumber = transaction?.check_number;
    let selectedNote = transaction?.notes;

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
                    '[data-popup=transactionTransactionTypePopupCombobox] .listbox-label-content'
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
                    '[data-popup=transactionPayeePopupCombobox] .listbox-label-content'
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
                    '[data-popup=transactionCategoryPopupCombobox] .listbox-label-content'
                )
            ].filter((a) =>
                a.textContent?.toLowerCase().includes(selectedCategoryName.toLowerCase())
            );
            if (selectedElements.length) {
                selectedElements[0].scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, 0);
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[12rem_auto]';
</script>

<form method="POST" action={isCreatingNew ? null : '?/update'} use:enhance>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <div class={gridRowDef}>
            <div class="input-group-shim">Transaction Date</div>
            <input type="date" name="transactionDate" bind:value={selectedTransactionDate} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Clear Date</div>
            <input type="date" name="clearDate" bind:value={selectedClearDate} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Transaction Type</div>
            <input
                type="text"
                name="transactionTypeId"
                hidden
                value={selectedTransactionType?.transaction_type_id || null}
            />
            <input
                type="text"
                name="transactionTypeName"
                bind:value={selectedTransactionTypeName}
                on:keypress={updateTransactionTypeName}
                use:popup={{
                    event: 'click',
                    target: 'transactionTransactionTypePopupCombobox',
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

        {#if selectedTransactionTypeName?.toLowerCase() === 'check'}
            <div class="pl-12">
                <div class={gridRowDef}>
                    <div class="input-group-shim">Check Number</div>
                    <input type="text" name="checkNumber" bind:value={selectedCheckNumber} />
                </div>
            </div>
        {/if}

        <div class={gridRowDef}>
            <div class="input-group-shim">Payee</div>
            <input type="text" name="payeeId" hidden value={selectedPayee?.payee_id || null} />
            <input
                type="text"
                name="payeeName"
                bind:value={selectedPayeeName}
                on:keypress={updatePayeeName}
                use:popup={{
                    event: 'click',
                    target: 'transactionPayeePopupCombobox',
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
                name="categoryId"
                hidden
                value={selectedCategory?.category_id || null}
            />
            <input
                type="text"
                name="categoryName"
                bind:value={selectedCategoryName}
                on:keypress={updateCategoryName}
                use:popup={{
                    event: 'click',
                    target: 'transactionCategoryPopupCombobox',
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
            <div class="input-group-shim">Amount</div>
            <input type="text" name="amount" bind:value={selectedAmount} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Notes</div>
            <input type="text" name="notes" bind:value={selectedNote} />
        </div>

        <div class="text-right">
            <SlideToggle
                name="excludeFromForecast"
                bind:checked={selectedExcludeFromForecast}
                active="bg-primary-500">Exclude From Forecast</SlideToggle
            >
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={() => goto('.')}>
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
                type="submit"
                class="btn variant-filled-primary"
            >
                {`${isCreatingNew ? 'Create' : 'Update'} Transaction`}
            </button>
        </div>
    </div>
</form>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="transactionTransactionTypePopupCombobox"
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
    data-popup="transactionPayeePopupCombobox"
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
    data-popup="transactionCategoryPopupCombobox"
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
