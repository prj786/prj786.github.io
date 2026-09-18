<script>
	// A row of files to save: each a plain link with `download`, so it works
	// without script. items: [{ href, label, note }]
	import Icon from '$lib/Icon.svelte';

	let { items = [], label = 'Downloads' } = $props();
</script>

<ul class="downloads" aria-label={label}>
	{#each items as f}
		<li>
			<a class="file" href={f.href} download>
				<Icon name="download" size={16} />
				<span class="text">
					<span class="name">{f.label}</span>
					{#if f.note}<span class="meta">{f.note}</span>{/if}
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.downloads {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: var(--space-s);
		max-width: 52rem;
	}
	li {
		margin: 0;
	}
	.file {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		min-height: var(--control-xl);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		color: var(--text-primary);
		text-decoration: none;
		transition: background-color var(--dur-fast) var(--ease-out);
	}
	.file:hover {
		background: var(--surface-hover);
	}
	.file:active {
		background: var(--surface-pressed);
	}
	.file :global(.icon) {
		flex: none;
		color: var(--accent-text);
	}
	.text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.name {
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
		overflow-wrap: anywhere;
	}
	.meta {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		color: var(--text-muted);
	}
</style>
