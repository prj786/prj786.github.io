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
		margin: 1.2rem 0 0;
		background: var(--bg-4);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		overflow: hidden;
		max-width: 46rem;
	}
	.tt {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 0.8rem;
		border-bottom: var(--stroke-width) solid var(--stroke-2);
		font-size: 0.75rem;
		color: var(--fg-3);
		background: var(--bg-2);
	}
	.dots {
		display: flex;
		gap: 0.28rem;
	}
	.dots i {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--stroke-1);
	}
	pre {
		margin: 0;
		padding: 0.9rem 1rem;
		font-family: var(--mono);
		font-size: 0.8rem;
		line-height: 1.75;
		overflow-x: auto;
		white-space: pre;
	}
	.p {
		color: var(--accent);
	}
	.c {
		color: var(--fg-1);
	}
	.o {
		color: var(--fg-2);
	}
	.h {
		color: var(--fg-3);
	}
</style>
