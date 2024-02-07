<script>
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';
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
    <h1>Sign In</h1>

    <TextField placeholder={'Email'} bind:value={email} onKeyPress={handleKeyPress} />

    <TextField
        type="password"
        placeholder={'Password'}
        bind:value={password}
        onKeyPress={handleKeyPress}
    />

    <Button
        fullWidth={true}
        disabled={!email || !password}
        waiting={loggingIn}
        onClick={handleLogin}
    >
        Log In
    </Button>
</div>

<style>
    .login-form {
        display: grid;
        gap: 1em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>
