<script>
    import MiapeerPage from '../MiapeerPage.svelte';

    const MINUTES_PER_HOUR = 60;

    let selectedDrugRate = null;
    let selectedDrugRateUnit = 'mg_hr';
    $: convertedDrugRate = (() => {
        if (selectedDrugRate === null) {
            return '';
        }

        let calculatedRate = selectedDrugRate;

        if (selectedDrugRateUnit === 'mg_min') {
            calculatedRate = selectedDrugRate * MINUTES_PER_HOUR;
        }

        return calculatedRate;
    })();
    $: convertedDrugRateString = convertedDrugRate
        ? `${convertedDrugRate.toLocaleString('en')} mg/hr`
        : '';

    let selectedDrugRateIncreaseIncrement = null;
    let selectedDrugRateIncreaseIncrementUnit = 'mg_hr';
    let selectedDrugRateIncreaseCadence = null;
    let selectedDrugRateIncreaseCadenceUnit = 'min';
    let selectedDrugRateMax = null;
    let selectedDrugRateMaxUnit = 'mg_hr';
    $: convertedDrugRateIncreaseIncrement = (() => {
        if (selectedDrugRateIncreaseIncrement === null) {
            return '';
        }

        let calculatedRateIncreaseIncrement = selectedDrugRateIncreaseIncrement;

        if (selectedDrugRateIncreaseIncrementUnit === 'mg_min') {
            calculatedRateIncreaseIncrement = selectedDrugRateIncreaseIncrement * MINUTES_PER_HOUR;
        }

        return calculatedRateIncreaseIncrement;
    })();
    $: convertedDrugRateIncreaseCadence = (() => {
        if (selectedDrugRateIncreaseCadence === null) {
            return '';
        }

        let calculatedRateIncreaseCadence = selectedDrugRateIncreaseCadence;

        if (selectedDrugRateIncreaseCadenceUnit === 'hr') {
            calculatedRateIncreaseCadence = selectedDrugRateIncreaseCadence * MINUTES_PER_HOUR;
        }

        return calculatedRateIncreaseCadence;
    })();
    $: convertedDrugRateMax = (() => {
        if (selectedDrugRateMax === null) {
            return '';
        }

        let calculatedRateMax = selectedDrugRateMax;

        if (selectedDrugRateMaxUnit === 'mg_min') {
            calculatedRateMax = selectedDrugRateMax * MINUTES_PER_HOUR;
        }

        return calculatedRateMax;
    })();
    $: convertedDrugRateIncreaseString =
        convertedDrugRateIncreaseIncrement &&
        convertedDrugRateIncreaseCadence &&
        convertedDrugRateMax
            ? `Increase ${convertedDrugRateIncreaseIncrement.toLocaleString('en')} mg/hr every ${convertedDrugRateIncreaseCadence.toLocaleString('en')} min - ${convertedDrugRateMax.toLocaleString('en')} mg/hr max`
            : '';

    let selectedVolumeDose = null;
    let selectedVolumeDoseUnit = 'mg';
    let selectedVolumeTotal = null;
    let selectedVolumeTotalUnit = 'ml';
    $: calculatedConcentration = selectedVolumeTotal
        ? (selectedVolumeDose || 0) / selectedVolumeTotal
        : 0;
    $: calculatedConcentrationString = calculatedConcentration
        ? `${calculatedConcentration.toFixed(1)} mg/ml`
        : '';

    $: calculatedStages = (() => {
        if (
            !convertedDrugRate ||
            !convertedDrugRateIncreaseIncrement ||
            !convertedDrugRateIncreaseCadence ||
            !selectedDrugRateMax ||
            !selectedVolumeTotal ||
            !selectedVolumeDose
        ) {
            return [];
        }

        let stages = [];

        let stageRate = Math.round(convertedDrugRate / calculatedConcentration);

        let totalVolume = 0;
        let totalMinutes = 0;
        let stageIndex = 0;
        while (
            stageRate * calculatedConcentration <= selectedDrugRateMax &&
            totalVolume < selectedVolumeDose
        ) {
            if (stageRate === 0) {
                return stages;
            }

            let stageVolume = Math.round(
                stageRate * (convertedDrugRateIncreaseCadence / MINUTES_PER_HOUR)
            );
            let stageMinutes = convertedDrugRateIncreaseCadence;
            let nextStageRate = Math.round(
                convertedDrugRateIncreaseIncrement / calculatedConcentration
            );

            if (
                nextStageRate * calculatedConcentration > selectedDrugRateMax ||
                totalVolume + stageVolume >= selectedVolumeDose
            ) {
                stageVolume = Math.round(
                    (selectedVolumeDose - totalVolume) / calculatedConcentration
                );
                stageMinutes = Math.round(
                    (stageVolume / calculatedConcentration / stageRate) * MINUTES_PER_HOUR
                );
            }

            totalVolume += stageVolume;
            totalMinutes += stageMinutes;
            stageIndex += 1;
            stages.push(
                `<span>Stage ${stageIndex}</span><span>${stageRate} ml/hr</span><span>${stageMinutes} min</span><span>${stageVolume} ml</span><span>Total vol: ${totalVolume} ml</span>`
            );
            stageRate += nextStageRate;
        }

        stages.push(
            `<span class="col-span-4">Total time: ${totalMinutes} min (~${(totalMinutes / MINUTES_PER_HOUR).toFixed(1)} hr)</span>`
        );

        return stages;
    })();

    const gridDef = 'grid-cols-[10rem_minmax(100px,_1fr)_7.5rem]';
