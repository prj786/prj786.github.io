<script>
	import Icon from './Icon.svelte';

	// A drawing of the ewe shell, built from the desktop's own theme tokens —
	// the same surfaces, radii and layout the real session uses. Not a
	// screenshot: it's here so the accent picker can recolour it live, exactly
	// the way changing the accent recolours the real desktop.
	let { accent = '#0a84ff', theme = 'blacksheep', center = true } = $props();

	const pal = $derived(
		theme === 'blacksheep'
			? { bg: '#020202', panel: '#0a0a0c', elev: '#101012', hover: '#1a1a1c', stroke: '#222225' }
			: { bg: '#1c1c1e', panel: '#1d1d1f', elev: '#2c2c2e', hover: '#3a3a3c', stroke: '#38383a' }
	);

	// white on dark accents, ink on light ones — the shell's own accentText rule
	const ink = $derived.by(() => {
		const h = accent.replace('#', '');
		const r = parseInt(h.slice(0, 2), 16) / 255;
		const g = parseInt(h.slice(2, 4), 16) / 255;
		const b = parseInt(h.slice(4, 6), 16) / 255;
		return 0.299 * r + 0.587 * g + 0.114 * b > 0.55 ? '#1c1c1e' : '#ffffff';
	});

	const dock = [
		{ icon: 'folder', label: 'Files' },
		{ icon: 'globe', label: 'Browser' },
		{ icon: 'terminal', label: 'Terminal' },
		{ icon: 'bag', label: 'Komble' },
		{ icon: 'image', label: 'Images' },
		{ icon: 'gear', label: 'Settings' }
	];
</script>

<figure
	class="screen"
	style="--a:{accent}; --ink:{ink}; --bg:{pal.bg}; --panel:{pal.panel}; --elev:{pal.elev}; --hov:{pal.hover}; --line:{pal.stroke}"
>
	<div class="wall">
		<!-- bar -->
		<div class="bar">
			<div class="bar-l">
				<span class="glyph"><Icon name="search" /></span>
				<span class="ws">
					{#each [1, 2, 3, 4] as n}
						<i class:on={n === 2}></i>
					{/each}
				</span>
			</div>
			<div class="bar-c">Komble — Software</div>
			<div class="bar-r">
				<span class="glyph"><Icon name="mail" /></span>
				<span class="glyph"><Icon name="wifi" /></span>
				<span class="glyph"><Icon name="volume" /></span>
				<span class="glyph"><Icon name="battery" /></span>
				<span class="clock">21:04</span>
			</div>
		</div>

		{#if center}
			<!-- control centre -->
			<div class="cc">
				<div class="cc-head">
					<span class="avatar"><Icon name="sheep" /></span>
					<span class="who">Control Centre</span>
				</div>
				<div class="tiles">
					<div class="tile on"><Icon name="wifi" /><span>Wi-Fi</span></div>
					<div class="tile"><Icon name="bluetooth" /><span>Bluetooth</span></div>
					<div class="tile on"><Icon name="cast" /><span>Cast · Living room TV</span></div>
					<div class="tile"><Icon name="phone" /><span>Mobile</span></div>
				</div>
				<div class="slider"><span style="width:62%"></span></div>
				<div class="slider"><span style="width:38%"></span></div>
			</div>
		{/if}

		<!-- dock -->
		<div class="dock">
			{#each dock as d, i}
				<div class="app" class:running={i === 3} title={d.label}><Icon name={d.icon} /></div>
			{/each}
		</div>
	</div>
</figure>

<style>
	.screen {
		container-type: inline-size;
		margin: 0;
		width: 100%;
		border: 1px solid var(--line);
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
		background: var(--bg);
	}
	.wall {
		position: relative;
		aspect-ratio: 16 / 10;
		background: var(--bg) url('/img/wallpaper.png') center / cover no-repeat;
		font-size: 1.6cqw;
		color: #f2f2f7;
	}

	.bar {
		position: absolute;
		inset: 0 0 auto 0;
		height: 3.4cqw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1cqw;
		padding: 0 1.2cqw;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
	}
	.bar-l,
	.bar-r {
		display: flex;
		align-items: center;
		gap: 0.9cqw;
	}
	.bar-c {
		font-size: 0.85em;
		color: #aeaeb2;
		white-space: nowrap;
		overflow: hidden;
	}
	.glyph {
		display: block;
		font-size: 1.35cqw;
		color: #aeaeb2;
	}
	.clock {
		font-size: 0.85em;
		color: #f2f2f7;
	}
	.ws {
		display: flex;
		gap: 0.45cqw;
		align-items: center;
	}
	.ws i {
		width: 0.55cqw;
		height: 0.55cqw;
		border-radius: 50%;
		background: #4b4b50;
		display: block;
		transition: background 200ms ease, width 200ms ease;
	}
	.ws i.on {
		background: var(--a);
		width: 1.5cqw;
		border-radius: 0.3cqw;
	}

	.cc {
		position: absolute;
		top: 4.4cqw;
		right: 1.2cqw;
		width: 26cqw;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 1.6cqw;
		padding: 1.2cqw;
		display: flex;
		flex-direction: column;
		gap: 0.8cqw;
	}
	.cc-head {
		display: flex;
		align-items: center;
		gap: 0.7cqw;
	}
	.avatar {
		width: 2.6cqw;
		height: 2.6cqw;
		border-radius: 50%;
		background: var(--a);
		color: var(--ink);
		display: grid;
		place-items: center;
		font-size: 1.5cqw;
		transition: background 200ms ease;
	}
	.who {
		font-size: 0.9em;
		color: #f2f2f7;
	}
	.tiles {
		display: flex;
		flex-direction: column;
		gap: 0.6cqw;
	}
	.tile {
		display: flex;
		align-items: center;
		gap: 0.7cqw;
		background: var(--elev);
		border-radius: 1cqw;
		padding: 0.75cqw 0.9cqw;
		font-size: 0.82em;
		color: #aeaeb2;
		transition: background 200ms ease, color 200ms ease;
	}
	.tile :global(svg) {
		width: 1.4cqw;
		height: 1.4cqw;
	}
	.tile.on {
		background: var(--a);
		color: var(--ink);
	}
	.slider {
		height: 1.5cqw;
		border-radius: 0.75cqw;
		background: var(--elev);
		overflow: hidden;
	}
	.slider span {
		display: block;
		height: 100%;
		background: var(--a);
		border-radius: 0.75cqw;
		transition: background 200ms ease;
	}

	.dock {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 1.2cqw;
		display: flex;
		gap: 0.7cqw;
		padding: 0.7cqw;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 1.6cqw;
	}
	.app {
		position: relative;
		width: 3.6cqw;
		height: 3.6cqw;
		border-radius: 1cqw;
		background: var(--elev);
		display: grid;
		place-items: center;
		color: #d8d8dd;
	}
	.app :global(svg) {
		width: 2cqw;
		height: 2cqw;
	}
	.app.running::after {
		content: '';
		position: absolute;
		bottom: -0.45cqw;
		left: 50%;
		transform: translateX(-50%);
		width: 1cqw;
		height: 0.25cqw;
		border-radius: 0.2cqw;
		background: var(--a);
		transition: background 200ms ease;
	}
</style>
