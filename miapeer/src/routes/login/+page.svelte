<script>
    import { goto, invalidateAll } from '$app/navigation';

    let email = '';
    let password = '';
    let loggingIn = false;

    const handleLogin = async () => {
        if (email === null || email === '' || password === null || password === '') {
            return;
        }

        loggingIn = true;

        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const data = await res.json();
            invalidateAll();
            goto(data.redirectUrl ?? '/');
        } else {
            console.error('NOT ok');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
</script>

<div class="login-form">
    <h1 class="h1">Sign In</h1>

    <div>
        <div class="input-group input-group-divider grid-cols-[1fr_5fr]">
            <div class="input-group-shim">Email</div>
            <input type="text" bind:value={email} on:keypress={handleKeyPress} />
        </div>
    </div>

    <div>
        <div class="input-group input-group-divider grid-cols-[1fr_5fr]">
            <div class="input-group-shim">Password</div>
            <input type="password" bind:value={password} on:keypress={handleKeyPress} />
        </div>
    </div>

    <button
        disabled={!email || !password}
        type="button"
        class="btn variant-filled-primary"
        on:click={handleLogin}>Log In</button
    >
</div>

<style>
    .login-form {
        display: grid;
        gap: 1em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>
