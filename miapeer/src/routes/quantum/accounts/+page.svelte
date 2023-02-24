<script lang="ts">
    import type { PageData } from './$types';
    import Link from '$lib/Link.svelte';
    import FormattedTable from '$lib/FormattedTable.svelte';

    export let data: PageData;
</script>

<section>
    {#if data.accounts.length > 0}
        <FormattedTable title="Accounts">
            <table slot="table">
                <colgroup>
                    <col />
                    <col span="1" style="width: 25%;" />
                    <col span="1" style="width: 15%;" />
                </colgroup>
                <thead>
                    <tr>
                        <th />
                        <th>Starting Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.accounts as account}
                        <tr>
                            <td>{account.name}</td>
                            <td>{account.starting_balance}</td>
                            <td
                                ><Link
                                    cssClass="fa-solid fa-pen-to-square"
                                    href={`./accounts/${account.account_id}`}
                                /></td
                            >
                        </tr>
                    {/each}
                    {#each data.accounts as account}
                        <tr>
                            <td>{account.name}</td>
                            <td>{account.starting_balance}</td>
                            <td><i class="fa-solid fa-pen-to-square" /></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <Link href="./accounts/new" slot="actions"><i class="fa-solid fa-plus" /> Add New</Link>
        </FormattedTable>
    {:else}
        <div>
            You don't have any accounts set up. <Link href="./accounts/new">Click here</Link> to add
            one.
        </div>
    {/if}
</section>

<style>
    .table {
        display: grid;
        grid-template-columns: 5fr 2fr 1fr;
    }

    .table > *:not(.header):nth-child(6n + 1),
    .table > *:not(.header):nth-child(6n + 2),
    .table > *:not(.header):nth-child(6n + 3) {
        background-color: var(--bg-neutral);
    }

    .header {
        font-weight: bold;
        text-decoration: underline;
    }
</style>
