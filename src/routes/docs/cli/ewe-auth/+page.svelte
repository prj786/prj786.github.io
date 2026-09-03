<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'status', does: 'Whether a client is configured, the keyring is reachable, and who is signed in.', prints: 'configured, client, keyring, signed_in, profile' },
		{ cmd: 'login', args: '[--with-mail] [--with-drive]', does: 'One browser consent. The extra flags request the Gmail and Drive scopes alongside the base ones.', prints: 'the result, with the profile' },
		{ cmd: 'token', args: '[--json]', does: 'A valid access token, refreshed under a lock when it has expired. A bare line unless --json.', prints: 'the access token' },
		{ cmd: 'refresh', does: 'Like token, but always JSON and never trusting the runtime cache without checking expiry.', prints: 'the token and its expiry' },
		{ cmd: 'logout', does: 'Revoke at Google, then clear the keyring entry and every cache.', prints: 'ok' },
		{ cmd: 'keyring-reset', does: 'Move ~/.local/share/keyrings aside so the login keyring is recreated at your next login. For a keyring made with a password other than your login one, which can never be unlocked automatically.', prints: 'ok, moved, relogin' }
	];
</script>

<svelte:head>
	<title>ewe-auth — ewe docs</title>
	<meta
		name="description"
		content="ewe-auth is the optional Google broker in ewe. It does nothing until you supply your own OAuth client, and then adds Gmail notifications and a Drive folder — never sync."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-auth</code></h1>
<p class="lede">Google, with a client you supply.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		ewe ships <strong>no Google client</strong>. Nothing here talks to Google until you place your own
		OAuth client at <code>~/.config/ewe/oauth-client.json</code>; until then the Google card in
		Settings simply reports that it is not configured. That keeps the project out of a verification
		process, and keeps your desktop's identity in your hands.
	</p>
	<p>
		When you do supply one, this is the broker for it: one consent screen and one sign-out for the
		whole desktop. The mail badge and the Drive folder ask it for a short-lived access token instead
		of each performing their own OAuth.
	</p>
	<Callout type="warning">
		<p>
			Google is an extra, never the account. Settings sync, your calendar and your files come from
			<a href="/docs/account/nextcloud/">your Nextcloud</a>; this adds Gmail notifications and a
			Drive folder on top.
		</p>
	</Callout>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-auth <command> [options]'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Supplying a client</h2>
	<p>Two locations are read, in order:</p>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/oauth-client.json</code></dt><dd>The one to use. Either a flat object or the console's <code>installed</code> download, verbatim.</dd></div>
		<div class="row"><dt><code>~/.config/quickshell/google-oauth.json</code></dt><dd>The older shell location, still honoured.</dd></div>
	</dl>
	<p>
		Changing the client invalidates the stored refresh token by definition. The broker records which
		client signed you in, notices the swap, and reports signed out with the reason
		<code>client-changed</code> so the interface can ask for one clean re-login.
	</p>
</section>

<section>
	<h2>Errors</h2>
	<dl class="rows">
		<div class="row"><dt><code>not-configured</code></dt><dd>No client file. This is the normal state on a fresh ewe install.</dd></div>
		<div class="row"><dt><code>signed-out</code></dt><dd>No refresh token; the <code>reason</code> says why, including <code>client-changed</code>.</dd></div>
		<div class="row"><dt><code>no-refresh-token</code></dt><dd>Google returned no refresh token — remove the app in your Google account permissions and sign in again.</dd></div>
		<div class="row"><dt><code>keyring-unavailable</code></dt><dd>No Secret Service keyring is running, so a token has nowhere safe to live.</dd></div>
		<div class="row"><dt><code>keyring-reset-failed</code></dt><dd><code>keyring-reset</code> could not move the keyring directory aside.</dd></div>
	</dl>
	<p class="muted">Every command prints one JSON object and exits 0, so a waiting interface never hangs.</p>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt>The refresh token</dt><dd>The system keyring, and nowhere else.</dd></div>
		<div class="row"><dt>Access tokens</dt><dd>A cache in <code>$XDG_RUNTIME_DIR</code> — memory-backed, mode 0600, gone at logout.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/auth.json</code></dt><dd>Non-secret: which client id signed you in, and the account's email address.</dd></div>
	</dl>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/google/">Google (optional)</a> — what it adds, and what it does not.</li>
		<li><a href="/docs/cli/ewe-drive/">ewe-drive</a> — Drive as a folder, on this identity.</li>
		<li><a href="/docs/troubleshooting/">Troubleshooting</a> — when the keyring prompt misbehaves.</li>
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
