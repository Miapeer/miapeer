<script>
    import { goto } from '$app/navigation';
    import { onMount} from 'svelte';
    // import { apiToken, isAuthenticated } from './stores'
</script>

<form method="POST">
    <h1>Sign In</h1>

    <div>
        <label>
            Email
            <input name="email" type="email" />
        </label>
        <label>
            Password
            <input name="password" type="password" />
        </label>

      <button>Log in</button>
    </div>
</form>