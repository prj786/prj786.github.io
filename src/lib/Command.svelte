<script>
	let { value, label = 'Copy' } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class="cmd">
	<code>{value}</code>
	<button class="copy" onclick={copy} aria-label={label}>{copied ? 'Copied' : label}</button>
</div>

<style>
	.cmd {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: var(--space-s);
		padding-left: calc(var(--space-s) + var(--space-xs));
		max-width: 44rem;
		overflow: hidden;
	}
	code {
		border: 0;
		background: none;
		padding: 0;
		font-size: var(--font-size-md);
		color: var(--text-primary);
		overflow-x: auto;
		white-space: nowrap;
		flex: 1;
		scrollbar-width: thin;
	}
	.copy {
		flex: none;
		height: var(--control-md);
		padding: 0 var(--space-s);
		font: inherit;
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-strong);
		border-radius: var(--primary);
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);
	}
	.copy:hover {
		background: var(--surface-hover);
	}
	.copy:active {
		background: var(--surface-pressed);
	}
</style>
