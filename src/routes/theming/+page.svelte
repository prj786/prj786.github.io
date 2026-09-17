<script>
	import Icon from '$lib/Icon.svelte';
	import Command from '$lib/Command.svelte';
	import { derive, cssVars, colorCss, accentRamp, RAMP_STEPS, EWELLOW } from '$lib/theme-engine.js';

	// A few accents worth trying — including a yellow, which is what proves
	// the point about text on an accent fill.
	const PRESETS = [
		{ name: 'Ewellow', hex: EWELLOW },
		{ name: 'Blue', hex: '#0a84ff' },
		{ name: 'Purple', hex: '#bf5af2' },
		{ name: 'Green', hex: '#30d158' },
		{ name: 'Yellow', hex: '#ffcc00' },
		{ name: 'Orange', hex: '#ff9f0a' },
		{ name: 'Red', hex: '#ff453a' },
		{ name: 'Teal', hex: '#40c8e0' }
	];

	let scheme = $state('ewe-dark');
	let accent = $state(EWELLOW);
	let corner = $state('medium');
	let density = $state('comfortable');
	let stroke = $state('thin');
	let glass = $state(false);
	let increaseContrast = $state(false);

	// Not a mock-up: `derive` is a port of ewe-theme's own derivation, held to
	// it by scripts/check-engine.sh — so every value below is the value a real
	// machine would get from the same scheme and accent.
	const theme = $derived(
		derive({
			scheme,
			accent,
			corner,
			density,
			stroke,
			barOpacity: glass ? 80 : 100,
			increaseContrast
		})
	);
	const vars = $derived(cssVars(theme));
	const ramp = $derived(accentRamp(theme.accent));

	// The roles worth naming out loud; the full set is about ninety.
	const SHOWN = [
		['surface-base', 'the desktop, a window, a page'],
		['surface-raised', 'a panel, a popup, a card'],
		['surface-hover', 'a row under the pointer'],
		['border-subtle', 'a panel outline'],
		['border-strong', 'a control outline'],
		['text-primary', 'the answer you came for'],
		['text-secondary', 'everything else that is text'],
		['accent', 'the one primary action'],
		['on-accent', 'text on that fill'],
		['accent-text', 'the accent as a mark'],
		['focus-ring', 'the keyboard focus outline'],
		['warning', 'never mistakable for the accent']
	];
</script>

