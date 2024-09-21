<script>
    import MiapeerPage from '../MiapeerPage.svelte';
    import { enhance } from '$app/forms';

    export let data;

    let email = '';
    let password = '';
    let passwordConfirmation = '';

    $: passwordsMatch = password === passwordConfirmation;

    const gridRowDef = 'input-group input-group-divider grid-cols-[8rem_auto]';
</script>

<MiapeerPage pageTitle="Miapeer: Register" headline="Register" {data}>
    <form method="POST" use:enhance>
        <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
            <div class="{gridRowDef} mb-4">
                <div class="input-group-shim">Email</div>
                <input type="text" name="email" bind:value={email} />
            </div>

            <div class={gridRowDef}>
                <div class="input-group-shim">Password</div>
                <input
                    type="password"
                    name="password"
                    class:input-error={!passwordsMatch}
                    bind:value={password}
                />
            </div>

            <div class={gridRowDef}>
                <div class="input-group-shim">Confirm</div>
                <input
                    type="password"
                    class:input-error={!passwordsMatch}
                    bind:value={passwordConfirmation}
                />
            </div>

            <button
                disabled={!email || !password || !passwordsMatch}
                type="submit"
                class="btn variant-filled-primary"
            >
                Register
            </button>
        </div>
    </form>
</MiapeerPage>
