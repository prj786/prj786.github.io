<script>
	import Icon from '$lib/Icon.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import Downloads from '$lib/design/Downloads.svelte';
	import { FLAT } from '$lib/design/nav.js';
	import DATA from '$lib/design/token-data.json';
	// the same file the page offers for download, checked by sync-design.sh
	import TEMPLATE from '../../../../static/schemes/scheme-template.yaml?raw';

	const DOWNLOADS = [
		{ href: '/schemes/scheme-template.yaml', label: 'scheme-template.yaml', note: 'A commented starter' },
		{ href: '/schemes/ewe-dark.yaml', label: 'ewe-dark.yaml', note: 'Ewe Dark, as the CLI exports it' },
		{ href: '/schemes/ewe-light.yaml', label: 'ewe-light.yaml', note: 'Ewe Light, as the CLI exports it' }
	];

	// [key, required, what it takes, default, meaning]
	const KEYS = [
		['system', 'no', '"base24" or "base16"', '—', 'The file format. ewe reads both; export writes base24.'],
		['name', 'no', 'text', '"Untitled"', 'What the scheme card in Settings shows.'],
		['slug', 'no', 'lowercase, digits and dashes', 'the name, lowercased', 'How ewe.conf stores the scheme and how commands name it. Importing a slug that exists replaces that scheme. ewe-dark and ewe-light are taken.'],
		['author', 'no', 'text', '—', 'Credit. Kept with the scheme.'],
		['variant', 'no', 'dark or light', 'dark (guessed from base00 on import)', 'Which way the surfaces run. It also picks the GTK and Qt theme and the icon theme variant.'],
		['accent', 'no', '"#rrggbb"', 'base0A', 'The accent the scheme wears. The accent roles and the whole accent ramp are regenerated from it.'],
		['semantic', 'no', 'true or false', 'true', 'true takes success, warning, danger and info from base0B, base09, base08 and base0D. false keeps Ewe’s own four.'],
		['palette', 'yes', 'base00 … base17', '—', 'The colors. base00 to base0F are required; base10 to base17 are optional.'],
		['overrides', 'no', 'role: "#rrggbb"', '—', 'Any color role, set by hand after the derivation. The guarantees still run on top.'],
		['builtin', 'no', 'true', '—', 'Marks Ewe Dark and Ewe Light, which can’t be changed or removed. In a file you import it is ignored.']
	];

	// [slot, dark scheme, light scheme, terminal (kitty)]
	const SLOTS = [
		['base00', 'surface-base; surface-sunken when there is no base10 (4 L darker)', 'the same', 'color0'],
		['base01', 'surface-raised; half of surface-overlay', 'surface-raised', '—'],
		['base02', 'surface-hover, surface-selected, border-subtle; surface-pressed (8 L toward base05); half of surface-overlay', 'surface-hover; surface-pressed (6 L toward base05); border-subtle (30% toward base03)', '—'],
		['base03', 'text-disabled; half of border-strong', 'text-disabled; half of border-strong; 30% of border-subtle', 'color8'],
		['base04', 'text-muted; half of border-strong', 'the same', '—'],
		['base05', 'text-primary; the glass tint, if it contrasts more than base07', 'text-primary; the scrim (32%) and the shadow ink; the glass tint, if it contrasts more than base07', 'foreground, color7'],
		['base06', 'text-secondary', 'text-secondary', '—'],
		['base07', 'the glass tint, if it contrasts more than base05', 'surface-overlay and surface-selected, when lighter than base00 (otherwise base00 lifted 2 L); the glass tint', 'color15'],
		['base08', 'danger, when semantic', 'the same', 'color1'],
		['base09', 'warning, when semantic', 'the same', '—'],
		['base0A', 'the accent, when the file has no accent key', 'the same', 'color3'],
		['base0B', 'success, when semantic', 'the same', 'color2'],
		['base0C', '—', '—', 'color6'],
		['base0D', 'info, when semantic', 'the same', 'color4'],
		['base0E', '—', '—', 'color5'],
		['base0F', '—', '—', '—'],
		['base10', 'surface-sunken', 'surface-sunken', '—'],
		['base11', 'the scrim, at 64% (black without it)', '—', '—'],
		['base12', '—', '—', 'color9'],
		['base13', '—', '—', 'color11'],
		['base14', '—', '—', 'color10'],
		['base15', '—', '—', 'color14'],
		['base16', '—', '—', 'color12'],
		['base17', '—', '—', 'color13']
	];
	const DARK = DATA.schemes['ewe-dark'].palette;
	const LIGHT = DATA.schemes['ewe-light'].palette;

	const COMMANDS = [
		{ cmd: 'ewe-theme scheme list', does: 'Every scheme, built-ins first; the active one is marked.' },
		{ cmd: 'ewe-theme scheme show', args: '[slug]', does: 'The finished roles and the list of what the guarantees adjusted.' },
		{ cmd: 'ewe-theme scheme apply', args: '<slug>', does: 'Switches to a scheme: ewe-dark, ewe-light or one of yours.' },
		{ cmd: 'ewe-theme scheme import', args: '<file or URL> [--name N] [--slug S] [--accent HEX] [--flavour F] [--apply]', does: 'Reads Base16 or Base24 YAML, Omarchy colors.toml, Catppuccin palette.json or Gogh YAML.' },
		{ cmd: 'ewe-theme scheme export', args: '[slug]', does: 'Prints the scheme as Base24 YAML.' },
		{ cmd: 'ewe-theme scheme duplicate', args: '<slug> [--name N] [--slug S] [--apply]', does: 'Copies any scheme, a built-in included, as a new one of yours.' },
		{ cmd: 'ewe-theme scheme set', args: '<field> <value> [--slug S]', does: 'Changes one field: accent, name, variant, semantic, base00 … base17 or overrides.<role>.' },
		{ cmd: 'ewe-theme scheme from-wallpaper', args: '[--light] [--path FILE] [--apply]', does: 'Makes a scheme from the current wallpaper.' },
		{ cmd: 'ewe-theme scheme remove', args: '<slug>', does: 'Removes one of your schemes. The built-ins stay.' }
	];

	const FORMATS = [
		['Base16 or Base24 YAML', 'The file or its raw URL', 'Read as it is: palette, name, author, variant and any ewe keys.'],
		['Catppuccin palette.json', '--flavour latte, frappe, macchiato or mocha (default mocha)', 'base, surfaces, text and the accents mapped onto the slots; blue becomes the accent.'],
		['Gogh YAML', 'The file', 'background, foreground and color_01 to color_16; the light or dark variant is read from the background.'],
		['Omarchy colors.toml', 'The file', 'Named after its folder; its accent key becomes the accent.']
	];

	const REACH = [
		['layout-panel-top', 'The shell', 'The bar, the dock, every panel, the lock screen — through theme-tokens.json and Theme.'],
		['sliders-horizontal', 'Settings, Komble and ewe-sync', 'Each app asks ewe-theme for the live tokens and sets them over its compiled tokens.css.'],
		['layers', 'Hyprland', 'The active window’s border takes the accent; the others take border-subtle.'],
		['monitor', 'GTK and Qt apps', 'adw-gtk3 in the scheme’s variant with the accent, and a matching qt6ct and qt5ct palette.'],
		['palette', 'The icon theme', 'The Reversal variant whose color is nearest the accent’s hue.'],
		['terminal', 'kitty, Zed and zathura', 'Their surfaces and accent follow the scheme; kitty’s sixteen colors come straight from the palette.']
	];

	const T = DATA.tokyo;
	const NEW_MOVES = T.after.adjusted.filter((a) => !T.before.adjusted.some((b) => b.role === a.role));
	const TOKYO_URL = 'https://raw.githubusercontent.com/tinted-theming/schemes/spec-0.11/base24/tokyo-night-dark.yaml';
