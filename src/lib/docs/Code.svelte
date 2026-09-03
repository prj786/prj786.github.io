<script>
	// A block of literal terminal text. No syntax highlighting: the site ships
	// no JS to read, and a shell line is legible without colours.
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
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		margin: 1rem 0 0;
		max-width: 52rem;
	}
	pre {
		margin: 0;
		padding: 0.9rem 1rem;
		font-family: var(--mono);
		font-size: 0.82rem;
		line-height: 1.7;
		color: var(--fg);
		overflow-x: auto;
		white-space: pre;
		scrollbar-width: thin;
	}
	.copy {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font: inherit;
		font-size: 0.75rem;
		color: var(--fg2);
		background: var(--bg);
		border: 1px solid var(--stroke);
		border-radius: var(--r-pill);
		padding: 0.22rem 0.55rem;
		cursor: pointer;
		opacity: 0;
		transition: opacity 120ms ease;
	}
	.block:hover .copy,
	.copy:focus-visible {
		opacity: 1;
	}
	.copy:hover {
		background: var(--hover);
		color: var(--fg);
	}
	/* touch devices have no hover — keep the button reachable there */
	@media (hover: none) {
		.copy {
			opacity: 1;
		}
	}
</style>
