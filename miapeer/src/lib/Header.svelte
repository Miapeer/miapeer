<script>
	import { page } from '$app/stores';
	import logoLong from '$lib/images/miapeer-logo-long.svg';
	import LogInButton from '../routes/login/LogInButton.svelte';
	import LogOutButton from '../routes/logout/LogOutButton.svelte';

	export let isAuthenticated;
	export let userName;
</script>

<header>
	<a href="/"><img src={logoLong} class="logo-img long" alt="Logo" /></a>

	<a href="/quantum">Quantum</a>
	<a href="/users">User Management</a>

	<!-- TODO: Figure out how to get slots in here later, because it isn't possible right now -->
	<!-- https://github.com/sveltejs/kit/issues/627#issuecomment-774809401 -->

	<i class="bi bi-person-square"></i>

	{#if isAuthenticated}
		<LogOutButton userName={userName} />
	{:else}
		<LogInButton />
	{/if}
</header>

<style>
	header {
		background-color: rgba(var(--bs-body-bg-rgb), 0.95);
		box-shadow: 0 0 10px rgb(0 0 0 / 30%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1em;
		position: fixed;
		left: 0px;
		right: 0px;
		top: 0px;
		height: var(--header-height);
		max-height: var(--header-height);
		text-transform: uppercase;
		z-index: 999;
	}

	.logo-img {
		background-color: var(--bs-emphasis-color);
		border: 1px solid black;
		border-radius: 10px;
		height: 3rem;
		padding: 0.5rem;
	}
</style>
