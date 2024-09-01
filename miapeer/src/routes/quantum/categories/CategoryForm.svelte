<script lang="ts">
    import type { PageData } from './new/$types';
    import { goto, invalidate } from '$app/navigation';
    import { createCategory, updateCategory } from '@quantum/api';

    export let portfolioId;
    export let category = null;
    export let data;

    let isCreatingNew = !!category;

    let selectedCategoryName = category?.name || '';

    const handleCancel = () => {
        goto('.');
    };

    const handleProcessCategory = async () => {
        const fnCategory = isCreatingNew ? createCategory : updateCategory;

        let returnedCategory = await fnCategory({
            portfolioId,
            categoryId: category?.category_id,
            categoryName: selectedCategoryName
        });
        if (returnedCategory) {
            invalidate('quantum:categories');
            goto('.');
        }
    };
</script>

<div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
        <div class="input-group-shim">Category Name</div>
        <input type="text" bind:value={selectedCategoryName} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!selectedCategoryName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleProcessCategory}
        >
            {`${isCreatingNew ? 'Create' : 'Update'} Category`}
        </button>
    </div>
</div>
