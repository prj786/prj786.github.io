<script>
	import Icon from '$lib/Icon.svelte';
	import Command from '$lib/Command.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Swatch from '$lib/design/Swatch.svelte';
	import Ramp from '$lib/design/Ramp.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const EWELLOW = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	const NEUTRAL = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];

	const SURFACES = [
		['surface-base', 'The ground: the desktop, a window, this page'],
		['surface-raised', 'A panel, a popup, a card, a notification'],
		['surface-overlay', 'A menu or a tooltip, above everything else'],
		['surface-sunken', 'A well: a field, a segmented control, a terminal'],
		['surface-hover', 'A row or a ghost control under the pointer'],
		['surface-pressed', 'The same, while it is held'],
		['surface-selected', 'The chosen item inside a sunken well'],
		['scrim', 'The wash a dialog sits on']
	];
	const TEXT = [
		['text-primary', 'Headings, labels, the answer you came for'],
		['text-secondary', 'Body copy and descriptions'],
		['text-muted', 'Captions, helper text, timestamps'],
		['text-disabled', 'A control that cannot be used now'],
		['border-subtle', 'Card and panel outlines, dividers'],
		['border-strong', 'Control outlines — 3:1 on every surface']
	];
	const ACCENT = [
		['accent', 'The one primary action in a view; the active workspace'],
		['accent-hover', 'That fill under the pointer'],
		['accent-pressed', 'That fill while it is held'],
		['on-accent', 'Text and icons on any accent fill'],
		['accent-subtle', 'A selected row, a nav item, a tinted tile'],
		['accent-text', 'The accent as a mark: links, numbers, meaningful icons'],
		['focus-ring', 'The keyboard focus outline']
	];
	const STATUS = [
		['success', 'Finished, connected, verified'],
		['warning', 'Worth knowing before it bites — orange, never the brand gold'],
		['danger', 'Failed, or about to be lost'],
		['info', 'Neutral news'],
		['success-subtle', 'The ground of a success alert'],
		['warning-subtle', 'The ground of a warning alert'],
		['danger-subtle', 'The ground of a danger alert'],
		['info-subtle', 'The ground of an info alert'],
		['on-status', 'Text on a filled status color']
	];
	const GLASS = [
		['glass-base', 'The bar and the lock card, at 80%'],
		['glass-raised', 'The dock, at 80%'],
		['glass-border', 'Their outline'],
		['glass-hover', 'A module under the pointer'],
		['glass-pressed', 'A module while it is held'],
		['glass-accent', 'The accent as a mark on glass, deep enough to hold over a wallpaper']
	];

	// [role, dark scheme, light scheme]
	const DERIVED = [
		['surface-base · surface-raised', 'base00 · base01', 'same'],
		['surface-overlay', 'halfway from base01 to base02', 'base07'],
		['surface-sunken', 'base10, or base00 darkened', 'same'],
		['surface-hover', 'base02', 'base02'],
		['surface-pressed', 'base02 moved 8 L toward base05', 'base02 moved 6 L toward base05'],
		['surface-selected', 'base02', 'base07'],
		['border-subtle', 'base02', '30% of the way from base02 to base03'],
		['border-strong', 'halfway from base03 to base04', 'same'],
		['text-primary · secondary · muted · disabled', 'base05 · base06 · base04 · base03', 'same'],
		['accent · accent-hover · accent-pressed', 'ewellow-500 (the accent) · 400 · 600', 'ewellow-500 · 600 · 700'],
		['accent-subtle', 'ewellow-950', 'ewellow-50'],
		['accent-text · focus-ring · glass-accent', 'ewellow-400 · 400 · 400', 'ewellow-800 · 700 · 900'],
		['on-accent · on-status', 'black or neutral-0, whichever contrasts more', 'same'],
		['success · warning · danger · info', 'base0B · base09 · base08 · base0D when the scheme says semantic, else Ewe’s own', 'same'],
		['the four *-subtle', 'the status color at 27 L, low chroma', 'the status color at 95 L, low chroma'],
		['scrim', 'base11 at 64%', 'base05 at 32%']
	];
</script>

<svelte:head>
	<title>Color — Ewe design system</title>
	<meta
		name="description"
		content="The Ewe palette: the gold ewellow, the warm neutral scale, the role tokens every surface reads, the two built-in schemes, and how an imported palette becomes a whole desktop."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Color</h1>
