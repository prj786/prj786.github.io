<script>
	import { page } from '$app/stores';
	import { neighbours } from '$lib/docs/nav.js';
	const nav = $derived(neighbours($page.url.pathname));
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
		margin-top: 3.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--stroke);
	}
	a {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		text-decoration: none;
		border: 1px solid var(--stroke);
		background: var(--elevated);
		border-radius: var(--r-in);
		padding: 0.7rem 1rem;
		font-size: 0.94rem;
		max-width: 48%;
	}
	a:hover {
		background: var(--hover);
	}
	.next {
		text-align: right;
		margin-left: auto;
	}
	span {
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--dim);
	}
</style>
