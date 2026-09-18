<script>
	// A block of literal terminal text. No syntax highlighting: the site ships
	// no JS to read, and a shell line is legible without colors.
	let { code = '', label = 'Copy', copyable = true } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class="block">
	<pre>{code}</pre>
	{#if copyable}
		<button class="copy" onclick={copy} aria-label={label}>{copied ? 'Copied' : label}</button>
	{/if}
</div>

<style>
	.block {
		position: relative;
		background: var(--surface-sunken);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		margin: var(--space-md) 0 0;
		max-width: 52rem;
	}
	pre {
		margin: 0;
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		line-height: var(--line-height-lg);
		color: var(--text-primary);
		overflow-x: auto;
		white-space: pre;
		scrollbar-width: thin;
	}
	.copy {
		position: absolute;
		top: var(--space-xs);
		right: var(--space-xs);
		height: var(--control-sm);
		padding: 0 var(--space-s);
		font: inherit;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-strong);
		border-radius: var(--primary);
		cursor: pointer;
		opacity: 0;
		transition: opacity var(--dur-fast) var(--ease-out);
	}
	.block:hover .copy,
	.copy:focus-visible {
		opacity: 1;
	}
	.copy:hover {
		background: var(--surface-hover);
	}
	/* touch devices have no hover — keep the button reachable there */
	@media (hover: none) {
		.copy {
			opacity: 1;
		}
	}
</style>