</script>

<svelte:head>
	<title>Scheme files — Ewe design system</title>
	<meta
		name="description"
		content="How to write an ewe color scheme: an annotated Base24 file, every key, every palette slot and the roles it feeds, the overridable roles, the commands, imports and the contrast guarantees."
	/>
</svelte:head>

<p class="eyebrow">Design system · documentation</p>
<h1>Scheme files</h1>
<p class="lede">
	A scheme is a Base24 palette plus an accent. You write twenty-four colors, or just the first
	sixteen, and the generator derives every role the desktop paints with.
</p>

<Downloads items={DOWNLOADS} label="Scheme files" />

<section>
	<h2 id="idea">What a scheme is</h2>
	<p>
		Nothing on the ewe desktop names a color. A surface asks for a role — the ground, a raised panel,
		muted text, an outline — and <code>ewe-theme</code> decides what that role is worth. A scheme is
		the input to that decision: a palette, an accent and a few switches. It is data, never code.
	</p>
	<ol class="steps">
		<li><strong>Derive.</strong> Every role comes from one palette slot, a mix of two, or a step of the ramp generated from the accent. Mixes happen in OKLCH, so hue holds.</li>
		<li><strong>Override.</strong> Your <code>overrides</code> replace any role you set by hand.</li>
		<li><strong>Guarantee.</strong> The generator checks contrast and the distance between surfaces, and moves lightness where they fail.</li>
		<li><strong>Remap.</strong> Look presets and accessibility modes apply on top, the same way for every scheme.</li>
	</ol>
	<p>
		Ewe Dark and Ewe Light go through exactly the same steps. They carry no overrides, so every value
		they show is the derivation’s.
	</p>
