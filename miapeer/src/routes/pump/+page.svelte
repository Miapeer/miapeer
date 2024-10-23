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

        let stageRate = convertedDrugRate;

        let totalDose = 0;
        let totalMinutes = 0;
        let stageIndex = 0;
        while (stageRate <= selectedDrugRateMax && totalDose < selectedVolumeDose) {
            let stageDose = Math.round(
                stageRate *
                    calculatedConcentration *
                    (convertedDrugRateIncreaseCadence / MINUTES_PER_HOUR)
            );
            let stageMinutes = convertedDrugRateIncreaseCadence;

            if (
                stageRate + convertedDrugRateIncreaseIncrement > selectedDrugRateMax ||
                totalDose + stageDose >= selectedVolumeDose
            ) {
                stageDose = selectedVolumeDose - totalDose;
                stageMinutes = Math.round(
                    (stageDose / calculatedConcentration / stageRate) * MINUTES_PER_HOUR
                );
            }

            totalDose += stageDose;
            totalMinutes += stageMinutes;
            stageIndex += 1;
            stages.push(
                `<span>Stage ${stageIndex}</span><span>${stageRate} ml/hr for ${stageMinutes} min</span><span>Stage dose: ${stageDose} ml</span><span>Total dose: ${totalDose} ml</span>`
            );
            stageRate += convertedDrugRateIncreaseIncrement;
        }

        stages.push(
            `<span class="col-span-2">Total time: ${totalMinutes} min (${(totalMinutes / MINUTES_PER_HOUR).toFixed(1)} hr)</span>`
        );

        return stages;
    })();
</script>

<MiapeerPage pageTitle="Miapeer: Pump" headline="Pump Programming" data={{}}>
    <div class="grid gap-4 max-w-3xl my-0 mx-auto pt-4">
        <h2 class="h2">Drug Rate</h2>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Rate</div>
            <input type="number" bind:value={selectedDrugRate} />

            <select class="select" bind:value={selectedDrugRateUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div>{convertedDrugRateString}</div>

        <h2 class="h2">Rate Increase Increment</h2>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Rate</div>
            <input type="number" bind:value={selectedDrugRateIncreaseIncrement} />

            <select class="select" bind:value={selectedDrugRateIncreaseIncrementUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Cadence</div>
            <input type="number" bind:value={selectedDrugRateIncreaseCadence} />

            <select class="select" bind:value={selectedDrugRateIncreaseCadenceUnit}>
                <option value="hr">hr</option>
                <option value="min">min</option>
            </select>
        </div>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Max Rate</div>
            <input type="number" bind:value={selectedDrugRateMax} />

            <select class="select" bind:value={selectedDrugRateMaxUnit}>
                <option value="mg_hr">mg/hr</option>
                <option value="mg_min">mg/min</option>
            </select>
        </div>
        <div>{convertedDrugRateIncreaseString}</div>

        <h2 class="h2">Concentration</h2>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Dose</div>
            <input type="number" bind:value={selectedVolumeDose} />

            <select class="select" bind:value={selectedVolumeDoseUnit}>
                <option value="mg">mg</option>
            </select>
        </div>
        <div class="input-group input-group-divider grid-cols-[10rem_1fr_auto]">
            <div class="input-group-shim">Total Volume</div>
            <input type="number" bind:value={selectedVolumeTotal} />

            <select class="select" bind:value={selectedVolumeTotalUnit}>
                <option value="ml">ml</option>
            </select>
        </div>
        <div>{calculatedConcentrationString}</div>

        <h2 class="h2">Pump Stages</h2>
        <div class="grid grid-cols-[6rem_1fr_1fr_1fr] gap-4">
            {#each calculatedStages as stage}
                {@html stage}
            {/each}
        </div>
    </div>
</MiapeerPage>
