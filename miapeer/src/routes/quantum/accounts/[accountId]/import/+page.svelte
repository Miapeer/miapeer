<script lang="ts">
    import type { PageData } from './$types';
    import { goto, invalidate } from '$app/navigation';
    import FloatingActionButton from '$lib/FloatingActionButton.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { formatMoney, unformatMoney, unformatDate } from '@quantum/util';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Papa from 'papaparse';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import {
        createTransactionType,
        createPayee,
        createCategory,
        createTransaction
    } from '@quantum/api';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { importErrors } from '$lib/stores';

    export let data: PageData;
    import { page } from '$app/stores';

    let importIndex = 0;
    let showImportStatus = false;

    let firstRowHasHeaders = false;
    let importData = '';

    const mapFields = [
        '',
        'Transaction Date',
        'Clear Date',
        'Transaction Type',
        'Check Number',
        'Payee',
        'Category',
        'Amount',
        'Notes'
    ];

    $: parsedData = Papa.parse(importData, { header: !!firstRowHasHeaders });

    const handleCancel = () => {
        goto(`/quantum/accounts/${$page.params.accountId}/transactions`);
    };

    const handleImport = async () => {
        showImportStatus = true;

        let mapping = {};
        mapFields.forEach((fieldName) => {
            if (fieldName) {
                mapping[fieldName] =
                    parsedData.meta.fields[
                        parseInt(
                            Array.prototype.find
                                .call(
                                    document.getElementsByClassName('select'),
                                    (element) => element.value === fieldName
                                )
                                ?.id?.replace('field-', '') || -1
                        )
                    ];
            }
        });

        let accountId = $page.params.accountId;

        showImportStatus = true;
        for (importIndex = 0; importIndex < parsedData.data.length; importIndex++) {
            let item = parsedData.data[importIndex];

            let transactionTypeName = item[mapping['Transaction Type']];
            let transactionType = data.transactionTypes.find(
                (tt) => tt.name === transactionTypeName
            );
            if (!transactionType) {
                transactionType = await createTransactionType(
                    data.portfolioId,
                    transactionTypeName
                );
            }

            let checkNumber = item[mapping['Check Number']];

            let payeeName = item[mapping['Payee']];
            let payee = data.payees.find((p) => p.name === payeeName);
            if (!payee) {
                payee = await createPayee(data.portfolioId, payeeName);
            }

            let categoryName = item[mapping['Category']];
            let category = data.categories.find((c) => c.name === categoryName);
            if (!category) {
                category = await createCategory(data.portfolioId, categoryName);
            }

            let transactionDate = item[mapping['Transaction Date']];

            let clearDate = item[mapping['Clear Date']];

            let amount = item[mapping['Amount']];

            let notes = item[mapping['Notes']];

            let transaction = await createTransaction(
                data.portfolioId,
                transactionType?.transaction_type_id,
                payee?.payee_id,
                category?.category_id,
                false,
                unformatMoney(amount),
                unformatDate(transactionDate),
                unformatDate(clearDate),
                null,
                checkNumber,
                notes
            );
            if (!transaction) {
                importErrors.set([...$importErrors, item]);
            }
        }
        showImportStatus = false;

        await invalidate('quantum:transactions');
        goto(`/quantum/accounts/${accountId}/transactions`);
    };
</script>

<section>
    <h1 class="h1">Import Data</h1>

    {#if !data.transactions || data.transactions.length === 0}
        <Accordion>
            <AccordionItem open>
                <svelte:fragment slot="summary">Your data</svelte:fragment>
                <svelte:fragment slot="content">
                    <textarea
                        class="textarea"
                        rows="10"
                        placeholder="Paste your CSV data here"
                        bind:value={importData}
                    />
                </svelte:fragment>
            </AccordionItem>
        </Accordion>

        <div class="text-left">
            <SlideToggle class="" bind:checked={firstRowHasHeaders} active="bg-primary-500">
                First row contains headers
            </SlideToggle>
        </div>

        <table class="table-auto">
            <thead>
                <tr>
                    {#each parsedData?.meta?.fields || [] as fieldName, fieldNameIndex}
                        <th class="p-2">
                            <select class="select" id={`field-${fieldNameIndex}`}>
                                {#each mapFields as mapFieldName}
                                    <option value={mapFieldName}>{mapFieldName}</option>
                                {/each}
                            </select>
                        </th>
                    {/each}
                </tr>
                <tr>
                    {#each parsedData?.meta?.fields || [] as fieldName}
                        <th class="p-2">{fieldName}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each parsedData?.data || [] as line, lineIndex}
                    <tr class:bg-red-600={parsedData.errors.find((err) => err.row === lineIndex)}>
                        {#each parsedData?.meta?.fields || [] as fieldName}
                            <td class="p-2">{line[fieldName]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="text-right p-2" hidden={!showImportStatus}>
            Import progress: {importIndex + 1} / {parsedData.data.length + 1}
        </div>

        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <button type="button" class="btn variant-ghost-surface" on:click={handleCancel}>
                Cancel
            </button>

            <button
                disabled={false}
                type="button"
                class="btn variant-filled-primary"
                on:click={handleImport}
            >
                Import
            </button>
        </div>
    {:else}
        <h3 class="h3">You shouldn't be here</h3>
    {/if}
</section>
