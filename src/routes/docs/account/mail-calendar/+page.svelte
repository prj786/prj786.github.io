<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Mail and calendar — ewe docs</title>
	<meta
		name="description"
		content="The calendar widget reads your account over CalDAV; the mail badge reads any IMAP account. Both are open standards, neither needs a vendor's permission."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Mail and calendar.</h1>
<p class="lede">
	Two cards in the desktop, two open standards behind them. Neither needs an application
	registration, a review, or anyone's permission.
</p>

<section>
	<h2>Calendar — CalDAV</h2>
	<p>
		The calendar widget reads upcoming events from the Nextcloud account you are already signed in
		to, over plain CalDAV. No extra scope and no vendor interface: the credential is the same app
		password, and recurring events are expanded by the server.
	</p>
	<p>
		The last good fetch is cached for a few minutes, and when the server cannot be reached the widget
		shows that copy rather than going blank.
	</p>
	<Code code={'ewe-caldav events --days 7'} />
	<p><a href="/docs/cli/ewe-caldav/">The ewe-caldav reference →</a></p>
</section>

<section>
	<h2>Mail — IMAP</h2>
	<p>
		Mail is <em>not</em> tied to your ewe account. Any IMAP mailbox works: the one your Nextcloud
		provider gives you, one you host, or a work account. Add it in
		<a href="/docs/cli/ewe-sync/">ewe-sync</a> → Mail — or with
		<a href="/docs/cli/ewe-mail/"><code>ewe-mail login</code></a> if you would rather type.
		Settings → User shows the account and its notification switch, but does not add or remove one.
		The badge shows the unread count and the newest unseen messages behind it.
	</p>
	<p>
		The password goes into the system keyring once. The account itself — host, user, port — is
		recorded in the one file, so it follows you to your next machine while the password does not.
	</p>
	<Code code={'ewe-mail unseen --limit 5'} />
	<p><a href="/docs/cli/ewe-mail/">The ewe-mail reference →</a></p>
	<Callout>
		<p>
			Gmail also works, through the optional <a href="/docs/account/google/">Google client</a>. When
			no IMAP account is configured and a Google client is, the badge uses that instead.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/nextcloud/">Nextcloud account</a> — the credential both share.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — where the mail account is recorded.</li>
	</ul>
</section>

<PageNav />
