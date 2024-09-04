<script lang="ts">
    import MiapeerPage from '../MiapeerPage.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { goto, invalidate } from '$app/navigation';

    import type { PageData } from './$types';

    export let data: PageData;
    export let pageTitle = 'Quantum';
    export let headline = '';

    let futureMarker = $page.url.searchParams.get('marker') ?? 7;
    let lowBalanceThreshold = $page.url.searchParams.get('threshold') ?? 250;
    let transactionMonthLimit = $page.url.searchParams.get('limitmonths') ?? 3;
    let forecastMonthLimit = $page.url.searchParams.get('forecastmonths') ?? 1;

    const updateLimits = async () => {
        window.location = `/quantum/accounts/${$page.params.accountId}/transactions?threshold=${lowBalanceThreshold}&limitmonths=${transactionMonthLimit}&forecastmonths=${forecastMonthLimit}`;
    };
</script>

<MiapeerPage {pageTitle} {headline} {data}>
    <svelte:fragment slot="header">
        <div class="grid grid-cols-[1fr_14rem_18rem_13rem_17rem_12rem_12rem] gap-4">
            <div></div>
            <div>
                {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                    <div class="input-group input-group-divider grid-cols-[11rem_auto]">
                        <div class="input-group-shim">Mark future days</div>
                        <input type="text" bind:value={futureMarker} on:focusout={updateLimits} />
                    </div>
                {/if}
            </div>
            <div>
                {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Low balance threshold</div>
                        <input
                            type="text"
                            bind:value={lowBalanceThreshold}
                            on:focusout={updateLimits}
                        />
                    </div>
                {/if}
            </div>
            <div>
                {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                    <div class="input-group input-group-divider grid-cols-[10rem_auto]">
                        <div class="input-group-shim">Months of data</div>
                        <input
                            type="text"
                            bind:value={transactionMonthLimit}
                            on:focusout={updateLimits}
                        />
                    </div>
                {/if}
            </div>
            <div>
                {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Months of forecast data</div>
                        <input
                            type="text"
                            bind:value={forecastMonthLimit}
                            on:focusout={updateLimits}
                        />
                    </div>
                {/if}
            </div>
            <div>
                {#if data.accounts.length}
                    <button
                        class="btn variant-filled w-48 justify-between pointer-events-auto"
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
                    class="btn variant-filled w-48 justify-between pointer-events-auto"
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
                <a href="/quantum/accounts">Manage Accounts</a>
                <hr />
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
                    <hr />
                {/if}
                {#if $page.params.accountId && $page.route.id?.includes('/scheduledtransactions')}
                    <a href={`/quantum/accounts/${$page.params.accountId}/transactions`}
                        >Transactions</a
                    >
                    <hr />
                {/if}
                <a href="/quantum/transactiontypes">Transaction Types</a>
                <a href="/quantum/payees">Payees</a>
                <a href="/quantum/categories">Categories</a>
            </div>
        </div>
    </svelte:fragment>

    <slot />
</MiapeerPage>
