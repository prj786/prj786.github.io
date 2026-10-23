<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'install', args: '<id> [--no-restart]', does: 'A first-party plugin out of the ewe package: copied in with source bundled, any earlier removal forgotten, enabled, keybinds regenerated. An unknown id is ok: false and exit 1.', prints: 'one JSON object: ok, version, missing, restarted' },
		{ cmd: 'migrate', args: '[--no-restart] [--fresh]', does: 'The one-time migration: install and enable every first-party plugin that replaces a feature an upgrader had built in — the dock only if it was on, never one you removed. --fresh records the ids as considered and installs none; ewe-setup runs one or the other for you. Safe to run again.', prints: 'one JSON object: migrated, skipped (with why), fresh' },
		{ cmd: 'add', args: '<git-url | dir | id> [--enable] [--yes] [--no-restart]', does: 'Clone a repository — or copy a plain directory in as a hand-made plugin — validate its manifest, record the source. A first-party URL (…/ewe-plugin-<name>) or an ewe.* id that ships in the package installs the package’s copy instead, like install. Asks once; --yes for scripts.', prints: 'what was installed' },
		{ cmd: 'list', args: '[--json]', does: 'Every plugin: on or off, version, kinds. Flags one that is enabled here but not installed, with the command to run, and shows the safe-mode notice. --json gives each plugin its bar — {shown, toggle}, or null when it puts nothing in the bar — and, for a desktop widget, its widget placement (x, y, output, layer, visible, pinned, pin_level, locked); it also lists the package’s first-party plugins under available (id, name, description, icon, category, version, kinds, installed, enabled, migrate, repo, requires, missing) and the ids you removed under removed.', prints: 'a table, or one JSON object' },
		{ cmd: 'info', args: '<id> [--json]', does: 'One plugin’s manifest and state: directory, source, entry points, any problems.' },
		{ cmd: 'enable', args: '<id> [--no-restart]', does: 'Add the id to [plugins].enabled in ewe.conf and restart the shell.', prints: 'enabled <id> / shell restarted' },
		{ cmd: 'disable', args: '<id> [--no-restart]', does: 'Remove it, restart the shell.' },
		{ cmd: 'update', args: '[id] [--yes]', does: 'Fast-forward every git-managed plugin, or one. The commits and the diff are shown first; a manifest that stops validating is rolled back. Restarts the shell if an enabled plugin changed.' },
		{ cmd: 'remove', args: '<id> [--yes]', does: 'Delete a git clone or a bundled copy — a first-party plugin is remembered in [plugins].removed so a later ewe update leaves it out; move a hand-made directory to <id>.bak.<stamp>. Forgets the source and the enabled bit.' },
		{ cmd: 'validate', args: '<dir> [--first-party] [--json]', does: 'Check a manifest and its entry points — every problem, not just the first. --first-party allows a reserved ewe. id.', prints: 'ok, or the list; exit 1 on problems' },
		{ cmd: 'restore', args: '[--yes] [--no-restart]', does: 'Fetch every plugin ewe.conf knows that is not installed here — git URLs cloned, bundled ones copied from the package — the plugin half of Komble’s “For you” and the Welcome flow. Enabled bits stay as the file says; a "local" source is skipped with a note.' },
		{ cmd: 'seed', args: '[dir] [--restore <id>] [--no-restart]', does: 'The package’s default first-party plugins in (none today) and every installed bundled copy refreshed when its version changed — ewe-setup runs it at every deploy. Skips one you removed or linked with dev. --restore <id> forgets a removal and installs that plugin again.', prints: 'what was seeded, refreshed or skipped' },
		{ cmd: 'create', args: '<ns.name> [--name T] [--kinds a,b] [--section left|center|right] [--dir P] [--no-git]', does: 'A new plugin repository: manifest, one working QML per kind, README, MIT license, git init and a first commit. Kinds: service, panel, overlay, menu, bar-widget, desktop-widget, quick-tile, quick-page, bar-status, dock-item.', prints: 'the path, and the next two commands' },
		{ cmd: 'dev', args: '[dir] [--no-follow]', does: 'Link a working copy into the plugins dir, enable it, restart the shell and follow its log lines. remove on a link only unlinks.' },
		{ cmd: 'bar', args: '<id> [on|off]', does: 'Show in bar: the plugin’s bar widget and its glyph in the bar’s Quick settings pill. on or off writes ewe.conf desktop.bar.show."plugin:<id>" and applies live — no restart; with neither, it prints the state. A plugin whose manifest says "toggle": false (Music and Places, which their own “Where the button lives” setting places) has no switch, and bar <id> off is refused; so is a plugin with nothing in the bar.', prints: 'one JSON object: ok, id, bar {shown, toggle}' },
		{ cmd: 'place', args: '<id> [--x N] [--y N] [--output NAME] [--pinned on|off] [--pin-level top|overlay] [--locked on|off] [--layer desktop|top|overlay] [--visible on|off] [--reset]', does: 'Where a desktop widget sits and how — written to [plugins.widgets], applied live. --layer desktop is under the windows (unpinned), top above them, overlay above everything, fullscreen apps too. --pinned on moves the widget to its pin level, off back to the desktop. --pin-level moves a pinned widget at once; on an unpinned one it only remembers where pinning will put it. --locked on stops dragging. --reset starts again from the manifest’s defaults.', prints: 'the effective placement as JSON' },
		{ cmd: 'set', args: '<id> <key> <value>', does: 'A setting the plugin declared, typed by its manifest — a value that does not fit is refused. Live. What Komble’s Options dialog and a plugin’s own Shell.setSetting run.', prints: 'the effective settings as JSON' },
		{ cmd: 'get', args: '<id> [key]', does: 'The effective settings (defaults under the user’s values — for a first-party setting with a legacy key, that key’s value until you set one), the schema and the placement.', prints: 'one JSON object, or the one value' },
		{ cmd: 'path', does: 'The plugins directory.', prints: '~/.config/ewe/plugins' },
		{ cmd: 'boot-ok', does: 'Internal — the shell reports a start that stayed up for a minute, which clears the crash counter.' }
	];
