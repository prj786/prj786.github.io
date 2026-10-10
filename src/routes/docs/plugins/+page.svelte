<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Icon from '$lib/Icon.svelte';
	import { EXAMPLE, GITHUB } from '$lib/docs/addons.js';
	const V3DEMO = GITHUB + 'ewe/tree/main/tests/fixtures/plugins/acme.v3demo';
</script>

<svelte:head>
	<title>Plugins — ewe docs</title>
	<meta
		name="description"
		content="Extend the ewe shell with your own plugin: Quick settings tiles and pages, bar glyphs, dock items, bar and desktop widgets, panels and services — a git URL in, one config bit, the same roles and rules as the plugins that ship with ewe."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Make your own.</h1>
<p class="lede">
	ewe's desktop is one long-lived Quickshell process. A plugin is a directory of QML that this
	process loads at startup, exactly as it loads its own bar and panels — the same
	<code>Theme</code> roles, the same public components, no widget zoo. Plugins are not apps:
	Komble installs programs, <code>ewe-plugin</code> extends the desktop. ewe's own extras are
	<a href="/docs/add-ons/">first-party plugins</a>: they ship inside ewe, are installed only when you
	ask, and are built on exactly what this page gives you.
</p>

<section>
	<h2>In one minute</h2>
	<Code
		code={`ewe-plugin add ${EXAMPLE}.git --enable
ewe-plugin list
qs ipc call example.hello toggle      # the example's panel
ewe-plugin disable example.hello`}
	/>
	<p>
		<code>add</code> clones, validates the manifest and remembers where it came from;
		<code>--enable</code> turns it on in the same step. Enabling restarts the shell — a second — and
		leaves your apps alone.
	</p>
</section>

<section>
	<h2>Make one</h2>
	<Code
		code={`ewe-plugin create acme.weather --name "Weather" --kinds quick-tile,quick-page,bar-status
cd acme.weather && ewe-plugin dev .     # linked, enabled, shell restarted, log follows`}
	/>
	<p>
		<code>create</code> gives you a git repository with a <em>working</em> plugin in it — a manifest,
		one QML per kind, a README that states the contract, an MIT license and a first commit. You own
		the QML: what it draws and does. ewe owns where it lives and what the user may change: a tile's
		place in the Quick settings grid, a page's rail entry, a bar widget's section and whether it is
		shown in the bar, a desktop widget's place, whether it is pinned, locked or hidden, and the
		values of the <code>settings</code> you declare, which Komble shows in your plugin's Options
		dialog. Push the repo and it is installable with <code>ewe-plugin add</code>.
	</p>
</section>

<section>
	<h2>What a plugin can be</h2>
	<p>Ten kinds, one manifest. The first four arrived with plugin API 3 in ewe 0.25.</p>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="layout-grid" size={16} />Quick settings tile</dt>
			<dd>
				A <code>Tile</code> in the home grid after the built-ins — half a row or the whole row, the
				manifest picks. Insomnia, VPN, SSH and the system monitor are tiles.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="sliders-horizontal" size={16} />Quick settings page</dt>
			<dd>
				A page the width of the panel with its own entry in the rail, reached by key:
				<code>quicksettings tab weather</code>. Mail, Phone, Cast and VPN each have one.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="layout-panel-top" size={16} />Bar status glyph</dt>
			<dd>
				A glyph inside the bar's Quick settings pill, shown only while there is something to say —
				the envelope with the unread count, the shield while a VPN is up. The plugin's
				<em>Show in bar</em> switch hides it.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="dock" size={16} />Dock item</dt>
			<dd>
				No QML at all: an icon, a label and the name of an action, drawn by the dock and lit while
				the action is open. Music and Places are dock items. Without the dock installed the item
				simply has no host.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="layout-panel-top" size={16} />Bar widget</dt>
			<dd>
				An item packed into the top bar between the built-in indicators — left, centre or right.
				The plugin's <em>Show in bar</em> switch — in its Options in Komble, or
				<code>ewe-plugin bar &lt;id&gt; off</code> — hides it without disabling the plugin.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="puzzle" size={16} />Desktop widget</dt>
			<dd>
				A clock, a note, a reminder — a sized item ewe puts on the desktop. Every one can be
				dragged at any time and <em>pinned</em> from the toolbar that appears when you point at it —
				above your windows, or above everything, fullscreen apps too. <em>Lock position</em> stops
				dragging. <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> is arrange mode: every widget gets
				its name and the Pinned, Lock and Hide chips. Its position and options live in
				<code>ewe.conf</code>, not in the plugin.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="layers" size={16} />Panel, overlay, menu</dt>
			<dd>
				A window the plugin owns: a floating panel, a fullscreen overlay, a summoned menu. Toggled
				by the plugin's own IPC target, so a keybind or a script can reach it. <code>AnchoredPopup</code>
				gives you a popup card that opens above the dock or under the bar and obeys the one-popup rule.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="zap" size={16} />Service</dt>
			<dd>
				Headless: timers, processes, D-Bus, a watcher — anything with no surface of its own. Runs
				from login, like the shell's own services.
			</dd>
		</div>
	</dl>
</section>

