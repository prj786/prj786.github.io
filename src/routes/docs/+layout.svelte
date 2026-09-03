<script>
	import { page } from '$app/stores';
	import { SECTIONS } from '$lib/docs/nav.js';

	let { children } = $props();
	const active = (href) => $page.url.pathname === href;
	// the group holding the current page, so the mobile summary can name it
	const here = $derived(
		SECTIONS.flatMap((s) => s.items).find((i) => i.href === $page.url.pathname)?.label ?? 'Docs'
	);

	// The nav ships OPEN: a closed <details> hides its content at every width,
	// which left the desktop column blank. On a phone we collapse it once the
	// page is live, and again after each navigation, so it behaves as a drawer
	// there while staying a plain sticky column with no JS on a desktop.
	let open = $state(true);
	const narrow = () =>
		typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
	$effect(() => {
		$page.url.pathname;
		if (narrow()) open = false;
	});
</script>

<div class="docs wrap wide">
	<!-- On a phone this is a closed <details>; from 900px up the summary is
	     hidden and the list becomes a sticky column of its own. -->
	<details class="side" bind:open>
		<summary>
			<span class="crumb">Docs / <strong>{here}</strong></span>
			<span class="chev" aria-hidden="true">▾</span>
		</summary>
		<nav aria-label="Documentation">
			<a class="home" href="/docs/" class:active={active('/docs/')}>Overview</a>
			{#each SECTIONS as section}
				<p class="group">{section.title}</p>
				<ul>
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class:active={active(item.href)}
								aria-current={active(item.href) ? 'page' : undefined}>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			{/each}
		</nav>
	</details>

	<article class="doc">
		{@render children()}
	</article>
</div>

<style>
	.docs {
		display: grid;
		grid-template-columns: 15rem minmax(0, 1fr);
		gap: 3rem;
		align-items: start;
		padding-block: 2.5rem 5rem;
	}

	.side {
		position: sticky;
		top: 56px; /* under the site bar */
		max-height: calc(100vh - 56px);
		overflow-y: auto;
		scrollbar-width: thin;
		padding: 1.2rem 0 2rem;
	}
	summary {
		display: none;
	}

	nav {
		display: block;
	}
	.group {
		font-size: 0.72rem;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--dim);
		margin: 1.5rem 0 0.5rem;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	li {
		margin: 0;
	}
	nav a {
		display: block;
		text-decoration: none;
		color: var(--fg2);
		font-size: 0.9rem;
		padding: 0.28rem 0.6rem;
		border-radius: var(--r-pill);
		border-left: 2px solid transparent;
	}
	nav a:hover {
		background: var(--elevated);
		color: var(--fg);
	}
	nav a.active {
		color: var(--fg);
		background: var(--elevated);
		border-left-color: var(--accent);
	}
	.home {
		font-weight: 500;
	}

	.doc {
		min-width: 0;
		padding-top: 1rem;
	}

	@media (max-width: 900px) {
		.docs {
			grid-template-columns: 1fr;
			gap: 1.2rem;
			padding-block: 1.6rem 4rem;
		}
		.side {
			position: static;
			max-height: none;
			overflow: visible;
			padding: 0;
			border: 1px solid var(--stroke);
			background: var(--elevated);
			border-radius: var(--r-in);
		}
		summary {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.8rem;
			padding: 0.75rem 1rem;
			cursor: pointer;
			font-size: 0.92rem;
			color: var(--fg2);
			list-style: none;
		}
		summary::-webkit-details-marker {
			display: none;
		}
		.crumb strong {
			color: var(--fg);
		}
		.chev {
			color: var(--dim);
			font-size: 0.8rem;
		}
		.side[open] .chev {
			transform: rotate(180deg);
		}
		nav {
			padding: 0 0.6rem 1rem;
			border-top: 1px solid var(--stroke);
		}
		.doc {
			padding-top: 0.6rem;
		}
	}

	/* ── shared prose styling for every docs page ──────────────────────── */
	.doc :global(h1) {
		font-size: clamp(1.8rem, 1.3rem + 1.9vw, 2.5rem);
	}
	.doc :global(h2) {
		margin-top: 3rem;
		scroll-margin-top: 4.5rem;
	}
	.doc :global(h3) {
		margin-top: 1.9rem;
		color: var(--fg);
		scroll-margin-top: 4.5rem;
	}
	.doc :global(h2 + p),
	.doc :global(h3 + p) {
		margin-top: 0.65rem;
	}
	.doc :global(p + p),
	.doc :global(p + ul),
	.doc :global(ul + p),
	.doc :global(p + dl) {
		margin-top: 0.8rem;
	}
	.doc :global(.lede) {
		margin-top: 0.9rem;
	}
	.doc :global(.rows) {
		margin-top: 1rem;
	}
	.doc :global(section + section) {
		margin-top: 0;
	}
</style>
