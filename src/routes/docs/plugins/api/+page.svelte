<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const theme = [
		['Backgrounds', 'bg1 … bg6, card, subtle, panel — each with Hover / Pressed / Selected'],
		['Foregrounds', 'fg1 … fg4, fgDisabled, fgInverted, fgOnBrand'],
		['Brand & accent', 'accent, accentText, accentFill, brandBg, brandFg1, brandStroke1, link'],
		['Semantic', 'success, warning, danger, info — and their Bg / Border pairs'],
		['Strokes & radii', 'stroke1 … stroke3, strokeFocus1; radius, radiusInner, radiusControl, radiusPill'],
		['The bar', 'barHeight, barItemHeight, barItemRadius, barItemPad, barIconPx, barItemSpacing, barHover'],
		['Type', 'fontText, fontMono, fontIcons; fsSmall, fsBody, fsLarge, fsTitle'],
		['Motion', 'durFast, durBase, durSlow, ease'],
		['Icons', 'the ic* Lucide glyphs — icSun, icWifi, icBell, icStar … — drawn with fontIcons']
	];

	const reads = [
		['version', 'The desktop version, e.g. "0.14.0-beta".'],
		['accentColor', 'The user’s accent. Theme.accent already follows it; read this only to react to a change.'],
		['dnd', 'Do Not Disturb is on.'],
		['onBattery · lowPower', 'Unplugged; and the low-power mode the shell enters on battery.'],
		['locked', 'The session lock is up — stop animating, stop polling.'],
		['barShows(key)', 'Whether a bar indicator is shown; your widget’s key is plugin:<id>.']
	];
	const calls = [
		['openSettings() · openStore()', 'The settings app; Komble.'],
		['launchEntry(desktopId)', 'Launch an application by its .desktop id.'],
		['focusWindowByClass(cls)', 'Focus a running window by its class.'],
		['playSound(name)', 'One of the shell’s event sounds, respecting the user’s setting.']
	];
</script>

<svelte:head>
	<title>What a plugin may use — ewe docs</title>
	<meta
		name="description"
		content="The public API of the ewe shell for plugins: every Theme role, a named subset of Globals, Log, IPC targets, and what is private."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>What a plugin may use.</h1>
<p class="lede">
	<code>import qs</code> gives a plugin the shell's own modules. Of what it sees, this page is what
	is <strong>public</strong> — it will not change without the plugin <code>apiVersion</code> moving.
	Everything else is internal and may be renamed without notice.
</p>

<section>
	<h2><code>Theme</code> — every role</h2>
	<p>
		The whole vocabulary is public, by the names the designer's specification fixes. Ask for a role,
		never a value: the greys and the brand ramp are derived from the one accent in
		<code>ewe.conf</code> at runtime, and a plugin that uses roles recolours with the desktop.
	</p>
	<dl class="rows">
		{#each theme as [group, roles]}
			<div class="row"><dt>{group}</dt><dd><code class="soft">{roles}</code></dd></div>
		{/each}
	</dl>
	<Code
		code={`Rectangle { color: Theme.bg2; radius: Theme.radius }
Text { color: Theme.fg1; font.family: Theme.fontText; font.pixelSize: Theme.fsBody }
Text { text: Theme.icBell; font.family: Theme.fontIcons; font.pixelSize: Theme.barIconPx }`}
		copyable={false}
	/>
</section>

<section>
	<h2><code>Globals</code> — a named subset</h2>
	<p>Read:</p>
	<dl class="rows">
		{#each reads as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<p>Call:</p>
	<dl class="rows">
		{#each calls as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<Callout type="warning" title="Private, on purpose">
		<p>
			The <code>*Open</code> flags, the notification <code>server</code>, the updater and anything
			beginning with an underscore are the shell's own. A plugin that flips
			<code>settingsOpen</code> works today and breaks silently in a release — use
			<code>openSettings()</code>.
		</p>
	</Callout>
</section>

<section>
	<h2><code>Log</code></h2>
	<Code
		code={`Log.info("acme.weather", "fetched", n, "stations")
Log.warn("acme.weather", "no network")
Log.debug("acme.weather", "raw", payload)      // HS_LOG_MODULES=acme.weather to see`}
		copyable={false}
	/>
	<p>
		Lines land in the shell's journal — <code>journalctl --user -u ewe.service</code> — prefixed
		with your module name, so they can be filtered like the shell's own.
	</p>
</section>

<section>
	<h2><code>settings</code> — what the user chose</h2>
	<p>
		Declare <code>property var settings: ({'{'}{'}'})</code> on any entry point's root and ewe fills it
		with the values of the options your manifest declares — the defaults under the user's own,
		read from <code>ewe.conf</code> <code>[plugins.settings]</code>. It is assigned when the entry
		point loads and again whenever a value changes (<code>ewe-plugin set</code>, Komble's form), so
		bind to it and nothing needs a restart. Keys you did not declare never appear.
	</p>

	<h2>IPC</h2>
	<p>
		Anything a keybind or a script should reach is an <code>IpcHandler</code> in your entry point.
		Name the target after your id.
	</p>
	<Code
		code={`IpcHandler {
    target: "acme.weather"
    function toggle(): void { root.shown = !root.shown }
    function refresh(): void { root.fetch() }
}`}
		copyable={false}
	/>
	<Code
		code={`qs ipc call acme.weather toggle
qs ipc call plugins list           # what the host loaded, as JSON
qs ipc call plugins safeMode       # did this session boot with plugins off`}
	/>
	<p>
		The shell's own targets — <code>bar</code>, <code>settings</code>, <code>store</code>,
		<code>plugins</code>, <code>launcher</code>, <code>osd</code> and friends — are documented in
		the manual and are public API too.
	</p>
</section>

<section>
	<h2>Quickshell itself</h2>
	<p>
		It is the same engine, so everything Quickshell offers is available: <code>PanelWindow</code>,
		<code>Process</code>, <code>FileView</code>, the D-Bus, Hyprland, UPower and Bluetooth
		services. The <a href="https://quickshell.org/docs/">Quickshell documentation</a> is the
		reference; the shell's components in <code>~/.config/quickshell/</code> are the worked
		examples.
	</p>
</section>

<section>
	<h2>Versioning</h2>
	<p>
		The plugin API is <code>1</code>. It moves only on an incompatible change to this page; a
		manifest whose <code>apiVersion</code> differs is refused by <code>ewe-plugin add</code>, so an
		old plugin fails at install — never at login.
	</p>
</section>

<PageNav />

<style>
	code.soft {
		background: none;
		border: 0;
		padding: 0;
		color: var(--fg-2);
	}
</style>