</script>

<svelte:head>
	<title>ewe-plugin — ewe docs</title>
	<meta
		name="description"
		content="ewe-plugin installs the plugins ewe ships, runs the one-time migration, scaffolds, installs, enables, updates and removes plugins from a git URL, decides where their widgets and bar buttons go — plus the crash guard that keeps a bad plugin from becoming a login loop."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-plugin</code></h1>
<p class="lede">Plugins, from ewe or from a git URL: an id or a URL in, one config bit — plus the scaffold, the dev loop, and what ewe decides for a plugin.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The shell is one Quickshell process, and a plugin is QML that process loads beside its own
		components. Something has to fetch that code, check it, and record which of it is on — without
		ever running it, and without a second configuration file. <code>ewe-plugin</code> is that: it
		clones or copies, validates a manifest, and writes the on/off list through
		<a href="/docs/cli/ewe-conf/">ewe-conf</a>, so it syncs with everything else.
	</p>
	<p>
		Since 0.25 it is also how the desktop's own extras arrive. Every
		<a href="/docs/plugins/built-in/">first-party plugin</a> ships inside the ewe package but is not
		installed on a fresh machine; <code>install &lt;id&gt;</code> is what Komble → Plugins and the
		Welcome screen run, and <code>migrate</code> is the one-time step that keeps an upgrader's
		features.
	</p>
	<p>
		And it keeps what ewe decides for a plugin, as opposed to what the plugin draws:
		<code>bar</code>, <code>place</code> and <code>set</code> are what Komble's Options dialog
		runs — whether its button shows in the bar, where its desktop widget sits and whether it is
		pinned, and the values of the settings it declares.
	</p>
	<p>
		It is also the crash guard. The shell asks it what to load at every start; the third start
		inside a minute gets the answer “nothing”. <a href="/docs/plugins/">The guide →</a>
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-plugin <command> [arguments]'} copyable={false} />
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
	<p class="muted">
		<code>install</code>, <code>migrate</code>, <code>enable</code>, <code>disable</code>,
		<code>update</code> and <code>remove</code> restart <code>ewe.service</code> when the change
		affects a running plugin — a second, and your apps are not touched. <code>--no-restart</code>
		defers it to the next login. <code>bar</code>, <code>place</code> and <code>set</code> never
		restart anything: the shell picks the change up live.
	</p>
