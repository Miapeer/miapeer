<script type="typescript">
	import 'bootstrap-icons/font/bootstrap-icons.scss';

	import './styles.css';

	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	
	import type {LayoutData} from './$types';
    export let data: LayoutData;
</script>

<svelte:head>
	<meta name="description" content="Welcome to Miapeer, the home of Quantum. How can I be of assistance?" />
    <meta name="author" content="Jeffery Navarra">
	<meta name="mobile-web-app-capable" content="yes">

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700%7CMontserrat:400,700%7CRaleway:300,400,600" />
</svelte:head>

<div class="app">
	<Header isAuthenticated={data.isAuthenticated} userName={data.userName} />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: var(--header-height) auto var(--footer-height) auto;
	}
</style>
