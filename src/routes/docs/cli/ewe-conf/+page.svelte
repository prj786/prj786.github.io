<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'path', does: 'Print the canonical path of the file.', prints: '~/.config/ewe/ewe.conf' },
		{ cmd: 'dump', does: 'The whole document as JSON — one read for a script, the shell or the settings app.', prints: 'the document, indented' },
		{ cmd: 'get', args: '<dotted.key>', does: 'Read one value. Structures come back as JSON, scalars bare.', prints: 'the value; exit 1 when the key is absent' },
		{ cmd: 'set', args: '<dotted.key> <value>', does: 'Write one value, then regenerate the artifacts for that domain and reload. The value is parsed as JSON if it can be, otherwise kept as a string.', prints: 'nothing on success' },
		{ cmd: 'unset', args: '<dotted.key>', does: 'Remove a key, then apply the domain it belonged to.', prints: 'nothing on success' },
		{ cmd: 'import', does: 'Build the document FROM the live machine — the runtime files, the installed packages, your SSH hosts and VPN profiles. For migration and repair.', prints: 'the file path' },
		{ cmd: 'apply', args: '[--only <domain>] [--no-hooks]', does: 'Regenerate every runtime file from the document, re-theme the toolkits, poke the shell and reload Hyprland.', prints: 'nothing on success' },
		{ cmd: 'push', args: '[--force] [--quiet]', does: 'Upload the file to the account named in [sync]. Refused when another machine saved since this one last synced.', prints: 'a JSON result' },
		{ cmd: 'pull', args: '[--out <path>]', does: 'Download the account copy, keeping the previous local file as a timestamped backup. Run apply afterwards.', prints: 'a JSON result' },
		{ cmd: 'sync-status', does: 'The remote copy and this machine’s sync record, side by side.', prints: 'a JSON result' }
	];

	const domains = [
		'theme', 'animations', 'displays', 'window_rules', 'wallpapers',
		'input', 'layout', 'keybinds', 'apps', 'network'
	];
</script>

<svelte:head>
	<title>ewe-conf — ewe docs</title>
	<meta
		name="description"
		content="ewe-conf is the only writer of ewe.conf: read and write keys, regenerate every runtime file, and push or pull the machine to your account."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-conf</code></h1>
<p class="lede">The one writer of the one file.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		A desktop normally scatters itself across a dozen configuration files, each owned by a different
		program. ewe keeps one declarative document instead — <code>~/.config/ewe/ewe.conf</code> — and
		treats everything Hyprland and the shell actually read as a build artifact of it.
	</p>
	<p>
		<code>ewe-conf</code> is what performs that build. It is also the only writer: the settings app,
		the shell, Komble and the installer all persist <em>through</em> it rather than editing files
		themselves. That is what makes a machine restorable from a single file, and what stops two
		programs disagreeing about the same setting.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-conf <command> [arguments] [--no-hooks]'} copyable={false} />
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
	<p class="muted">
		Any command also accepts <code>--no-hooks</code>, which suppresses the toolkit re-theme, the
		shell poke and the Hyprland reload. The shell passes it because it applies changes live itself.
	</p>
</section>

