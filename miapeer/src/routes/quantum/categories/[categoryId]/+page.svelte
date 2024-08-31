<script lang="ts">
    import QuantumPage from '@quantum/QuantumPage.svelte';
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import { page } from '$app/stores';

    let categoryId = $page.params.categoryId;

    export let data: PageData;

    let categoryName = data.category.name;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/categories');
    };

    const handleEditCategory = async () => {
        const requestData = {
            categoryName
        };
        const res = await fetch(`/quantum/categories/${categoryId}`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            invalidate('quantum:categories');
            goto(data.redirectUrl ?? '/quantum/categories');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<QuantumPage pageTitle="Quantum: Edit Category" headline="Edit Category" {data}>
    <div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
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
</QuantumPage>
