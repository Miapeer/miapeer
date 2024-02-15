<script lang="ts">
    import type { PageData } from './$types';
    import Dialog from '$lib/Dialog.svelte';
    import Link from '$lib/Link.svelte';
    import FormattedTable from '$lib/FormattedTable.svelte';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';
    import Popover from '$lib/Popover.svelte';
    import Button from '$lib/Button.svelte';

    import { invalidate } from '$app/navigation';

    export let data: PageData;

    export let confirmDelete: boolean = false;
    export let accountToDelete = null;
    const handleConfirmDelete = (account) => {
        accountToDelete = account;
        confirmDelete = true;
    };
    const handleDelete = async () => {
        confirmDelete = false;

        const deleteAccountRequest = await fetch('/quantum/accounts', {
            method: 'DELETE',
            body: JSON.stringify({ accountId: accountToDelete?.account_id })
        });

        if (deleteAccountRequest.ok) {
            invalidate('quantum:payees');
        } else {
            console.error('NOT ok');
        }
    };
</script>

<section>
    <FormattedTable title="Payees">
        <table slot="table">
            <colgroup>
                <col />
                <col span="1" style="width: 25%;" />
                <col span="1" style="width: 15%;" />
            </colgroup>
            {#if data.payees.length > 0}
                <thead>
                    <tr>
                        <th />
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.payees as payee}
                        <tr>
                            <td>{payee.name}</td>
                            <td></td>
                            <td class="action-cell">
                                <div>
                                    <Link
                                        id={`payee-${payee.account_id}`}
                                        class="popover-icon fa-solid fa-ellipsis-v"
                                        on:click={() => {
                                            payee.openActions = true;
                                        }}
                                    />
                                </div>
                                <Popover
                                    open={payee.openActions}
                                    target={`payee-${payee.account_id}`}
                                    anchor="top-right"
                                >
                                    <div class="popover-action">
                                        <Link href={`./accounts/${payee.account_id}`}
                                            ><i class="fa-solid fa-pen-to-square" /></Link
                                        >
                                    </div>
                                    <div class="popover-action">
                                        <Link on:click={() => handleConfirmDelete(payee)}
                                            ><i class="fa-solid fa-trash" /></Link
                                        >
                                    </div>
                                </Popover>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            {:else}
                <thead>
                    <tr>
                        <th />
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr class="suppress-hover">
                        <td class="empty" colspan="3">
                            You haven't set up any payees yet. Click "Add New" below to create one.
                        </td>
                    </tr>
                </tbody>
            {/if}
        </table>
    </FormattedTable>
</section>
<Dialog title="Confirm Delete:" bind:open={confirmDelete}>
    {`Are you sure you want to delete the account named "${accountToDelete?.name ?? ''}"?`}
    <div slot="actions">
        <Button type="subtle" onClick={() => (confirmDelete = false)}>Cancel</Button>
        <Button type="danger" onClick={handleDelete}>Delete</Button>
    </div>
</Dialog>
<FloatingActionButton href="./payees/new"><i class="fa-solid fa-plus" /></FloatingActionButton>

<style>
    table .empty {
        text-align: center;
        padding: 1em;
    }

    .action-cell {
        text-align: right;
    }

    :global(.popover-icon) {
        width: 1em;
        text-align: center;
    }

    .popover-action {
        padding: 0.5em;
    }
</style>
