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
		border-left: var(--border-width-2) solid var(--border-subtle);
		padding: var(--space-xxs) 0 var(--space-xxs) var(--space-md);
		margin: var(--space-md) 0 0;
		max-width: var(--measure);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-secondary);
	}
	.callout.warning {
		border-left-color: var(--warning);
	}
	strong {
		display: block;
		margin-bottom: var(--space-xxs);
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
	}
	.body :global(p) {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	.body :global(p + p) {
		margin-top: var(--space-s);
	}
</style>
