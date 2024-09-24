<script lang="ts">
    import QuantumTable from '../QuantumTable.svelte';
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';
    import { applyAction, deserialize } from '$app/forms';
    import { popup, getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    export let data: PageData;

    const handleConfirmDelete = (event, category) => {
        const targetElement = event.currentTarget;

        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the category named "${category.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    deleteCategory(targetElement);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const deleteCategory = async (targetElement) => {
        const data = new FormData(targetElement);

        const response = await fetch(targetElement.action, {
            method: 'POST',
            body: data
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());

        if (result.type === 'success') {
            invalidate('quantum:categories');
        } else {
            console.error('NOT ok');
        }

        applyAction(result);
    };

    const gridRowDef = 'grid grid-cols-[1fr_50px] gap-4 p-4 ml-2 mr-2';
</script>

<QuantumTable
    pageTitle="Quantum: Categories"
    headline="Categories"
    newItemHref="./categories/new"
    {data}
>
    <svelte:fragment slot="tableHeader">
        {#if data.categories.length}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>&nbsp;</div>
        {/if}
    </svelte:fragment>

    {#if data.categories.length}
        {#each data.categories as category, categoryIndex}
            <div
                class={`${gridRowDef} ${categoryIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${categoryIndex === data.categories.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
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
                            <form
                                method="POST"
                                on:submit|preventDefault={(event) => {
                                    handleConfirmDelete(event, category);
                                }}
                                action={`categories/${category.category_id}?/delete`}
                            >
                                <div class="btn-group variant-filled">
                                    <a href={`./categories/${category.category_id}`}
                                        ><i class="fa-solid fa-pen-to-square" /></a
                                    >
                                    <button type="submit"><i class="fa-solid fa-trash" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">
            You haven't set up any categories yet. Click the button at the top-right to create one.
        </h3>
    {/if}
</QuantumTable>
