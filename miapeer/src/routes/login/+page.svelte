<script>
    import { goto, invalidateAll } from '$app/navigation';
    import MiapeerPage from '../MiapeerPage.svelte';

    export let data;

    let email = '';
    let password = '';
    let loggingIn = false;

    const handleLogin = async () => {
        if (!email || !password) {
            return;
        }

        loggingIn = true;

        const requestData = { email, password };
        const res = await fetch('/login', {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const gridRowDef = 'input-group input-group-divider grid-cols-[8rem_auto]';
</script>

<MiapeerPage pageTitle="Miapeer: Login" headline="Sign In" {data}>
    <div class="grid gap-4 max-w-2xl my-0 mx-auto pt-4">
        <div class={gridRowDef}>
            <div class="input-group-shim">Email</div>
            <input type="text" bind:value={email} on:keypress={handleKeyPress} />
        </div>

        <div class={gridRowDef}>
            <div class="input-group-shim">Password</div>
            <input type="password" bind:value={password} on:keypress={handleKeyPress} />
        </div>

        <button
            disabled={!email || !password}
            type="button"
            class="btn variant-filled-primary"
            on:click={handleLogin}
        >
            Log In
        </button>
        <div>Don't have an account? <a class="anchor" href="/register">Register</a></div>
    </div>
</MiapeerPage>
