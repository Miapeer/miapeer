<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';

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
    {#if data.accounts}
        <div data-popup="accountPopupCombobox">
            <div class="btn-group-vertical variant-filled">
                {#each Object.keys(data.accounts) as accountKey}
                    {@const account = data.accounts[accountKey]}
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
            <a href="/quantum/scheduledtransactions">Scheduled Transactions</a>
            <a href="/quantum/transactiontypes">Transaction Types</a>
            <a href="/quantum/payees">Payees</a>
            <a href="/quantum/categories">Categories</a>
        </div>
    </div>
</header>

<main>
    <slot />
</main>
