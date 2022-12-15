<script>
	export let isAuthenticated = false;
</script>

{#if isAuthenticated}
<span>Yep</span>
{:else}
<a href="/login">Log In / Register</a>
{/if}
