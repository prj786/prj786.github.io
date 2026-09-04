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
		margin-top: 1rem;
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		max-width: 52rem;
		scrollbar-width: thin;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 34rem;
		font-size: 0.93rem;
	}
	th {
		text-align: left;
		font-weight: 500;
		color: var(--fg-3);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.7rem 1rem;
		border-bottom: var(--stroke-width) solid var(--stroke-2);
		background: var(--bg-2);
	}
	td {
		padding: 0.8rem 1rem;
		border-bottom: var(--stroke-width) solid var(--stroke-2);
		color: var(--fg-2);
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	td.c {
		white-space: nowrap;
		color: var(--fg-1);
	}
	.args {
		display: block;
		margin-top: 0.25rem;
		font-family: var(--mono);
		font-size: 0.76rem;
		color: var(--fg-3);
		white-space: normal;
	}
	.prints {
		display: block;
		margin-top: 0.3rem;
		font-size: 0.86rem;
		color: var(--fg-3);
	}
	.prints code {
		font-size: 0.82em;
	}
</style>
