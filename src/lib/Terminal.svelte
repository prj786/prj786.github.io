<script>
	// lines: [{ cmd }] or [{ out }] or [{ comment }]
	let { lines = [], title = 'kitty' } = $props();
</script>

<figure class="term">
	<div class="tt"><span class="dots"><i></i><i></i><i></i></span>{title}</div>
	<pre>{#each lines as l}{#if l.cmd}<span class="p">$</span> <span class="c">{l.cmd}</span>
{:else if l.comment}<span class="h">{l.comment}</span>
{:else}<span class="o">{l.out}</span>
{/if}{/each}</pre>
</figure>

<style>
	.term {
		margin: var(--space-md) 0 0;
		background: var(--surface-sunken);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		overflow: hidden;
		max-width: 46rem;
	}
	.tt {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		height: var(--control-lg);
		padding: 0 calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--surface-raised);
	}
	.dots {
		display: flex;
		gap: var(--space-xs);
	}
	.dots i {
		width: var(--space-s);
		height: var(--space-s);
		border-radius: var(--fully-rounded);
		background: var(--border-strong);
	}
	pre {
		margin: 0;
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		line-height: var(--line-height-lg);
		overflow-x: auto;
		white-space: pre;
	}
	.p {
		color: var(--accent-text);
	}
	.c {
		color: var(--text-primary);
	}
	.o {
		color: var(--text-secondary);
	}
	.h {
		color: var(--text-muted);
	}
</style>
