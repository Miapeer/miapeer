<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
</script>

<svelte:head>
	<meta name="description" content="Welcome to Miapeer, the home of Quantum. How can I be of assistance?" />
    <meta name="author" content="Jeffery Navarra">
	<meta name="mobile-web-app-capable" content="yes">

    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700%7CMontserrat:400,700%7CRaleway:300,400,600" rel="stylesheet">
</svelte:head>

<div class="app">
	<Header />

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
