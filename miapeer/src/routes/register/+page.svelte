<script>
    import { goto, invalidateAll } from '$app/navigation';
    import MiapeerPage from '../MiapeerPage.svelte';

    export let data;
    export let form;

    let email = '';
    let password = '';
    let passwordConfirmation = '';

    let registering = false;

    $: passwordsMatch = password === passwordConfirmation;

    const handleRegister = async () => {
        if (!email || !password || !passwordsMatch) {
            return;
        }

        registering = true;

        const requestData = { email, password };
        const res = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (res.ok) {
            const data = await res.json();
            invalidateAll();
            goto(data.redirectUrl ?? '/');
        } else {
            console.error('NOT ok');
            console.error(res.status);
            console.error(res.statusText);
            console.error(await res.text());
        }
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[8rem_auto]';
</script>

<MiapeerPage pageTitle="Miapeer: Register" headline="Register" {data}>
    <form method="POST">
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

            <!-- <button
                disabled={!email || !password || !passwordsMatch}
                type="button"
                class="btn variant-filled-primary"
                on:click={handleRegister}
            >
                Register
            </button> -->

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
