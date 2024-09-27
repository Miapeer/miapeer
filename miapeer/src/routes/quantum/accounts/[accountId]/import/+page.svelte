<script lang="ts">
    import QuantumPage from '../../../QuantumPage.svelte';
    import type { PageData } from './$types';
    import { goto, invalidateAll } from '$app/navigation';
    import { deserialize } from '$app/forms';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Papa from 'papaparse';
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

    const handleImport = async (event) => {
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

        const targetFormElement = event.currentTarget;

        showImportStatus = true;
        for (importIndex = 0; importIndex < parsedData.data.length; importIndex++) {
            let item = parsedData.data[importIndex];

            let transactionTypeName = item[mapping['Transaction Type']];

            let transactionType = data?.transactionTypes?.find(
                (tt) => tt.name === transactionTypeName
            );

            let checkNumber = item[mapping['Check Number']];

            let payeeName = item[mapping['Payee']];
            let payee = data.payees.find((p) => p.name === payeeName);

            let categoryName = item[mapping['Category']];
            let category = data.categories.find((c) => c.name === categoryName);

            let transactionDate = item[mapping['Transaction Date']];

            let clearDate = item[mapping['Clear Date']];

            let amount = item[mapping['Amount']];

            let notes = item[mapping['Notes']];

            const formData = new FormData(targetFormElement);
            formData.append('transactionDate', transactionDate);
            formData.append('clearDate', clearDate);
            formData.append('transactionTypeId', transactionType?.transaction_type_id || '');
            formData.append('transactionTypeName', transactionTypeName);
            formData.append('payeeId', payee?.payee_id || '');
            formData.append('payeeName', payeeName);
            formData.append('categoryId', category?.category_id || '');
            formData.append('categoryName', categoryName);
            formData.append('amount', amount);
            formData.append('checkNumber', checkNumber);
            formData.append('notes', notes);

            const response = await fetch(targetFormElement.action, {
                method: 'POST',
                body: formData
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = deserialize(await response.text());

            if (result.type === 'failure') {
                importErrors.set([...$importErrors, item]);
            }
        }
        showImportStatus = false;

        await invalidateAll();
        goto(`/quantum/accounts/${accountId}/transactions`);
    };
</script>

<QuantumPage pageTitle="Quantum: Import Data" headline="Import Data" {data}>
    {#if !data.transactions || data.transactions.length === 0}
        <form method="POST" on:submit|preventDefault={handleImport} action={`./transactions/new`}>
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
                <SlideToggle
                    name="firstRowHasHeaders"
                    bind:checked={firstRowHasHeaders}
                    active="bg-primary-500"
                >
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
                        <tr
                            class:bg-red-600={parsedData.errors.find(
                                (err) => err.row === lineIndex
                            )}
                        >
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
                <button
                    type="button"
                    class="btn variant-ghost-surface"
                    on:click={() =>
                        goto(`/quantum/accounts/${$page.params.accountId}/transactions`)}
                >
                    Cancel
                </button>

                <button type="submit" class="btn variant-filled-primary"> Import </button>
            </div>
        </form>
    {:else}
        <h3 class="h3">This account has transactions already. You shouldn't be here.</h3>
    {/if}
</QuantumPage>
