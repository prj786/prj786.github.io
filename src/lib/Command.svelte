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
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		padding: 0.7rem 0.7rem 0.7rem 0.95rem;
		max-width: 44rem;
		overflow: hidden;
	}
	code {
		border: 0;
		background: none;
		padding: 0;
		font-size: 0.85rem;
		color: var(--fg);
		overflow-x: auto;
		white-space: nowrap;
		flex: 1;
		scrollbar-width: thin;
	}
	.copy {
		flex: none;
		font: inherit;
		font-size: 0.8rem;
		color: var(--fg2);
		background: var(--bg);
		border: 1px solid var(--stroke);
		border-radius: var(--r-pill);
		padding: 0.3rem 0.6rem;
		cursor: pointer;
	}
	.copy:hover {
		background: var(--hover);
		color: var(--fg);
	}
</style>
