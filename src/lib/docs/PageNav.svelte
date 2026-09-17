<script>
	// Previous and next, within one section. `flat` is that section's pages in
	// reading order; it defaults to the docs, and the design system passes its
	// own list.
	import { page } from '$app/stores';
	import { FLAT } from '$lib/docs/nav.js';

	let { flat = FLAT } = $props();
	const nav = $derived.by(() => {
		const i = flat.findIndex((p) => p.href === $page.url.pathname);
		return {
			prev: i > 0 ? flat[i - 1] : null,
			next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null
		};
	});
</script>

{#if nav.prev || nav.next}
	<nav class="pagenav" aria-label="Previous and next page">
		{#if nav.prev}
			<a href={nav.prev.href} class="prev">
				<span>Previous</span>
				{nav.prev.label}
			</a>
		{:else}<span></span>{/if}
		{#if nav.next}
			<a href={nav.next.href} class="next">
				<span>Next</span>
				{nav.next.label}
			</a>
		{/if}
	</nav>
{/if}

<style>
	.pagenav {
		display: flex;
		justify-content: space-between;
		gap: 0.8rem;
		margin-top: var(--space-xl);
		padding-top: var(--space-md);
		border-top: var(--border-width-1) solid var(--border-subtle);
	}
	a {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
		color: var(--text-primary);
		text-decoration: none;
		border: var(--border-width-1) solid var(--border-subtle);
		background: var(--surface-raised);
		border-radius: var(--rounded);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		max-width: 48%;
		transition: background-color var(--dur-fast) var(--ease-out);
	}
	a:hover {
		background: var(--surface-hover);
	}
	a:active {
		background: var(--surface-pressed);
	}
	.next {
		text-align: right;
		margin-left: auto;
	}
	span {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
	}
</style>
