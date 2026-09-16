<script>
	import Code from '$lib/docs/Code.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'show', does: 'The whole token set for this machine, as JSON — what the shell and the apps read. Includes css_vars, which the apps inject at runtime.' },
		{ cmd: 'build', args: '[--json F] [--css F]', does: 'Write theme-tokens.json (this machine) and tokens.css (the repo baseline). ewe-conf runs it after every [desktop.theme] change.' },
		{ cmd: 'check', does: 'Drift: is what is on disk what the engine would build now?', prints: 'ok, or which file is stale' },
		{ cmd: 'preview', args: '[--out F]', does: 'A specimen HTML page wearing the current tokens.' },
		{ cmd: 'scheme list', does: 'Your schemes, with a five-colour swatch each, and which is on.' },
		{ cmd: 'scheme show', args: '[slug]', does: 'One scheme’s palette and the roles it produces.' },
		{ cmd: 'scheme apply', args: '<slug | accent>', does: 'Switch to it — or back to the accent. Repaints everything through ewe-conf’s hooks.' },
		{ cmd: 'scheme import', args: '<file | url> [--name N] [--slug S] [--accent #hex] [--flavour F] [--apply]', does: 'Base16 / Base24 YAML, Omarchy colors.toml, Catppuccin palette.json (--flavour mocha…), Gogh yml. The format is sniffed.' },
		{ cmd: 'scheme remove', args: '<slug>', does: 'Forget it; if it was on, back to the accent.' },
		{ cmd: 'scheme export', args: '[slug]', does: 'The scheme as Base24 YAML on stdout — in accent mode, the live tokens as one.' },
		{ cmd: 'scheme set', args: '<field> <value> [--slug S]', does: 'accent, name, variant (dark | light), semantic, or base00…base17 — on the current scheme.' },
		{ cmd: 'scheme from-wallpaper', args: '[--path F] [--light] [--apply] [--if-changed]', does: 'A palette from the image: the most present colour becomes the surfaces, the strongest the accent. With scheme = "wallpaper" in ewe.conf the desktop re-derives on every wallpaper change.' }
	];
</script>

<svelte:head>
	<title>ewe-theme — ewe docs</title>
	<meta
		name="description"
		content="ewe-theme derives the desktop's tokens from one accent or a whole scheme — imported from Base16/24, Omarchy, Catppuccin or Gogh, written by hand, or taken from the wallpaper — and applies them live."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-theme</code></h1>
<p class="lede">The one writer of what ewe looks like: an accent or a scheme in, every token out.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Nothing in ewe carries a colour of its own. Every surface, stroke and label asks for a
		<em>role</em>, and this tool decides what each role is worth — from one accent (the default) or,
		since 0.19, from a whole palette. <a href="/theming/">How theming works</a> shows the engine
		running live.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-theme <command> [arguments]\newe-theme scheme <verb> [arguments] [--no-hooks]'} copyable={false} />
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
	<p class="muted">
		The <code>scheme</code> verbs write <code>ewe.conf</code> through <code>ewe-conf</code>, whose
		hooks rebuild the tokens, run <code>colorscheme.sh</code> for GTK, Qt, kitty and the rest, and
		poke the shell. <code>--no-hooks</code> writes only.
	</p>
</section>

<section>
	<h2>Examples</h2>
	<Code
		code={`ewe-theme scheme import https://raw.githubusercontent.com/tinted-theming/schemes/spec-0.11/base16/gruvbox-dark-medium.yaml --apply
ewe-theme scheme import ~/omarchy/themes/tokyo-night/colors.toml --name "Tokyo Night" --apply
ewe-theme scheme set accent '#fe8019'         # this scheme, a different accent
ewe-theme scheme from-wallpaper --apply       # then: ewe-conf set desktop.theme.scheme '"wallpaper"' to follow it
ewe-theme scheme export > ~/mine.yaml
ewe-theme scheme apply accent`}
	/>
</section>

<section>
	<h2>What a scheme is</h2>
	<p>
		A Base24 palette: <code>base00</code>–<code>base07</code> are the surfaces and text from the
		deepest background to the brightest foreground, <code>base08</code>–<code>base0F</code> eight
		hues (red, orange, yellow, green, cyan, blue, magenta, brown), <code>base10</code>–<code>base17</code>
		optional deeper backgrounds and bright hues. ewe pins its five surface levels on
		<code>base00</code>, <code>01</code>, <code>02</code> and <code>03</code>, its text on
		<code>04</code>, <code>05</code> and <code>07</code>, runs the brand ramp through the accent
		(<code>base0D</code> unless the scheme says otherwise), and takes status from
		<code>08</code>, <code>0A</code> and <code>0B</code>. A light scheme is the same anchors running
		the other way. Stored in <code>ewe.conf</code> under <code>[[desktop.theme.schemes]]</code>, so
		it syncs.
	</p>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/theming/">Theming</a> — the engine, live.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — <code>[desktop.theme]</code> and the schemes table.</li>
		<li><a href="/docs/cli/ewe-conf/">ewe-conf</a> — the writer every scheme change goes through.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--bg-2);
		border-color: var(--stroke-2);
		padding: 0.15em 0.4em;
	}
	section {
		margin-top: 0;
	}
</style>
