<script>
    export let application;
</script>

<a href={application.url} class="card">
    <div class="icon">
        <i class={application.icon}></i>
    </div>
    <div class="name">{application.name}</div>
    <div class="description">{@html application.description}</div>
</a>

<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        width: 20rem;
        height: 30rem;
        border-radius: 10px;
        transition: background-color 0.5s;
    }

    .card:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .card > * {
        text-transform: none;
        transition: color 0.5s;
    }

    .card > .icon {
        border-radius: 100%;
        background-color: var(--color-theme-dark);
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card > .icon > i {
        font-size: 3rem;
        color: var(--color-text-light);
    }

    .card:hover > .icon > i {
        color: var(--color-text-accent);
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