<section>
	<h2>Domains</h2>
	<p>
		<code>apply --only &lt;domain&gt;</code> regenerates one slice instead of everything. A
		<code>set</code> picks its domain from the key you wrote, so a theme change never rebuilds your
		display profiles. The domains are:
	</p>
	<p class="chips">
		{#each domains as d}<code>{d}</code>{/each}
	</p>
</section>

<section>
	<h2>Examples</h2>
	<Code
		code={`# change the accent from a script — the same path the settings app takes
ewe-conf set desktop.theme.accent '"#30d158"'

# read one value, and the whole document
ewe-conf get desktop.layout.gaps_in
ewe-conf dump | jq .sync

# become another machine: adopt its file, then make it real
ewe-conf pull && ewe-conf apply

# rebuild the document from a machine that is already set up
ewe-conf import`}
	/>
</section>

<section>
	<h2>Output</h2>
	<p><code>push</code> on success:</p>
	<Code
		code={`{"ok": true, "id": "\\"6f1a…\\"", "bytes": 7929, "provider": "nextcloud",
 "machine": "laptop", "modified": "2026-09-03T06:14:23Z",
 "local_synced_at": "2026-09-03T06:14:24Z"}`}
		copyable={false}
	/>
	<p><code>sync-status</code>, which separates who saved the backup from when this machine last synced:</p>
	<Code
		code={`{"ok": true, "error": null, "provider": "nextcloud",
 "server": "https://cloud.example.org", "folder": "ewe", "enabled": true,
 "remote": {"id": "\\"6f1a…\\"", "etag": "\\"6f1a…\\"",
            "modifiedTime": "2026-09-03T06:14:23Z",
            "appProperties": {"machine": "laptop", "schema": "1"}},
 "remote_machine": "laptop", "remote_modified": "2026-09-03T06:14:23Z",
 "local_synced_at": "2026-09-03T06:14:24Z", "in_sync": true}`}
		copyable={false}
	/>
</section>

<section>
	<h2>Errors and exit codes</h2>
	<p>
		Sync commands print <code>ok: false</code> with an <code>error</code> code rather than failing
		loudly, so a user interface can explain what happened.
	</p>
	<dl class="rows">
		<div class="row"><dt><code>remote-newer</code></dt><dd>Another machine saved since this one last synced. Pull theirs, or <code>push --force</code>.</dd></div>
		<div class="row"><dt><code>remote-exists</code></dt><dd>This machine has never synced and a backup already exists. Restore first, or force. This is what stops a fresh install erasing the backup it was about to restore.</dd></div>
		<div class="row"><dt><code>not-signed-in</code></dt><dd>No account credential. Sign in with <a href="/docs/cli/ewe-cloud/">ewe-cloud</a>.</dd></div>
		<div class="row"><dt><code>no-provider</code></dt><dd><code>[sync].provider</code> is unset or not one of <code>nextcloud</code>, <code>google</code>.</dd></div>
		<div class="row"><dt><code>unauthorized</code></dt><dd>The server rejected the credential — usually an app password revoked on the server.</dd></div>
		<div class="row"><dt><code>no-local-file</code> · <code>nothing-synced</code></dt><dd>Nothing here to push; nothing there to pull.</dd></div>
		<div class="row"><dt><code>stamp-missing</code> · <code>http-&lt;code&gt;</code> · <code>network</code></dt><dd>The upload did not complete as expected, or the server could not be reached.</dd></div>
	</dl>
	<p>
		<code>get</code> exits <strong>1</strong> for a missing key and names which failure it was on
		standard error (<code>no-key</code>, or <code>no-manifest</code> for
		<code>apps.installed</code>). An unknown command exits <strong>2</strong> and prints the usage.
		Everything else exits <strong>0</strong>.
	</p>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/ewe.conf</code></dt><dd>The document. Written atomically (temporary file, then rename) under a lock, with stable key order so diffs are honest.</dd></div>
		<div class="row"><dt><code>~/.config/hypr/generated/*</code><br /><code>~/.config/quickshell/*.json</code></dt><dd>Build artifacts. Never edit these: the next apply overwrites them.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/sync.json</code></dt><dd>What this machine last saw on the server: the ETag or file id, who saved it, and when this machine synced. The whole conflict rule.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/cloud.json</code></dt><dd>Read for the account identity when signing in from a terminal. Written by <code>ewe-cloud</code>.</dd></div>
		<div class="row"><dt>Backups</dt><dd><code>pull</code> keeps the file it replaced as <code>ewe.conf.&lt;timestamp&gt;.bak</code>.</dd></div>
	</dl>
	<Callout type="warning" title="No secrets, ever">
		<p>
			<code>ewe.conf</code> is the file that syncs. It names accounts, never credentials: app
			passwords and OAuth tokens live only in the system keyring, behind
			<a href="/docs/cli/ewe-cloud/">ewe-cloud</a> and <a href="/docs/cli/ewe-auth/">ewe-auth</a>.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/one-file/">The one file</a> — what the document is, and the three rules.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — every section and key.</li>
		<li><a href="/docs/cli/ewe-cloud/">ewe-cloud</a> — the account credential push and pull use.</li>
		<li><a href="/docs/cli/ewe-sync/">ewe-sync</a> — the app that runs these verbs for you.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--elevated);
		border-color: var(--stroke);
		padding: 0.15em 0.4em;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.9rem;
		max-width: 52rem;
	}
	section {
		margin-top: 0;
	}
</style>
