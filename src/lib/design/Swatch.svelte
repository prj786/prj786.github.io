<script>
	// One colour role, painted with the role itself. The chip is `var(--role)`,
	// so it is whatever the active scheme says; the hex appears once the page
	// is live (see tokens.svelte.js).
	import { tokenValue } from './tokens.svelte.js';

	let { token, note = '', on = '' } = $props();
	const value = $derived(tokenValue(token));
</script>

<div class="swatch">
	<span class="chip" style="background: var(--{token}); {on ? `color: var(--${on})` : ''}"
		>{#if on}Aa{/if}</span
	>
	<span class="text">
		<code>--{token}</code>
		{#if note}<span class="note">{note}</span>{/if}
	</span>
	<span class="value">{value}</span>
</div>

<style>
	.swatch {
		display: grid;
		grid-template-columns: var(--control-lg) minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--space-s);
		padding: var(--space-xs) 0;
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	.chip {
		display: grid;
		place-items: center;
		width: var(--control-lg);
		height: var(--control-lg);
		border-radius: var(--secondary);
		border: var(--border-width-1) solid var(--border-subtle);
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-medium);
	}
	.text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
		font-size: var(--font-size-s);
	}
	.note {
		color: var(--text-muted);
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
	}
	.value {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}
</style>
