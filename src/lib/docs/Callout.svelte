<script>
	// type: note (default) | warning
	let { type = 'note', title = '', children } = $props();
</script>

<aside class="callout {type}">
	{#if title}<strong>{title}</strong>{/if}
	<div class="body">{@render children()}</div>
</aside>

<style>
	.callout {
		border-left: 2px solid var(--stroke);
		padding: 0.15rem 0 0.15rem 1rem;
		margin: 1.1rem 0 0;
		max-width: var(--measure);
		font-size: 0.94rem;
		color: var(--fg2);
	}
	.callout.warning {
		border-left-color: var(--warning);
	}
	strong {
		display: block;
		margin-bottom: 0.2rem;
		color: var(--fg);
		font-weight: 500;
	}
	.body :global(p) {
		font-size: 0.94rem;
	}
	.body :global(p + p) {
		margin-top: 0.6rem;
	}
</style>