</section>

<section>
	<h2>Examples</h2>
	<Code
		code={`# a plugin that ships with ewe, in one step
ewe-plugin install ewe.dock
ewe-plugin list --json | jq '.available[] | select(.installed | not) | .id'

# the reference plugin, on in one step
ewe-plugin add https://github.com/prj786/ewe-plugin-example.git --enable

# your own, before it has a repository
ewe-plugin add ./my-plugin --enable

# what is on, what is stale
ewe-plugin list
ewe-plugin update --yes

# what ewe decides: the bar, the desktop, the settings
ewe-plugin bar ewe.sysmon on                    # its readout in the bar
ewe-plugin place acme.clock --pinned on --pin-level overlay --locked on
ewe-plugin set ewe.dock icon_size small

# a fresh machine after a settings sync: what the other machine had
ewe-plugin list
#   acme.weather  on  —  —  not installed — ewe-plugin restore
#   ewe.media     on  —  —  not installed — ewe-plugin restore
ewe-plugin restore --yes`}
	/>
</section>

<section>
	<h2>Output</h2>
	<p><code>list --json</code> — what the shell reads at startup, and what Komble's Plugins page draws:</p>
	<Code
		code={`{"ok": true, "apiVersion": 3, "dir": "/home/you/.config/ewe/plugins",
 "plugins": [{"id": "ewe.insomnia", "dir": "…/plugins/ewe.insomnia",
              "installed": true, "git": false, "source": "bundled",
              "name": "Insomnia", "version": "1.0.0", "apiVersion": 3,
              "kinds": ["service", "quick-tile", "bar-status"],
              "entryPoints": {"service": "Service.qml", "quick-tile": "Tile.qml",
                              "bar-status": "Status.qml"},
              "quickTile": {"span": 1, "order": 10}, "barStatus": {"order": 10},
              "bar": {"shown": true, "toggle": true}, "widget": null,
              "enabled": true, "valid": true, "problems": []},
             {"id": "acme.clock", "…": "…", "bar": null,
              "widget": {"x": 420, "y": 300, "output": "", "layer": "overlay", "visible": true,
                         "pinned": true, "pin_level": "overlay", "locked": true}}],
 "available": [{"id": "ewe.dock", "name": "Dock", "category": "Desktop", "icon": "icApps",
                "version": "1.0.1", "kinds": ["panel"], "installed": false, "enabled": false,
                "migrate": true, "repo": "https://github.com/prj786/ewe-plugin-dock",
                "requires": {"packages": [], "commands": []}, "missing": []}, "…"],
 "removed": ["ewe.clipboard"],
 "safeMode": false, "suspects": []}`}
		copyable={false}
	/>
	<p><code>install</code> and <code>migrate</code> — one JSON object each:</p>
	<Code
		code={`{"ok": true, "id": "ewe.phone", "version": "1.0.0", "dir": "…/plugins/ewe.phone",
 "installed": true, "enabled": true, "refreshed": false, "missing": ["kdeconnect"], "restarted": true}
{"ok": true, "migrated": ["ewe.media", "ewe.places"], "fresh": false, "restarted": true,
 "skipped": [{"id": "ewe.dock", "why": "desktop.dock.enabled is false"},
             {"id": "ewe.cast", "why": "removed by the user"}]}`}
		copyable={false}
	/>
	<p><code>bar</code> and <code>place</code> — the state after the change:</p>
	<Code
		code={`{"ok": true, "id": "ewe.sysmon", "bar": {"shown": true, "toggle": true}}
{"ok": true, "id": "acme.clock",
 "widget": {"x": 420, "y": 300, "output": "", "layer": "overlay", "visible": true,
            "pinned": true, "pin_level": "overlay", "locked": true}}`}
		copyable={false}
	/>
	<p><code>validate</code> on a manifest with problems:</p>
	<Code
		code={`./my-plugin: 3 problems
  ! the "ewe." namespace is reserved for ewe's own components
  ! kind "panel" has no entry point
  ! entryPoints.service: Service.qml does not exist`}
		copyable={false}
	/>
