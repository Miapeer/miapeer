<footer>
    <span>&copy; Copyright {(new Date()).getFullYear()} - <a href="/">Miapeer LLC</a></span>
    <span>Updated: zzz</span>
</footer>

<style>
    footer {
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1em;
        position: fixed;
        color: var(--color-text-light);
		font-size: 1rem;
        left: 0px;
        right: 0px;
        bottom: 0px;
		height: var(--footer-height);
		max-height: var(--footer-height);
		z-index: 999;
	}

	footer a {
		color: var(--color-text-light);
		font-weight: bold;
	}

	footer a:hover {
		color: var(--color-text-accent);
	}

	/* @media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>