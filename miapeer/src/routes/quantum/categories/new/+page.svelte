<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { createCategory } from '@quantum/api';

    let categoryName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/categories');
    };

    const handleCreateCategory = async () => {
        let newCategory = await createCategory(data.portfolioId, categoryName);
        if (newCategory) {
            goto(data.redirectUrl ?? '/quantum/categories');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateCategory();
        }
    };

    export let data: PageData;
</script>

<div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
    <h1 class="h1">Create a new category</h1>

    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
        <div class="input-group-shim">Category Name</div>
        <input type="text" bind:value={categoryName} on:keypress={handleKeyPress} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!categoryName}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleCreateCategory}
        >
            Create Category
        </button>
    </div>
</div>