</script>

<MiapeerPage pageTitle="Miapeer: Pump" headline="Pump Programming" data={{}}>
    <div class="grid gap-4 max-w-full md:max-w-2xl my-0 mx-auto pt-4">
        <h2 class="h2">Drug Rate</h2>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Rate</div>
            <input type="number" class="input border-none" bind:value={selectedDrugRate} />

            <select class="input-group-shim" bind:value={selectedDrugRateUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div>{convertedDrugRateString}</div>

        <h2 class="h2">Rate Increase Increment</h2>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Rate</div>
            <input
                type="number"
                class="input border-none"
                bind:value={selectedDrugRateIncreaseIncrement}
            />

            <select class="input-group-shim" bind:value={selectedDrugRateIncreaseIncrementUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Cadence</div>
            <input
                type="number"
                class="input border-none"
                bind:value={selectedDrugRateIncreaseCadence}
            />

            <select class="input-group-shim" bind:value={selectedDrugRateIncreaseCadenceUnit}>
                <option value="hr">hr</option>
                <option value="min">min</option>
            </select>
        </div>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Max Rate</div>
            <input type="number" class="input border-none" bind:value={selectedDrugRateMax} />

            <select class="input-group-shim" bind:value={selectedDrugRateMaxUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div>{convertedDrugRateIncreaseString}</div>

        <h2 class="h2">Concentration</h2>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Dose</div>
            <input type="number" class="input border-none" bind:value={selectedVolumeDose} />

            <select class="input-group-shim" bind:value={selectedVolumeDoseUnit}>
                <option value="mg">mg</option>
            </select>
        </div>
        <div class={`input-group input-group-divider ${gridDef}`}>
            <div class="input-group-shim">Total Volume</div>
            <input type="number" class="input border-none" bind:value={selectedVolumeTotal} />

            <select class="input-group-shim" bind:value={selectedVolumeTotalUnit}>
                <option value="ml">ml</option>
            </select>
        </div>
        <div>{calculatedConcentrationString}</div>

        <h2 class="h2">Pump Stages</h2>
        <div class="grid grid-cols-[5rem_1fr_1fr_1fr_2fr] gap-4">
            {#each calculatedStages as stage}
                {@html stage}
            {/each}
        </div>
    </div>
</MiapeerPage>

<style lang="css">
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
</style>
