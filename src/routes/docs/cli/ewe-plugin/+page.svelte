<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'add', args: '<git-url | dir> [--enable] [--yes]', does: 'Clone a repository — or copy a plain directory in as a hand-made plugin — validate its manifest, record the source. Asks once; --yes for scripts.', prints: 'what was installed' },
		{ cmd: 'list', args: '[--json]', does: 'Every plugin: on or off, version, kinds. Flags one that is enabled here but not installed, with the add command to run, and shows the safe-mode notice.', prints: 'a table, or one JSON object' },
		{ cmd: 'info', args: '<id> [--json]', does: 'One plugin’s manifest and state: directory, source, entry points, any problems.' },
		{ cmd: 'enable', args: '<id> [--no-restart]', does: 'Add the id to [plugins].enabled in ewe.conf and restart the shell.', prints: 'enabled <id> / shell restarted' },
		{ cmd: 'disable', args: '<id> [--no-restart]', does: 'Remove it, restart the shell.' },
		{ cmd: 'update', args: '[id] [--yes]', does: 'Fast-forward every git-managed plugin, or one. The commits and the diff are shown first; a manifest that stops validating is rolled back. Restarts the shell if an enabled plugin changed.' },
		{ cmd: 'remove', args: '<id> [--yes]', does: 'Delete a git clone; move a hand-made directory to <id>.bak.<stamp>. Forgets the source and the enabled bit.' },
		{ cmd: 'validate', args: '<dir>', does: 'Check a manifest and its entry points — every problem, not just the first.', prints: 'ok, or the list; exit 1 on problems' },
		{ cmd: 'restore', args: '[--yes]', does: 'Clone every plugin ewe.conf knows that is not installed here — the plugin half of Komble’s “For you”. Enabled bits stay as the file says; a "local" source is skipped with a note.' },
		{ cmd: 'create', args: '<ns.name> [--name T] [--kinds a,b] [--section left|center|right] [--dir P] [--no-git]', does: 'A new plugin repository: manifest, one working QML per kind, README, MIT licence, git init and a first commit. Kinds: service, panel, overlay, menu, bar-widget, desktop-widget.', prints: 'the path, and the next two commands' },
		{ cmd: 'dev', args: '[dir] [--no-follow]', does: 'Link a working copy into the plugins dir, enable it, restart the shell and follow its log lines. remove on a link only unlinks.' },
		{ cmd: 'place', args: '<id> [--x N --y N] [--layer desktop|top] [--visible on|off] [--output NAME] [--reset]', does: 'Where a desktop widget sits and how — written to [plugins.widgets], applied live.', prints: 'the effective placement as JSON' },
		{ cmd: 'set', args: '<id> <key> <value>', does: 'A setting the plugin declared, typed by its manifest — a value that does not fit is refused. Live.', prints: 'the effective settings as JSON' },
		{ cmd: 'get', args: '<id> [key]', does: 'The effective settings (defaults under the user’s values), the schema and the placement.' },
		{ cmd: 'path', does: 'The plugins directory.', prints: '~/.config/ewe/plugins' },
		{ cmd: 'boot-ok', does: 'Internal — the shell reports a start that stayed up for a minute, which clears the crash counter.' }
	];
</script>

<svelte:head>
	<title>ewe-plugin — ewe docs</title>
	<meta
		name="description"
		content="ewe-plugin scaffolds, installs, enables, updates and removes third-party shell plugins, places desktop widgets, sets their declared options, and runs the crash guard that keeps a bad plugin from becoming a login loop."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-plugin</code></h1>
<p class="lede">Shell plugins: a git URL in, one config bit — and, since 0.20, the scaffold, the dev loop, and what ewe decides for a plugin.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The shell is one Quickshell process, and a plugin is QML that process loads beside its own
		components. Something has to fetch that code, check it, and record which of it is on — without
		ever running it, and without a second configuration file. <code>ewe-plugin</code> is that: it
		clones, validates a manifest, and writes the on/off list through
		<a href="/docs/cli/ewe-conf/">ewe-conf</a>, so it syncs with everything else.
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
		<code>enable</code>, <code>disable</code>, <code>update</code> and <code>remove</code> restart
		<code>ewe.service</code> when the change affects a running plugin — a second, and your apps are
		not touched. <code>--no-restart</code> defers it to the next login.
	</p>
</section>

<section>
	<h2>Examples</h2>
	<Code
		code={`# the reference plugin, on in one step
ewe-plugin add https://github.com/prj786/ewe-plugin-example.git --enable

# your own, before it has a repository
ewe-plugin add ./my-plugin --enable

# what is on, what is stale
ewe-plugin list
ewe-plugin update --yes

# a fresh machine after a settings sync: what the other machine had
ewe-plugin list
#   acme.weather  on  —  —  not installed — ewe-plugin restore
ewe-plugin restore --yes`}
	/>
</section>

<section>
	<h2>Output</h2>
	<p><code>list --json</code> — what the shell reads at startup:</p>
	<Code
		code={`{"ok": true, "apiVersion": 1, "dir": "/home/you/.config/ewe/plugins",
 "plugins": [{"id": "example.hello", "dir": "…/plugins/example.hello",
              "installed": true, "git": true,
              "source": "https://github.com/prj786/ewe-plugin-example.git",
              "name": "Hello", "version": "0.1.0", "apiVersion": 1,
              "kinds": ["service", "panel", "bar-widget"],
              "entryPoints": {"service": "Service.qml", "panel": "Panel.qml",
                              "bar-widget": "Widget.qml"},
              "barWidget": {"defaultSection": "right"},
              "enabled": true, "valid": true, "problems": []}],
 "safeMode": false, "suspects": []}`}
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
		non-zero exit — unlike the brokers, which print JSON. <code>list --json</code>,
		<code>info --json</code> and <code>validate --json</code> are the machine-facing forms.
	</p>
	<dl class="rows">
		<div class="row"><dt><strong>1</strong></dt><dd>Something did not happen: the clone failed, the manifest does not validate, the id is unknown, the plugin is already installed, or you said no at the prompt.</dd></div>
		<div class="row"><dt><strong>2</strong></dt><dd>Usage — an unknown verb or the wrong arguments; or a confirmation was needed and there is no terminal (pass <code>--yes</code> from a script).</dd></div>
		<div class="row"><dt><strong>0</strong></dt><dd>Everything else, including “already enabled” and “up to date”.</dd></div>
	</dl>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/plugins/&lt;id&gt;/</code></dt><dd>The plugins themselves — code, outside the ewe payload. An upgrade never touches them; they never sync.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/ewe.conf</code></dt><dd><code>[plugins].enabled</code> and <code>[plugins.sources]</code>, written through <a href="/docs/cli/ewe-conf/">ewe-conf</a>. This is what syncs.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/plugin-boots.json</code></dt><dd>The crash guard: recent start times, and the last safe-mode record with its suspects.</dd></div>
	</dl>
	<Callout type="warning" title="Installing never runs plugin code">
		<p>
			No install hooks, no privileges. The code runs the moment the plugin is enabled — unsandboxed,
			inside your shell process. Read it first.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/plugins/">Plugins</a> — what they are, trust, safe mode.</li>
		<li><a href="/docs/plugins/writing/">Writing a plugin</a> — the manifest and the entry points.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — the <code>[plugins]</code> table.</li>
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
