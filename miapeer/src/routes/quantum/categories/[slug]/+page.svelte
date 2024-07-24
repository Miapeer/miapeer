<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    export let data: PageData;

    let categoryName = data.category.name;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/categories');
    };

    const handleEditCategory = async () => {
        const requestData = {
            categoryId: data.category.category_id,
            categoryName
        };
        const res = await fetch(`/quantum/categories/${data.category.category_id}`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            await invalidate('quantum:categories');
            goto(data.redirectUrl ?? '/quantum/categories');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
    <h1 class="h1">Edit category</h1>

    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
        <div class="input-group-shim">Category Name</div>
        <input type="text" bind:value={categoryName} />
    </div>

    <div class="grid grid-cols-[1fr_1fr] gap-4">
        <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
            Cancel
        </button>

        <button
            disabled={!data.category.name}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleEditCategory}
        >
            Update Category
        </button>
    </div>
</div>