</section>

<section>
	<h2>Errors and exit codes</h2>
	<p>
		This tool talks to a person by default, so failures are a line on standard error and a
		non-zero exit — unlike the brokers, which print JSON. <code>install</code>,
		<code>migrate</code>, <code>bar</code>, <code>place</code>, <code>set</code>, <code>get</code>,
		<code>list --json</code>, <code>info --json</code> and <code>validate --json</code> are the
		machine-facing forms and print one object each.
	</p>
	<dl class="rows">
		<div class="row"><dt><strong>1</strong></dt><dd>Something did not happen: the clone failed, the manifest does not validate, the id is unknown, the plugin is already installed, a value does not fit its setting, <code>bar</code> was asked to switch a plugin that has no switch, or you said no at the prompt.</dd></div>
		<div class="row"><dt><strong>2</strong></dt><dd>Usage — an unknown verb or the wrong arguments; or a confirmation was needed and there is no terminal (pass <code>--yes</code> from a script).</dd></div>
		<div class="row"><dt><strong>0</strong></dt><dd>Everything else, including “already enabled” and “up to date”.</dd></div>
	</dl>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/plugins/&lt;id&gt;/</code></dt><dd>The plugins themselves — code, outside the ewe payload. An upgrade never touches a git or hand-made one, and refreshes a bundled one only when its version changed; they never sync.</dd></div>
		<div class="row"><dt><code>/usr/share/ewe/plugins/</code></dt><dd>The plugins ewe ships, one directory per id, and <code>bundle.json</code> — which ids are <code>default</code> (seeded everywhere; none today) and which <code>migrate</code>. Read-only; <code>install</code> copies out of it.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/ewe.conf</code></dt><dd><code>[plugins].enabled</code>, <code>[plugins].removed</code> (first-party plugins you took away, so a later ewe update leaves them out), <code>[plugins.sources]</code> (a git URL, <code>local</code>, or <code>bundled</code>), <code>[plugins.widgets]</code> (<code>place</code>), <code>[plugins.settings]</code> (<code>set</code>) and the <code>"plugin:&lt;id&gt;"</code> keys of <code>desktop.bar.show</code> (<code>bar</code>), written through <a href="/docs/cli/ewe-conf/">ewe-conf</a>. This is what syncs.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/addons-migrated</code></dt><dd>The migration marker: a JSON list of the first-party plugin ids already considered on this machine. Local, never synced — a second machine migrates on its own.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/plugins/&lt;id&gt;/</code></dt><dd>A plugin's own state (<code>stateDir</code>), created when first asked for.</dd></div>
		<div class="row"><dt><code>~/.config/hypr/generated/plugin-keybinds.lua</code></dt><dd>The Hyprland binds declared by enabled plugins' manifests (<code>keybinds</code>) — the Print keys, <kbd>Super</kbd>+<kbd>P</kbd>, <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> — rewritten by every state-changing verb.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/plugin-boots.json</code></dt><dd>The crash guard: recent start times, and the last safe-mode record with its suspects.</dd></div>
	</dl>
	<Callout type="warning" title="Installing never runs plugin code">
		<p>
			No install hooks, no privileges. <code>add</code> clones, <code>install</code> copies; the code
			runs the moment the plugin is enabled — unsandboxed, inside your shell process. Read it first.
			A package a plugin <code>requires</code> is only reported as <code>missing</code>: Komble
			offers to install it, this tool never does.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/plugins/built-in/">Built-in plugins</a> — the sixteen ewe ships, their Options, and what an upgrade keeps.</li>
		<li><a href="/docs/plugins/">Plugins</a> — what they are, trust, safe mode.</li>
		<li><a href="/docs/plugins/writing/">Writing a plugin</a> — the manifest and the entry points.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — the <code>[plugins]</code> table.</li>
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
</style>
