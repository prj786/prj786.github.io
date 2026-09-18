<script>
	import Code from '$lib/docs/Code.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'show', does: 'The whole token set for this machine, as JSON — what the shell and the apps read. Includes css_vars, which the apps inject at runtime; adjusted, the roles the contrast rules had to move; bar, its icon size and the height that follows; and accent_presets, the Accent picker’s nine swatches with the ink each takes.' },
		{ cmd: 'build', args: '[--json F] [--css F] [--scheme SLUG] [--selector SEL]', does: 'Write theme-tokens.json (this machine) and tokens.css (the repo baseline, built from the defaults). ewe-conf runs it after every [desktop.theme] change. With --scheme it builds the CSS for another scheme without touching ewe.conf, and --selector wraps it in something other than :root — which is how this site gets its light and dark blocks.' },
		{ cmd: 'check', does: 'Drift: is what is on disk what the generator would build now?', prints: 'ok, or which file is stale' },
		{ cmd: 'preview', args: '[--out F]', does: 'A specimen page wearing the current tokens: ramps, controls, rows, glass, every type style and every color.' },
		{ cmd: 'scheme list', does: 'Every scheme — the two built-in ones first — with a five-color swatch each, and which is active.' },
		{ cmd: 'scheme show', args: '[slug]', does: 'One scheme’s palette, the roles it produces, and every role the guarantees adjusted, with the reason.' },
		{ cmd: 'scheme apply', args: '<slug>', does: 'Switch to ewe-dark, ewe-light or a user scheme. Repaints everything through ewe-conf’s hooks.' },
		{ cmd: 'scheme import', args: '<file | url> [--name N] [--slug S] [--accent #hex] [--flavour F] [--apply]', does: 'Base16 / Base24 YAML, Omarchy colors.toml, Catppuccin palette.json (--flavour latte…mocha), Gogh yml. The format is sniffed. A file that claims a built-in slug is refused; give it another name.' },
		{ cmd: 'scheme duplicate', args: '<slug> [--name N] [--slug S] [--apply]', does: 'Copy any scheme, including a built-in one, into a user scheme you can edit. The copy wears the accent the original was wearing.' },
		{ cmd: 'scheme remove', args: '<slug>', does: 'Forget a user scheme; if it was active, back to Ewe Dark. Built-in schemes cannot be removed.' },
		{ cmd: 'scheme export', args: '[slug]', does: 'The scheme as Base24 YAML on stdout — palette, keys and overrides, ready to import somewhere else.' },
		{ cmd: 'scheme set', args: '<field> <value> [--slug S]', does: 'One field of a user scheme: accent, name, variant (dark | light), semantic, base00…base17, or overrides.<role> — with none to clear an override. Built-in schemes refuse it; duplicate first.' },
		{ cmd: 'scheme from-wallpaper', args: '[--path F] [--light] [--name N] [--apply] [--if-changed]', does: 'A palette from the image: its most present color becomes the surfaces, its strongest the accent. --if-changed does nothing when the wallpaper scheme already comes from that image.' }
	];

	const fields = [
		['name, slug, author', 'How it is shown, stored and credited'],
		['variant', 'dark or light — which way the surfaces run, and which GTK, Qt and icon variant is used'],
		['accent', 'Optional. Without it, base0A or the person’s accent setting'],
		['semantic', 'true takes success, warning, danger and info from the palette; false keeps Ewe’s own'],
		['palette', 'Base24: base00–base0F required, base10–base17 optional'],
		['overrides', 'Optional. Any color role by name, applied after derivation — the guarantees still run over it'],
		['builtin', 'Only on Ewe Dark and Ewe Light, which are a palette and an accent with no overrides. They can be applied, exported and duplicated, not changed or removed']
	];
</script>

<svelte:head>
	<title>ewe-theme — ewe docs</title>
	<meta
		name="description"
		content="ewe-theme derives the desktop's tokens from a scheme and an accent — Ewe Dark, Ewe Light, an imported Base16/24, Omarchy, Catppuccin or Gogh palette, or one taken from the wallpaper — and applies them live."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-theme</code></h1>
