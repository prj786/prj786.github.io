<script>
	import Icon from '$lib/Icon.svelte';
	import Command from '$lib/Command.svelte';
	import { derive, shape, colorCss, BRAND_STOPS } from '$lib/theme-engine.js';

	// The presets are the accents ewe ships in Settings, plus a yellow —
	// which is the one that proves the point about text on a brand fill.
	const PRESETS = [
		{ name: 'Blue', hex: '#0a84ff' },
		{ name: 'Purple', hex: '#bf5af2' },
		{ name: 'Green', hex: '#30d158' },
		{ name: 'Yellow', hex: '#ffcc00' },
		{ name: 'Orange', hex: '#ff9f0a' },
		{ name: 'Red', hex: '#ff453a' },
		{ name: 'Teal', hex: '#40c8e0' },
		{ name: 'Pink', hex: '#ff375f' }
	];

	let accent = $state('#0a84ff');
	let corner = $state('round');

	// This is not a mock-up. `derive` is a line-for-line port of the colour
	// half of ewe-theme, checked against it by scripts/check-engine.sh — so
	// every swatch below is the value a real machine would get.
	const theme = $derived(derive(accent, 8));
	const sh = $derived(shape(corner, 'none', 'comfortable'));

	const vars = $derived(
		[
			// colorCss: strokes carry their alpha, exactly as tokens.css spells them
			...Object.entries(theme.color).map(([k, v]) => `--${k}:${colorCss(k, v)}`),
			...Object.entries(sh).map(([k, v]) => `--${k}:${v}px`),
			// `--accent` is the alias the rest of the site paints marks with;
			// keep it pointing at the derived value so anything inheriting into
			// the panel follows the picker too.
			`--accent:${theme.color['brand-fg-1']}`
		].join(';')
	);

	// The handful of roles worth naming out loud. The full set is 70-odd.
	const SHOWN = [
		['bg-3', 'the page or desktop ground'],
		['bg-1', 'a panel raised on it'],
		['card', 'a tile you can point at'],
		['stroke-2', 'a card outline'],
		['stroke-3', 'a divider between rows'],
		['brand-bg', 'a filled primary button'],
		['fg-on-brand', 'text ON that button'],
		['brand-fg-1', 'the accent as a mark']
	];
</script>

