<script>
	// The design section reuses the docs shape: a sticky column of pages on a
	// desktop, a drawer on a phone.
	import { page } from '$app/stores';
	import { PAGES } from '$lib/design/nav.js';

	let { children } = $props();
	const active = (href) => $page.url.pathname === href;
	const here = $derived(PAGES.find((i) => active(i.href))?.label ?? 'Design system');

	let open = $state(true);
	const narrow = () =>
		typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
	$effect(() => {
		$page.url.pathname;
		if (narrow()) open = false;
	});
</script>

<div class="design wrap wide">
	<details class="side" bind:open>
		<summary>
			<span class="crumb">Design / <strong>{here}</strong></span>
			<span class="chev" aria-hidden="true">▾</span>
		</summary>
		<nav aria-label="Design system">
			<a class="home" href="/design/" class:active={active('/design/')}>Overview</a>
			<ul>
				{#each PAGES as item}
					<li>
						<a
							href={item.href}
							class:active={active(item.href)}
							aria-current={active(item.href) ? 'page' : undefined}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</details>

	<article class="doc">
		{@render children()}
	</article>
</div>

<style>
	.design {
		display: grid;
		grid-template-columns: 15rem minmax(0, 1fr);
		gap: var(--space-lg);
		align-items: start;
		padding-block: var(--space-lg) var(--space-xl);
	}

	.side {
		position: sticky;
		top: var(--header-h);
		max-height: calc(100vh - var(--header-h));
		overflow-y: auto;
		scrollbar-width: thin;
		padding: var(--space-md) 0 var(--space-lg);
	}
	summary {
		display: none;
	}

	ul {
		list-style: none;
		margin: var(--space-xs) 0 0;
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
		background: var(--accent-subtle);
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
	}
	.home {
		font-weight: var(--font-weight-medium);
	}

	.doc {
		min-width: 0;
		padding-top: var(--space-md);
	}

	@media (max-width: 900px) {
		.design {
			grid-template-columns: 1fr;
			gap: var(--space-md);
			padding-block: var(--space-md) var(--space-xl);
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
			gap: var(--space-s);
			min-height: var(--control-xl);
			padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
			cursor: pointer;
			font-size: var(--font-size-md);
			color: var(--text-secondary);
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
		}
		.side[open] .chev {
			transform: rotate(180deg);
		}
		nav {
			padding: 0 var(--space-s) var(--space-s);
			border-top: var(--border-width-1) solid var(--border-subtle);
		}
		.doc {
			padding-top: var(--space-s);
		}
	}

	/* ── shared prose styling, as in the docs ─────────────────────────── */
	.doc :global(h1) {
		font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-3xl));
		line-height: clamp(var(--line-height-2xl), 6vw, var(--line-height-3xl));
	}
	.doc :global(h2) {
		margin-top: var(--space-xl);
		scroll-margin-top: calc(var(--header-h) + var(--space-md));
	}
	.doc :global(h3) {
		margin-top: var(--space-lg);
		scroll-margin-top: calc(var(--header-h) + var(--space-md));
	}
	.doc :global(h2 + p),
	.doc :global(h3 + p) {
		margin-top: var(--space-s);
	}
	.doc :global(p + p),
	.doc :global(p + ul),
	.doc :global(ul + p),
	.doc :global(p + dl) {
		margin-top: var(--space-s);
	}
	.doc :global(.lede) {
		margin-top: var(--space-md);
	}
	.doc :global(.rows) {
		margin-top: var(--space-md);
	}
	.doc :global(section + section) {
		margin-top: 0;
	}
</style>
