<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
</script>

<svelte:head>
	<meta name="description" content="Welcome to Miapeer, the home of Quantum. How can I be of assistance?" />
    <meta name="author" content="Jeffery Navarra">
	<meta name="mobile-web-app-capable" content="yes">

    <!-- 
	<link rel="icon" sizes="196x196" href="~/images/chrome-touch-icon-196x196.png">

    <meta name="msapplication-TileImage" content="~/images/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#202429">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Miapeer">

    <link rel="apple-touch-icon" href="~/images/touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="~/images/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="~/images/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="~/images/touch-icon-ipad-retina.png">
    <link rel="apple-touch-icon" sizes="180x180" href="~/images/touch-icon-iphone-6plus.png">
	-->

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
        border: 3px solid red;
	}
</style>




<!-- 

<head>
    @Styles.Render("~/Styles")

    @RenderSection("InitialScripts", required: false)
</head>
<body>
    <div id="wrapper" @*class="animsition"*@>
        @*@Html.Partial("../Controls/TopBar")*@

        @*@Html.Partial("../Controls/SideBar")*@

        @Html.Partial("../Controls/Header")

        @RenderBody()

        @Html.Partial("../Controls/Footer")
    </div>
    <div class="check-media"></div>

    @Scripts.Render("~/Scripts")
    <script src="~/signalr/hubs"></script>
    <script type="text/javascript">
        var auth0 = new Auth0('@ConfigurationManager.AppSettings["auth0:ClientId"]', '@ConfigurationManager.AppSettings["auth0:Domain"]');
    </script>

    @RenderSection("FinalScripts", required: false)
</body>
</html> -->