<section>
	<h2>The ones ewe ships</h2>
	<p>
		Thirteen of the desktop's own features are <a href="/docs/add-ons/">plugins that ship with
		ewe</a> — and the proof that the contract is enough: the dock is a <code>panel</code>, Mail is a
		<code>service</code> with a page and a glyph, Music is a dock item, a bar widget and a popup.
		Each has its own repository, <code>prj786/ewe-plugin-&lt;name&gt;</code>, and ewe carries a copy
		inside its package so <code>ewe-plugin install &lt;id&gt;</code> works offline.
	</p>
	<Code
		code={`ewe-plugin list --json | jq '.available[] | .id'   # the catalogue
ewe-plugin install ewe.insomnia                     # in, enabled, source "bundled"
ewe-plugin set ewe.screenshot copy false            # a first-party plugin's settings, like any other
ewe-plugin remove ewe.clipboard                     # gone — and ewe updates leave it out`}
	/>
	<p>
		They are also the worked examples — read their QML before writing yours. The smallest is
		<a href="{GITHUB}ewe-plugin-insomnia">Insomnia</a> (a service, a tile, a glyph); the
		<a href={V3DEMO}>acme.v3demo</a> fixture in the ewe repository exercises every API 3 kind in
		four small files.
	</p>
</section>

<section>
	<h2>Trust, honestly</h2>
	<p>
		Installing <strong>never runs plugin code</strong>. There are no install hooks and nothing asks
		for privileges: <code>add</code> clones the repository, validates its manifest and records the
		source; <code>install</code> copies out of the ewe package. The code runs the moment the plugin
		is enabled — unsandboxed, inside your shell process, with everything the desktop itself can do.
	</p>
	<Callout type="warning" title="Read it before you enable it">
		<p>
			QML inside one engine cannot be sandboxed, and the tool says so instead of pretending. A
			plugin is a small repository; reading it takes minutes. Prefer authors you can name.
		</p>
	</Callout>
</section>

<section>
	<h2>Where things live</h2>
	<Code
		code={`~/.config/ewe/plugins/<id>/        the plugins — code, outside the payload,
                                   never synced, never touched by an upgrade
~/.config/ewe/ewe.conf             [plugins] enabled = [...]  removed = [...]
                                   [plugins.sources] id = url | "bundled" | "local"
                                   [plugins.settings] / [plugins.widgets]
~/.local/state/ewe/plugins/<id>/   a plugin's own state (stateDir), never synced
~/.local/state/ewe/plugin-boots.json   the crash guard's counter
/usr/share/ewe/plugins/            the plugins ewe ships, and bundle.json`}
		copyable={false}
	/>
	<p>
		<code>[plugins.sources]</code> is the installed set — every plugin <code>add</code> or
		<code>install</code> put in, on or off, until <code>remove</code> forgets it — and it travels in
		<a href="/docs/one-file/">the one file</a>, so it syncs with the rest of the machine. On a fresh
		machine <code>ewe-plugin list</code> shows everything your other machine had, and
		<code>ewe-plugin restore</code> fetches the missing ones: git URLs cloned, bundled ones copied
		from the package. Komble's Plugins page and the Welcome flow offer the same with a button. A
		plugin added from a plain directory is recorded as <code>"local"</code>: nothing another machine
		could fetch.
	</p>
</section>

<section>
	<h2>Keeping them</h2>
	<dl class="rows">
		<div class="row">
			<dt>Update</dt>
			<dd>
				<code>ewe-plugin update</code> fast-forwards every git-managed plugin, showing the diff
				first. A manifest that stops validating is rolled back. The plugins that ship with ewe are
				refreshed by ewe updates instead, when their version changes.
			</dd>
		</div>
		<div class="row">
			<dt>Hide, not disable</dt>
			<dd>
				A bar widget and a pill glyph go with the plugin's <em>Show in bar</em> switch — in its
				Options in Komble, or <code>ewe-plugin bar &lt;id&gt; off</code> — while the plugin stays
				enabled. It is the map the built-in indicators use, <code>desktop.bar.show</code>, under
				the key <code>"plugin:&lt;id&gt;"</code>. A plugin whose own settings place its button —
				Music and Places — has no switch.
			</dd>
		</div>
		<div class="row">
			<dt>Remove</dt>
			<dd>
				A git clone or a bundled copy is deleted. A directory you made yourself is moved to
				<code>&lt;id&gt;.bak.&lt;stamp&gt;</code> instead — nothing hand-written is ever thrown away.
			</dd>
		</div>
	</dl>
</section>

<section>
	<h2>Safe mode</h2>
	<p>
		The shell restarts itself a second after any crash. A plugin that compiles and then crashes
		would therefore not be a broken widget — it would be a login loop with no desktop. So every
		start is counted: the <strong>third start inside a minute</strong> boots with no plugins loaded,
		and a notification names the ones that were enabled.
	</p>
	<Code
		code={`ewe-plugin list                # shows the safe-mode notice and the suspects
ewe-plugin disable acme.weather
systemctl --user restart ewe.service`}
	/>
	<p>
		A start that stays up for a minute clears the counter; the tool's own restarts never count. A
		plugin that fails to <em>compile</em> is not a crash — it is logged and skipped, and the rest of
		the desktop comes up.
	</p>
</section>

<section>
	<h2>Next</h2>
	<ul>
		<li><a href="/docs/plugins/writing/">Writing a plugin</a> — the manifest, the entry points, the loop.</li>
		<li><a href="/docs/plugins/api/">What a plugin may use</a> — the <code>Shell</code> singleton, the components, Theme roles, IPC.</li>
		<li><a href="/docs/cli/ewe-plugin/">ewe-plugin</a> — every verb, its output, its exit codes.</li>
		<li><a href="/docs/add-ons/">Plugins from ewe</a> — the thirteen ewe ships, and how a user gets one.</li>
		<li><a href={EXAMPLE}>ewe-plugin-example</a> — a service, a panel, a bar widget; clone it to start.</li>
	</ul>
</section>

<PageNav />
