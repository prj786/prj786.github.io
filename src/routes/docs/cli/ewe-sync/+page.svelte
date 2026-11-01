<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const flags = [
		{ cmd: 'ewe-sync', does: 'Open the window. A second launch focuses the running instance rather than starting another.' },
		{ cmd: '--hidden', does: 'Start in the background, with no window until you ask for one. This is what the autostart unit passes.' },
		{ cmd: '--check', does: 'Print a self-check as JSON and exit — which ewe tools were found, and whether an account is signed in. For diagnosing an installation.' }
	];
	const panes = [
		{ cmd: 'Overview', does: 'How your account is doing at a glance, and anything that needs you.' },
		{ cmd: 'Folders', does: 'Which folders sync where — two-way, upload only or download only; on change, on a timer, or at login — and any conflicts, resolved in place.' },
		{ cmd: 'Settings & apps', does: 'The one file: which computer saved the backup and when, when this one last synced, the auto-sync switch, and Sync now / Back up / Restore.' },
		{ cmd: 'Computers', does: 'Every computer that has backed up to the account, with its ewe version and how many apps it records.' },
		{ cmd: 'Account', does: 'Sign in to your Nextcloud through the server’s own page; who you are, storage used, sign out. Links to providers where you can create an account.' },
		{ cmd: 'Mail · Google', does: 'A mail account for the bar’s mail badge, and Google if you brought your own client.' }
	];
</script>

<svelte:head>
	<title>ewe-sync — ewe docs</title>
	<meta
		name="description"
		content="ewe-sync starts ewe Sync, the account app of ewe OS: your Nextcloud account, the one file, the computers that share it, and folder sync — with its state shown in the bar."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-sync</code></h1>
<p class="lede">ewe Sync, the account app: your computers, the one file, your folders.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Sync used to be a button in several places at once, which meant no single program could say what
		the state of your account was. ewe Sync takes that job whole: it is the only thing in ewe with a
		sync button. Komble installs software and records it in the one file; ewe Settings edits the one
		file; <strong>ewe Sync moves the one file and your folders between your computers</strong>.
	</p>
	<p>
		It is a graphical application, not a shell tool — a thin interface over the commands documented
		here, run directly rather than through a shell. It runs in the background, and the bar shows
		whether you are idle, syncing, offline, signed out, or holding a conflict; a click there opens it.
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
	<h2>Its sections</h2>
	<CommandTable rows={panes} head="Section" second="What it shows" />
	<p>
		<em>Sync now</em> and <em>Pause auto-sync</em> live in the window. Your name at the top of Quick
		settings opens it too.
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
			form is theirs. ewe Sync links to signup pages; you create the account in the browser and sign
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
		background: var(--surface-raised);
		border-color: var(--border-subtle);
		padding: 0.15em 0.4em;
	}
</style>
