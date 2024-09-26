<script lang="ts">
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<div class="z-30" data-popup="accountPopupCombobox">
    <div class="btn-group-vertical variant-filled">
        <a href="/quantum/accounts">Manage Accounts</a>
        <hr />
        {#each data.accounts as account}
            <a href="/quantum/accounts/{account.account_id}/transactions">{account.name}</a>
        {/each}
    </div>
</div>

<div class="z-30" data-popup="dataPopupCombobox">
    <div class="btn-group-vertical variant-filled">
        {#if $page.params.accountId && $page.route.id?.includes('/transactions')}
            <a href={`/quantum/accounts/${$page.params.accountId}/scheduledtransactions`}
                >Scheduled Transactions</a
            >
            <hr />
        {/if}
        {#if $page.params.accountId && $page.route.id?.includes('/scheduledtransactions')}
            <a href={`/quantum/accounts/${$page.params.accountId}/transactions`}>Transactions</a>
            <hr />
        {/if}
        <a href="/quantum/transactiontypes">Transaction Types</a>
        <a href="/quantum/payees">Payees</a>
        <a href="/quantum/categories">Categories</a>
    </div>
</div>

<slot></slot>
