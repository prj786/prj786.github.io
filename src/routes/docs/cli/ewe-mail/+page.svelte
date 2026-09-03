<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'login', args: '<host> <user> [--port N] [--starttls]', does: 'Test the login, keep the password in the keyring, and record the account — never the password — in ewe.conf. The password is read from standard input, one line. The port defaults to 993.', prints: 'ok, host, user, port' },
		{ cmd: 'status', does: 'Whether an account is configured, and whether the keyring can be read.', prints: 'configured, host, user, port, keyring, keyring_state' },
		{ cmd: 'unseen', args: '[--limit N]', does: 'The unread count for the badge, and the newest unseen messages behind it.', prints: 'ok, unread, list, fetched_at' },
		{ cmd: 'logout', does: 'Remove the keyring entry and the account section from ewe.conf.', prints: 'ok' }
	];
</script>

<svelte:head>
	<title>ewe-mail — ewe docs</title>
	<meta
		name="description"
		content="ewe-mail reads an unread count and the newest messages from any IMAP account for the Control Center mail badge — the password stays in the keyring."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-mail</code></h1>
<p class="lede">The mail badge, from any IMAP account.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Mail is deliberately not tied to your ewe account. The mailbox your Nextcloud provider gives you,
		a mailbox you host, a work account — anything that speaks IMAP drives the badge in the Control
		Center. Gmail keeps working through the optional <a href="/docs/cli/ewe-auth/">Google client</a>;
		this tool is for everyone else.
	</p>
	<p>
		It exists as a separate command for the same reason the other brokers do: one thing owns the
		credential. The password goes into the keyring once and the shell asks for a count, never for a
		password.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-mail login <host> <user> [--port N] [--starttls] | status | unseen [--limit N] | logout'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Adding an account</h2>
	<p>
		Settings → User has a form for this. From a terminal, the password is given on standard input so
		it never appears in your shell history or in the process list:
	</p>
	<Code
		code={`printf '%s\\n' 'the-password' | ewe-mail login imap.example.org you@example.org
ewe-mail unseen --limit 5`}
	/>
</section>

<section>
	<h2>Errors</h2>
	<dl class="rows">
		<div class="row"><dt><code>not-configured</code></dt><dd>No account has been added yet.</dd></div>
		<div class="row"><dt><code>auth-failed</code></dt><dd>The server rejected the user name or password.</dd></div>
		<div class="row"><dt><code>network</code> · <code>imap</code></dt><dd>The server could not be reached, or answered in a way the tool could not use.</dd></div>
		<div class="row"><dt><code>no-password</code></dt><dd><code>login</code> was run without a password on standard input.</dd></div>
		<div class="row"><dt><code>conf-write-failed</code></dt><dd>The account could not be recorded in <code>ewe.conf</code>.</dd></div>
		<div class="row"><dt><code>usage</code></dt><dd>Missing host or user.</dd></div>
	</dl>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt>The password</dt><dd>The keyring only — service <code>ewe-mail</code>, keyed by host and user.</dd></div>
		<div class="row"><dt><code>ewe.conf</code> <code>[accounts.mail]</code></dt><dd>Host, user and port. Never the password, so this is safe to sync.</dd></div>
	</dl>
	<Callout type="warning" title="TLS is required">
		<p>
			Plain, unencrypted IMAP is refused. <code>--starttls</code> upgrades a plain port to TLS; the
			default port 993 is implicit TLS. The one exception is a loopback address for the test suite.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/mail-calendar/">Mail &amp; calendar</a> — both cards, in context.</li>
		<li><a href="/docs/cli/ewe-auth/">ewe-auth</a> — the Gmail route, with your own client.</li>
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
