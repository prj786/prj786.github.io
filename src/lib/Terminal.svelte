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
		background: #020202;
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		overflow: hidden;
		max-width: 46rem;
	}
	.tt {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 0.8rem;
		border-bottom: 1px solid var(--stroke);
		font-size: 0.75rem;
		color: var(--dim);
		background: var(--elevated);
	}
	.dots {
		display: flex;
		gap: 0.28rem;
	}
	.dots i {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: #2e2e33;
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
		color: var(--fg);
	}
	.o {
		color: var(--fg2);
	}
	.h {
		color: var(--dim);
	}
</style>
