<script>
	import Desktop from './Desktop.svelte';

	let { center = true, caption = true } = $props();

	const ACCENTS = [
		{ hex: '#0a84ff', name: 'Blue' },
		{ hex: '#30d158', name: 'Green' },
		{ hex: '#bf5af2', name: 'Purple' },
		{ hex: '#ff9f0a', name: 'Orange' },
		{ hex: '#ff453a', name: 'Red' },
		{ hex: '#ffd60a', name: 'Yellow' }
	];

	let accent = $state('#0a84ff');
	let theme = $state('blacksheep');
</script>

<div class="demo">
	<Desktop {accent} {theme} {center} />

	<div class="controls">
		<div class="group">
			<span class="lbl">Accent</span>
			<div class="swatches">
				{#each ACCENTS as a}
					<button
						class="sw"
						class:sel={accent === a.hex}
						style="--c:{a.hex}"
						aria-label={a.name}
						aria-pressed={accent === a.hex}
						onclick={() => (accent = a.hex)}
					></button>
				{/each}
			</div>
		</div>

		<div class="group">
			<span class="lbl">Look</span>
			<div class="seg">
				<button class:sel={theme === 'flock'} onclick={() => (theme = 'flock')}>flock</button>
				<button class:sel={theme === 'blacksheep'} onclick={() => (theme = 'blacksheep')}>
					blacksheep
				</button>
			</div>
		</div>
	</div>

	{#if caption}
		<p class="cap">
			Pick a colour and watch it move through the bar, the dock indicator and every control-centre
			tile at once — that's what the accent setting does on the real desktop, without a relogin. Note
			the yellow: text on the accent flips to ink automatically so it stays legible.
		</p>
	{/if}
</div>

<style>
	.demo {
		margin-top: 1.6rem;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1.4rem;
		align-items: center;
		margin-top: 1rem;
	}
	.group {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}
	.lbl {
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--dim);
	}
	.swatches {
		display: flex;
		gap: 0.45rem;
	}
	.sw {
		width: 1.55rem;
		height: 1.55rem;
		border-radius: 50%;
		background: var(--c);
		border: 2px solid transparent;
		box-shadow: 0 0 0 1px var(--stroke);
		cursor: pointer;
		padding: 0;
		transition: transform 150ms ease, box-shadow 150ms ease;
	}
	.sw:hover {
		transform: scale(1.1);
	}
	.sw.sel {
		box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--c);
	}
	.seg {
		display: flex;
		border: 1px solid var(--stroke);
		border-radius: var(--r-pill);
		overflow: hidden;
	}
	.seg button {
		font: inherit;
		font-size: 0.85rem;
		padding: 0.35rem 0.8rem;
		background: var(--elevated);
		color: var(--fg2);
		border: 0;
		cursor: pointer;
	}
	.seg button.sel {
		background: var(--hover);
		color: var(--fg);
	}
	.cap {
		margin-top: 1rem;
		font-size: 0.9rem;
		color: var(--dim);
		max-width: 46rem;
	}
</style>
