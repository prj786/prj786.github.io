<script>
	// rows: [{ cmd, args, does, prints }]
	let { rows = [], head = 'Command', second = 'What it does' } = $props();
</script>

<div class="scroll">
	<table>
		<thead>
			<tr><th>{head}</th><th>{second}</th></tr>
		</thead>
		<tbody>
			{#each rows as r}
				<tr>
					<td class="c"><code>{r.cmd}</code>{#if r.args}<span class="args">{r.args}</span>{/if}</td>
					<td>
						{r.does}
						{#if r.prints}<span class="prints">Prints <code>{r.prints}</code></span>{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 52rem;
		scrollbar-width: thin;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 34rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	th {
		text-align: left;
		font-weight: var(--font-weight-semibold);
		color: var(--text-muted);
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		background: var(--surface-raised);
	}
	td {
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		color: var(--text-secondary);
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	td.c {
		white-space: nowrap;
		color: var(--text-primary);
	}
	.args {
		display: block;
		margin-top: var(--space-xxs);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		white-space: normal;
	}
	.prints {
		display: block;
		margin-top: var(--space-xs);
		font-size: var(--font-size-s);
		color: var(--text-muted);
	}
	.prints code {
		font-size: 0.82em;
	}
</style>
