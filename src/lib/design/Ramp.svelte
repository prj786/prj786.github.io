<script>
	// A scale, as a strip: every step painted with its own token, numbered
	// underneath. Used for the accent ramp and the warm neutrals.
	let { prefix, steps, label = '' } = $props();
</script>

{#if label}<p class="label">{label}</p>{/if}
<div class="ramp">
	{#each steps as step}
		<span class="step" style="background: var(--{prefix}-{step})" title="--{prefix}-{step}"></span>
	{/each}
</div>
<div class="nums" aria-hidden="true">
	{#each steps as step}<span>{step}</span>{/each}
</div>

<style>
	.label {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		margin: var(--space-md) 0 var(--space-xs);
	}
	.ramp {
		display: flex;
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--primary);
		overflow: hidden;
	}
	.step {
		flex: 1;
		height: calc(2 * var(--control-md));
	}
	.nums {
		display: flex;
		margin-top: var(--space-xxs);
	}
	.nums span {
		flex: 1;
		text-align: center;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-variant-numeric: tabular-nums;
		color: var(--text-muted);
	}
</style>