<svelte:head>
	<title>Theming — ewe</title>
	<meta
		name="description"
		content="A scheme and an accent decide how the whole ewe desktop looks. Ewe Dark and Ewe Light ship built in; import a Base16/24, Omarchy, Catppuccin or Gogh palette, take one from your wallpaper, or write your own — one generator derives every role and keeps the contrast rules."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Theming</p>
	<h1>A scheme and an accent. Everything else follows.</h1>
	<p class="lede">
		ewe ships two schemes — <strong>Ewe Dark</strong> and <strong>Ewe Light</strong> — and one
		accent you can change to any color. From those, one generator derives every role the desktop
		reads: surfaces, text, outlines, the accent set, status colors and glass. Import a palette, take
		one from your wallpaper or write your own, and it goes through the same generator with the same
		contrast rules. The panel below runs it, for real, in your browser.
	</p>

	<!-- ── the live derivation ─────────────────────────────────────────── -->
	<section>
		<div class="demo" style={vars}>
			<div class="controls">
				<div class="seg" role="group" aria-label="Scheme">
					{#each [['ewe-dark', 'Ewe Dark'], ['ewe-light', 'Ewe Light']] as [slug, name]}
						<button class="segitem" class:on={scheme === slug} onclick={() => (scheme = slug)}
							>{name}</button
						>
					{/each}
				</div>
				<label class="swatchwrap">
					<input type="color" bind:value={accent} aria-label="Accent color" />
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
			</div>

			<!-- a piece of the desktop, wearing what the generator just produced -->
			<div class="mock">
				<div class="mockbar">
					<span class="ws">1</span>
					<span class="app">Settings</span>
					<span class="grow"></span>
					<Icon name="wifi" size={16} />
					<Icon name="package" size={16} />
					<span class="badge">3</span>
					<span class="clock">09:41</span>
				</div>
				<div class="mockbody">
					<div class="tile">
						<div class="tilehead">
							<Icon name="palette" size={16} />
							<strong>Appearance</strong>
						</div>
						<div class="listrow"><span>Accent color</span><span class="dot"></span></div>
						<div class="listrow"><span>Apply to open apps</span><span class="sw"><i></i></span></div>
						<div class="listrow sel"><span>Ewe Light</span><Icon name="check" size={16} /></div>
						<div class="mockbtns">
							<button class="mb primary">Apply</button>
							<button class="mb">Cancel</button>
						</div>
					</div>
					<p class="mocknote">
						Nothing here carries a color of its own. Every surface, outline and label asks for a
						<em>role</em>, and the scheme and accent above decide what that role is worth.
					</p>
				</div>
			</div>

			<div class="presetrow">
				<div class="field">
					<span class="flabel">Corner</span>
					<div class="seg">
						{#each ['none', 'small', 'medium', 'large'] as c}
							<button class="segitem" class:on={corner === c} onclick={() => (corner = c)}>{c}</button>
						{/each}
					</div>
				</div>
				<div class="field">
					<span class="flabel">Density</span>
					<div class="seg">
						{#each ['compact', 'comfortable', 'roomy'] as d}
							<button class="segitem" class:on={density === d} onclick={() => (density = d)}>{d}</button
							>
						{/each}
					</div>
				</div>
				<div class="field">
					<span class="flabel">Stroke</span>
					<div class="seg">
						{#each ['none', 'thin', 'thick'] as s}
							<button class="segitem" class:on={stroke === s} onclick={() => (stroke = s)}>{s}</button>
						{/each}
					</div>
				</div>
				<div class="field">
					<span class="flabel">Modes</span>
					<div class="seg">
						<button class="segitem" class:on={glass} onclick={() => (glass = !glass)}>Glass 80%</button>
						<button
							class="segitem"
							class:on={increaseContrast}
							onclick={() => (increaseContrast = !increaseContrast)}>Increase contrast</button
						>
					</div>
				</div>
			</div>

			<p class="ramplabel">Accent ramp — eleven steps, your color landing on 500</p>
			<div class="ramp">
				{#each RAMP_STEPS as s}
					<span style="background:{ramp[s]}" title="ewellow-{s} · {ramp[s]}"></span>
				{/each}
			</div>

			<p class="ramplabel">Roles, derived</p>
			<div class="roles">
				{#each SHOWN as [k, what]}
					<div class="role">
						<s style="background:{colorCss(k, theme.color, theme.alpha)}"></s>
						<code>--{k}</code>
						<span>{what}</span>
						<b>{theme.color[k]}</b>
					</div>
				{/each}
			</div>

			{#if theme.adjusted.length}
				<div class="adjusted">
					<Icon name="info" size={16} />
					<div>
						<strong>The generator moved {theme.adjusted.length} role{theme.adjusted.length > 1 ? 's' : ''} to keep the rules</strong>
						<ul>
							{#each theme.adjusted as a}
								<li><code>{a.role}</code> {a.from} → {a.to} — {a.why}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</div>
		<p class="figcap">
			Every role comes from one palette entry, a mix of two, or the accent — mixed in OKLCH so hue
			stays steady — and then the guarantees run: text at 4.5:1, outlines and the focus ring at
			3:1, surfaces at least 2 L apart, warning never within 20° of the accent.
			<a href="/design/color/">Color</a> in the design system has the whole table.
		</p>
	</section>

	<!-- ── the two schemes ──────────────────────────────────────────────── -->
	<section id="schemes">
		<p class="eyebrow">Built in</p>
		<h2>Dark by default. Light by choice.</h2>
		<p>
			Both built-in schemes are accent-led and use the same roles, so nothing in the shell or the
			apps checks which one is active. Ewe Dark is warm near-black with the gold accent; Ewe Light
			is the same design on warm off-white, with a deeper gold for text and focus rings so they
			stay readable. Neither can be edited or removed — duplicate one and the copy is yours.
		</p>
		<Command value="ewe-theme scheme apply ewe-light" />
		<Command value="ewe-theme scheme duplicate ewe-dark --name 'Night shift' --apply" />
	</section>

	<!-- ── what you can change ──────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Yours to change</p>
		<h2>Four steps, from one click to your own file.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="palette" size={16} />Pick a scheme</dt>
				<dd>Settings → Appearance shows both built-in schemes, then anything you added.</dd>
			</div>
			<div class="row">
				<dt><Icon name="blend" size={16} />Pick an accent</dt>
				<dd>
					Any color. The accent roles and the whole ramp are regenerated from it, and
					<code>on-accent</code> switches between black and white so text on the fill keeps 4.5:1 — which
					is why a yellow accent gets ink, not white.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="download" size={16} />Import a palette</dt>
				<dd>
					Base16 and Base24 YAML (Tinted Theming's several hundred), an Omarchy
					<code>colors.toml</code>, a Catppuccin <code>palette.json</code> with
					<code>--flavour</code>, or a Gogh terminal theme — from a file or a URL. Or take the
					colors out of your wallpaper.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="pen-line" size={16} />Write your own</dt>
				<dd>
					Export a scheme, edit it, import it back. There is no scheme editor screen: files, the
					command line and Import are the way in, and the generator makes any file usable.
				</dd>
			</div>
		</dl>
		<Command value="ewe-theme scheme import ~/dl/kanagawa.yaml --apply" />
		<Command value="ewe-theme scheme from-wallpaper --apply" />
	</section>

	<!-- ── the file ─────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The file</p>
		<h2>A scheme is twenty-four colors and a few keys.</h2>
		<p>
			Base24 YAML: <code>base00</code>–<code>base0F</code> required, <code>base10</code>–<code
				>base17</code
			> optional. On top of that, <code>name</code> and <code>slug</code>,
			<code>variant</code> (which way the surfaces run), an optional <code>accent</code>,
			<code>semantic</code> to take status colors from the palette, and an
			<code>overrides</code> table for the handful of roles a palette cannot express — the overlay
			and pressed surfaces, both outlines, accent text and the focus ring. Overrides are applied
			after derivation, and the guarantees still run over them.
		</p>
		<Command value="ewe-theme scheme set overrides.border-subtle '#363646'" />
		<p class="note">
			Imported schemes are stored in <a href="/how/"><code>ewe.conf</code></a>, so they sync and
			restore with everything else about your machine. A scheme is data — colors in a file — never a
			package that runs code.
		</p>
	</section>

	<!-- ── presets and modes ────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The feel, separately</p>
		<h2>Corners, density, outlines — and four accessibility modes.</h2>
		<p>
			Look presets change shape and size without touching color or type:
			<code>corner</code> (none, small, medium, large), <code>density</code> (compact, comfortable,
			roomy) and <code>stroke</code> (none, thin, thick). The accessibility modes — reduce motion,
			reduce transparency, increase contrast and text size at 100/115/130% — are remaps too, so they
			combine with any scheme and any preset. Try the four rows in the panel above.
		</p>
		<Command value="ewe-conf set desktop.theme.corner 'large'" />
		<p class="muted">
			<a href="/design/shape/#presets">Every preset value</a> and
			<a href="/design/accessibility/">what each mode changes</a> are in the design system.
		</p>
	</section>

	<!-- ── glass ────────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Glass</p>
		<h2>Translucent, but still readable.</h2>
		<p>
			The bar opacity setting makes the bar, the dock and the lock-screen card translucent and
			blurs the wallpaper behind them. The Glass preset is 80% — the lowest value where text still
			holds 4.5:1 over any wallpaper, in both schemes. Only fills turn translucent: text, glyphs,
			badges and accent fills stay solid, and panels, menus and dialogs never go glass at all.
		</p>
		<Command value="ewe-conf set desktop.theme.bar_opacity 80" />
	</section>

	<!-- ── how it reaches everything ────────────────────────────────────── -->
	<section>
		<p class="eyebrow">How it reaches everything</p>
		<h2>Derive once, apply everywhere.</h2>
		<p>
			The scheme is expanded exactly once, by <code>ewe-theme</code>, into a token file. Everything
			that draws pixels reads that file — nothing re-derives, and nothing keeps a palette of its
			own.
		</p>
		<ol class="chain">
			<li>
				<span class="n">1</span>
				<div>
					<h3>ewe.conf</h3>
					<p>The scheme, the accent, the presets and the modes. The only thing a human edits.</p>
				</div>
			</li>
			<li>
				<span class="n">2</span>
				<div>
					<h3>ewe-theme build</h3>
					<p>
						Derives the full set — every color role plus the type, shape and size tokens — and
						writes <code>theme-tokens.json</code> and a matching <code>tokens.css</code>.
					</p>
				</div>
			</li>
			<li>
				<span class="n">3</span>
				<div>
					<h3>Everything reads it</h3>
					<p>
						The Quickshell desktop through one <code>Theme</code> singleton; Settings, Komble and
						ewe-sync through the CSS; GTK, Qt, the icon theme, kitty and the Hyprland window border
						through generated config. This website too — it is wearing the same file.
					</p>
				</div>
			</li>
			<li>
				<span class="n">4</span>
				<div>
					<h3>Live</h3>
					<p>
						Applied without a logout or a restart: change the accent and the bar, Quick settings,
						the open apps and the window borders all move at once.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- ── the honest limits ────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Deliberately not themeable</p>
		<h2>What a scheme doesn't touch.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="type" size={16} />Type</dt>
				<dd>
					Geist for text, Geist Mono for code, Lucide for icons. Sizes follow the text size
					setting; the faces are not themed.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="ruler" size={16} />Shape and motion</dt>
				<dd>
					Radii, spacing and sizes are a look preset, not a scheme; the four motion durations are
					fixed, and the animation speed setting divides them.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="triangle-alert" size={16} />The meaning of a color</dt>
				<dd>
					A scheme brings its own green, yellow and red when it says <code>semantic</code>, but
					“this failed” never becomes a decorative choice: warning turns away from your accent if
					the two would look alike, and status is always paired with an icon or a word.
				</dd>
			</div>
		</dl>
	</section>

	<!-- ── the CLI ──────────────────────────────────────────────────────── -->
	<section>
		<div class="soon">
			<p class="eyebrow">The command line</p>
			<h2><Icon name="terminal" size={22} />ewe-theme scheme</h2>
			<p>
				<code>list</code> · <code>show</code> · <code>apply &lt;slug&gt;</code> ·
				<code>import &lt;file|url&gt;</code> · <code>duplicate</code> · <code>export</code> ·
				<code>set &lt;field&gt;</code> · <code>remove</code> ·
				<code>from-wallpaper</code>. Every write goes through <code>ewe-conf</code>, whose hooks
				repaint the shell and the toolkits — <a href="/docs/cli/ewe-theme/">the reference</a> has
				every flag.
			</p>
		</div>
	</section>
</div>

<style>
	/* ── the live panel ───────────────────────────────────────────────────
	   Everything inside .demo is painted from the vars the engine just
	   produced, NOT from the page's own tokens — that is the whole point. */
	.demo {
		margin-top: var(--space-md);
		background: var(--surface-base);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-s) + var(--space-xs));
		color: var(--text-primary);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-s) var(--space-md);
		margin-bottom: var(--space-md);
	}
	.swatchwrap {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		height: var(--control-md);
		padding: 0 var(--space-s) 0 var(--space-xxs);
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-strong);
		border-radius: var(--primary);
		cursor: pointer;
	}
	.swatchwrap input {
		width: 24px;
		height: 20px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}
	.hex {
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		color: var(--text-secondary);
		text-transform: lowercase;
	}
	.presets {
		display: flex;
		gap: var(--space-xs);
	}
	.preset {
		width: var(--control-sm);
		height: var(--control-sm);
		border-radius: var(--primary);
		border: var(--border-width-1) solid var(--border-subtle);
		cursor: pointer;
		padding: 0;
	}
	.preset.on {
		outline: var(--border-width-2) solid var(--focus-ring);
		outline-offset: var(--border-width-1);
	}

	/* the Segmented control */
	.seg {
		display: inline-flex;
		gap: var(--space-xxs);
		padding: var(--space-xxs);
		background: var(--surface-sunken);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--primary);
	}
	.segitem {
		font: inherit;
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-medium);
		min-height: var(--control-sm);
		padding: 0 var(--space-s);
		border: var(--border-width-1) solid transparent;
		border-radius: var(--secondary);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
	}
	.segitem:hover {
		color: var(--text-primary);
	}
	.segitem.on {
		background: var(--surface-selected);
		border-color: var(--border-subtle);
		color: var(--text-primary);
	}
	.presetrow {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s) var(--space-md);
		margin-top: var(--space-md);
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
	}
	.flabel {
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	/* ── the sketch of a desktop ─────────────────────────────────────── */
	.mock {
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		overflow: hidden;
		background: var(--surface-sunken);
	}
	.mockbar {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		height: var(--control-xl);
		padding: 0 var(--space-s);
		background: var(--glass-base);
		border-bottom: var(--border-width-1) solid var(--glass-border);
		color: var(--text-secondary);
	}
	.ws {
		display: grid;
		place-items: center;
		min-width: var(--control-sm);
		height: var(--control-sm);
		border-radius: var(--primary);
		background: var(--accent-subtle);
		color: var(--accent-text);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
	}
	.app {
		font-size: var(--font-size-s);
		color: var(--text-primary);
	}
	.grow {
		flex: 1;
	}
	.badge {
		display: inline-grid;
		place-items: center;
		min-width: var(--line-height-xs);
		height: var(--line-height-xs);
		padding: 0 var(--space-xs);
		border-radius: var(--fully-rounded);
		background: var(--accent);
		color: var(--on-accent);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
	}
	.clock {
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
		color: var(--text-primary);
	}
	.mockbody {
		display: flex;
		gap: var(--space-md);
		padding: var(--space-md);
		flex-wrap: wrap;
		background: var(--surface-base);
	}
	.tile {
		flex: 1 1 16rem;
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: var(--space-s);
	}
	.tilehead {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--font-size-md);
		margin-bottom: var(--space-xs);
		color: var(--accent-text);
	}
	.tilehead strong {
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
	}
	.listrow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		min-height: var(--control-md);
		padding: 0 var(--space-s);
		border-radius: var(--secondary);
		font-size: var(--font-size-md);
		color: var(--text-secondary);
	}
	.listrow.sel {
		background: var(--accent-subtle);
		color: var(--text-primary);
	}
	.listrow .dot {
		width: var(--icon-sm);
		height: var(--icon-sm);
		border-radius: var(--fully-rounded);
		background: var(--accent);
	}
	.sw {
		width: calc(2 * var(--space-md));
		height: var(--space-md);
		border-radius: var(--fully-rounded);
		background: var(--accent);
		position: relative;
		display: inline-block;
	}
	.sw i {
		position: absolute;
		right: 2px;
		top: 2px;
		width: 12px;
		height: 12px;
		border-radius: var(--fully-rounded);
		background: var(--on-accent);
	}
	.mockbtns {
		display: flex;
		gap: var(--space-xs);
		margin-top: var(--space-s);
	}
	.mb {
		font: inherit;
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-medium);
		height: var(--control-md);
		padding: 0 calc(var(--space-s) + var(--space-xs));
		border-radius: var(--primary);
		border: var(--border-width-1) solid var(--border-strong);
		background: var(--surface-raised);
		color: var(--text-primary);
		cursor: pointer;
	}
	.mb.primary {
		background: var(--accent);
		border-color: transparent;
		color: var(--on-accent);
	}
	.mocknote {
		flex: 1 1 14rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-muted);
		margin: 0;
		align-self: center;
	}

	/* ── the ramps and roles ─────────────────────────────────────────── */
	.ramplabel {
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		margin: var(--space-md) 0 var(--space-xs);
	}
	.ramp {
		display: flex;
		height: var(--control-md);
		border-radius: var(--primary);
		overflow: hidden;
		border: var(--border-width-1) solid var(--border-subtle);
	}
	.ramp span {
		flex: 1;
	}
	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
		gap: 0 var(--space-md);
	}
	.role {
		display: grid;
		grid-template-columns: var(--icon-lg) 8.5rem 1fr auto;
		align-items: center;
		gap: var(--space-s);
		font-size: var(--font-size-s);
		padding: var(--space-xxs) 0;
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	.role s {
		width: var(--icon-lg);
		height: var(--icon-lg);
		border-radius: var(--slight);
		border: var(--border-width-1) solid var(--border-subtle);
		display: block;
	}
	.role code {
		background: none;
		border: 0;
		padding: 0;
		font-size: var(--font-size-s);
		color: var(--text-secondary);
	}
	.role span {
		color: var(--text-muted);
	}
	.role b {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-regular);
		color: var(--text-muted);
	}
	@media (max-width: 560px) {
		.role {
			grid-template-columns: var(--icon-lg) 1fr auto;
		}
		.role span {
			display: none;
		}
	}

	/* the Inline alert the scheme card shows when a role had to move */
	.adjusted {
		display: flex;
		gap: var(--space-s);
		margin-top: var(--space-md);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-radius: var(--primary);
		background: var(--info-subtle);
		color: var(--text-primary);
		font-size: var(--font-size-md);
	}
	.adjusted :global(.icon) {
		color: var(--info);
		margin-top: 2px;
	}
	.adjusted ul {
		margin: var(--space-xxs) 0 0;
		padding-left: var(--space-md);
		color: var(--text-secondary);
		font-size: var(--font-size-s);
		max-width: none;
	}
	.adjusted li {
		margin: 0;
	}
	.adjusted code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
	}

	/* ── the rest of the page ────────────────────────────────────────── */
	section :global(.cmd) {
		margin-top: var(--space-s);
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	.chain {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		max-width: 44rem;
	}
	.chain li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-s) + var(--space-xs));
		margin: 0;
	}
	.n {
		flex: none;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		display: grid;
		place-items: center;
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.chain h3 {
		margin-bottom: var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.chain p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		margin: 0;
	}
	.soon {
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-md) + var(--space-xs));
	}
	.soon h2 {
		display: flex;
		align-items: center;
		gap: var(--space-s);
	}
	.soon h2 :global(.icon) {
		color: var(--accent-text);
	}
</style>
