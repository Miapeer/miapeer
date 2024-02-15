<script lang="ts">
    import { goto } from '$app/navigation';
    import NavBar from '$lib/NavBar.svelte';
    import Select from '$lib/Select.svelte';

    export let data: PageData;
</script>

<header class="quantum-header">
    <NavBar>
        <Select
            label="Accounts"
            options={data.accounts.map((account) => {
                return {
                    label: account.name,
                    action: () => {
                        goto(`/quantum/accounts/${account.account_id}`);
                    }
                };
            })}
        />

        <Select
            label="Data"
            showSelection={false}
            options={[
                {
                    label: 'Scheduled Transactions',
                    action: () => {
                        goto('/quantum/scheduledtransaction');
                    }
                },
                {
                    label: 'Transaction Types',
                    action: () => {
                        goto('/quantum/transactiontypes');
                    }
                },
                {
                    label: 'Payees',
                    action: () => {
                        goto('/quantum/payees');
                    }
                },
                {
                    label: 'Categories',
                    action: () => {
                        goto('/quantum/categories');
                    }
                }
            ]}
        />
    </NavBar>
</header>

<main>
    <slot />
</main>

<style>
    .quantum-header {
        display: flex;
        justify-content: right;
    }
</style>
