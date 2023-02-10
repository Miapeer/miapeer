<script>
    import TextField from '$lib/TextField.svelte';
    import Button from '$lib/Button.svelte';
    import { goto, invalidateAll } from '$app/navigation';

    let email = '';
    let password = '';
    let loggingIn = false;

    const handleLogin = async () => {
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
            console.log('NOT ok');
        }
    };
</script>

<div class="wrapper">
    <div class="form">
        <h1>Sign In</h1>

        <TextField placeholder={'Email'} bind:value={email} />

        <TextField type="password" placeholder={'Password'} bind:value={password} />

        <Button disabled={!email || !password} waiting={loggingIn} onClick={handleLogin}>
            Log In
        </Button>
    </div>
</div>

<style>
    .wrapper {
        padding: 0 2rem;
        display: grid;
        justify-content: center;
    }

    .form {
        display: grid;
        row-gap: 1rem;
        width: 100vw;
        max-width: 500px;
    }
</style>
