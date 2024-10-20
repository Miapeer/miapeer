<script lang="ts">
    import MiapeerPage from '../MiapeerPage.svelte';
    import { popup, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    import type { PageData } from './$types';

    export let data: PageData;
    export let pageTitle = 'Quantum';
    export let headline = '';

    const drawerStore = getDrawerStore();

    let futureMarker = $page.url.searchParams.get('marker') ?? 7;
    let lowBalanceThreshold = $page.url.searchParams.get('threshold') ?? 250;
    let transactionMonthLimit = $page.url.searchParams.get('limitmonths') ?? 3;
    let forecastMonthLimit = $page.url.searchParams.get('forecastmonths') ?? 1;

    const updateLimits = async () => {
        window.location = `/quantum/accounts/${$page.params.accountId}/transactions?marker=${futureMarker}&threshold=${lowBalanceThreshold}&limitmonths=${transactionMonthLimit}&forecastmonths=${forecastMonthLimit}`;
    };

    const closeSettingsDrawer = () => {
        drawerStore.close();
    };
</script>

<MiapeerPage {pageTitle} {headline} {data}>
    <svelte:fragment slot="settingsDrawer">
        <Drawer position="top">
            {#if $page.url.pathname === `/quantum/accounts/${$page.params.accountId}/transactions`}
                <div class="grid grid-cols-[24rem] gap-4">
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Mark future days</div>
                        <input type="text" bind:value={futureMarker} />
                    </div>
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Low balance threshold</div>
                        <input type="text" bind:value={lowBalanceThreshold} />
                    </div>
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Months of data</div>
                        <input type="text" bind:value={transactionMonthLimit} />
                    </div>
                    <div class="input-group input-group-divider grid-cols-[14rem_auto]">
                        <div class="input-group-shim">Months of forecast data</div>
                        <input type="text" bind:value={forecastMonthLimit} />
                    </div>

                    <div class="grid grid-cols-[1fr_1fr] gap-4">
                        <button
                            type="button"
                            class="btn variant-ghost-surface"
                            on:click={closeSettingsDrawer}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            class="btn variant-filled-primary"
                            on:click={updateLimits}
                        >
                            {'Save Settings'}
                        </button>
                    </div>
                </div>
            {:else}
                <div>No settings preset for this page</div>
            {/if}
        </Drawer>
    </svelte:fragment>

    <svelte:fragment slot="header">
        <div class="grid grid-cols-[1fr_12rem_12rem_12rem] gap-4">
            <div></div>
            <div>
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
            </div>
            <div>
                <button
                    class="btn variant-filled w-48 justify-between pointer-events-auto"
                    use:popup={{
                        event: 'click',
                        target: 'budgetPopupCombobox',
                        placement: 'bottom'
                    }}
                >
                    <span class="capitalize">Budgets</span>
                    <span>↓</span>
                </button>
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
    </svelte:fragment>

    <slot />
</MiapeerPage>
