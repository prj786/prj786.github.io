<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { NAV, OS_REPO, ISSUES } from '$lib/nav.js';
	import Icon from '$lib/Icon.svelte';

	let { children } = $props();
	const active = (href) => $page.url.pathname === href;
</script>

<a class="skip" href="#main">Skip to content</a>

<!-- The bar floats, the way the shell's own bar sits on the desktop: a glass
     capsule over the page rather than a band across it. -->
<header>
	<div class="bar">
		<a class="mark" href="/">
			<img src="/ewe-logo.png" alt="" width="26" height="26" />
			<span>ewe</span>
		</a>

		<nav class="links" aria-label="Primary">
			{#each NAV as item}
				<a href={item.href} class:active={active(item.href)} aria-current={active(item.href) ? 'page' : undefined}>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="right">
			<a class="gh" href={OS_REPO}>GitHub</a>
			<a class="btn primary sm" href="/download/"><Icon name="download" size={15} /> Download</a>
		</div>
	</div>
</header>

<main id="main">
	{@render children()}
</main>

<footer>
	<div class="wrap wide foot">
		<div class="brand">
			<a class="mark" href="/">
				<img src="/ewe-logo.png" alt="" width="26" height="26" />
				<span>ewe</span>
			</a>
			<p>A complete, Arch-based operating system — decided, so you don't have to.</p>
		</div>
		<nav class="cols" aria-label="Footer">
			<div>
				<p class="h">Get it</p>
				<a href="/download/">Download</a>
				<a href="/features/">Features</a>
				<a href="/theming/">Theming</a>
				<a href="/how/">How it works</a>
			</div>
			<div>
				<p class="h">Docs</p>
				<a href="/docs/">Overview</a>
				<a href="/docs/install/">Install</a>
				<a href="/docs/shortcuts/">Shortcuts</a>
				<a href="/docs/troubleshooting/">Troubleshooting</a>
			</div>
			<div>
				<p class="h">Project</p>
				<a href={OS_REPO}>Source</a>
				<a href={ISSUES}>Issues</a>
				<a href="/privacy/">Privacy</a>
			</div>
		</nav>
	</div>
	<div class="wrap wide legal">
		<p>
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
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-pill);
		padding: 0.4rem 0.9rem;
		text-decoration: none;
	}

	/* ── the floating bar ────────────────────────────────────────────── */
	header {
		position: sticky;
		top: 0;
		z-index: 5;
		height: var(--header-h);
		padding: 0.75rem 1rem 0;
		/* the header box is only air: let clicks through to the page beside
		   the capsule, and take them back on the capsule itself */
		pointer-events: none;
	}
	.bar {
		pointer-events: auto;
		display: flex;
		align-items: center;
		gap: 1rem;
		width: fit-content;
		max-width: 100%;
		height: 52px;
		margin-inline: auto;
		padding: 0 0.4rem 0 1rem;
		border-radius: var(--radius-pill);
		background: color-mix(in srgb, var(--bg-2) 72%, transparent);
		border: var(--stroke-width) solid var(--stroke-2);
		backdrop-filter: blur(20px) saturate(1.5);
		-webkit-backdrop-filter: blur(20px) saturate(1.5);
		box-shadow: var(--elevation);
	}

	.mark {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		font-weight: 650;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
		flex: none;
	}
	.mark img {
		opacity: 0.94;
	}

	.links {
		display: flex;
		gap: 0.1rem;
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.links::-webkit-scrollbar {
		display: none;
	}
	.links a,
	.gh {
		color: var(--fg-2);
		text-decoration: none;
		font-size: 0.92rem;
		white-space: nowrap;
		padding: 0.4rem 0.8rem;
		border-radius: var(--radius-pill);
		transition:
			background 140ms ease,
			color 140ms ease;
	}
	.links a:hover,
	.gh:hover {
		background: var(--subtle-hover);
		color: var(--fg-1);
	}
	.links a.active {
		background: var(--subtle-selected);
		color: var(--fg-1);
	}

	.right {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		flex: none;
	}
	.sm {
		padding: 0.45rem 0.95rem;
		font-size: 0.88rem;
	}

	/* the nav scrolls rather than wraps on narrow screens — tighten it first so
	   all four fit on a phone, and fade the edge when it genuinely overflows */
	@media (max-width: 720px) {
		.gh {
			display: none;
		}
	}
	@media (max-width: 600px) {
		header {
			padding-inline: 0.6rem;
		}
		.bar {
			width: 100%;
			gap: 0.5rem;
			padding-left: 0.85rem;
		}
		.links {
			flex: 1;
			mask-image: linear-gradient(to right, #000 88%, transparent);
		}
		.links a {
			font-size: 0.86rem;
			padding: 0.4rem 0.55rem;
		}
	}
	@media (max-width: 520px) {
		.sm {
			display: none;
		}
		.mark span {
			display: none;
		}
	}

	/* ── footer ──────────────────────────────────────────────────────── */
	footer {
		margin-top: 5rem;
		border-top: var(--stroke-width) solid var(--stroke-3);
		padding-block: 3.2rem 2.4rem;
		background: linear-gradient(to bottom, var(--bg-3), var(--bg-4));
	}
	.foot {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
		gap: 2.5rem;
	}
	.brand p {
		margin-top: 0.8rem;
		font-size: 0.93rem;
		color: var(--fg-3);
		max-width: 22rem;
	}
	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
	}
	.cols div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}
	.h {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-4);
		margin-bottom: 0.2rem;
	}
	.cols a {
		color: var(--fg-2);
		text-decoration: none;
		font-size: 0.93rem;
	}
	.cols a:hover {
		color: var(--fg-1);
	}
	.legal {
		margin-top: 2.6rem;
	}
	.legal p {
		padding-top: 1.4rem;
		border-top: var(--stroke-width) solid var(--stroke-3);
		max-width: none;
		font-size: 0.84rem;
		color: var(--fg-3);
	}
	.legal a {
		color: var(--fg-3);
	}
	@media (max-width: 760px) {
		.foot {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 420px) {
		.cols {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
