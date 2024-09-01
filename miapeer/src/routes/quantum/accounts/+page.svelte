<script lang="ts">
    import QuantumTable from '../QuantumTable.svelte';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import { invalidate } from '$app/navigation';

    import { formatMoney } from '@quantum/util';

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    export let data: PageData;

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

    const gridRowDef = 'grid grid-cols-[1fr_80px_50px] gap-4 p-4 ml-2 mr-2';
</script>

<QuantumTable pageTitle="Quantum: Accounts" headline="Accounts" newItemHref="./accounts/new" {data}>
    <svelte:fragment slot="tableHeader">
        {#if data.accounts.length}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>
                <div></div>
                <div class="text-center">Balance</div>
                <div></div>
            </div>
        {/if}
    </svelte:fragment>

    {#if data.accounts.length}
        {#each data.accounts as account, accountIndex}
            <div
                class={`${gridRowDef} ${accountIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${accountIndex === data.accounts.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <a class="content-center" href={`./accounts/${account.account_id}/transactions`}>
                    {account.name}
                </a>
                <div class="content-center text-right">{formatMoney(account.balance)}</div>
                <div class="content-center">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'account-actions-' + accountIndex,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="account-actions-{accountIndex}">
                            <div class="btn-group variant-filled">
                                <a href={`./accounts/${account.account_id}`}
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
            You haven't set up any accounts yet. Click the button at the top-right to create one.
        </h3>
    {/if}
</QuantumTable>
