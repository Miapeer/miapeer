<script lang="ts">
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    export let portfolioId;
    export let category = null;

    $: isCreatingNew = !category;

    let selectedCategoryName = category?.name || '';
</script>

<form method="POST" action={isCreatingNew ? null : '?/update'} use:enhance>
    <div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
        <input type="text" name="portfolioId" hidden value={portfolioId} />

        <div class="input-group input-group-divider grid-cols-[14rem_auto]">
            <div class="input-group-shim">Category Name</div>
            <input type="text" name="categoryName" bind:value={selectedCategoryName} />
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={() => goto('.')}>
                Cancel
            </button>

            <button
                disabled={!selectedCategoryName}
                type="submit"
                class="btn variant-filled-primary"
            >
                {`${isCreatingNew ? 'Create' : 'Update'} Category`}
            </button>
        </div>
    </div>
</form>
