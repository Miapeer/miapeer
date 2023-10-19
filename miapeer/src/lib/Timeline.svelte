<script>
    export let data = [];

    data = data.sort((left, right) => {
        const leftVal = left.start.year * 100 + left.start.month;
        const rightVal = right.start.year * 100 + right.start.month;
        return leftVal - rightVal;
    });

    const lefts = data.filter((x) => {
        return x.side === 'left';
    });

    const rights = data.filter((x) => {
        return x.side === 'right';
    });

    const min = data[0];
    const currentDate = new Date();
    const compiledData = [];
    let left = null;
    let right = null;
    for (let year = min.start.year; year <= currentDate.getFullYear(); year++) {
        const startMonth = year == min.start.year ? min.start.month : 1;
        const endMonth = year == currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;

        for (let month = startMonth; month <= endMonth; month++) {
            const loopDate = new Date(year, month - 1);

            const finalDate =
                year == currentDate.getFullYear() && month - 1 == currentDate.getMonth();

            const leftStarted =
                lefts.length > 0 && lefts[0].start.year === year && lefts[0].start.month === month;
            const leftEnded =
                left &&
                ((left.end && left.end.year === year && left.end.month === month) ||
                    (!left.end && finalDate));
            if (leftEnded) {
                left = null;
            }
            const leftContinued = left && !leftEnded;
            if (leftStarted) {
                left = lefts.shift();
            }

            const rightStarted =
                rights.length > 0 &&
                rights[0].start.year === year &&
                rights[0].start.month === month;
            const rightEnded =
                right &&
                ((right.end && right.end.year === year && right.end.month === month) ||
                    (!right.end && finalDate));
            if (rightEnded) {
                right = null;
            }
            const rightContinued = right && !rightEnded;
            if (rightStarted) {
                right = rights.shift();
            }

            compiledData.push({
                leftStarted,
                leftContinued,
                leftEnded,
                rightStarted,
                rightContinued,
                rightEnded,
                finalDate,
                text: (leftStarted && left.text) || (rightStarted && right.text) || null,
                date: loopDate
            });
        }
    }

    compiledData.reverse();
</script>

<div class="timeline-wrapper">
    {#each compiledData as item}
        {#if item.leftStarted}
            <div><div class="left-text">{item.text}</div></div>
            <div>
                <div class="left-start" />
                {#if item.leftEnded}
                    <div class="left-end" />
                {/if}
            </div>
        {:else if item.leftContinued}
            <div />
            <div><div class="left-continued" /></div>
        {:else if item.leftEnded}
            <div />
            <div><div class="left-end" /></div>
        {:else}
            <div />
            <div />
        {/if}

        {#if item.leftStarted || item.rightStarted || item.leftEnded || item.rightEnded}
            <div>
                <div class="dot" />
            </div>
        {:else}
            <div><div class="middle-spacer" /></div>
        {/if}

        {#if item.rightStarted}
            <div><div class="right-start" /></div>
            <div>
                <div class="right-text">{item.text}</div>
                {#if item.rightEnded}
                    <div class="right-end" />
                {/if}
            </div>
        {:else if item.rightContinued}
            <div><div class="right-continued" /></div>
            <div />
        {:else if item.rightEnded}
            <div><div class="right-end" /></div>
            <div />
        {:else}
            <div />
            <div />
        {/if}

        <div />

        {#if item.leftStarted || item.rightStarted || item.leftEnded || item.rightEnded}
            {#if item.finalDate}
                <div class="date">Present</div>
            {:else}
                <div class="date">
                    {item.date.toLocaleString('default', { month: 'long' })}
                    {item.date.getFullYear()}
                </div>
            {/if}
        {:else}
            <div />
        {/if}
    {/each}
</div>

<style lang="scss">
    .timeline-wrapper {
        --nom-size: 8px;
        --timeline-font-size: 0.65em;
        --date-font-size: 0.8em;

        display: grid;
        grid-template-columns:
            calc(var(--nom-size) * 5) auto auto auto calc(var(--nom-size) * 5) calc(
                var(--nom-size) * 3
            )
            1fr;

        .dot {
            height: calc(var(--nom-size) * 2);
            width: calc(var(--nom-size) * 2);
            border-radius: 50%;
            border: 3px solid rgba(var(--text-accent-rgb), 0.7);
        }

        .middle-spacer {
            height: calc(var(--nom-size) / 2);
            width: var(--nom-size);
            border-right: 1px solid rgba(var(--text-accent-rgb), 0.7);
        }

        .left-text,
        .right-text {
            white-space: nowrap;
            transform: rotate(-90deg);
            text-indent: calc(var(--nom-size) * 3);
            font-size: var(--timeline-font-size);
        }

        .left-start,
        .left-end,
        .right-start,
        .right-end {
            height: var(--nom-size);
            width: calc(var(--nom-size) * 2);
        }

        .left-start {
            border-bottom-left-radius: var(--nom-size);
            border-bottom: 1px solid var(--text-primary);
            border-left: 1px solid var(--text-primary);
        }

        .left-continued {
            height: 100%;
            border-left: 1px solid var(--text-primary);
        }

        .left-end {
            border-top-left-radius: var(--nom-size);
            border-top: 1px solid var(--text-primary);
            border-left: 1px solid var(--text-primary);
            margin-top: var(--nom-size);
        }

        .left-start + .left-end,
        .right-start + .right-end {
            margin-top: 0;
        }

        .right-start {
            border-bottom-right-radius: var(--nom-size);
            border-bottom: 1px solid var(--text-primary);
            border-right: 1px solid var(--text-primary);
        }

        .right-continued {
            height: 100%;
            border-right: 1px solid var(--text-primary);
        }

        .right-end {
            border-top-right-radius: var(--nom-size);
            border-top: 1px solid var(--text-primary);
            border-right: 1px solid var(--text-primary);
            margin-top: var(--nom-size);
        }

        .date {
            font-size: var(--date-font-size);
        }
    }
</style>
