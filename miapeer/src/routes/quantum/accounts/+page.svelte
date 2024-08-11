<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';

    import { popup } from '@skeletonlabs/skeleton';

    import { invalidate } from '$app/navigation';

    import { formatMoney } from '@quantum/util';

    export let data: PageData;

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    const handleConfirmDelete = (account) => {
        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the account named "${account.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    handleDelete(account);
                }
            }
        };

        modalStore.trigger(modal);
    };
    const handleDelete = async (account) => {
        const deleteAccountRequest = await fetch(`/quantum/accounts/${account.account_id}`, {
            method: 'DELETE'
        });

        if (deleteAccountRequest.ok) {
            invalidate('quantum:accounts');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <h1 class="h1">Accounts</h1>

    {#if Object.keys(data.accounts).length}
        {@const gridDef = 'grid grid-cols-[minmax(200px,_1fr)_80px_50px] gap-4 p-4 ml-2 mr-2'}
        <div class={`${gridDef} mt-4 bg-surface-600 rounded-t-lg font-bold`}>
            <div></div>
            <div class="text-right">Balance</div>
        </div>

        {#each Object.keys(data.accounts) as accountId, accountIndex}
            {@const account = data.accounts[accountId]}
            <div
                class={`${gridDef} ${accountIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${accountIndex === Object.keys(data.accounts).length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <div
                    class="content-center"
                    on:click={() => goto(`./accounts/${account.account_id}/transactions`)}
                >
                    {account.name}
                </div>
                <div class="content-center text-right">{formatMoney(account.balance)}</div>
                <div class="content-center">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'account-actions-' + accountId,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="account-actions-{accountId}">
                            <div class="btn-group variant-filled">
                                <a href={`./accounts/${accountId}`}
                                    ><i class="fa-solid fa-pen-to-square" /></a
                                >
                                <button on:click={() => handleConfirmDelete(account)}
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
            You haven't set up any accounts yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./accounts/new"><i class="fa-solid fa-plus" /></FloatingActionButton>
