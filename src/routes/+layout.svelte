<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { NAV, REPO, RELEASES } from '$lib/nav.js';

	let { children } = $props();
	const active = (href) => $page.url.pathname === href;
</script>

<a class="skip" href="#main">Skip to content</a>

<header>
	<div class="bar wrap">
		<a class="mark" href="/">
			<img src="/ewe-logo.png" alt="" width="24" height="24" />
			<span>ewe</span>
		</a>

		<nav aria-label="Primary">
			{#each NAV as item}
				<a href={item.href} class:active={active(item.href)} aria-current={active(item.href) ? 'page' : undefined}>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="right">
			<a class="ghost" href={REPO}>GitHub</a>
			<a class="btn primary sm" href={RELEASES}>Download</a>
		</div>
	</div>
</header>

<main id="main">
	{@render children()}
</main>

<footer>
	<div class="wrap foot">
		<div>
			<strong>ewe</strong>
			<span class="muted"> — a clean, dark, complete desktop for Arch Linux.</span>
		</div>
		<nav aria-label="Footer">
			<a href="/docs/">Docs</a>
			<a href="/privacy/">Privacy</a>
			<a href={REPO}>Source</a>
			<a href="https://github.com/prj786/ewe/issues">Issues</a>
		</nav>
		<p class="muted lic">
			GPL-2.0-only · built on <a href="https://hypr.land">Hyprland</a> and
			<a href="https://quickshell.org">Quickshell</a> · no analytics, no cookies, no third-party requests.
		</p>
	</div>
</footer>

<style>
	.skip {
		position: absolute;
		left: -9999px;
	}
	.skip:focus {
		left: 1rem;
		top: 0.6rem;
		z-index: 10;
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-pill);
		padding: 0.4rem 0.8rem;
		text-decoration: none;
	}

	header {
		position: sticky;
		top: 0;
		z-index: 5;
		background: var(--bg);
		border-bottom: 1px solid var(--stroke);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		height: 56px;
	}

	.mark {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		font-weight: 500;
		letter-spacing: -0.01em;
		flex: none;
	}
	.mark img {
		opacity: 0.92;
	}

	nav {
		display: flex;
		gap: 1.1rem;
		flex: 1;
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}
	nav::-webkit-scrollbar {
		display: none;
	}
	nav a {
		color: var(--fg2);
		text-decoration: none;
		font-size: 0.93rem;
		white-space: nowrap;
		padding: 0.2rem 0;
		border-bottom: 1px solid transparent;
	}
	nav a:hover {
		color: var(--fg);
	}
	nav a.active {
		color: var(--fg);
		border-bottom-color: var(--accent);
	}
	/* the nav scrolls rather than wraps on narrow screens — tighten it first so
	   all four fit on a phone, and fade the edge when it genuinely overflows */
	@media (max-width: 560px) {
		.bar {
			gap: 0.9rem;
		}
		nav {
			gap: 0.75rem;
			mask-image: linear-gradient(to right, #000 88%, transparent);
		}
		nav a {
			font-size: 0.86rem;
		}
	}

	.right {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		flex: none;
	}
	.ghost {
		color: var(--fg2);
		text-decoration: none;
		font-size: 0.93rem;
	}
	.ghost:hover {
		color: var(--fg);
	}
	.sm {
		padding: 0.35rem 0.8rem;
		font-size: 0.87rem;
	}
	@media (max-width: 720px) {
		.ghost {
			display: none;
		}
	}
	@media (max-width: 520px) {
		.sm {
			display: none;
		}
	}

	footer {
		border-top: 1px solid var(--stroke);
		padding: 2.2rem 0 3rem;
		margin-top: 2rem;
	}
	.foot {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		font-size: 0.92rem;
	}
	.foot nav {
		display: flex;
		gap: 1.1rem;
		overflow: visible;
	}
	.foot nav a {
		color: var(--fg2);
		font-size: 0.92rem;
	}
	.lic {
		margin: 0;
		max-width: 46rem;
	}
	.lic a {
		color: var(--dim);
	}
</style>
