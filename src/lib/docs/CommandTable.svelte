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
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
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
		color: var(--dim);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.7rem 1rem;
		border-bottom: 1px solid var(--stroke);
		background: var(--elevated);
	}
	td {
		padding: 0.8rem 1rem;
		border-bottom: 1px solid var(--stroke);
		color: var(--fg2);
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	td.c {
		white-space: nowrap;
		color: var(--fg);
	}
	.args {
		display: block;
		margin-top: 0.25rem;
		font-family: var(--mono);
		font-size: 0.76rem;
		color: var(--dim);
		white-space: normal;
	}
	.prints {
		display: block;
		margin-top: 0.3rem;
		font-size: 0.86rem;
		color: var(--dim);
	}
	.prints code {
		font-size: 0.82em;
	}
</style>
