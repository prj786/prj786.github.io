<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Mail and calendar — ewe docs</title>
	<meta
		name="description"
		content="The calendar widget reads your account over CalDAV; your mail is in ewe Mail, from Gmail or any IMAP and SMTP mailbox. Open standards, and no vendor’s permission."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Mail and calendar.</h1>
<p class="lede">
	Two cards in the desktop, open standards behind them. Neither needs an application
	registration, a review, or anyone’s permission.
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
	<h2>Mail — ewe Mail</h2>
	<p>
		Mail is <em>not</em> tied to your ewe account. <a href="/docs/apps/mail/">ewe Mail</a> shows Gmail
		and any other mailbox, as many as you like, in one inbox. The other mailbox can be the one your
		Nextcloud provider gives you, one you host, or a work account. You add them in
		<a href="/docs/cli/ewe-sync/">ewe Sync</a>:
	</p>
	<dl class="rows">
		<div class="row"><dt>Mail</dt><dd>Type the address and the password. ewe finds the servers, and tests incoming and outgoing mail before it saves anything.</dd></div>
		<div class="row"><dt>Google</dt><dd>For Gmail, with <a href="/docs/account/google/">your own OAuth client</a>.</dd></div>
	</dl>
	<p>
		The password goes into the system keyring once. The account itself — address, servers, user
		names — is recorded in the one file, so it follows you to your next machine while the password
		does not.
	</p>
	<p>
		The envelope in the bar with the unread count, the Inbox page in Quick settings and a note for
		each new message are the <a href="/docs/plugins/built-in/">Mail plugin</a>. It reads everything
		from ewe Mail, and a note opens its message there. Notifications are its own <code>notify</code>
		setting: Komble → Plugins → Mail, the bell on the Inbox page, or
		<code>ewe-plugin set ewe.mail notify false</code>.
	</p>
	<Code code={'ewe-mail accounts'} />
	<p><a href="/docs/cli/ewe-mail/">The ewe-mail reference →</a></p>
	<Callout>
		<p>
			ewe Mail and the Mail plugin come with ewe from 0.51. Coming from 0.50, Gmail needs one
			reconnect in ewe Sync before it can send. <a href="/docs/account/google/">Why →</a>
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/nextcloud/">Nextcloud account</a> — the credential both share.</li>
		<li><a href="/docs/apps/mail/">ewe Mail</a> — the app.</li>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — where the mail accounts are recorded.</li>
	</ul>
</section>

<PageNav />
