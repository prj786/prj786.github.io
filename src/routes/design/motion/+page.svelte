<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const MOTION = [
		['fast', '150ms', 'ease-out', 'Hover, pressed, focus and other color changes; menus and toasts closing'],
		['base', '200ms', 'ease-out', 'Panels and toasts opening: a fade plus a 4px slide from their edge — dock panels and the launcher fade only; the dock hiding'],
		['slow', '250ms', 'ease-in-out', 'Workspace switches, the Overview zoom, Welcome'],
		['dim', '1500ms', 'linear', 'The screen dimming before it locks']
	];

	const LAYERS = [
		['background', 'The wallpaper'],
		['bottom', 'Desktop widgets'],
		['top', 'The bar and the dock — both slide out of view while the Overview is open; their reserved strips stay'],
		['overlay', 'Popups, menus, the launcher, Quick settings, the notification center, notifications, the on-screen display'],
		['overlay (exclusive)', 'The lock screen and the power menu']
	];

	const GLASS_ROLES = [
		['The surface fill', 'glass-base for the bar, glass-raised for the dock and lock card'],
		['surface-hover · surface-pressed', 'glass-hover · glass-pressed — tint the glass instead of covering it'],
		['border-subtle', 'glass-border, so the edge reads over a light or a dark wallpaper'],
		['accent-text', 'glass-accent, a deeper gold in Ewe Light so it still holds 4.5:1'],
		['text-muted', 'text-secondary — muted text cannot hold up over a bright wallpaper']
	];
</script>

<svelte:head>
	<title>Motion and layers — Ewe design system</title>
	<meta
		name="description"
		content="Ewe's four motion durations and two curves, the layer order the shell draws in, and Glass: how the bar, dock and lock card turn translucent without losing contrast."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Motion and layers</h1>
<p class="lede">
	Motion confirms, it never decorates. Nothing bounces, nothing overshoots, and everything that
	moves is telling you that something happened.
</p>

