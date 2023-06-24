<script lang="ts">
    import type { PageData } from './$types';
    import Link from '$lib/Link.svelte';
    import FormattedTable from '$lib/FormattedTable.svelte';

    export let data: PageData;
</script>

<section>
    <FormattedTable title="Accounts">
        <table slot="table">
            <colgroup>
                <col />
                <col span="1" style="width: 25%;" />
                <col span="1" style="width: 15%;" />
            </colgroup>
            {#if data.accounts.length > 0}
                <thead>
                    <tr>
                        <th />
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.accounts as account}
                        <tr>
                            <td>{account.name}</td>
                            <td>{account.balance}</td>
                            <td>
                                <Link
                                    cssClass="fa-solid fa-pen-to-square"
                                    href={`./accounts/${account.account_id}`}
                                />
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
                            You haven't set up any accounts yet. Click "Add New" below to create
                            one.
                        </td>
                    </tr>
                </tbody>
            {/if}
        </table>
        <Link href="./accounts/new" slot="actions"><i class="fa-solid fa-plus" /> Add New</Link>
    </FormattedTable>
</section>

<style>
    table .empty {
        text-align: center;
        padding: 1em;
    }
</style>
