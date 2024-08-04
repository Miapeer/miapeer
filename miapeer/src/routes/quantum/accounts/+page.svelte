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
            body: `Are you sure you want to delete the account named "${account?.name ?? ''}"?`,
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
        const deleteAccountRequest = await fetch('/quantum/accounts', {
            method: 'DELETE',
            body: JSON.stringify({ accountId: account?.account_id })
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
        <div class="table-container px-2">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th />
                        <th class="w-32">Balance</th>
                        <th class="w-16" />
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(data.accounts) as accountKey}
                        {@const account = data.accounts[accountKey]}
                        <tr>
                            <td
                                on:click={() =>
                                    goto(`./accounts/${account.account_id}/transactions`)}
                                >{account.name}</td
                            >
                            <td>{formatMoney(account.balance)}</td>
                            <td class="action-cell text-right">
                                <div>
                                    <button
                                        type="button"
                                        class="btn-icon variant-filled"
                                        use:popup={{
                                            event: 'click',
                                            target: 'account-actions-' + account.account_id,
                                            placement: 'left'
                                        }}><i class="fa-solid fa-ellipsis-v" /></button
                                    >
                                    <div data-popup="account-actions-{account.account_id}">
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
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <h3 class="h3">
            You haven't set up any accounts yet. Click the button below to create one.
        </h3>
    {/if}
</section>

<FloatingActionButton href="./accounts/new"><i class="fa-solid fa-plus" /></FloatingActionButton>