<svelte:head>
	<title>Theming — ewe</title>
	<meta
		name="description"
		content="ewe has no theme file. One accent colour in ewe.conf derives a complete Fluent 2 token set — every background, stroke and foreground on the system — and applies it live to the shell, GTK, Qt and the window borders."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Theming</p>
	<h1>One colour in. A whole system out.</h1>
	<p class="lede">
		ewe has no theme file to download, fork or maintain. You pick <strong>one accent</strong>, and a
		generator derives everything else — six background levels with four states each, three stroke
		weights, a sixteen-stop brand ramp, and the foreground colours measured to stay readable on top
		of them. The panel below runs that generator, for real, in your browser.
	</p>

	<!-- ── the live derivation ─────────────────────────────────────────── -->
	<section>
		<div class="demo" style={vars}>
			<div class="controls">
				<label class="swatchwrap">
					<input type="color" bind:value={accent} aria-label="Accent colour" />
					<span class="hex">{accent}</span>
				</label>
				<div class="presets">
					{#each PRESETS as p}
						<button
							class="preset"
							class:on={accent.toLowerCase() === p.hex}
							style="background:{p.hex}"
							title={p.name}
							aria-label={p.name}
							onclick={() => (accent = p.hex)}
						></button>
					{/each}
				</div>
				<div class="corners">
					{#each ['round', 'none', 'small', 'medium', 'large'] as c}
						<button class="seg" class:on={corner === c} onclick={() => (corner = c)}>{c}</button>
					{/each}
				</div>
			</div>

			<!-- a piece of the desktop, wearing what the generator just produced -->
			<div class="mock">
				<div class="mockbar">
					<Icon name="layout-panel-top" size={15} />
					<span class="grow"></span>
					<Icon name="wifi" size={15} />
					<Icon name="cast" size={15} />
					<span class="badge">3</span>
					<span class="clock">09:41</span>
				</div>
				<div class="mockbody">
					<div class="tile">
						<div class="tilehead">
							<Icon name="palette" size={16} />
							<strong>Appearance</strong>
						</div>
						<div class="listrow"><span>Accent</span><span class="dot"></span></div>
						<div class="listrow"><span>Live apply</span><span class="sw"><i></i></span></div>
						<div class="mockbtns">
							<button class="mb primary">Apply</button>
							<button class="mb">Cancel</button>
						</div>
					</div>
					<p class="mocknote">
						Nothing here carries a colour of its own. Every surface, border and label asks for a
						<em>role</em>, and the accent above decides what that role is worth.
					</p>
				</div>
			</div>

			<!-- the two ramps the whole thing is built from -->
			<p class="ramplabel">Brand ramp — sixteen stops, your accent landing exactly on 80</p>
			<div class="ramp">
				{#each BRAND_STOPS as s}
					<span style="background:{theme.brand[s]}" title="brand-{s} · {theme.brand[s]}"></span>
				{/each}
			</div>

			<p class="ramplabel">Roles, derived</p>
			<div class="roles">
				{#each SHOWN as [k, what]}
					<div class="role">
						<s style="background:{theme.color[k] === 'transparent' ? 'none' : theme.color[k]}"></s>
						<code>--{k}</code>
						<span>{what}</span>
						<b>{theme.color[k]}</b>
					</div>
				{/each}
			</div>
		</div>
		<p class="figcap">
			The generator is a faithful reduction of Fluent 2's own: hold the accent's hue, ride a measured
			lightness ladder anchored so your colour lands exactly on stop 80, scale chroma by the measured
			envelope, then snap into sRGB by dropping chroma rather than clipping — which is why an
			out-of-gamut yellow desaturates instead of going muddy.
		</p>
	</section>

	<!-- ── where it lives ───────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The whole surface</p>
		<h2>Five keys, in the same file as everything else.</h2>
		<p>
			Theming isn't a separate system with its own storage. It's five keys in
			<a href="/how/"><code>~/.config/ewe/ewe.conf</code></a> — the one file that describes your
			machine — so your theme backs up, syncs and restores with the rest of it.
		</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="palette" size={16} />accent</dt>
				<dd>The seed. Every colour on the system is derived from this one hex value.</dd>
			</div>
			<div class="row">
				<dt><Icon name="ruler" size={16} />corner</dt>
				<dd>
					<code>round</code> — the default: 12 / 20 / 26 and a capsule — or <code>none</code>,
					<code>small</code>, <code>medium</code> or <code>large</code>. Radius is a theme decision,
					not a per-component one — <code>none</code> squares the entire system, with no stray rounded
					corner left behind.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="sliders-horizontal" size={16} />density</dt>
				<dd>
					<code>compact</code>, <code>comfortable</code> or <code>roomy</code>. Moves padding, row
					heights, control heights and icon size together, on Fluent's own 24 / 32 / 40 ladder.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="type" size={16} />stroke</dt>
				<dd>
					<code>none</code> — the default — <code>thin</code> or <code>thick</code>. Under
					<code>none</code> nothing is outlined: a control is told apart by the layer it sits on,
					while dividers and the window ring keep their hairline.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="blend" size={16} />neutral_tint</dt>
				<dd>
					0–40. How far the greys lean toward your accent's hue. The pull peaks in the dark
					midtones, where large surfaces live, and is gone by the time you reach text — so your
					panels warm up and your labels stay neutral.
				</dd>
			</div>
		</dl>
		<Command value="ewe-conf set desktop.theme.accent '#ffcc00'" />
		<p class="note">
			Or use Settings → Appearance, which writes the same key through the same tool. There is one
			writer, so the panel and the command line cannot disagree.
		</p>
	</section>

	<!-- ── how it reaches everything ────────────────────────────────────── -->
	<section>
		<p class="eyebrow">How it reaches everything</p>
		<h2>Derive once, apply everywhere.</h2>
		<p>
			The accent is expanded exactly once, by <code>ewe-theme</code>, into a token file. Everything
			that draws pixels reads that file — nothing re-derives, and nothing keeps a palette of its own.
		</p>
		<ol class="chain">
			<li>
				<span class="n">1</span>
				<div>
					<h3>ewe.conf</h3>
					<p>Your five keys. The only thing a human edits.</p>
				</div>
			</li>
			<li>
				<span class="n">2</span>
				<div>
					<h3>ewe-theme build</h3>
					<p>
						Derives the full set — around 90 colour roles plus the shape and size ramps — and writes
						<code>theme-tokens.json</code> and a matching <code>tokens.css</code>.
					</p>
				</div>
			</li>
			<li>
				<span class="n">3</span>
				<div>
					<h3>Everything reads it</h3>
					<p>
						The Quickshell desktop through one <code>Theme</code> singleton; Settings, Komble,
						ewe-sync and the installer through the CSS; GTK, Qt and the Hyprland window border
						through generated config. This website too — it is wearing the same file.
					</p>
				</div>
			</li>
			<li>
				<span class="n">4</span>
				<div>
					<h3>Live</h3>
					<p>
						Applied without a logout, without a restart. Change the accent and the bar, the control
						centre, the open apps and the window borders all move at once.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- ── the deviations, stated ───────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Two places ewe disagrees with Fluent</p>
		<h2>Both because of you picking yellow.</h2>
		<div class="grid">
			<div class="card">
				<h3><Icon name="eye" size={16} />Text on a brand fill is measured</h3>
				<p>
					Fluent hard-codes white on a brand button. ewe can't: pick yellow and white text vanishes.
					The foreground is measured against the actual fill, so a light accent gets ink instead.
					Move the picker above to yellow and watch the Apply button.
				</p>
			</div>
			<div class="card">
				<h3><Icon name="layers" size={16} />Cards get their own hover ladder</h3>
				<p>
					Fluent's top background level has no states, because its Card component carries them. ewe's
					panels are full of tiles that must react, so the ladder is extended using Fluent's own
					deltas — otherwise a hovered tile has to borrow a different surface's colour and visibly
					jumps.
				</p>
			</div>
		</div>
	</section>

	<!-- ── the honest limits ────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Deliberately not themeable</p>
		<h2>What the accent doesn't touch.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="triangle-alert" size={16} />Status colours</dt>
				<dd>
					Success, warning and danger are fixed. “This failed” must not change meaning because you
					picked a red accent.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="type" size={16} />Type</dt>
				<dd>Inter for text, JetBrains Mono for code, Lucide for icons. Sizes are a density decision; faces are not themed.</dd>
			</div>
			<div class="row">
				<dt><Icon name="monitor" size={16} />Light mode</dt>
				<dd>There isn't one, by decision. One look done properly beats two done half-heartedly.</dd>
			</div>
		</dl>
	</section>

	<!-- ── coming soon ──────────────────────────────────────────────────── -->
	<section>
		<div class="soon">
			<p class="eyebrow">Coming soon</p>
			<h2><Icon name="wand-sparkles" size={22} />The theme creator</h2>
			<p>
				The panel at the top of this page is the engine, not the product. The creator adds the rest
				of it: every one of the five keys as a control, the full role table with contrast measured
				against each surface, a real desktop preview rather than a sketch — and an export that
				hands you the <code>ewe-conf</code> lines to paste, or writes them straight into your
				machine from Settings.
			</p>
			<p class="muted">
				Shared themes come after that, and follow the same rule as everything else here: a theme is
				five keys, so sharing one is a link — never a package that runs code on your machine.
			</p>
		</div>
	</section>
</div>

<style>
	/* ── the live panel ───────────────────────────────────────────────────
	   Everything inside .demo is painted from the vars the engine just
	   produced, NOT from the page's own tokens — that is the whole point. */
	.demo {
		margin-top: 1.5rem;
		background: var(--bg-3);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-panel);
		padding: 1.1rem;
		color: var(--fg-1);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.7rem 1rem;
		margin-bottom: 1.1rem;
	}
	.swatchwrap {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--bg-1);
		border: var(--stroke-width) solid var(--stroke-1);
		border-radius: var(--radius-control);
		padding: 0.25rem 0.55rem 0.25rem 0.3rem;
		cursor: pointer;
	}
	.swatchwrap input {
		width: 28px;
		height: 24px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}
	.hex {
		font-family: var(--mono);
		font-size: 0.78rem;
		color: var(--fg-2);
		text-transform: lowercase;
	}
	.presets {
		display: flex;
		gap: 0.35rem;
	}
	.preset {
		width: 22px;
		height: 22px;
		border-radius: var(--radius-control);
		border: var(--stroke-width) solid var(--stroke-2);
		cursor: pointer;
		padding: 0;
	}
	.preset.on {
		box-shadow: 0 0 0 2px var(--bg-3), 0 0 0 4px var(--brand-fg-1);
	}
	.corners {
		display: flex;
		margin-left: auto;
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-control);
		overflow: hidden;
	}
	.seg {
		font: inherit;
		font-size: 0.76rem;
		padding: 0.24rem 0.6rem;
		background: none;
		border: 0;
		color: var(--fg-3);
		cursor: pointer;
	}
	.seg.on {
		background: var(--brand-bg);
		color: var(--fg-on-brand);
	}

	/* ── the sketch of a desktop ─────────────────────────────────────── */
	.mock {
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		overflow: hidden;
		background: var(--bg-4);
	}
	.mockbar {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		height: 34px;
		padding: 0 0.7rem;
		background: var(--bg-3);
		border-bottom: var(--stroke-width) solid var(--stroke-2);
		color: var(--fg-3);
	}
	.grow {
		flex: 1;
	}
	.badge {
		font-size: 0.68rem;
		line-height: 1;
		padding: 0.2rem 0.35rem;
		border-radius: 999px;
		background: var(--brand-bg);
		color: var(--fg-on-brand);
	}
	.clock {
		font-size: 0.78rem;
		color: var(--fg-2);
	}
	.mockbody {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		flex-wrap: wrap;
	}
	.tile {
		flex: 1 1 15rem;
		background: var(--bg-1);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		padding: 0.8rem;
	}
	.tilehead {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.86rem;
		margin-bottom: 0.5rem;
		color: var(--brand-fg-1);
	}
	.tilehead strong {
		color: var(--fg-1);
		font-weight: 500;
	}
	.listrow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.82rem;
		color: var(--fg-2);
		padding: 0.4rem 0;
		border-top: var(--stroke-width) solid var(--stroke-3);
	}
	.listrow .dot {
		width: 14px;
		height: 14px;
		border-radius: 999px;
		background: var(--brand-bg);
	}
	.sw {
		width: 32px;
		height: 16px;
		border-radius: 999px;
		background: var(--compound-brand-bg);
		position: relative;
		display: inline-block;
	}
	.sw i {
		position: absolute;
		right: 3px;
		top: 3px;
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--fg-inverted);
	}
	.mockbtns {
		display: flex;
		gap: 0.45rem;
		margin-top: 0.7rem;
	}
	.mb {
		font: inherit;
		font-size: 0.8rem;
		padding: 0.32rem 0.75rem;
		border-radius: var(--radius-control);
		border: var(--stroke-width) solid var(--stroke-1);
		background: var(--bg-1);
		color: var(--fg-1);
		cursor: pointer;
	}
	.mb.primary {
		background: var(--brand-bg);
		border-color: var(--brand-bg);
		color: var(--fg-on-brand);
	}
	.mocknote {
		flex: 1 1 14rem;
		font-size: 0.85rem;
		color: var(--fg-3);
		margin: 0;
		align-self: center;
	}

	/* ── the ramps ───────────────────────────────────────────────────── */
	.ramplabel {
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-4);
		margin: 1.1rem 0 0.45rem;
	}
	.ramp {
		display: flex;
		height: 30px;
		border-radius: var(--radius-control);
		overflow: hidden;
		border: var(--stroke-width) solid var(--stroke-2);
	}
	.ramp span {
		flex: 1;
	}
	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: 0.3rem 1.2rem;
	}
	.role {
		display: grid;
		grid-template-columns: 18px 8.5rem 1fr auto;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.78rem;
		padding: 0.25rem 0;
		border-bottom: var(--stroke-width) solid var(--stroke-3);
	}
	.role s {
		width: 18px;
		height: 18px;
		border-radius: var(--radius-control);
		border: var(--stroke-width) solid var(--stroke-2);
		display: block;
	}
	.role code {
		background: none;
		border: 0;
		padding: 0;
		font-size: 0.76rem;
		color: var(--fg-2);
	}
	.role span {
		color: var(--fg-4);
	}
	.role b {
		font-family: var(--mono);
		font-size: 0.72rem;
		font-weight: 400;
		color: var(--fg-3);
	}
	@media (max-width: 560px) {
		.role {
			grid-template-columns: 18px 1fr auto;
		}
		.role span {
			display: none;
		}
	}

	/* ── the rest of the page ────────────────────────────────────────── */
	section :global(.cmd) {
		margin-top: 0.9rem;
	}
	.rows :global(.icon) {
		color: var(--fg-3);
	}
	.card h3 :global(.icon) {
		color: var(--accent);
	}
	.chain {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		max-width: 44rem;
	}
	.chain li {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-card);
		padding: 0.9rem 1.05rem;
		margin: 0;
	}
	.n {
		flex: none;
		width: 1.55rem;
		height: 1.55rem;
		border-radius: 999px;
		display: grid;
		place-items: center;
		font-size: 0.78rem;
		color: var(--accent);
		border: var(--stroke-width) solid color-mix(in srgb, var(--accent) 45%, var(--stroke-2));
	}
	.chain h3 {
		margin-bottom: 0.2rem;
	}
	.chain p {
		font-size: 0.92rem;
		margin: 0;
	}
	.soon {
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--brand-stroke-2);
		border-radius: var(--radius-panel);
		padding: 1.3rem 1.4rem;
	}
	.soon h2 {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.soon h2 :global(.icon) {
		color: var(--accent);
	}
	.soon p + p {
		margin-top: 0.8rem;
	}
</style>
