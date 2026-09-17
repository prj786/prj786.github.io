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
		top: var(--header-h); /* under the floating site bar */
		max-height: calc(100vh - var(--header-h));
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
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		margin: var(--space-md) 0 var(--space-xs);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
	}
	li {
		margin: 0;
	}
	nav a {
		display: flex;
		align-items: center;
		min-height: var(--control-md);
		text-decoration: none;
		color: var(--text-secondary);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		padding: var(--space-xxs) var(--space-s);
		border-radius: var(--secondary);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	nav a:hover {
		background: var(--surface-hover);
		color: var(--text-primary);
	}
	nav a.active {
		color: var(--text-primary);
		background: var(--accent-subtle);
		font-weight: var(--font-weight-medium);
	}
	.home {
		font-weight: var(--font-weight-medium);
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
			border: var(--border-width-1) solid var(--border-subtle);
			background: var(--surface-raised);
			border-radius: var(--rounded);
		}
		summary {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.8rem;
			padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
			cursor: pointer;
			color: var(--text-secondary);
			font-size: var(--font-size-md);
			list-style: none;
		}
		summary::-webkit-details-marker {
			display: none;
		}
		.crumb strong {
			color: var(--text-primary);
		}
		.chev {
			color: var(--text-muted);
			font-size: 0.8rem;
		}
		.side[open] .chev {
			transform: rotate(180deg);
		}
		nav {
			padding: 0 0.6rem 1rem;
			border-top: var(--border-width-1) solid var(--border-subtle);
		}
		.doc {
			padding-top: 0.6rem;
		}
	}

	/* ── shared prose styling for every docs page ──────────────────────── */
	.doc :global(h1) {
		font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-3xl));
		line-height: clamp(var(--line-height-2xl), 6vw, var(--line-height-3xl));
	}
	.doc :global(h2) {
		margin-top: 3rem;
		scroll-margin-top: 4.5rem;
	}
	.doc :global(h3) {
		margin-top: 1.9rem;
		color: var(--text-primary);
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
