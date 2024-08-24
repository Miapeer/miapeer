<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    import type { PageData } from './$types';
    export let data: PageData;
</script>

<header class="quantum-header text-right">
    <button
        class="btn variant-filled w-48 justify-between"
        use:popup={{
            event: 'click',
            target: 'accountPopupCombobox',
            placement: 'bottom'
        }}
    >
        <span class="capitalize">Accounts</span>
        <span>↓</span>
    </button>
    {#if data.accounts.length}
        <div data-popup="accountPopupCombobox">
            <div class="btn-group-vertical variant-filled">
                {#each data.accounts as account}
                    <a href="/quantum/accounts/{account.account_id}/transactions">{account.name}</a>
                {/each}
            </div>
        </div>
    {/if}

    <button
        class="btn variant-filled w-48 justify-between"
        use:popup={{
            event: 'click',
            target: 'dataPopupCombobox',
            placement: 'bottom'
        }}
    >
        <span class="capitalize">Data</span>
        <span>↓</span>
    </button>

    <div data-popup="dataPopupCombobox">
        <div class="btn-group-vertical variant-filled">
            {#if $page.params.accountId && $page.route.id?.includes('/transactions')}
                <a href={`/quantum/accounts/${$page.params.accountId}/scheduledtransactions`}
                    >Scheduled Transactions</a
                >
            {/if}
            {#if $page.params.accountId && $page.route.id?.includes('/scheduledtransactions')}
                <a href={`/quantum/accounts/${$page.params.accountId}/transactions`}>Transactions</a
                >
            {/if}
            <a href="/quantum/transactiontypes">Transaction Types</a>
            <a href="/quantum/payees">Payees</a>
            <a href="/quantum/categories">Categories</a>
        </div>
    </div>
</header>

<main>
    <slot />
</main>
