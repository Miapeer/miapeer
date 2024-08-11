<script lang="ts">
    import type { PageData } from './$types';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import { popup } from '@skeletonlabs/skeleton';

    import { invalidate } from '$app/navigation';

    export let data: PageData;

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    const handleConfirmDelete = (category) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the category named "${category.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(category);
                }
            }
        };

        modalStore.trigger(modal);
    };
    const handleDelete = async (category) => {
        const deleteCategoryTypeRequest = await fetch(
            `/quantum/categories/${category.category_id}`,
            {
                method: 'DELETE'
            }
        );

        if (deleteCategoryTypeRequest.ok) {
            invalidate('quantum:categories');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">Categories</h1>

    {#if Object.keys(data.categories).length}
        {@const gridDef = 'grid grid-cols-[minmax(200px,_1fr)_50px] gap-4 p-4 ml-2 mr-2'}

        <div class={`${gridDef} mt-4 bg-surface-600 rounded-t-lg font-bold`}></div>

        {#each Object.keys(data.categories) as categoryId, categoryIndex}
            {@const category = data.categories[categoryId]}
            <div
                class={`${gridDef} ${categoryIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${categoryIndex === Object.keys(data.categories).length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div class="content-center">{category.name}</div>
                <div class="action-cell text-right">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'category-actions-' + category.category_id,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="category-actions-{category.category_id}">
                            <div class="btn-group variant-filled">
                                <a href={`./categories/${category.category_id}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(category)}
                                    ><i class="fa-solid fa-trash" /></button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">
            You haven't set up any categories yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./categories/new"><i class="fa-solid fa-plus" /></FloatingActionButton>