<p class="lede">The one writer of what ewe looks like: a scheme and an accent in, every token out.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Nothing in ewe carries a color of its own. Every surface, outline and label asks for a
		<em>role</em>, and this tool decides what each role is worth — from the active scheme, the
		accent, the look presets and the accessibility modes. <a href="/theming/">How theming works</a>
		shows the derivation running live, and
		<a href="/design/color/">the design system</a> has the role table behind it.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code
		code={'ewe-theme <command> [arguments]\newe-theme scheme <verb> [arguments] [--no-hooks]'}
		copyable={false}
	/>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
	<p class="muted">
		The <code>scheme</code> verbs write <code>ewe.conf</code> through <code>ewe-conf</code>, whose
		hooks rebuild the tokens, run the color-scheme script for GTK, Qt, kitty and the rest, and poke
		the shell. <code>--no-hooks</code> writes only. Every command prints one JSON object and exits
		0, like the other ewe tools.
	</p>
</section>

<section>
	<h2>Examples</h2>
	<Code
		code={`ewe-theme scheme apply ewe-light                # the other built-in scheme
ewe-conf set desktop.theme.accent '"#7e9cd8"'   # any accent, on either of them
ewe-theme scheme import https://raw.githubusercontent.com/tinted-theming/schemes/spec-0.11/base24/kanagawa.yaml --apply
ewe-theme scheme import ~/omarchy/themes/tokyo-night/colors.toml --name "Tokyo Night" --apply
ewe-theme scheme duplicate ewe-dark --name "Night shift"
ewe-theme scheme set overrides.border-subtle '#363646' --slug night-shift
ewe-theme scheme set overrides.border-subtle none --slug night-shift
ewe-theme scheme from-wallpaper --apply
ewe-theme scheme export > ~/mine.yaml
ewe-theme scheme show                           # the roles, and what was adjusted`}
	/>
</section>

<section>
	<h2>What a scheme is</h2>
	<p>
		A Base24 palette plus a few keys. <code>base00</code>–<code>base07</code> run from the deepest
		background to the brightest foreground, <code>base08</code>–<code>base0F</code> are the eight
		hues, and <code>base10</code>–<code>base17</code> add deeper backgrounds and bright hues. Every
		role is derived from one entry, a mix of two, or a step of the ramp built from the accent, and
		nothing is darker than <code>black</code> or lighter than <code>neutral-0</code>. Then a user
		scheme’s <code>overrides</code> are applied, and then the guarantees run — text at 4.5:1,
		outlines and the focus ring at 3:1, surfaces at least 2 L apart, warning never within 20° of
		the accent. Shadows and gradients are derived from the same roles.
	</p>
	<dl class="rows">
		{#each fields as [key, meaning]}
			<div class="row"><dt><code>{key}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<p>
		User schemes live in <code>ewe.conf</code> under <code>[[desktop.theme.schemes]]</code>, so they
		sync and restore with everything else. The two built-in ones are known to the tool itself, so a
		hand-edited or synced config can never lose them.
	</p>
</section>

<section>
	<h2>Beyond color</h2>
	<p>
		The same build also carries the look presets and the accessibility modes, because they are
		remaps of the same tokens: <code>corner</code>, <code>density</code> and <code>stroke</code> in
		<code>[desktop.theme]</code>, and <code>reduce_motion</code>,
		<code>reduce_transparency</code>, <code>increase_contrast</code> and <code>text_scale</code> in
		<code>[desktop.accessibility]</code>. Bar opacity below 100 switches the bar, the dock and the
		lock card to the glass roles and turns the compositor's blur on. <code>[desktop.bar]
		icon_size</code> (small, normal, large) sets the bar’s modules and glyphs, and the bar’s height
		follows: 44, 48 or 56px.
	</p>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/theming/">Theming</a> — the derivation, live.</li>
		<li><a href="/design/color/">Design system: color</a> — every role and how it is derived.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — <code>[desktop.theme]</code> and the schemes table.</li>
		<li><a href="/docs/cli/ewe-conf/">ewe-conf</a> — the writer every scheme change goes through.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--surface-raised);
		border-color: var(--border-subtle);
		padding: 0.15em 0.4em;
	}
	section {
		margin-top: 0;
	}
	.rows :global(code) {
		background: none;
		border: 0;
		padding: 0;
	}
</style>
