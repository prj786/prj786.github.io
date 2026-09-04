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
		gap: 0.75rem;
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		padding: 0.7rem 0.7rem 0.7rem 0.95rem;
		max-width: 44rem;
		overflow: hidden;
	}
	code {
		border: 0;
		background: none;
		padding: 0;
		font-size: 0.85rem;
		color: var(--fg-1);
		overflow-x: auto;
		white-space: nowrap;
		flex: 1;
		scrollbar-width: thin;
	}
	.copy {
		flex: none;
		font: inherit;
		font-size: 0.8rem;
		color: var(--fg-2);
		background: var(--bg-3);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-control);
		padding: 0.3rem 0.6rem;
		cursor: pointer;
	}
	.copy:hover {
		background: var(--subtle-hover);
		color: var(--fg-1);
	}
</style>
