<script>
    export let application;
</script>

<a href={application.url} class="card">
    <i class={`icon ${application.icon}`} />
    <div class="name">{application.name}</div>
    <div class="description">{@html application.description}</div>
</a>

<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(var(--bg-primary-negative-rgb), 0.1);
        box-sizing: border-box;
        padding: 1.5rem;
        width: 20rem;
        height: 30rem;
        border-radius: 10px;
        transition: background-color 0.5s;
    }

    .card:hover {
        background-color: rgba(var(--bg-primary-negative-rgb), 0.5);
    }

    .card > * {
        text-transform: none;
        transition: color 0.5s;
    }

    .card .icon {
        border-radius: 100%;
        background-color: var(--bg-secondary);
        font-size: 3rem;
        text-align: center;
        line-height: 4rem;
        height: 4rem;
        width: 4rem;
    }

    .card > .name {
        font-size: 2rem;
        font-weight: bold;
        padding: 2rem 0rem;
    }

    .card > .description {
        font-size: 1.5rem;
    }

    @media (max-width: 640px) {
        .card {
            height: initial;
            width: 100%;
            margin-top: 1rem;
        }

        .card:first-child {
            margin-top: 0rem;
        }
    }
</style>
