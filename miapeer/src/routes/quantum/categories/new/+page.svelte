<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';

    let categoryName;

    const handleCancel = () => {
        goto(data.redirectUrl ?? '/quantum/categories');
    };

    const handleCreateCategory = async () => {
        const requestData = {
            portfolioId: data.portfolioId,
            categoryName
        };

        const res = await fetch('/quantum/categories/new', {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateCategory();
        }
    };

    export let data: PageData;
</script>

<div class="login-form grid gap-4 max-w-3xl my-0 mx-auto pt-4">
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