</section>

<section>
	<h2 id="example">An annotated file</h2>
	<p>
		This is <a href="/schemes/scheme-template.yaml" download>scheme-template.yaml</a>, every key
		commented. Its palette is Ewe Dark’s, so it imports and works as it is; change the colors from
		there. Quote each color: an unquoted <code>#</code> starts a comment.
	</p>
	<Code code={TEMPLATE} />
</section>

<section>
	<h2 id="keys">Keys</h2>
	<p>Only <code>palette</code> is required. Anything ewe doesn’t know is ignored.</p>
	<div class="tbl">
		<table>
			<thead>
				<tr><th>Key</th><th>Required</th><th>Takes</th><th>Default</th><th>Meaning</th></tr>
			</thead>
			<tbody>
				{#each KEYS as [key, req, takes, dflt, meaning]}
					<tr>
						<td class="nowrap"><code>{key}</code></td>
						<td>{req}</td>
						<td>{takes}</td>
						<td>{dflt}</td>
						<td>{meaning}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="muted">
		Imported schemes are stored in <code>ewe.conf</code> as <code>[[desktop.theme.schemes]]</code>
		records, so they sync with the rest of your settings. The file you imported from is recorded as
		<code>source</code>.
	</p>
</section>

<section>
	<h2 id="palette">Palette slots</h2>
	<p>
		What each slot feeds, per variant, as <code>ewe-theme</code> on ewe <code>{DATA.ewe}</code>
		derives it. The chips are Ewe Dark’s and Ewe Light’s own values.
	</p>
	<div class="tbl">
		<table class="slots">
			<thead>
				<tr><th>Slot</th><th>Ewe Dark · Light</th><th>Dark scheme</th><th>Light scheme</th><th>Terminal</th></tr>
			</thead>
			<tbody>
				{#each SLOTS as [slot, dark, light, term]}
					<tr>
						<td class="nowrap"><code>{slot}</code></td>
						<td class="nowrap">
							<span class="chips">
								<span class="chip" style="background: {DARK[slot]}" title="{slot} in Ewe Dark: {DARK[slot]}"></span>
								<span class="chip" style="background: {LIGHT[slot]}" title="{slot} in Ewe Light: {LIGHT[slot]}"></span>
							</span>
						</td>
						<td>{dark}</td>
						<td>{light}</td>
						<td class="nowrap">{term}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p>
		The accent roles don’t read the palette at all: <code>accent</code> is the accent itself, and
		<code>accent-hover</code>, <code>accent-pressed</code>, <code>accent-subtle</code>,
		<code>accent-text</code>, <code>focus-ring</code> and <code>glass-accent</code> are steps of the
		ramp generated from it (<a href="/design/color/">Color</a> has the table).
		<code>on-accent</code> and <code>on-status</code> are <code>black</code> or
		<code>neutral-0</code>, whichever holds better. Any color darker than <code>black</code> or
		lighter than <code>neutral-0</code>, an imported <code>#000000</code> or <code>#ffffff</code>
		included, becomes that end of the range.
	</p>
	<Callout title="Where the guide and the code differ">
		<p>
			The role table in the color schemes guide is right in outline; the shipped generator adds a few
			details, and this page follows the generator. A light scheme’s overlay and selected surfaces use
			<code>base07</code> only when it is lighter than <code>base00</code>, since Base16 light
			schemes often put their darkest ink there. <code>on-status</code> is one ink for all four
			status colors. <code>text-primary</code> and <code>text-secondary</code> must also hold 4.5:1
			on <code>surface-pressed</code>. And kitty takes <code>base00</code>, <code>base03</code>,
			<code>base05</code> and <code>base07</code> too, but not <code>base0F</code>.
		</p>
	</Callout>
</section>

<section>
	<h2 id="overrides">Roles you can override</h2>
	<p>
		<code>overrides</code> takes these {DATA.overrideRoles.length} roles — the list
		<code>ewe-theme scheme set</code> prints when it meets a name it doesn’t know. Anything else is
		ignored.
	</p>
	<ul class="roles">
		{#each DATA.overrideRoles as role}<li><code>{role}</code></li>{/each}
	</ul>
	<p>
		An override replaces the derived value before the guarantees run, so an override that fails
		contrast is still moved, and the move is recorded. The four <code>*-subtle</code> grounds and
		<code>on-status</code> are the exception: they are applied last, exactly as written. The ramp,
		the neutrals, the scrim and the glass fills can’t be overridden; they follow the palette and the
		accent.
	</p>
</section>

<section>
	<h2 id="workflows">Workflows</h2>

	<h3 id="export-edit-import">Export, edit, import</h3>
	<p>
		The usual way to write a scheme. Export one, change it in any editor, bring it back. Give it
		your own <code>name</code> and <code>slug</code> first: a built-in’s slug is refused.
	</p>
	<Code code={`ewe-theme scheme export ewe-dark > ~/my-scheme.yaml
# edit name, slug and the colors
ewe-theme scheme import ~/my-scheme.yaml --apply`} />
	<p>
		Importing again under the same slug replaces the scheme, so edit and import as often as you
		like. <code>--slug</code> and <code>--name</code> on the command line win over the file.
	</p>

	<h3 id="duplicate">Duplicate a built-in</h3>
	<p>
		<code>duplicate</code> copies a scheme as one of yours. A built-in’s copy keeps the accent you
		had on, and from then on it’s an ordinary scheme you can change.
	</p>
	<Code code={`ewe-theme scheme duplicate ewe-light --name "Paper" --apply
ewe-theme scheme set base00 "#f7f3ea" --slug paper`} />

	<h3 id="set">Change one value</h3>
	<p>
		<code>set</code> changes one field of the active scheme, or of <code>--slug</code>. The field is
		<code>accent</code>, <code>name</code>, <code>variant</code>, <code>semantic</code>, a palette
		slot, or <code>overrides.&lt;role&gt;</code>. <code>none</code> clears an override back to the
		derived value. Built-in schemes refuse it; duplicate one first.
	</p>
	<Code code={`ewe-theme scheme set accent "#7e9cd8"
ewe-theme scheme set base02 "#2a2733"
ewe-theme scheme set overrides.border-subtle "#363646"
ewe-theme scheme set overrides.border-subtle none`} />

	<h3 id="wallpaper">From the wallpaper</h3>
	<p>
		<code>from-wallpaper</code> reads the current wallpaper’s dominant colors: a low-chroma ground in
		its hue and the most saturated color with real presence as the accent. The scheme is always
		called Wallpaper, slug <code>wallpaper</code>, and making another one replaces it. In Settings
		it’s the From wallpaper button, and the Wallpaper card’s menu has Make a light version.
	</p>
	<Code code={`ewe-theme scheme from-wallpaper --apply
ewe-theme scheme from-wallpaper --light --apply`} />

	<h3 id="imports">Other formats</h3>
	<p>
		Import reads the palettes other desktops and terminals publish, from a file or a URL. The format
		is recognized from the contents.
	</p>
	<div class="tbl">
		<table>
			<thead><tr><th>Format</th><th>Pass</th><th>How it maps</th></tr></thead>
			<tbody>
				{#each FORMATS as [f, pass, how]}
					<tr><td>{f}</td><td>{pass}</td><td>{how}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
	<Code code={`ewe-theme scheme import ~/dl/palette.json --flavour macchiato --apply
ewe-theme scheme import ~/.config/omarchy/themes/nord/colors.toml
ewe-theme scheme import ~/dl/dracula.yml --name "Dracula"`} />

	<h3 id="settings">In Settings</h3>
	<p>Settings → Appearance → Scheme does the same without a terminal.</p>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="palette" size={16} />Scheme cards</dt>
			<dd>
				Every scheme as a card: the two built-ins first, marked with a lock, then yours. Each card’s
				menu has Apply, Export as YAML (it copies the file to the clipboard) and Duplicate; your
				own schemes add Remove, which asks first.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="download" size={16} />Import scheme…</dt>
			<dd>
				A sheet: choose a YAML, TOML or JSON file, or paste a web address, and optionally a name.
				A JSON file adds a Catppuccin flavor picker. After the import a toast offers Apply.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="triangle-alert" size={16} />Adjusted for contrast</dt>
			<dd>
				When the generator had to move a role, the card shows an inline alert naming it —
				“Adjusted for contrast: text-muted, border-strong.” The accent picker says the same about
				the accent roles when a picked color can’t be used as it is.
			</dd>
		</div>
	</dl>
</section>

<section>
	<h2 id="guarantees">The guarantees, and what “adjusted” means</h2>
	<p>
		A scheme can look like anything, but it can’t make the desktop unusable. After deriving the roles
		and applying your overrides, the generator checks them:
	</p>
	<ul>
		<li>Text of every level, <code>accent-text</code> and the status colors reach 4.5:1 on every resting surface; primary and secondary text also on <code>surface-pressed</code>.</li>
		<li><code>border-strong</code> and <code>focus-ring</code> reach 3:1 on every resting surface.</li>
		<li>Raised, overlay and hover surfaces sit at least 2 L from the surface below, as far as the range from <code>black</code> to <code>neutral-0</code> allows.</li>
		<li>A <code>warning</code> within 20° of the accent’s hue turns toward red.</li>
		<li>With Glass on, text and <code>glass-accent</code> keep 4.5:1, and status colors 3:1, over the glass on a white and a black wallpaper.</li>
	</ul>
	<p>
		When a role fails, the generator moves its <strong>lightness only</strong> — the hue stays —
		step by step until the rule holds. That move is an <em>adjustment</em>. Each one is recorded with
		the role, the color before and after, and the reason; <code>ewe-theme scheme show</code> lists
		them and the scheme card names them. An adjustment is not an error: your scheme still applies,
		with a color that reads. Ewe Dark and Ewe Light need
		{DATA.adjusted['ewe-dark'].length + DATA.adjusted['ewe-light'].length === 0 ? 'none' : 'a few'}.
	</p>
</section>

<section>
	<h2 id="tokyo-night">Worked example: Tokyo Night</h2>
	<p>
		Tinted Theming’s Base24 <strong>{T.name}</strong> imports straight from its URL. Its accent
		comes from <code>base0A</code>, <code>{T.accent}</code>.
	</p>
	<Code code={`ewe-theme scheme import ${TOKYO_URL}`} />
	<p>The generator adjusts {T.before.adjusted.length} roles to keep the rules:</p>
	<div class="tbl">
		<table>
			<thead><tr><th>Role</th><th>From</th><th>To</th><th>Why</th></tr></thead>
			<tbody>
				{#each T.before.adjusted as a}
					<tr>
						<td class="nowrap"><code>{a.role}</code></td>
						<td class="num"><span class="chip sm" style="background: {a.from}"></span>{a.from}</td>
						<td class="num"><span class="chip sm" style="background: {a.to}"></span>{a.to}</td>
						<td>{a.why}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p>
		Contrast is fine now, but meaning isn’t: Tokyo Night puts a pale lavender in <code>base08</code>
		and a blue-grey in <code>base09</code>, so <code>danger</code> would be
		<code>{T.before.roles.danger}</code> and <code>warning</code> <code>{T.before.roles.warning}</code>.
		Two overrides give them the theme’s own red and orange:
	</p>
	<Code code={`ewe-theme scheme set overrides.danger "${T.after.overrides.danger}" --slug ${T.slug}
ewe-theme scheme set overrides.warning "${T.after.overrides.warning}" --slug ${T.slug}`} />
	<p>
		{#if NEW_MOVES.length === 0}
			Both hold 4.5:1 as they are, so nothing new is adjusted, and the scheme now exports like this:
		{:else}
			The generator adjusts {NEW_MOVES.map((a) => a.role).join(' and ')} again to keep contrast, and
			the scheme now exports like this:
		{/if}
	</p>
	<Code code={T.yaml} />
	<p class="muted">
		<code>semantic: false</code> would have been the other way out: Ewe’s own four status colors, and
		no overrides at all.
	</p>
</section>

<section>
	<h2 id="reach">Where a scheme reaches</h2>
	<dl class="rows">
		{#each REACH as [icon, where, how]}
			<div class="row">
				<dt><Icon name={icon} size={16} />{where}</dt>
				<dd>{how}</dd>
			</div>
		{/each}
	</dl>
	<p class="muted">
		Type, spacing, radii and sizes never change with the scheme. Those belong to the look presets
		and the accessibility modes.
	</p>
</section>

<section>
	<h2 id="commands">Every scheme command</h2>
	<p>
		Each prints one JSON object, except <code>export</code>, which prints YAML. The full reference is
		<a href="/docs/cli/ewe-theme/">ewe-theme</a>.
	</p>
	<CommandTable rows={COMMANDS} />
</section>

<PageNav flat={FLAT} />

<style>
	.steps {
		max-width: var(--measure);
		margin-top: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.chips {
		display: inline-flex;
		gap: var(--space-xxs);
		vertical-align: middle;
	}
	.chip {
		display: inline-block;
		width: var(--icon-lg);
		height: var(--icon-lg);
		border-radius: var(--slight);
		border: var(--border-width-1) solid var(--border-subtle);
		vertical-align: middle;
	}
	.chip.sm {
		width: var(--icon-sm);
		height: var(--icon-sm);
		margin-right: var(--space-xs);
	}
	.roles {
		list-style: none;
		padding: 0;
		margin: var(--space-md) 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		max-width: 52rem;
	}
	.roles li {
		margin: 0;
	}
	.rows {
		margin-top: var(--space-md);
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	section :global(.block) {
		max-width: 60rem;
	}
</style>
