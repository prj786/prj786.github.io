<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Nextcloud account — ewe docs</title>
	<meta
		name="description"
		content="ewe signs in to a Nextcloud you choose — yours or a provider's — through the server's own login page. One app password covers settings sync, your calendar and your files."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Your Nextcloud, not ours.</h1>
<p class="lede">
	ewe signs in to a server <em>you</em> choose: one you run, or a hosted account from any provider.
	Nothing about the account is baked into ewe — there is no project client, no vendor console and
	nobody to ask for permission.
</p>

<section>
	<h2>What the account is used for</h2>
	<dl class="rows">
		<div class="row"><dt>Settings sync</dt><dd>The one file and its backup stamp, in an <code>ewe</code> folder in your account. <a href="/docs/account/settings-sync/">More →</a></dd></div>
		<div class="row"><dt>Your files</dt><dd>Mounted as a folder, or synced as folder pairs. <a href="/docs/account/folder-sync/">More →</a></dd></div>
		<div class="row"><dt>Your calendar</dt><dd>Read over CalDAV for the calendar widget. <a href="/docs/account/mail-calendar/">More →</a></dd></div>
	</dl>
	<p>
		Mail is deliberately separate: any IMAP account drives the mail badge, including the mailbox your
		provider gives you with the Nextcloud account.
	</p>
</section>

<section>
	<h2>Signing in</h2>
	<p>
		The welcome flow and Settings → Account both ask for the server address and open the browser.
		That is Nextcloud's own login flow: you sign in on your server's page — with your password, your
		second factor, your single sign-on, whatever your server uses — and it asks whether to grant
		access to <em>ewe</em> with your computer's name. It hands back an
		<strong>app password</strong> scoped to that device. <strong>ewe never sees your real password.</strong>
	</p>
	<Code
		code={`ewe-cloud login cloud.example.org   # opens the browser
ewe-cloud status                    # who am I
ewe-conf push                       # the first backup
ewe-files setup                     # mount the account at ~/Nextcloud`}
	/>
</section>

<section>
	<h2>What is stored where</h2>
	<dl class="rows">
		<div class="row"><dt>The app password</dt><dd>The system keyring only, under the service name <code>ewe-cloud</code>. It is the single credential.</dd></div>
		<div class="row"><dt><code>~/.config/ewe/cloud.json</code></dt><dd>Non-secret facts: server, login name, display name, email, when you signed in.</dd></div>
		<div class="row"><dt><code>ewe.conf</code> <code>[sync]</code></dt><dd>Provider, server, user, folder. Identity, so a restored machine knows where its backup lives — never a secret.</dd></div>
		<div class="row"><dt><code>~/.local/state/ewe/sync.json</code></dt><dd>What this machine last saw on the server. The whole conflict rule.</dd></div>
	</dl>
</section>

<section>
	<h2>Your server's side of it</h2>
	<p>
		In Nextcloud, <strong>Settings → Security → Devices &amp; sessions</strong> lists <em>ewe</em>
		with your computer's name. Revoking it there signs that machine out; ewe notices and asks you to
		sign in again. Deleting the <code>ewe</code> folder removes the backup.
	</p>
	<Callout title="Choosing a provider">
		<p>
			Self-hosting is the first-class path. Hosted Nextcloud accounts work identically — the
			<a href="/sync/">sync page</a> lists a few providers as examples, not endorsements.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/cli/ewe-cloud/">ewe-cloud</a> — every verb, and every error it can report.</li>
		<li><a href="/docs/account/google/">Google (optional)</a> — what it adds, and why it is not the account.</li>
		<li><a href="/privacy/">Privacy</a> — what leaves the machine, and when.</li>
	</ul>
</section>

<PageNav />
