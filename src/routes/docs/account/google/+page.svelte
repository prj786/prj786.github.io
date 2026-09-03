<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Google (optional) — ewe docs</title>
	<meta
		name="description"
		content="ewe ships no Google client. Supply your own OAuth client and a Google card appears in Settings, adding Gmail notifications and a Drive folder — never settings sync."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Google, if you want it.</h1>
<p class="lede">
	ewe ships <strong>no Google client</strong>. Nothing here contacts Google until you supply your
	own, and the desktop is complete without it.
</p>

<section>
	<h2>Why it works this way</h2>
	<p>
		A shipped client would mean a verification process, a review of the project's use of restricted
		data, and a console account that everything depends on. It would also mean every ewe user
		signing in through the project's identity rather than their own.
	</p>
	<p>
		Making it optional removes all of that. Your account, your client, your consent screen — and for
		everyone who does not want Google at all, nothing to turn off.
	</p>
	<Callout type="warning" title="Google is never the account">
		<p>
			Settings sync, your calendar and your files come from
			<a href="/docs/account/nextcloud/">your Nextcloud</a>. The Google client adds Gmail
			notifications and a Drive folder on top, and nothing else.
		</p>
	</Callout>
</section>

<section>
	<h2>Turning it on</h2>
	<p>
		Create an OAuth client of the desktop kind in your own Google Cloud project, then place the file
		it gives you at <code>~/.config/ewe/oauth-client.json</code>. The Google card in Settings → User
		notices it and offers to connect.
	</p>
	<Code
		code={`cp ~/Downloads/client_secret_*.json ~/.config/ewe/oauth-client.json
ewe-auth status          # configured, and signed out
ewe-auth login           # one consent screen
ewe-drive setup          # optional: Drive at ~/Google Drive`}
	/>
</section>

<section>
	<h2>What it adds</h2>
	<dl class="rows">
		<div class="row"><dt>Gmail notifications</dt><dd>The mail badge, when you have not configured an IMAP account instead.</dd></div>
		<div class="row"><dt>Drive as a folder</dt><dd>Mounted at <code>~/Google Drive</code>. <a href="/docs/cli/ewe-drive/">More →</a></dd></div>
	</dl>
	<p>
		One consent screen and one sign-out cover both: the broker holds the refresh token in the
		keyring and hands short-lived access tokens to whatever needs one.
	</p>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/cli/ewe-auth/">ewe-auth</a> — every verb and error.</li>
		<li><a href="/docs/cli/ewe-drive/">ewe-drive</a> — the Drive folder.</li>
		<li><a href="/privacy/">Privacy</a> — what is sent, and to whom.</li>
	</ul>
</section>

<PageNav />
