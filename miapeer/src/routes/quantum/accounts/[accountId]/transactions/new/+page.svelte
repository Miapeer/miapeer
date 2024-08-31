<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';

    import { page } from '$app/stores';
    import {
        createTransactionType,
        createPayee,
        createCategory,
        createTransaction
    } from '@quantum/api';
    import { formatMoney, unformatMoney } from '@quantum/util';

    export let data: PageData;

    let accountId = $page.params.accountId;

    let selectedTransactionTypeName;
    $: selectedTransactionType = data.transactionTypes.find(
        (tt) => tt.name === selectedTransactionTypeName
    );
    let selectedPayeeName;
    $: selectedPayee = data.payees.find((p) => p.name === selectedPayeeName);
    let selectedCategoryName;
    $: selectedCategory = data.categories.find((c) => c.name === selectedCategoryName);
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
        if (!selectedTransactionType) {
            await createTransactionType(data.portfolioId, selectedTransactionTypeName);
        }
        if (!selectedPayee) {
            await createPayee(data.portfolioId, selectedPayeeName);
        }
        if (!selectedCategory) {
            await createCategory(data.portfolioId, selectedCategoryName);
        }

        let newTransaction = await createTransaction(
            accountId,
            selectedTransactionType?.transaction_type_id,
            selectedPayee?.payee_id,
            selectedCategory?.category_id,
            selectedExcludeFromForecast,
            unformatMoney(selectedAmount),
            selectedTransactionDate,
            selectedClearDate,
            selectedCheckNumber,
            selectedNote
        );
        if (newTransaction) {
            invalidate('quantum:transactions');
            goto(data.redirectUrl ?? `/quantum/accounts/${accountId}/transactions`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateAccount();
        }
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[12rem_auto]';
</script>

<QuantumPage pageTitle="Quantum: New Transaction" headline="Create a new Transaction" {data}>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <div class={gridRowDef}>
            <div class="input-group-shim">Transaction Date</div>
            <input type="date" bind:value={selectedTransactionDate} on:keypress={handleKeyPress} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Clear Date</div>
            <input type="date" bind:value={selectedClearDate} on:keypress={handleKeyPress} />
        </div>

        <div class={gridRowDef}>
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
                <div class={gridRowDef}>
                    <div class="input-group-shim">Check Number</div>
                    <input
                        type="text"
                        bind:value={selectedCheckNumber}
                        on:keypress={handleKeyPress}
                    />
                </div>
            </div>
        {/if}

        <div class={gridRowDef}>
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

        <div class={gridRowDef}>
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

        <div class={gridRowDef}>
            <div class="input-group-shim">Amount</div>
            <input type="text" bind:value={selectedAmount} on:keypress={handleKeyPress} />
        </div>

        <div class={gridRowDef}>
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
        data-popup="newTransactionPayeePopupCombobox"
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
        data-popup="newTransactionCategoryPopupCombobox"
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
</QuantumPage>
