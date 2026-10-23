<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Safe — ewe docs</title>
	<meta
		name="description"
		content="Safe, ewe's own password manager: logins, cards, addresses and SSH keys in one encrypted safe, filled into the browser and any window, and kept in your own Nextcloud."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Safe.</h1>
<p class="lede">
	Safe is ewe's own password manager. Your logins, notes, cards, addresses and SSH keys live in one
	encrypted safe that only your master password opens. It fills logins into the ewe browser and any
	other app, and it can follow you to every computer through your own Nextcloud.
</p>

<section>
	<h2>Set it up</h2>
	<dl class="rows">
		<div class="row"><dt>Install</dt><dd>Komble → Plugins → Safe. That brings the app too. Then open Safe from the launcher.</dd></div>
		<div class="row"><dt>Where it lives</dt><dd><em>Your Nextcloud</em> (recommended), so your other computers get the same safe — or <em>this computer</em> only. Either way it is locked before it leaves the machine; Nextcloud only ever sees a locked file. <a href="/docs/account/nextcloud/">Your Nextcloud →</a></dd></div>
		<div class="row"><dt>Master password</dt><dd>It opens your safe everywhere. Four or more random words work well; <em>Suggest a passphrase</em> makes some for you.</dd></div>
		<div class="row"><dt>Your next computer</dt><dd>Sign in to the same Nextcloud and install Safe — it offers to open your safe from there. Changes from two computers are merged.</dd></div>
		<div class="row"><dt>KeePass inside</dt><dd>The safe is a standard KeePass file, so KeePassXC or a KeePass app on your phone can open it too.</dd></div>
	</dl>
	<Callout type="warning" title="There is no reset.">
		<p>
			Forget the master password and nobody can open your safe. Safe → Settings → Security →
			<em>Emergency Kit</em> prints one page to keep somewhere safe.
		</p>
	</Callout>
</section>

<section>
	<h2>What it keeps</h2>
	<dl class="rows">
		<div class="row"><dt>Logins</dt><dd>Username, password and website — with a strong password made for you, and one-time codes when a site uses them.</dd></div>
		<div class="row"><dt>Cards and addresses</dt><dd>Ready to fill in shop forms.</dd></div>
		<div class="row"><dt>Notes</dt><dd>Any text you want locked away.</dd></div>
		<div class="row"><dt>SSH keys</dt><dd>Turn the SSH agent on and <code>ssh</code> and <code>git</code> use your keys from Safe.</dd></div>
		<div class="row"><dt>Passkeys</dt><dd>When a site offers one, the ewe browser keeps it in Safe.</dd></div>
	</dl>
</section>

<section>
	<h2>Filling in</h2>
	<dl class="rows">
		<div class="row"><dt><kbd>Super</kbd> <kbd>P</kbd></dt><dd>In any app: pick a login and it is typed in for you.</dd></div>
		<div class="row"><dt><kbd>Super</kbd> <kbd>Shift</kbd> <kbd>P</kbd></dt><dd>Quick Access: search everything, copy a password, a username or a code.</dd></div>
		<div class="row"><dt>ewe browser</dt><dd>Logins appear right in the form. New logins and sign-ups are offered for saving, even while Safe is locked. <a href="/docs/apps/browser/">The browser →</a></dd></div>
		<div class="row"><dt>Copies</dt><dd>Never kept in the clipboard history, and cleared after 30 seconds.</dd></div>
	</dl>
	<p>The two keys come from the Safe and Passwords plugins — see <a href="/docs/plugins/built-in/#safety">the built-in plugins</a>.</p>
</section>

<section>
	<h2>Locking</h2>
	<p>
		Safe locks itself when the screen locks, before sleep, and after 30 minutes unused. The lock in the
		bar shows whether it is open; click it, or the Quick settings tile, to lock or unlock.
	</p>
	<dl class="rows">
		<div class="row"><dt>Login password</dt><dd>Turn on <em>Unlock with my login password</em> in Safe → Settings → Security, and logging in opens Safe too. The copy in your Nextcloud still needs the master password.</dd></div>
		<div class="row"><dt>Keyring prompt</dt><dd>Asked for a keyring password at every start? Safe → Settings → Keyring → <em>Fix the keyring password prompt</em> ends it.</dd></div>
	</dl>
</section>

<section>
	<h2>Coming from 1Password</h2>
	<p>
		Safe → Settings → <em>Import</em> takes 1Password's export file, its CSV, or reads straight from
		the 1Password app. Each vault becomes a folder. Delete the export file afterwards — it holds every
		password in plain text. Passkeys don't come across: sign in once with the password and let the
		browser make a new one.
	</p>
</section>

<section>
	<h2>From a terminal</h2>
	<p>
		<code>ewe-safe</code> works like 1Password's <code>op</code>, for scripts:
	</p>
	<Code
		code={`ewe-safe search github
ewe-safe read "safe://Personal/GitHub/password"
ewe-safe run --env-file .env -- npm start     # secrets for this command only
ewe-safe lock`}
	/>
</section>

<PageNav />
