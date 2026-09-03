<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Settings sync — ewe docs</title>
	<meta
		name="description"
		content="How ewe syncs the one file to your account, how conflicts are decided by the server rather than by clocks, and how a fresh machine restores itself."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Settings sync.</h1>
<p class="lede">
	Your machine is one file. Sync uploads it to your account and brings it back on the next machine —
	the theme, the dock, the keybindings, your display profiles, and the list of applications Komble
	installed for you.
</p>

<section>
	<h2>The two verbs</h2>
	<Code
		code={`ewe-conf push                    # this machine → your account
ewe-conf pull && ewe-conf apply  # your account → this machine, made live`}
	/>
	<p>
		The <a href="/docs/cli/ewe-sync/">ewe-sync</a> app does both from a window and a tray icon, and
		Settings → Account has the same buttons. <code>[sync].enabled</code> is the auto-sync switch:
		with it on, every change schedules a debounced upload.
	</p>
</section>

<section>
	<h2>Where it lives in your account</h2>
	<dl class="rows">
		<div class="row"><dt><code>ewe/ewe.conf</code></dt><dd>The document itself.</dd></div>
		<div class="row"><dt><code>ewe/ewe.conf.meta.json</code></dt><dd>Which machine saved it and when — so the account card can say <em>backup saved by laptop, five minutes ago</em>.</dd></div>
		<div class="row"><dt><code>ewe/machines/&lt;name&gt;.json</code></dt><dd>One record per machine: its ewe version and how many applications it carries.</dd></div>
	</dl>
</section>

<section>
	<h2>Conflicts are the server's decision</h2>
	<p>
		Every upload carries the identity of the copy this machine last saw. If another machine has saved
		since, the <strong>server itself</strong> refuses the write and ewe reports
		<code>remote-newer</code>: pull theirs, or push with <code>--force</code>. There is no window in
		which two machines can both think they won.
	</p>
	<p>
		A machine that has <em>never</em> synced may only upload into an empty account. If a backup
		already exists it gets <code>remote-exists</code> and is told to restore first. That is what stops
		a fresh install from erasing the backup it was about to restore.
	</p>
	<Callout title="No clocks, no hostnames">
		<p>
			Neither takes part in the decision. Two machines with the same name, or a fresh install with a
			wrong clock, sync correctly. The machine name is recorded only so the interface can name who
			saved the backup.
		</p>
	</Callout>
</section>

<section>
	<h2>Restoring a machine</h2>
	<p>
		Sign in during the welcome flow and, if the account holds a backup, ewe offers to restore it
		there and then. Afterwards Komble's <em>For you</em> pane reads the application list out of the
		restored file and offers to reinstall what is missing — repository packages in one go, and
		anything from the AUR through its usual review step.
	</p>
	<Code code={'ewe-conf pull && ewe-conf apply'} />
</section>

<section>
	<h2>What never syncs</h2>
	<p>
		Secrets. The file names accounts and never carries a password, a token or a private key — those
		stay in the system keyring on each machine. SSH host definitions and VPN profiles do sync, but
		their credentials do not: a restored machine recreates the profile and asks you for the password
		once. <a href="/docs/one-file/schema/">The schema, in full →</a>
	</p>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/cli/ewe-conf/">ewe-conf</a> — the verbs, the results and every error code.</li>
		<li><a href="/docs/cli/ewe-sync/">ewe-sync</a> — the app that runs them.</li>
		<li><a href="/docs/one-file/">The one file</a> — what is being synced.</li>
	</ul>
</section>

<PageNav />
