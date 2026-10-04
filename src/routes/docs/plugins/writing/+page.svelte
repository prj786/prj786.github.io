<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	const EXAMPLE = 'https://github.com/prj786/ewe-plugin-example';

	const fields = [
		['schemaVersion', '1', 'The manifest format. Only this value is accepted.'],
		['id', '"acme.weather"', 'namespace.name, lowercase [a-z0-9_-], at least one dot. "ewe." is reserved for the add-ons. The install directory is named after it.'],
		['name', '"Weather"', 'What list and the catalogue card show.'],
		['version', '"0.1.0"', 'Yours to bump; list shows it.'],
		['apiVersion', '3', '3 or 2 — the shell loads both; any other value is refused at install, never at login. The quick-tile, quick-page, bar-status and dock-item kinds, ipcAliases and the keybind target rule need 3.'],
		['kinds', '["quick-tile", "quick-page"]', 'One or more of service, panel, overlay, menu, bar-widget, desktop-widget, quick-tile, quick-page, bar-status, dock-item.'],
		['entryPoints', '{ "quick-tile": "Tile.qml", … }', 'One .qml file per kind (none for dock-item), relative, inside the plugin. A symlink that resolves outside it is rejected.'],
		['quickTile', '{ "span": 1, "order": 10 }', 'Optional: half a row (1) or the whole row (2) of the Quick settings home grid. Whole-row cards come after every half-row tile, then by order.'],
		['quickPage', '{ "key", "label", "icon", "order" }', 'Required with quick-page. key is lowercase, unique, and not one the shell keeps (home wifi bt audio cal notifs); it is what quicksettings tab <key> and Shell.openQuickSettings(key) route to.'],
		['barStatus', '{ "order": 10 }', 'Optional: where the glyph sits in the pill after the shell’s own.'],
		['dockItem', '{ "icon", "label", "action", "order" }', 'Required with dock-item. Static — the dock draws the button and runs action (a Shell.registerAction name), or qs ipc call <id> toggle when none is registered.'],
		['requires', '{ "packages": [...], "commands": [...] }', 'Optional. Reported by list --json (missing) and install; never installed by the shell — Komble offers them.'],
		['icon · category', '"icSun" · "Utilities"', 'The catalogue card. Icons are Theme glyph names, resolved by the host.'],
		['barWidget.defaultSection', '"right"', 'left, center or right — where a bar widget is packed. Optional.'],
		['desktopWidget', '{ "x": 48, "y": 64, "layer": "desktop" }', 'Optional, for desktop-widget: the default place. The user’s placement in ewe.conf wins.'],
		['settings', '[{ "key", "type", "default", "label" }]', 'Optional: bool, int (min/max), string, choice (choices), color. The values reach every entry point as settings and render as a form in Komble.'],
		['keybinds', '[{ "combo": "SUPER + W", "ipc": "acme.weather toggle" }]', 'Optional: Hyprland binds generated while the plugin is enabled. With apiVersion 3 the target must be the plugin’s own id.'],
		['ipcAliases', '["player"]', 'Add-ons only ("ewe." ids): legacy IPC targets the plugin keeps alive after a feature moved out of the shell.'],
		['description · homepage · author', '', 'Optional; shown by info and the card.']
	];
</script>

<svelte:head>
	<title>Writing a plugin — ewe docs</title>
	<meta
		name="description"
		content="How to write an ewe shell plugin against API 3: the manifest, one QML entry point per kind — tile, page, bar glyph, dock item, widget, panel, service — and the try-it-locally loop."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Writing a plugin.</h1>
<p class="lede">
	A plugin is a git repository with a <code>manifest.json</code> at its root and one QML file per
	kind. Nothing is compiled, nothing is packaged — the shell reads the files where they are. Start
	from the example, or from an <a href="/docs/add-ons/">add-on</a>; they are the whole shape.
</p>

<section>
	<h2>0. Or let ewe write the first version</h2>
	<Code
		code={`ewe-plugin create acme.weather --name Weather --kinds quick-tile,quick-page,bar-status
cd acme.weather
ewe-plugin dev .        # links this folder into the plugins dir, enables it,
                        # restarts the shell and follows its log lines`}
	/>
	<p>
		That is a valid, loadable plugin and a git repository — the steps below are what it already did.
		<code>dev</code> links your working copy rather than copying it, so an edit is what the shell
		loads at the next restart; <code>ewe-plugin remove</code> on a link only unlinks it.
	</p>

	<h2>1. Start from the example</h2>
	<Code
		code={`git clone ${EXAMPLE}.git my-plugin
cd my-plugin && ls
#   manifest.json  Service.qml  Panel.qml  Widget.qml  README.md  LICENSE`}
	/>
	<p>
		Change <code>id</code> to your namespace and name, delete the kinds you do not need, and keep
		the rest. Everything below is what those files contain.
	</p>
