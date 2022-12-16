<script>
	import { page } from '$app/stores';
	import logoLong from '$lib/images/miapeer-logo-long.svg';
	import LogInButton from './login/LogInButton.svelte';
	import LogOutButton from './logout/LogOutButton.svelte';

	export let isAuthenticated;
	export let userName;
</script>

<header>
	<a href="/"><img src={logoLong} class="logo-img long" alt="Logo" /></a>

	<nav>
		<ul>
			<li>
				{#if isAuthenticated}
					<LogOutButton userName={userName} />
				{:else}
					<LogInButton />
				{/if}
			</li>
		</ul>
	</nav>

</header>

<style>
	header {
		background-color: white;
		border-bottom: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1em;
		position: fixed;
		font-size: 1rem;
		left: 0px;
		right: 0px;
		top: 0px;
		height: var(--header-height);
		max-height: var(--header-height);
		z-index: 999;
	}

	.logo-img {
		background-color: var(--color-theme-accent);
		border: 1px solid black;
		border-radius: 10px;
		height: 2.5em;
		padding: 0.5em;
	}

	ul {
		list-style: none;
	}

</style>
