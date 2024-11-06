<script lang="ts">
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<div class="z-30" data-popup="dataPopupCombobox">
    <div class="btn-group-vertical variant-filled">
        <a class="text-left" href="/quantum/budgets">Manage Budgets</a>
        {#each data.budgets as budget}
            <a href="/quantum/budgets/{budget.budget_id}"
                ><i class="fa-solid fa-pen-to-square pr-2" /> {budget.name}</a
            >
        {/each}

        <hr />

        <a href="/quantum/accounts">Manage Accounts</a>
        {#each data.accounts as account}
            <a href="/quantum/accounts/{account.account_id}/transactions"
                ><i class="fa fa-table pr-2"></i> {account.name}</a
            >
        {/each}

        <hr />

        {#if $page.params.accountId && $page.route.id?.includes('/transactions')}
            <a href={`/quantum/accounts/${$page.params.accountId}/scheduledtransactions`}
                >{data.indexedAccounts[$page.params.accountId].name} Scheduled Transactions</a
            >
            <hr />
        {/if}
        {#if $page.params.accountId && $page.route.id?.includes('/scheduledtransactions')}
            <a href={`/quantum/accounts/${$page.params.accountId}/transactions`}
                >{data.indexedAccounts[$page.params.accountId].name} Transactions</a
            >
            <hr />
        {/if}

        <a href="/quantum/transactiontypes">Transaction Types</a>
        <hr />
        <a href="/quantum/payees">Payees</a>
        <hr />
        <a href="/quantum/categories">Categories</a>
    </div>
</div>

<slot></slot>
