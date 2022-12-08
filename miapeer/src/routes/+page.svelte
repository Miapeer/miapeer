<script>
	import { onMount } from 'svelte';

	import winterImage from '$lib/images/WinterMountains.jpg';
	import businessImage from '$lib/images/BusinessmanHouse.jpg';
	import roadImage from '$lib/images/CountryRoad.jpg';
	import snailImage from '$lib/images/ClimbingSnail.jpg';

	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

    let slideDuration = 10000;

    let hideSlide = Array(4).fill(true);
    let phaseOutSlide = Array(4).fill(false);

    onMount(() => {
        activateSlideOverlay(0);
    });
    
    const activateSlideOverlay = (slideNum) => {
        setTimeout(() => {
            hideSlide[slideNum] = false;
            setTimeout(() => {
                phaseOutSlide[slideNum] = true;
                setTimeout(() => {
                    hideSlide[slideNum] = true;
                    phaseOutSlide[slideNum] = false;
                }, 2000);
            }, slideDuration);
        }, 0);
    }
</script>

<svelte:head>
	<title>Miapeer: Home</title>
</svelte:head>

<section class="carousel">
	{#if browser}
        <div class="text-overlay">
            <div class:hidden="{hideSlide[0]}" class:phaseOut="{phaseOutSlide[0]}">
                <h1>Welcome to<br />Miapeer.com</h1>
                <div>Glad you could stop by</div>
            </div>
            <div class:hidden="{hideSlide[1]}" class:phaseOut="{phaseOutSlide[1]}">
                <h1>Cash-flow forecasting</h1>
                <h1>Budgeting</h1>
                <h1>and best of all, it's free</h1>
                <div>Take hold of your finances with Quantum</div>
            </div>
            <div class:hidden="{hideSlide[2]}" class:phaseOut="{phaseOutSlide[2]}">
				<div>Select an application below</div>
				<h1>What would you like to do?</h1>
				<div>If you don't already have access to an application</div>
				<div>you can request access</div>
			</div>
            <div class:hidden="{hideSlide[3]}" class:phaseOut="{phaseOutSlide[3]}">
				<div>This site is still under active development</div>
				<div>Please report any issues to jeff.navarra@miapeer.com</div>
				<h1>Pardon our dust</h1>
			</div>
        </div>
		<Carousel arrows={false} dots={false} autoplay autoplayDuration={slideDuration} autoplayProgressVisible on:pageChange={
            (event) => {
                activateSlideOverlay(event.detail);
            }
          }>
            <img src={winterImage} alt="Winter-mountain landscape" />
            <img src={businessImage} alt="Business-man leaning on a cartoon house" />
            <img src={roadImage} alt="Country landscape with road" />
            <img src={snailImage} alt="Snail climbing a plant" />
		</Carousel>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0;
	}

	.carousel img {
		width: 100%;
		height: 100%;
        filter: brightness(0.2);
	}

    .text-overlay > div{
        position: absolute;
        top: 100px;
        left: 100px;
        font-size: 2rem;
        color: var(--color-text-light);
        z-index: 1;
        transition: all 2s ease 0s;
    }

    .text-overlay .hidden {
        opacity: 0;
    }

    .text-overlay .phaseOut {
        opacity: 0;
        left: -800px;
    }
</style>
