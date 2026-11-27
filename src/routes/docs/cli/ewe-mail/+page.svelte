<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'login', args: '<host> <user> [--port N] [--starttls] [--email E] [--name N] [--smtp-host H] [--smtp-port N] [--smtp-security tls|starttls] [--smtp-user U]', does: 'Test the incoming and the outgoing login, keep the password in the keyring, and record the account — never the password — in ewe.conf. Nothing is saved unless both work, and no mail is sent. The password is read from standard input, one line; an optional second line is a different outgoing password. The port defaults to 993. Without --smtp-host, the outgoing server is found for you.', prints: 'ok, account' },
		{ cmd: 'accounts', does: 'Every mail account, with its servers and whether its password is in the keyring.', prints: 'ok, accounts' },
		{ cmd: 'autoconfig', args: '<email>', does: 'The servers for an address: a built-in list, then the provider’s published settings, then a guess. Some providers add a note, for example that they want an app password.', prints: 'ok, source, imap, smtp, user, note' },
		{ cmd: 'status', does: 'Whether an account is configured, and whether the keyring can be read.', prints: 'configured, host, user, port, keyring, keyring_state, count' },
		{ cmd: 'unseen', args: '[--limit N] [--account ID | --all]', does: 'The unread count and the newest unseen messages behind it. The first account unless you say otherwise; --all adds up every account.', prints: 'ok, account, unread, list, fetched_at' },
		{ cmd: 'set', args: '<id> name <value>', does: 'Change the name that mail from this account is sent under.', prints: 'ok' },
		{ cmd: 'logout', args: '[<id>]', does: 'Remove the keyring entry and the record of one account. With several accounts, say which.', prints: 'ok' }
	];
</script>

<svelte:head>
	<title>ewe-mail — ewe docs</title>
	<meta
		name="description"
		content="ewe-mail is the command behind the mail accounts of ewe Mail: add, list and remove IMAP and SMTP mailboxes, find their servers, and count unread mail — the password stays in the keyring."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-mail</code></h1>
<p class="lede">The command behind your mail accounts, and the badge.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Mail is deliberately not tied to your ewe account. The mailbox your Nextcloud provider gives you,
		a mailbox you host, a work account — anything that speaks IMAP and SMTP works, as many as you
		like. This tool adds them, and <a href="/docs/apps/mail/">ewe Mail</a> and the Mail plugin read
		them. Gmail goes through the optional <a href="/docs/cli/ewe-auth/">Google client</a> instead.
	</p>
	<p>
		It exists as a separate command for the same reason the other brokers do: one thing owns the
		credential. The password goes into the keyring once, and the apps never see it typed.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-mail login <host> <user> [options] | accounts | autoconfig <email> | status\nunseen [--limit N] [--account ID | --all] | set <id> name <value> | logout [id]'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Adding an account</h2>
	<p>
		<a href="/docs/cli/ewe-sync/">ewe Sync</a> → Mail has a form for this: type the address and the
		password, and the servers are found for you. From a terminal, the
		password is given on standard input so it never appears in your shell history or in the process
		list:
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
		<div class="row"><dt><code>smtp-auth-failed</code></dt><dd>The outgoing server rejected the user name or password.</dd></div>
		<div class="row"><dt><code>network</code></dt><dd>The incoming server could not be reached.</dd></div>
		<div class="row"><dt><code>smtp-network</code></dt><dd>The outgoing server could not be reached.</dd></div>
		<div class="row"><dt><code>imap</code></dt><dd>The incoming server answered in a way the tool could not use.</dd></div>
		<div class="row"><dt><code>which</code></dt><dd><code>logout</code> was run without an id and there is more than one account.</dd></div>
		<div class="row"><dt><code>no-password</code></dt><dd><code>login</code> was run without a password on standard input.</dd></div>
		<div class="row"><dt><code>conf-write-failed</code></dt><dd>The account could not be recorded in <code>ewe.conf</code>.</dd></div>
		<div class="row"><dt><code>usage</code></dt><dd>Missing host or user.</dd></div>
	</dl>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt>The password</dt><dd>The keyring only — service <code>ewe-mail</code>, keyed by host and user.</dd></div>
		<div class="row"><dt><code>ewe.conf</code> <code>[[accounts.mail]]</code></dt><dd>One record for each account: address, name, servers and user names. Never the password, so this is safe to sync.</dd></div>
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
		<li><a href="/docs/apps/mail/">ewe Mail</a> — the app that reads these accounts.</li>
		<li><a href="/docs/account/mail-calendar/">Mail &amp; calendar</a> — both cards, in context.</li>
		<li><a href="/docs/cli/ewe-auth/">ewe-auth</a> — the Gmail route, with your own client.</li>
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
