<script lang="ts">
    import QuantumTable from '../QuantumTable.svelte';
    import { invalidate } from '$app/navigation';
    import { enhance, applyAction, deserialize } from '$app/forms';
    import { popup, getModalStore, ConicGradient, ProgressBar } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import type { ConicStop } from '@skeletonlabs/skeleton';
    import { formatMoney } from '@quantum/util';

    const modalStore = getModalStore();

    export let data: PageData;

    const monthStrings = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    $: validPeriods = (() => {
        const periods = {};

        const today = new Date();
        const aYearAgoString = `${today.getMonth() + 1}/1/${today.getFullYear() - 1}`;
        const aYearAgo = new Date(aYearAgoString);

        for (let x = 0; x < 12; x++) {
            aYearAgo.setMonth(aYearAgo.getMonth() + 1);
            periods[
                `${aYearAgo.getFullYear()}-${aYearAgo.getMonth() < 9 ? 0 : ''}${aYearAgo.getMonth() + 1}`
            ] = `${monthStrings[aYearAgo.getMonth()]} ${aYearAgo.getFullYear()}`;
        }

        return periods;
    })();

    const conicStopFactory = (budgetedAmount, spend) => {
        let color1 = '';
        let color2 = '';
        let percent = 0;

        if (spend === 0) {
            percent = 100;
            color1 = 'rgba(0, 0, 0, 0.25)';
            color2 = color1;
        } else if (spend <= budgetedAmount) {
            percent = parseInt((spend / budgetedAmount) * 100);
            color1 = 'rgba(0, 255, 0, 1.0)';
            color2 = 'rgba(0, 255, 0, 0.5)';
        } else {
            percent = 100;
            color1 = 'rgba(255, 0, 0, 1.0)';
            color2 = color1;
        }

        return [
            { color: color1, start: 0, end: percent },
            { color: color2, start: percent, end: 100 }
        ];
    };

    const handleConfirmDelete = (event, account) => {
        const targetElement = event.currentTarget;

        const modal: ModalSettings = {
            type: 'confirm',
            title: 'Confirm Delete',
            body: `Are you sure you want to delete the account named "${account.name ?? ''}"?`,
            buttonPositive: 'variant-filled-error',
            buttonTextConfirm: 'Delete',
            response: (r: boolean) => {
                if (r) {
                    deleteAccount(targetElement);
                }
            }
        };

        modalStore.trigger(modal);
    };

    const deleteAccount = async (targetElement) => {
        const data = new FormData(targetElement);

        const response = await fetch(targetElement.action, {
            method: 'POST',
            body: data
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());

        if (result.type === 'success') {
            invalidate('quantum:accounts');
        } else {
            console.error('NOT ok');
        }

        applyAction(result);
    };

    const gridColSizes = 'grid-cols-[1fr_1fr_50px] md:grid-cols-[1fr_1fr_4fr_80px_50px]';
    const gridTemplateAreas =
        "[grid-template-areas:'name_name_actions''chart_chart_.''category_amount_amount'] md:[grid-template-areas:'name_category_chart_amount_actions']";
    const gridRowDef = `grid ${gridColSizes} ${gridTemplateAreas} gap-2 md:gap-4 md:p-4 md:ml-2 md:mr-2`;
</script>

<QuantumTable pageTitle="Quantum: Budgets" headline="Budgets" newItemHref="./budgets/new" {data}>
    <svelte:fragment slot="tableHeader">
        {#if data.budgets.length}
            <div class={`${gridRowDef} bg-surface-600 rounded-t-lg font-bold`}>
                <div style="grid-area: name" class="hidden md:block"></div>
                <div style="grid-area: category" class="text-left hidden md:block">Category</div>
                <div style="grid-area: chart" class="hidden md:block"></div>
                <div style="grid-area: amount" class="text-center hidden md:block">Budgeted</div>
                <div style="grid-area: actions" class="hidden md:block"></div>
                <div style="grid-area: name" class="block md:hidden h-[2.25rem]"></div>
            </div>
        {/if}
    </svelte:fragment>

    {#if data.budgets.length}
        {#each data.budgets as budget, budgetIndex}
            <div
                class={`${gridRowDef} ${budgetIndex % 2 ? 'bg-surface-700' : 'bg-surface-800'} ${budgetIndex === data.budgets.length - 1 ? 'rounded-b-lg' : null} hover:bg-primary-900`}
            >
                <a
                    style="grid-area: name"
                    class="content-center"
                    href={`./budgets/${budget.budget_id}/transactions`}
                >
                    {budget.name}
                </a>
                <div style="grid-area: category" class="content-center text-left">
                    {data.indexedCategories[budget.category_id].name}
                </div>
                <div
                    style="grid-area: chart"
                    class="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 align-bottom hidden md:grid"
                >
                    {#each Object.keys(validPeriods) as periodKey}
                        {@const monthSpend =
                            -1 *
                            (budget.data.find((datum) => datum[0] === periodKey) ?? ['', 0])[1]}
                        <ConicGradient
                            stops={conicStopFactory(budget.amount, monthSpend)}
                            width="w-16"
                            regionCaption="text-sm"
                            >{validPeriods[periodKey]}<br />{formatMoney(monthSpend)}</ConicGradient
                        >
                    {/each}
                </div>
                <div
                    style="grid-area: chart"
                    class="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 align-bottom block md:hidden"
                >
                    {#each Object.keys(validPeriods) as periodKey}
                        {@const monthSpend =
                            -1 *
                            (budget.data.find((datum) => datum[0] === periodKey) ?? ['', 0])[1]}
                        <ProgressBar
                            meter={`bg-${monthSpend > budget.amount ? 'error' : 'success'}-500`}
                            track={`bg-${monthSpend > budget.amount ? 'error' : 'success'}-500/30`}
                            class="rotate-[270deg]"
                            value={monthSpend}
                            max={budget.amount}
                        />
                    {/each}
                </div>
                <div style="grid-area: amount" class="content-center text-right">
                    {formatMoney(budget.amount)}
                </div>
                <div style="grid-area: actions" class="content-center">
                    <div>
                        <button
                            type="button"
                            class="btn-icon variant-filled"
                            use:popup={{
                                event: 'click',
                                target: 'budget-actions-' + budgetIndex,
                                placement: 'left'
                            }}><i class="fa-solid fa-ellipsis-v" /></button
                        >
                        <div data-popup="budget-actions-{budgetIndex}">
                            <form
                                method="POST"
                                on:submit|preventDefault={(event) => {
                                    handleConfirmDelete(event, budget);
                                }}
                                action={`budgets/${budget.budget_id}?/delete`}
                            >
                                <div class="btn-group variant-filled">
                                    <a href={`./budgets/${budget.budget_id}`}
                                        ><i class="fa-solid fa-pen-to-square" /></a
                                    >
                                    <button type="submit"><i class="fa-solid fa-trash" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <h3 class="h3">
            You haven't set up any budgets yet. Click the button at the top-right to create one.
        </h3>
    {/if}
</QuantumTable>