</section>

<section>
	<h2>2. The manifest</h2>
	<Code
		code={`{
  "schemaVersion": 1,
  "id": "acme.weather",
  "name": "Weather",
  "version": "0.1.0",
  "apiVersion": 3,
  "description": "Conditions as a tile, the forecast on its page.",
  "homepage": "https://github.com/acme/ewe-weather",
  "author": "acme",
  "icon": "icSun",
  "category": "Utilities",
  "kinds": ["quick-tile", "quick-page", "bar-status", "service"],
  "entryPoints": { "quick-tile": "Tile.qml", "quick-page": "Page.qml",
                   "bar-status": "Status.qml", "service": "Service.qml" },
  "quickTile": { "span": 1, "order": 10 },
  "quickPage": { "key": "weather", "label": "Weather", "icon": "icSun", "order": 10 },
  "barStatus": { "order": 10 },
  "requires": { "packages": ["curl"], "commands": ["curl"] },
  "settings": [{ "key": "city", "type": "string", "default": "", "label": "City" }]
}`}
		copyable={false}
	/>
	<dl class="rows">
		{#each fields as [key, dflt, meaning]}
			<div class="row">
				<dt><code>{key}</code></dt>
				<dd>{meaning}{#if dflt} <span class="dflt">e.g. <code>{dflt}</code></span>{/if}</dd>
			</div>
		{/each}
	</dl>
</section>

<section>
	<h2>3. The entry points</h2>
	<p>
		Every file begins with <code>import qs</code>: that is the shell's own module, and it brings
		<code>Theme</code>, <code>Shell</code>, <code>Log</code> and the public components exactly as the
		first-party add-ons see them. What is public is on <a href="/docs/plugins/api/">the next page</a>.
		The host sets a few properties on your root — <code>pluginId</code>, <code>pluginDir</code>,
		<code>stateDir</code>, <code>settings</code>, and per kind <code>screen</code>,
		<code>barWindow</code>, <code>ink</code>, <code>panelOpen</code> — but only when the root declares
		them.
	</p>

	<h3>A Quick settings tile</h3>
	<Code
		code={`import QtQuick
import qs

Tile {
    property var settings: ({})
    property bool panelOpen: false       // this tile is on screen — poll only while true
    ic: Theme.icSun
    label: "Weather"
    sub: panelOpen ? "21°, partly cloudy" : ""
    onClicked: Shell.openQuickSettings("weather")
}`}
		copyable={false}
	/>
	<p>
		Root it on <code>Tile</code> and the host sizes it — <code>span</code> in the manifest — and
		places it after the built-ins. A whole-row card (<code>span: 2</code>) is what the system
		monitor uses.
	</p>

	<h3>A Quick settings page</h3>
	<Code
		code={`import QtQuick
import qs

Column {
    property bool panelOpen: false
    QsPageHead { title: "Weather"; note: "Updated 2 min ago" }
    QsSwitchRow { label: "Use my location"; toggled: (on) => Log.info("acme.weather", on) }
    QsEmpty { ic: Theme.icSun; title: "No forecast yet"; desc: "Set a city in Komble → Plugins." }
}`}
		copyable={false}
	/>
	<p>
		A <code>Column</code> the width of the panel, shown while its <code>quickPage.key</code> is the
		tab; start it with a <code>QsPageHead</code>. <code>qs ipc call quicksettings tab weather</code>
		opens it from anywhere.
	</p>

	<h3>A bar status glyph</h3>
	<Code
		code={`import QtQuick
import qs

BarStatusGlyph {
    property color ink: Theme.textSecondary     // the pill's current glyph colour
    glyph: Theme.icSun
    shown: weather.severe                       // set shown, not visible
}`}
		copyable={false}
	/>
	<p>
		It sits inside the bar's Quick settings pill after the shell's own glyphs, once per monitor.
		Set <code>shown</code> to whether it has something to say — the pill collapses it otherwise.
	</p>

	<h3>A dock item — no QML</h3>
	<Code
		code={`"kinds": ["dock-item", "panel"],
"dockItem": { "icon": "icSun", "label": "Weather", "action": "acme.weather.toggle", "order": 10 }`}
		copyable={false}
	/>
	<p>
		The dock draws the button; your panel registers the action —
		<code>Shell.registerAction("acme.weather.toggle", (anchor) =&gt; pop.toggleAt(anchor))</code> —
		and reports its open state through <code>AnchoredPopup</code>'s <code>action</code>, so the
		button lights while the popup is up. Without the dock installed, the item simply has no host.
	</p>

	<h3>A service — headless</h3>
	<Code
		code={`import QtQuick
import qs

QtObject {
    Component.onCompleted: Log.info("acme.weather", "up on ewe", Globals.version)
}`}
		copyable={false}
	/>

	<h3>A panel — a window, and the IPC that summons it</h3>
	<Code
		code={`import QtQuick
import Quickshell
import Quickshell.Io
import qs

Scope {
    id: root
    property bool shown: false

    IpcHandler {
        target: "acme.weather"                     // name it after your id
        function toggle(): void { root.shown = !root.shown }
    }

    PanelWindow {
        visible: root.shown
        anchors { bottom: true; right: true }
        margins { bottom: Theme.windowGap; right: Theme.windowGap }
        implicitWidth: Theme.panelSm; implicitHeight: 180
        color: "transparent"
        Rectangle {
            anchors.fill: parent
            radius: Theme.radiusRounded
            color: Theme.surfaceRaised
            border.width: Theme.borderWidth1; border.color: Theme.borderSubtle
            Text {
                anchors.centerIn: parent
                text: "Partly cloudy, 21°"
                color: Theme.textPrimary
                font.family: Theme.type.body.family
                font.pixelSize: Theme.type.body.size; font.weight: Theme.type.body.weight
            }
        }
    }
}`}
		copyable={false}
	/>
	<p>
		<code>qs ipc call acme.weather toggle</code> opens it from a terminal, a script, or a manifest
		<code>keybind</code>. Name the target after your id so it can never collide with the shell's
		own — with API 3 a keybind's target <em>must</em> be your id. A panel that opens above the dock
		keeps <code>Shell.bottomInset</code> clear, so nothing leaves a gap when no dock is installed.
	</p>

	<h3>A bar widget — an Item the bar packs</h3>
	<Code
		code={`import QtQuick
import qs

BarModule {
    property var settings: ({})
    property var barWindow: null                 // the bar this slot sits in, from the host
    glyph: Theme.icSun
    a11yName: "Weather"
    onActivated: pop.toggleAt(Shell.anchorFor(this, barWindow))

    AnchoredPopup {
        id: pop
        owner: "acme.weather"                    // what Shell.closePopups(id) spares
        name: "weather"
        implicitWidth: Theme.panelSm; implicitHeight: 180
        TextBody { anchors.centerIn: parent; text: "Partly cloudy, 21°" }
    }
}`}
		copyable={false}
	/>
	<Callout title="The bar-widget contract">
		<p>
			The root is an <code>Item</code> with an implicit size; the bar's row packs it like any
			built-in indicator, once per monitor. A module is <code>Theme.barModule</code> tall with
			<code>radiusPrimary</code> corners and no fill until pointed at
			(<code>barHoverFill</code>, then <code>barPressedFill</code>). Its glyph is
			<code>barIcon</code> in <code>textSecondary</code>, and <code>textPrimary</code> on hover.
			Rooting it on <code>BarModule</code> gives you all of that. Widgets append to their section
			after the built-ins, in id order; the centre yields on an output too narrow to hold it.
			<code>AnchoredPopup</code> opens under the bar from a top anchor and above the dock from a
			bottom one, closes on Esc or a click outside, and closes every other add-on popup when it
			opens.
		</p>
	</Callout>
</section>

<section>
	<h3>A desktop widget — a sized Item ewe places</h3>
	<Code
		code={`import QtQuick
import qs

Item {
    property var settings: ({})          // your declared options, from ewe.conf, live
    implicitWidth: 260
    implicitHeight: 96
    Rectangle { anchors.fill: parent; radius: Theme.radiusRounded; color: Theme.surfaceRaised
                border.width: Theme.borderWidth1; border.color: Theme.borderSubtle }
    Text { anchors.centerIn: parent; text: Qt.formatTime(new Date(), settings.seconds ? "hh:mm:ss" : "hh:mm")
           font.pixelSize: Theme.type.display.size; font.weight: Theme.type.display.weight
           color: Theme.textPrimary }
}`}
	/>
	<p>
		Give it a size and draw. Where it sits, on which output, whether it is above windows (sticky) or on
		the desktop, and whether it is shown at all are the <em>user's</em> decisions — arrange mode
		(<kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd>), Komble, or <code>ewe-plugin place</code> — kept in
		<code>ewe.conf</code> and applied live.
	</p>

	<h3>Settings you declare</h3>
	<Code
		code={`"settings": [
  { "key": "seconds", "type": "bool",   "default": false, "label": "Show seconds" },
  { "key": "city",    "type": "string", "default": "",    "label": "City" },
  { "key": "unit",    "type": "choice", "default": "C",   "label": "Unit", "choices": ["C", "F"] }
]`}
	/>
	<p>
		Five types — <code>bool</code>, <code>int</code> (with <code>min</code>/<code>max</code>),
		<code>string</code>, <code>choice</code>, <code>color</code>. Komble renders them as a form on your
		plugin's card, <code>ewe-plugin set acme.weather unit F</code> does the same from a terminal, and
		every entry point that declares <code>property var settings</code> receives the values — on load
		and on every change, without a restart.
	</p>

	<h2>4. Check it</h2>
	<Code code={'ewe-plugin validate ./my-plugin'} />
	<p>
		Every problem at once, not just the first: a bad id, a missing entry point, a kind that is not
		in the list, a symlink that escapes the directory. Exit 1 until it is clean.
	</p>
</section>

<section>
	<h2>5. Try it — <code>dev</code>, or by hand</h2>
	<Code code={'ewe-plugin dev ./my-plugin      # link + enable + restart + follow the log'} />
	<p>Or the long way, copying it in as a hand-made plugin:</p>
	<Code
		code={`ewe-plugin add ./my-plugin --enable     # copied in as a hand-made plugin
cd "$(ewe-plugin path)/acme.weather"    # iterate here …
systemctl --user restart ewe.service    # … and restart to see it
journalctl --user -u ewe.service -f     # QML errors name the file and line`}
	/>
	<p>
		A hand-made plugin is never pulled and never deleted — <code>remove</code> parks it as a
		backup. Set <code>HS_LOG_MODULES=acme.weather</code> in the shell's environment to see your
		<code>Log.debug</code> lines.
	</p>
</section>

<section>
	<h2>6. Publish it</h2>
	<Code
		code={`git push
ewe-plugin remove acme.weather
ewe-plugin add https://github.com/acme/ewe-weather.git --enable`}
	/>
	<p>
		That is how your users get it — a git URL, or Komble → Plugins — and from a clone,
		<code>update</code> works: a fast-forward with the diff shown first, rolled back if the manifest
		stops validating. Bump <code>version</code> when you change something; it is what
		<code>list</code> shows. If a package is needed, name it in <code>requires</code>: the tool
		reports what is missing and Komble offers to install it, but the shell never does.
	</p>
</section>

<section>
	<h2>Conventions worth keeping</h2>
	<dl class="rows">
		<div class="row"><dt>Ask for a role, never a value</dt><dd><code>Theme.surfaceBase</code>, not a hex; <code>Theme.spaceS</code>, not 8; <code>Theme.durBase</code>, not 200. The scheme, the accent and Text size are the user's and change at runtime; a hard-coded value is the one thing that will look foreign. The names are on <a href="/docs/plugins/api/">What a plugin may use</a>, with the table for moving an API 1 plugin.</dd></div>
		<div class="row"><dt>Use the kit</dt><dd>Root a tile on <code>Tile</code>, a page on <code>QsPageHead</code> and the <code>Qs*</code> rows, a bar widget on <code>BarModule</code>, a popup on <code>AnchoredPopup</code>. They already follow Glass, the look presets and the one-popup rule; a hand-drawn rectangle will not.</dd></div>
		<div class="row"><dt>Own your state</dt><dd>Keep files under <code>stateDir</code> (<code>~/.local/state/ewe/plugins/&lt;id&gt;</code>, created when first asked for); never write <code>ewe.conf</code> — declare a <code>setting</code> if the user should change it.</dd></div>
		<div class="row"><dt>Poll only while seen</dt><dd>A tile or page gets <code>panelOpen</code>; sample while it is true and stop when it is not. A bar widget polls for the whole session — the system monitor's bar readout is off by default for exactly that reason.</dd></div>
		<div class="row"><dt>Stay small</dt><dd>People will read your code before enabling it, because the docs tell them to. One file per kind, no build step, a README that says what it talks to.</dd></div>
	</dl>
</section>

<PageNav />

<style>
	h3 {
		margin-top: var(--space-lg);
	}
	.dflt {
		color: var(--text-muted);
	}
</style>
