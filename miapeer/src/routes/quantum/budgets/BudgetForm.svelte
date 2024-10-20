<script lang="ts">
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import { popup, SlideToggle, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { formatMoney } from '@quantum/util';

    export let portfolioId;
    export let budget = null;
    export let data;

    $: isCreatingNew = !budget;

    let selectedBudgetName = budget?.name || '';
    let selectedAmount = formatMoney(budget?.amount || 0);

    let selectedCategoryName = data.indexedCategories[budget?.category_id]?.name || '';
    $: selectedCategory = data.categories.find(
        (c) => c.name.toLowerCase() === selectedCategoryName?.toLowerCase()
    );
    $: if (selectedCategory) {
        updateCategoryName();
    }

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
                    '[data-popup=budgetCategoryPopupCombobox] .listbox-label-content'
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
        <input type="text" name="portfolioId" hidden value={portfolioId} />

        <div class={gridRowDef}>
            <div class="input-group-shim">Budget Name</div>
            <input type="text" name="budgetName" bind:value={selectedBudgetName} />
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
                    target: 'budgetCategoryPopupCombobox',
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

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={() => goto('.')}>
                Cancel
            </button>

            <button
                disabled={!selectedBudgetName || !selectedAmount}
                type="submit"
                class="btn variant-filled-primary"
            >
                {`${isCreatingNew ? 'Create' : 'Update'} Budget`}
            </button>
        </div>
    </div>
</form>

<!-- Must be outside of the grid for proper interaction -->
<div
    class="card w-64 max-h-64 shadow-xl py-2 overflow-y-auto"
    data-popup="budgetCategoryPopupCombobox"
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
