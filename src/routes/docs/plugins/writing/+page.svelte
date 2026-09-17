<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	const EXAMPLE = 'https://github.com/prj786/ewe-plugin-example';

	const fields = [
		['schemaVersion', '1', 'The manifest format. Only this value is accepted.'],
		['id', '"acme.weather"', 'namespace.name, lowercase [a-z0-9_-], at least one dot. "ewe." is reserved. The install directory is named after it.'],
		['name', '"Weather"', 'What list shows.'],
		['version', '"0.1.0"', 'Yours to bump; list shows it.'],
		['apiVersion', '1', 'The plugin API this was written against. A mismatch is refused at install, never at login.'],
		['kinds', '["bar-widget", "panel"]', 'One or more of service, panel, overlay, menu, bar-widget.'],
		['entryPoints', '{ "bar-widget": "Widget.qml", … }', 'One .qml file per kind, relative, inside the plugin. A symlink that resolves outside it is rejected.'],
		['barWidget.defaultSection', '"right"', 'left, center or right — where the widget is packed. Optional.'],
		['description · homepage · author', '', 'Optional; shown by info.']
	];
</script>

<svelte:head>
	<title>Writing a plugin — ewe docs</title>
	<meta
		name="description"
		content="How to write an ewe shell plugin: the manifest, one QML entry point per kind, the bar-widget contract, and the try-it-locally loop."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Writing a plugin.</h1>
<p class="lede">
	A plugin is a git repository with a <code>manifest.json</code> at its root and one QML file per
	kind. Nothing is compiled, nothing is packaged — the shell reads the files where they are. Start
	from the example; it is the whole shape.
</p>

<section>
	<h2>0. Or let ewe write the first version</h2>
	<Code
		code={`ewe-plugin create acme.weather --name Weather --kinds bar-widget,panel --section right
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
  "apiVersion": 1,
  "description": "Current conditions in the bar, forecast in a panel.",
  "homepage": "https://github.com/acme/ewe-weather",
  "kinds": ["bar-widget", "panel"],
  "entryPoints": { "bar-widget": "Widget.qml", "panel": "Panel.qml" },
  "barWidget": { "defaultSection": "right" }
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
		<code>Theme</code>, <code>Globals</code> and <code>Log</code> exactly as the first-party
		components see them. What is public is on <a href="/docs/plugins/api/">the next page</a>.
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
        margins { bottom: 12; right: 12 }
        implicitWidth: 320; implicitHeight: 180
        color: "transparent"
        Rectangle {
            anchors.fill: parent
            radius: Theme.radius
            color: Theme.bg2
            Text {
                anchors.centerIn: parent
                text: "Partly cloudy, 21°"
                color: Theme.fg1
                font.family: Theme.fontText; font.pixelSize: Theme.fsBody
            }
        }
    }
}`}
		copyable={false}
	/>
	<p>
		<code>qs ipc call acme.weather toggle</code> opens it from a terminal, a script, or a key bound
		in Settings → Shortcuts. Name the target after your id so it can never collide with the
		shell's own.
	</p>

	<h3>A bar widget — an Item the bar packs</h3>
	<Code
		code={`import QtQuick
import qs

Item {
    id: root
    implicitWidth: row.implicitWidth + 2 * Theme.barItemPad
    implicitHeight: Theme.barItemHeight
    Rectangle {
        anchors.fill: parent
        radius: Theme.barItemRadius
        color: ma.containsMouse ? Theme.barHover : "transparent"
    }
    Row {
        id: row
        anchors.centerIn: parent
        spacing: 5
        Text { text: Theme.icSun; font.family: Theme.fontIcons; font.pixelSize: Theme.barIconPx; color: Theme.fg2 }
        Text { text: "21°"; font.family: Theme.fontText; font.pixelSize: 12; color: Theme.fg1 }
    }
    MouseArea {
        id: ma
        anchors.fill: parent
        hoverEnabled: true
        cursorShape: Qt.PointingHandCursor
        onClicked: Quickshell.execDetached(["qs", "ipc", "call", "acme.weather", "toggle"])
    }
}`}
		copyable={false}
	/>
	<Callout title="The bar-widget contract">
		<p>
			The root is an <code>Item</code> with an implicit size; the bar's row packs it like any
			built-in indicator, once per monitor. <code>Theme.barItemHeight</code>,
			<code>barItemRadius</code>, <code>barItemPad</code> and <code>barIconPx</code> are the
			conventions that make it look native. Widgets append to their section after the built-ins,
			in id order; the centre yields on an output too narrow to hold it.
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
    Rectangle { anchors.fill: parent; radius: Theme.radiusInner; color: Theme.bg1 }
    Text { anchors.centerIn: parent; text: Qt.formatTime(new Date(), settings.seconds ? "hh:mm:ss" : "hh:mm")
           font.pixelSize: 40; color: Theme.fg1 }
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
		That is how your users get it — and from a clone, <code>update</code> works: a fast-forward
		with the diff shown first, rolled back if the manifest stops validating. Bump
		<code>version</code> when you change something; it is what <code>list</code> shows.
	</p>
</section>

<section>
	<h2>Conventions worth keeping</h2>
	<dl class="rows">
		<div class="row"><dt>Ask for a role, never a value</dt><dd><code>Theme.bg2</code>, not a hex. The accent is the user's and changes at runtime; a hard-coded color is the one thing that will look foreign.</dd></div>
		<div class="row"><dt>Own your state</dt><dd>Keep files under <code>~/.local/state/ewe/</code> or your own directory; never write <code>ewe.conf</code> — call <code>ewe-conf set</code> if you must persist a setting.</dd></div>
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
