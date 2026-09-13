<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Icon from '$lib/Icon.svelte';
	const EXAMPLE = 'https://github.com/prj786/ewe-plugin-example';
</script>

<svelte:head>
	<title>Plugins — ewe docs</title>
	<meta
		name="description"
		content="Third-party bar widgets, panels and services for the ewe shell: a git URL in, one config bit, the same colours and the same rules as the first-party desktop."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Extend the shell.</h1>
<p class="lede">
	ewe's desktop is one long-lived Quickshell process. A plugin is a directory of QML that this
	process loads at startup, exactly as it loads its own bar, dock and panels — the same
	<code>Theme</code> roles, the same <code>Globals</code>, no widget zoo. Plugins are not apps:
	Komble installs programs, <code>ewe-plugin</code> extends the desktop.
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
	<h2>What a plugin can be</h2>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="layout-panel-top" size={16} />Bar widget</dt>
			<dd>
				An item packed into the top bar between the built-in indicators — left, centre or right,
				the manifest picks. Hidden from Settings → Top bar like any other indicator, without
				disabling the plugin.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="layers" size={16} />Panel, overlay, menu</dt>
			<dd>
				A window the plugin owns: a floating panel, a fullscreen overlay, a summoned menu. Toggled
				by the plugin's own IPC target, so a keybind or a script can reach it.
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
	<h2>Trust, honestly</h2>
	<p>
		Installing <strong>never runs plugin code</strong>. There are no install hooks and nothing asks
		for privileges: <code>add</code> clones the repository, validates its manifest and records the
		source. The code runs the moment the plugin is enabled — unsandboxed, inside your shell process,
		with everything the desktop itself can do.
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
~/.config/ewe/ewe.conf             [plugins] enabled = [...]      what is on
                                   [plugins.sources] id = url     where each came from
~/.local/state/ewe/plugin-boots.json   the crash guard's counter`}
		copyable={false}
	/>
	<p>
		<code>[plugins.sources]</code> is the installed set — every plugin <code>add</code> fetched, on
		or off, until <code>remove</code> forgets it — and it travels in
		<a href="/docs/one-file/">the one file</a>, so it syncs with the rest of the machine. On a fresh
		machine <code>ewe-plugin list</code> shows everything your other machine had, and
		<code>ewe-plugin restore</code> clones the missing ones from their git URLs; Komble's Plugins
		section and the Welcome flow offer the same with a button. A plugin added from a plain
		directory is recorded as <code>"local"</code>: nothing another machine could fetch.
	</p>
</section>

<section>
	<h2>Keeping them</h2>
	<dl class="rows">
		<div class="row">
			<dt>Update</dt>
			<dd>
				<code>ewe-plugin update</code> fast-forwards every git-managed plugin, showing the diff
				first. A manifest that stops validating is rolled back.
			</dd>
		</div>
		<div class="row">
			<dt>Hide, not disable</dt>
			<dd>
				A bar widget can be switched off in Settings → Layout → Top bar while the plugin stays
				enabled — the same map the built-in indicators use, under the key
				<code>plugin:&lt;id&gt;</code>.
			</dd>
		</div>
		<div class="row">
			<dt>Remove</dt>
			<dd>
				A git clone is deleted. A directory you made yourself is moved to
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
		<li><a href="/docs/plugins/api/">What a plugin may use</a> — Theme roles, the public Globals, IPC.</li>
		<li><a href="/docs/cli/ewe-plugin/">ewe-plugin</a> — every verb, its output, its exit codes.</li>
		<li><a href={EXAMPLE}>ewe-plugin-example</a> — a service, a panel, a bar widget; clone it to start.</li>
	</ul>
</section>

<PageNav />
