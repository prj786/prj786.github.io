<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const flags = [
		{ cmd: 'ewe-sync', does: 'Open the window. A second launch focuses the running instance rather than starting another.' },
		{ cmd: '--hidden', does: 'Start in the tray only, with no window until you ask for one. This is what the autostart unit passes.' },
		{ cmd: '--check', does: 'Print a self-check as JSON and exit — which ewe tools were found, and whether an account is signed in. For diagnosing an installation.' }
	];
	const panes = [
		{ cmd: 'Account', does: 'Sign in to your Nextcloud through the server’s own page; who you are, storage used, sign out. Links to providers where you can create an account.' },
		{ cmd: 'This machine', does: 'The one file: which machine saved the backup and when, when this machine last synced, the auto-sync switch, and Sync now / Back up / Restore.' },
		{ cmd: 'Machines', does: 'Every machine that has backed up to the account, with its ewe version and how many apps it records.' },
		{ cmd: 'Folders', does: 'Which folders sync where — two-way, upload only or download only; on change, on a timer, or at login — and any conflicts, resolved in place.' }
	];
</script>

<svelte:head>
	<title>ewe-sync — ewe docs</title>
	<meta
		name="description"
		content="ewe-sync is the account app of ewe OS: your Nextcloud account, the one file, the machines that share it, and folder sync — with a tray icon showing the state."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-sync</code></h1>
<p class="lede">The account app: your machines, the one file, your folders.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Sync used to be a button in several places at once, which meant no single program could say what
		the state of your account was. ewe-sync takes that job whole: it is the only thing in ewe with a
		sync button. Komble installs software and records it in the one file; Settings edits the one
		file; <strong>ewe-sync moves the one file and your folders between your machines</strong>.
	</p>
	<p>
		It is a graphical application, not a shell tool — a thin interface over the commands documented
		here, run directly rather than through a shell. It lives in the tray, where the icon shows
		whether you are idle, syncing, offline, signed out, or holding a conflict.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-sync [--hidden | --check]'} copyable={false} />
</section>

<section>
	<h2>Command-line flags</h2>
	<CommandTable rows={flags} head="Invocation" />
</section>

<section>
	<h2>The four panes</h2>
	<CommandTable rows={panes} head="Pane" second="What it shows" />
	<p>
		The tray menu carries <em>Sync now</em>, <em>Pause auto-sync</em>, <em>Open ewe-sync</em> and
		<em>Quit</em>. Left-clicking the icon opens the window.
	</p>
</section>

<section>
	<h2>What it drives</h2>
	<p>Everything it does, you can do yourself:</p>
	<dl class="rows">
		<div class="row"><dt><a href="/docs/cli/ewe-cloud/">ewe-cloud</a></dt><dd>The login flow, the account facts, the app password.</dd></div>
		<div class="row"><dt><a href="/docs/cli/ewe-conf/">ewe-conf</a></dt><dd><code>push</code>, <code>pull</code> and <code>sync-status</code> for the one file.</dd></div>
		<div class="row"><dt><code>nextcloudcmd</code></dt><dd>The headless twin of the Nextcloud desktop client, for two-way folder pairs. <code>rclone</code> handles the one-way modes.</dd></div>
	</dl>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>ewe.conf</code> <code>[[sync.folders]]</code></dt><dd>The folder pairs, so they follow you to every machine.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/ewe-sync.json</code></dt><dd>Per-machine local paths, each pair's last run, and its conflict list.</dd></div>
		<div class="row"><dt>In your account</dt><dd><code>ewe/ewe.conf</code>, <code>ewe/ewe.conf.meta.json</code> (who saved it, when) and <code>ewe/machines/&lt;name&gt;.json</code>.</dd></div>
		<div class="row"><dt>Credentials</dt><dd>The keyring, through <code>ewe-cloud</code>. For folder sync the app password is written to a <code>.netrc</code> with mode 0600 inside a private home under <code>~/.local/state/ewe/</code>, so it is never on a command line.</dd></div>
	</dl>
	<Callout title="It cannot create accounts">
		<p>
			Nextcloud's user-creation interface needs administrator credentials, and a provider's signup
			form is theirs. ewe-sync links to signup pages; you create the account in the browser and sign
			in here.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/settings-sync/">Settings sync</a> — the one file between machines.</li>
		<li><a href="/docs/account/folder-sync/">Folder sync</a> — pairs, triggers and conflicts.</li>
		<li><a href="/docs/cli/ewe-files/">ewe-files</a> — the simpler alternative: the whole account as one mounted folder.</li>
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
</style>
