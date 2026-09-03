<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>First login — ewe docs</title>
	<meta
		name="description"
		content="What happens the first time you log in to ewe: the welcome flow, connecting, updates, signing in to your Nextcloud, restoring a backup — and the three keys to start with."
	/>
</svelte:head>

<p class="eyebrow">Get started</p>
<h1>First login.</h1>
<p class="lede">
	The installed machine boots through the splash into the greeter. Your first login runs a welcome
	flow once — and every step of it is skippable. Skip all of it and ewe is a fully local machine that
	never talks to anyone.
</p>

<section>
	<h2>The welcome flow</h2>
	<dl class="rows">
		<div class="row"><dt>Connect</dt><dd>Wired or Wi-Fi, joined here, because the next two steps need it.</dd></div>
		<div class="row"><dt>Updates</dt><dd>Any updates that landed since the image was built. A fresh install is already current, so this usually just confirms it.</dd></div>
		<div class="row"><dt>Sign in</dt><dd>Your Nextcloud, on your server's own page. Optional. <a href="/docs/account/nextcloud/">What this gives you →</a></dd></div>
		<div class="row"><dt>Restore</dt><dd>Offered only when the account already holds a backup from another machine. <a href="/docs/account/settings-sync/">How restoring works →</a></dd></div>
		<div class="row"><dt>Tour</dt><dd>Sixty seconds on where things are.</dd></div>
	</dl>
	<Callout>
		<p>
			The flow runs once per installation. To see it again later, the desktop can reopen it — and
			everything it offers is also in Settings, at any time.
		</p>
	</Callout>
</section>

<section>
	<h2>Three keys to start with</h2>
	<dl class="rows">
		<div class="row"><dt><kbd>Super</kbd> <kbd>Return</kbd></dt><dd>A terminal.</dd></div>
		<div class="row"><dt><kbd>Super</kbd> <kbd>D</kbd></dt><dd>The launcher — applications and files.</dd></div>
		<div class="row"><dt><kbd>Super</kbd> <kbd>,</kbd></dt><dd>Settings.</dd></div>
	</dl>
	<p><a href="/docs/shortcuts/">The full keymap →</a></p>
</section>

<section>
	<h2>If something is wrong</h2>
	<p>
		A black screen, a greeter that will not take your password, or a sign-in that cannot reach the
		keyring are all covered in <a href="/docs/troubleshooting/">troubleshooting</a>.
	</p>
</section>

<PageNav />

<style>
	kbd {
		font-family: var(--mono);
		font-size: 0.75rem;
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: 5px;
		padding: 0.1rem 0.34rem;
		color: var(--fg);
	}
</style>
