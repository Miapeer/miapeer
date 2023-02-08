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

<form>
    <h1>Sign In</h1>

    <div>
        <TextField placeholder={'Email'} bind:value={email} />
    </div>

    <div>
        <TextField type="password" placeholder={'Password'} bind:value={password} />
    </div>

    <Button disabled={!email || !password} waiting={loggingIn} onClick={handleLogin}>Log In</Button>
</form>

<style>
    form {
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
    }
</style>