<section>
	<h2>Four durations</h2>
	<p>
		The whole desktop moves on four values and two curves — ease-out for anything arriving or
		changing state, ease-in-out for the long moves that carry you somewhere else. Motion is the one
		thing that cannot be a design token, so implementations define these once, beside the tokens.
	</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Name</th><th>Duration</th><th>Curve</th><th>Used for</th></tr>
			</thead>
			<tbody>
				{#each MOTION as [name, ms, ease, use]}
					<tr>
						<td><code>{name}</code></td>
						<td class="num">{ms}</td>
						<td>{ease}</td>
						<td>{use}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="demo">
		<p class="lbl">Point at these — the same 150ms, the same curve as a button on the desktop.</p>
		<div class="row">
			<span class="tile fast">fast</span>
			<span class="tile base">base</span>
			<span class="tile slow">slow</span>
		</div>
	</div>
	<p>
		These are the Normal speed. The animation speed setting divides them — Fast halves them, Slow
		stretches them by about 1.7×, Off makes them zero — and
		<a href="/design/accessibility/">Reduce motion</a> turns every slide and zoom into a fade at
		<code>fast</code>.
	</p>
	<p>
		The compositor’s window animations follow the same rule. No curve overshoots, and there is no
		bouncy preset: an older setting that used one is read as the default, Snappy.
	</p>
</section>

<section>
	<h2>Layers</h2>
	<p>
		The shell draws its surfaces on the compositor's layer-shell layers, so stacking is decided
		once rather than argued about per window.
	</p>
	<dl class="rows">
		{#each LAYERS as [layer, what]}
			<div class="row"><dt><code>{layer}</code></dt><dd>{what}</dd></div>
		{/each}
	</dl>
	<p class="muted">
		Inside the overlay layer the on-screen display sits above notifications, and notifications above
		popups.
	</p>
</section>

<section id="glass">
	<h2>Glass</h2>
	<p>
		People can make the shell translucent, and Ewe treats that as a first-class look rather than an
		afterthought. The bar opacity setting (0–100, 100 by default) sets the fill of the bar, the dock
		and the lock-screen card; between 10 and 99 the wallpaper behind them is blurred by about 24px.
		The Glass preset is <strong>80%</strong> — the lowest value where text still holds 4.5:1 over
		any wallpaper.
	</p>
	<div class="glassdemo">
		<div class="pane">
			<span class="g">Ewe · <b>accent</b> · <span class="dim">secondary</span></span>
		</div>
		<p class="figcap">
			The glass roles over a picture: the fill at 80% with the blur behind it, a glass outline, and
			an accent mark deep enough to survive the bright parts.
		</p>
	</div>
	<h3>Only the fill</h3>
	<ul>
		<li>Text, glyphs, badges, app icons and accent fills stay solid.</li>
		<li>
			Panels, popups, menus, notifications and dialogs stay solid too. They sit over windows, where
			a see-through fill is only noise.
		</li>
		<li>A glass surface keeps its outline and its shadow, so its edge reads over any wallpaper.</li>
		<li>Never mix a solid module into a glass bar, and never add color to the glass — the wallpaper already does that.</li>
	</ul>
	<h3>Roles inside glass</h3>
	<p>A glass surface remaps the roles its content uses, so no component needs a glass variant.</p>
	<dl class="rows">
		{#each GLASS_ROLES as [from, to]}
			<div class="row"><dt>{from}</dt><dd>{to}</dd></div>
		{/each}
	</dl>
	<p class="note">
		Below 80% Settings warns that text can be hard to read on bright wallpapers, but nothing is
		blocked. Where blur is unavailable — some virtual machines and NVIDIA setups — the fill stays
		translucent but sharp, and 90% or more is suggested. Two more settings are separate from the
		slider: app blur draws every window at 85%, and window transparency puts unfocused windows at
		97%.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 50rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 32rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	th {
		text-align: left;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		background: var(--surface-base);
		border-bottom: var(--border-width-1) solid var(--border-subtle);
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
	.num {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	td code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
	}

	.demo {
		margin-top: var(--space-md);
	}
	.lbl {
		font-size: var(--font-size-md);
		color: var(--text-muted);
		margin-bottom: var(--space-s);
	}
	.demo .row {
		display: flex;
		gap: var(--space-s);
	}
	.tile {
		display: grid;
		place-items: center;
		width: calc(3 * var(--control-lg));
		height: var(--control-xl);
		border-radius: var(--primary);
		border: var(--border-width-1) solid var(--border-subtle);
		background: var(--surface-raised);
		color: var(--text-secondary);
		font-size: var(--font-size-s);
		font-family: var(--font-mono);
	}
	.tile:hover {
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.fast {
		transition: all var(--dur-fast) var(--ease-out);
	}
	.base {
		transition: all var(--dur-base) var(--ease-out);
	}
	.slow {
		transition: all var(--dur-slow) var(--ease-in-out);
	}

	.glassdemo {
		margin-top: var(--space-md);
	}
	.pane {
		display: flex;
		align-items: flex-start;
		padding: var(--space-md);
		border-radius: var(--rounded);
		border: var(--border-width-1) solid var(--border-subtle);
		background: var(--gradient-ewellow);
	}
	.g {
		display: block;
		width: 100%;
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-radius: var(--primary);
		background: var(--glass-raised);
		border: var(--border-width-1) solid var(--glass-border);
		backdrop-filter: blur(var(--blur-glass));
		-webkit-backdrop-filter: blur(var(--blur-glass));
		color: var(--text-primary);
		font-size: var(--font-size-md);
	}
	.g b {
		color: var(--glass-accent);
	}
	.dim {
		color: var(--text-secondary);
	}
	.rows :global(code) {
		background: none;
		border: 0;
		padding: 0;
	}
</style>
