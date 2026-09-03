<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'login', args: '<server-url>', does: 'Nextcloud’s Login Flow v2: opens your server’s own sign-in page in the browser, waits up to five minutes, and stores the app password it hands back in the keyring.', prints: 'ok, server, user, display_name, email, quota' },
		{ cmd: 'status', does: 'Who is signed in, on which server, with how much storage used — and whether the keyring is reachable. Never prompts for anything.', prints: 'signed_in, server, user, display_name, email, quota, keyring, keyring_state' },
		{ cmd: 'token', args: '[--json]', does: 'The app password, for rclone and the shell. A bare line by default.', prints: 'the app password, or a JSON object' },
		{ cmd: 'webdav-url', does: 'The WebDAV root of the signed-in account.', prints: '<server>/remote.php/dav/files/<user>/' },
		{ cmd: 'avatar', does: 'Fetch and cache the account’s avatar image.', prints: 'the path to the cached PNG' },
		{ cmd: 'logout', does: 'Revoke the app password on the server, then clear the keyring entry and the local account facts.', prints: 'ok, revoked' }
	];
</script>

<svelte:head>
	<title>ewe-cloud — ewe docs</title>
	<meta
		name="description"
		content="ewe-cloud signs in to your own Nextcloud through the server's login page and keeps the app password in the keyring — the single credential every other ewe tool asks for."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-cloud</code></h1>
<p class="lede">Your Nextcloud account, and the one credential behind it.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		ewe signs in to a server <em>you</em> choose — one you run, or a hosted account from any
		provider. There is no ewe project client and nobody to ask for permission, because Nextcloud's
		own login flow does the work: you sign in on your server's page, with your password, your second
		factor, your single sign-on, and the server hands ewe an <strong>app password</strong> scoped to
		this computer. ewe never sees your real password.
	</p>
	<p>
		<code>ewe-cloud</code> is the broker for that one credential. Settings sync, the calendar and the
		file mount do not each run their own login; they ask it for the app password and it is the only
		thing that touches the keyring. Revoking the device in your Nextcloud security settings signs
		this machine out, and the tool notices.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-cloud <command> [options]'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Signing in</h2>
	<Code
		code={`ewe-cloud login cloud.example.org   # opens the browser; prints JSON when done
ewe-cloud status                    # who am I, and is the keyring healthy
ewe-conf push                       # the first backup
ewe-files setup                     # mount the account at ~/Nextcloud`}
	/>
	<p>
		While the login is in flight the sign-in URL is written to
		<code>$XDG_RUNTIME_DIR/ewe-cloud-login-url</code> and printed on standard error as a
		<code>login-url:</code> line, so a user interface can offer <em>open</em> or <em>copy the link</em>
		when the browser hand-off fails.
	</p>
</section>

<section>
	<h2>Output</h2>
	<p><code>login</code> and <code>status</code> when signed in:</p>
	<Code
		code={`{"ok": true, "server": "https://cloud.example.org",
 "user": "you@example.org", "login_name": "you@example.org",
 "display_name": "Your Name", "email": "you@example.org",
 "quota": {"used": 62473547, "total": 8589934592, "relative": 0.73},
 "keyring": "ok"}`}
		copyable={false}
	/>
</section>

<section>
	<h2>Errors</h2>
	<p>Every failure is a JSON object with an <code>error</code> code and a human message.</p>
	<dl class="rows">
		<div class="row"><dt><code>no-server</code></dt><dd>No address was given.</dd></div>
		<div class="row"><dt><code>insecure-server</code></dt><dd>Only <code>https://</code> servers are accepted.</dd></div>
		<div class="row"><dt><code>not-nextcloud</code></dt><dd>That address did not answer like a Nextcloud.</dd></div>
		<div class="row"><dt><code>timeout</code></dt><dd>Nothing came back from the browser within five minutes.</dd></div>
		<div class="row"><dt><code>revoked</code></dt><dd>Reported by <code>status</code>: the app password was revoked on the server. Sign in again.</dd></div>
		<div class="row"><dt><code>not-signed-in</code></dt><dd>No credential stored on this machine.</dd></div>
		<div class="row"><dt><code>keyring-unavailable</code> · <code>keyring-locked</code> · <code>keyring-timeout</code> · <code>keyring-cancelled</code></dt><dd>The system keyring is missing, locked or the prompt was dismissed. See <a href="/docs/troubleshooting/">troubleshooting</a>.</dd></div>
		<div class="row"><dt><code>network</code> · <code>http-&lt;code&gt;</code> · <code>bad-reply</code></dt><dd>The server could not be reached, refused, or answered something unexpected.</dd></div>
	</dl>
	<p class="muted">
		Every command exits <strong>0</strong>, success or failure, so a waiting interface never hangs.
		<code>token</code> and <code>webdav-url</code> are the exception: they exit 1 when signed out.
	</p>
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt>The app password</dt><dd>The system keyring only, under the service name <code>ewe-cloud</code>. It is never written to a file by this tool.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/cloud.json</code></dt><dd>Non-secret account facts: server, login name, display name, email, when you signed in.</dd></div>
		<div class="row"><dt><code>~/.cache/ewe/cloud-avatar.png</code></dt><dd>The cached avatar.</dd></div>
		<div class="row"><dt><code>ewe.conf</code> <code>[sync]</code></dt><dd>Provider, server, user and folder — identity, so a restored machine knows where its backup lives.</dd></div>
	</dl>
	<Callout title="On your server">
		<p>
			The device appears in Nextcloud under <strong>Settings → Security → Devices &amp; sessions</strong>
			as <em>ewe</em> with this computer's name. Revoking it there signs this machine out.
		</p>
	</Callout>
</section>

<section>
	<h2>Environment</h2>
	<dl class="rows">
		<div class="row"><dt><code>EWE_CLOUD_NO_BROWSER</code></dt><dd>Set to <code>1</code> to print the sign-in URL instead of opening a browser — useful over SSH.</dd></div>
		<div class="row"><dt><code>EWE_CLOUD_SERVER_INSECURE</code></dt><dd>Allows a plain-HTTP loopback server. Exists for the test suite's mock server, not for real accounts.</dd></div>
		<div class="row"><dt><code>EWE_CLOUD_FAKE_KEYRING</code></dt><dd>Test hook: a file standing in for the keyring.</dd></div>
	</dl>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/nextcloud/">Nextcloud account</a> — the concept, and what is stored where.</li>
		<li><a href="/docs/cli/ewe-conf/">ewe-conf</a> — pushes and pulls the one file using this credential.</li>
		<li><a href="/docs/cli/ewe-files/">ewe-files</a> — mounts the same account as a folder.</li>
		<li><a href="/docs/cli/ewe-caldav/">ewe-caldav</a> — reads the account's calendar.</li>
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
