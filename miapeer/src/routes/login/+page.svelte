<script>
    import MiapeerPage from '../MiapeerPage.svelte';
    import { enhance } from '$app/forms';

    export let data;

    let email = '';
    let password = '';

    const gridRowDef = 'input-group input-group-divider grid-cols-[8rem_auto]';
</script>

<MiapeerPage pageTitle="Miapeer: Login" headline="Sign In" {data}>
    <form method="POST" use:enhance>
        <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
            <div class={gridRowDef}>
                <div class="input-group-shim">Email</div>
                <input type="text" name="email" bind:value={email} />
            </div>

            <div class={gridRowDef}>
                <div class="input-group-shim">Password</div>
                <input type="password" name="password" bind:value={password} />
            </div>

            <button disabled={!email || !password} type="submit" class="btn variant-filled-primary">
                Log In
            </button>
            <div>Don't have an account? <a class="anchor" href="/register">Register</a></div>
        </div>
    </form>
</MiapeerPage>
