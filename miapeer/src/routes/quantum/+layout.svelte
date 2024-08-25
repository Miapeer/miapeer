<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { goto, invalidate } from '$app/navigation';

    import type { PageData } from './$types';
    export let data: PageData;

    let transactionMonthLimit = $page.url.searchParams.get('limitmonths') ?? 6;

    const updateTransactionLimit = async () => {
        window.location = `/quantum/accounts/${$page.params.accountId}/transactions?limitmonths=${transactionMonthLimit}`;
    };
</script>

<header class="quantum-header text-right">
    <div class="grid grid-cols-[1fr_14rem_12rem_12rem] gap-4 pr-4 pt-4">
        <div></div>
        <div>
            {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                <div class="input-group input-group-divider grid-cols-[10rem_auto]">
                    <div class="input-group-shim">Months of data</div>
                    <input
                        type="text"
                        bind:value={transactionMonthLimit}
                        on:focusout={updateTransactionLimit}
                    />
                </div>
            {/if}
        </div>
        <div>
            {#if data.accounts.length}
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
            {/if}
        </div>
        <div>
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
        </div>
    </div>

    <div data-popup="accountPopupCombobox">
        <div class="btn-group-vertical variant-filled">
            {#each data.accounts as account}
                <a href="/quantum/accounts/{account.account_id}/transactions">{account.name}</a>
            {/each}
        </div>
    </div>

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
