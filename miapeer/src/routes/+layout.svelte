<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';

	import 'font-awesome/css/font-awesome.min.css'

    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<svelte:head>
	<meta name="description" content="Welcome to Miapeer, the home of Quantum. How can I be of assistance?" />
    <meta name="author" content="Jeffery Navarra">
	<meta name="mobile-web-app-capable" content="yes">

	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="src/routes/smui.css" />
	<!-- <link rel="stylesheet" href="src/routes/smui.css" media="(prefers-color-scheme: light)" /> -->
	<!-- <link rel="stylesheet" href="src/routes/smui-dark.css" media="screen and (prefers-color-scheme: dark)" /> -->
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700%7CMontserrat:400,700%7CRaleway:300,400,600" rel="stylesheet">
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