<p class="lede">
	One gold, one near-black, a warm grey scale between them — and a layer of roles on top, so nothing
	on screen ever names a color. The swatches on this page are painted with those roles, which is why
	they change when you switch the scheme in the header.
</p>

<section>
	<h2>The brand</h2>
	<p>
		<strong>Ewellow</strong> (<code>#eeb407</code>) is the hue Ewe is built on: a gold between
		yellow and orange that leans into neither. It is the default accent, and it stays the brand
		color for the logo, the installer and the wallpapers even when someone picks another accent.
		<strong>Black</strong> (<code>#020202</code>) is the deepest ground and
		<strong>neutral-0</strong> (<code>#fefdfc</code>) the lightest: Ewe has one black and one white,
		and nothing on screen goes past either. Every other color steps from the gold and the black:
		the accent ramp below, and the neutrals, tinted warm toward the gold.
	</p>
	<Ramp prefix="ewellow" steps={EWELLOW} label="Accent ramp — the accent itself is step 500" />
	<Ramp prefix="neutral" steps={NEUTRAL} label="Neutrals — a warm scale, not a grey one" />
	<p class="note">
		Pick your own accent and the <code>ewellow-*</code> ramp is regenerated from it: the same
		lightness ladder, the same chroma envelope, your hue. Each accent role is one of its steps.
		Build interfaces from the roles below, not from these steps.
	</p>
</section>

<section>
	<h2>Roles</h2>
	<p>
		A role says what a color is <em>for</em>. Components only ever ask for roles, so a scheme can
		change every value without a single component knowing.
	</p>

	<h3>Surfaces</h3>
	<p>Layered by how close to you they are, each at least 2 L apart from the one below.</p>
	<div class="swatches">
		{#each SURFACES as [token, note]}<Swatch {token} {note} />{/each}
	</div>

	<h3>Text and lines</h3>
	<p>Three levels of text, a fourth for disabled, and the two line weights' colors.</p>
	<div class="swatches">
		{#each TEXT as [token, note]}<Swatch {token} {note} />{/each}
	</div>

	<h3>Accent</h3>
	<p>
		Used sparingly: one primary action per view, the active workspace, on-states. Text on a gold
		fill is <code>on-accent</code>, which is measured against the fill — white would vanish on
		yellow.
	</p>
	<div class="swatches">
		{#each ACCENT as [token, note]}<Swatch {token} {note} on={token === 'on-accent' ? 'accent' : ''} />{/each}
	</div>

	<h3>Status</h3>
	<p>Always paired with an icon or a word; color alone never carries the meaning.</p>
	<div class="swatches">
		{#each STATUS as [token, note]}<Swatch {token} {note} />{/each}
	</div>

	<h3>Glass</h3>
	<p>
		A translucent surface remaps its roles to these, so the components on it work unchanged. See
		<a href="/design/motion/#glass">Glass</a>.
	</p>
	<div class="swatches">
		{#each GLASS as [token, note]}<Swatch {token} {note} />{/each}
	</div>
</section>

<section>
	<h2>Gradients</h2>
	<p>
		Gradients are part of the identity, and they stay slight: two close tones, never a multi-color
		blend, never on text or a small control.
	</p>
	<div class="gradients">
		<div class="g" style="background: var(--gradient-ember)"><span>gradient-ember</span></div>
		<div class="g" style="background: var(--gradient-night)"><span>gradient-night</span></div>
		<div class="g" style="background: var(--gradient-ewellow)"><span>gradient-ewellow</span></div>
		<div class="g glow"><span>gradient-glow</span></div>
	</div>
	<p class="muted">
		Ember for the wallpaper and the lock screen, night and glow behind panels, ewellow for large
		accent areas only. Their stops come from the scheme and the accent, so they change with both.
	</p>
</section>

<section>
	<h2>The two built-in schemes</h2>
	<p>
		<strong>Ewe Dark</strong> is the default: warm near-black surfaces with the gold accent.
		<strong>Ewe Light</strong> is the same design on warm off-white; the gold stays the fill color,
		while text and focus rings move to a deeper gold so they stay readable. Both are accent-led and
		use the same roles, so nothing ever checks which one is active — the header toggle on this site
		is that switch, and no page knows it happened.
	</p>
	<p>
		They are ordinary scheme records marked built-in, and they hold only a palette and an accent.
		No role is set by hand, so every value they show comes from the same derivation an imported
		scheme goes through. They can be applied, exported and duplicated, but not edited or removed.
		Duplicate one to start your own.
	</p>
</section>

<section>
	<h2>Schemes</h2>
	<p>
		A scheme is a Base24 palette — <code>base00</code> to <code>base0F</code>, plus eight optional
		steps — with a handful of Ewe keys: a name and slug, the variant (dark or light), an optional
		accent, whether status colors come from the palette, and an optional <code>overrides</code>
		table for any role someone wants to set by hand. From least to most effort, people can:
	</p>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="palette" size={16} />Pick a built-in</dt>
			<dd>Settings → Appearance shows Ewe Dark and Ewe Light as scheme cards.</dd>
		</div>
		<div class="row">
			<dt><Icon name="blend" size={16} />Pick an accent</dt>
			<dd>
				Any color. The accent roles and the ramp are regenerated from it; everything else stays as
				it was.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="download" size={16} />Import a palette</dt>
			<dd>
				Base16 and Base24 YAML, an Omarchy <code>colors.toml</code>, a Catppuccin
				<code>palette.json</code> with a flavour, or a Gogh terminal theme — from a file or a URL.
				A scheme can also be made from the current wallpaper.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="pen-line" size={16} />Write one</dt>
			<dd>
				Export a scheme, change its values in any editor, import it again. Single fields, including
				<code>overrides.&lt;role&gt;</code>, can also be set from the command line. There is no
				scheme editor screen: files, the command line and Import are the way in.
			</dd>
		</div>
	</dl>
	<Command value="ewe-theme scheme import ~/dl/kanagawa.yaml --apply" />
	<p class="muted">
		Imported schemes live in <code>ewe.conf</code>, so they sync with the rest of the machine's
		settings. A scheme is data — colors in a file — never something that runs.
	</p>
</section>

<section>
	<h2>How a palette becomes a desktop</h2>
	<p>
		Every role comes from one palette entry, a mix of two, or a step of the accent’s ramp. Mixes
		happen in OKLCH, so a mix keeps its hue instead of drifting through grey.
	</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Role</th><th>Dark scheme</th><th>Light scheme</th></tr>
			</thead>
			<tbody>
				{#each DERIVED as [role, dark, light]}
					<tr><td><code>{role}</code></td><td>{dark}</td><td>{light}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p>
		A derived value past <code>black</code> or <code>neutral-0</code>, an imported
		<code>#000000</code> or <code>#ffffff</code> included, becomes that end of the range. Shadows
		and gradients follow the scheme too: shadows are <code>black</code> in a dark scheme and
		<code>base05</code> in a light one, and the gradients take their stops from the surfaces and
		the ramp.
	</p>
	<p>
		A user scheme’s own <code>overrides</code> are applied on top of all that, and then the
		guarantees run. The built-in schemes have no overrides.
	</p>
</section>

<section>
	<h2>The guarantees</h2>
	<p>
		A scheme can look like anything, but it cannot make the desktop unusable. After deriving the
		roles the generator checks them and fixes what fails, moving lightness only and keeping the
		hue:
	</p>
	<ul>
		<li>Every level of text, the accent text and the status colors reach 4.5:1 on every resting surface.</li>
		<li>Control outlines and the focus ring reach 3:1 on every resting surface.</li>
		<li>
			Raised, overlay and hover surfaces stay at least 2 L from the surface below, so layers never
			merge into one flat color, as far as the range from <code>black</code> to
			<code>neutral-0</code> allows. A surface already at the end of that range stays there.
		</li>
		<li>
			If the accent lands within 20° of warning, warning turns toward red — a warning must never be
			mistaken for the brand.
		</li>
		<li>
			On glass, text and the accent mark keep 4.5:1 over the fill on both a white and a black
			wallpaper, and status glyphs keep 3:1.
		</li>
	</ul>
	<p>
		Every move is recorded. The scheme card in Settings names the roles that were adjusted and why,
		and <code>ewe-theme scheme show</code> lists them.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.swatches {
		margin-top: var(--space-s);
		border-top: var(--border-width-1) solid var(--border-subtle);
		max-width: 44rem;
	}
	.gradients {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: var(--space-s);
		margin-top: var(--space-md);
	}
	.g {
		display: flex;
		align-items: flex-end;
		height: calc(3 * var(--control-md));
		padding: var(--space-s);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
	}
	.g span {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-primary);
	}
	/* glow is a tint, so it needs a surface under it to be visible at all */
	.glow {
		background: var(--surface-raised) var(--gradient-glow);
	}
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 52rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 36rem;
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
	td code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	section :global(.cmd) {
		margin-top: var(--space-md);
	}
</style>
