<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { NAV, OS_REPO, ISSUES } from '$lib/nav.js';
	import Icon from '$lib/Icon.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	let { children } = $props();
	const active = (href) => $page.url.pathname === href;
</script>

<a class="skip" href="#main">Skip to content</a>

<!-- The bar runs edge to edge along the top, at bar-height, the way the
     shell's own bar sits on the desktop: glass over what scrolls beneath. -->
<header>
	<div class="bar">
		<a class="mark" href="/">
			<img class="logo-on-dark" src="/ewe-logo.png" alt="" width="26" height="26" /><img class="logo-on-light" src="/ewe-logo-light.png" alt="" width="26" height="26" />
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
			<ThemeToggle />
			<a class="btn primary sm" href="/download/" aria-label="Download"><Icon name="download" size={15} /> <span class="dl-label">Download</span></a>
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
				<img class="logo-on-dark" src="/ewe-logo.png" alt="" width="26" height="26" /><img class="logo-on-light" src="/ewe-logo-light.png" alt="" width="26" height="26" />
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
				<a href="/design/">Design system</a>
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
		left: var(--space-md);
		top: var(--space-s);
		z-index: 10;
		background: var(--surface-overlay);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--primary);
		padding: var(--space-xs) calc(var(--space-s) + var(--space-xs));
		text-decoration: none;
	}

	/* ── the bar ─────────────────────────────────────────────────────── */
	header {
		position: sticky;
		top: 0;
		z-index: 5;
		height: var(--header-h);
		background: var(--glass-base);
		border-bottom: var(--border-width-1) solid var(--glass-border);
		backdrop-filter: blur(var(--blur-glass));
		-webkit-backdrop-filter: blur(var(--blur-glass));
	}
	.bar {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		height: 100%;
		max-width: var(--page-wide);
		margin-inline: auto;
		padding-inline: var(--space-md);
	}

	.mark {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		text-decoration: none;
		color: var(--text-primary);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
		font-weight: var(--font-weight-semibold);
		flex: none;
	}
	.mark img {
		width: var(--icon-xl);
		height: var(--icon-xl);
	}

	.links {
		display: flex;
		gap: var(--space-xs);
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.links::-webkit-scrollbar {
		display: none;
	}
	.links a,
	.gh {
		display: inline-flex;
		align-items: center;
		height: var(--control-lg);
		padding: 0 calc(var(--space-s) + var(--space-xs));
		border-radius: var(--primary);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		white-space: nowrap;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	.links a:hover,
	.gh:hover {
		background: var(--glass-hover);
		color: var(--text-primary);
	}
	.links a:active,
	.gh:active {
		background: var(--glass-pressed);
	}
	.links a.active {
		background: var(--accent-subtle);
		color: var(--text-primary);
	}

	.right {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		margin-left: auto;
		flex: none;
	}
	.sm {
		height: var(--control-lg);
		padding: 0 calc(var(--space-s) + var(--space-xs));
		font-size: var(--font-size-md);
	}

	/* the nav scrolls rather than wraps on narrow screens */
	@media (max-width: 760px) {
		.gh {
			display: none;
		}
		.bar {
			gap: var(--space-s);
			padding-inline: var(--space-s);
		}
	}
	/* Phones: the nav gets a row of its own under the mark, so every page
	   stays one tap away; Download keeps its glyph. --header-h follows
	   (app.css) so sticky offsets below still line up. */
	@media (max-width: 600px) {
		.bar {
			flex-wrap: wrap;
			align-content: center;
			row-gap: var(--space-xs);
		}
		.links {
			order: 3;
			flex: 1 0 100%;
			justify-content: space-between;
		}
		.links a {
			padding-inline: var(--space-s);
		}
	}
	@media (max-width: 520px) {
		.dl-label {
			display: none;
		}
		.sm {
			width: var(--control-lg);
			padding: 0;
			justify-content: center;
		}
	}

	/* ── footer ──────────────────────────────────────────────────────── */
	footer {
		margin-top: calc(2 * var(--space-md));
		border-top: var(--border-width-1) solid var(--border-subtle);
		padding-block: var(--space-md) var(--space-lg);
		background: var(--surface-raised);
	}
	.foot {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
		gap: var(--space-lg);
	}
	.brand p {
		margin-top: var(--space-s);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-muted);
		max-width: 22rem;
	}
	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
	}
	.cols div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s);
	}
	.h {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		margin-bottom: var(--space-xxs);
	}
	.cols a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	.cols a:hover {
		color: var(--text-primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.legal {
		margin-top: var(--space-lg);
	}
	.legal p {
		padding-top: var(--space-md);
		border-top: var(--border-width-1) solid var(--border-subtle);
		max-width: none;
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
		color: var(--text-muted);
	}
	.legal a {
		color: var(--text-muted);
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
