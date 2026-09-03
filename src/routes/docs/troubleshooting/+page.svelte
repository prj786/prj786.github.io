<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO, DE_REPO, ISSUES } from '$lib/nav.js';
	const TROUBLE = OS_REPO + '/blob/main/docs/TROUBLESHOOTING.md';
	const DE_TROUBLE = DE_REPO + '/blob/main/docs/TROUBLESHOOTING.md';
</script>

<svelte:head>
	<title>Troubleshooting — ewe docs</title>
	<meta
		name="description"
		content="Known limitations of ewe OS, the first things to check when the desktop, the keyring or sync misbehaves, and where to report what you find."
	/>
</svelte:head>

<p class="eyebrow">Reference</p>
<h1>When something is wrong.</h1>
<p class="lede">
	ewe is alpha software and says so. This page is the honest list of what does not work yet, and the
	first checks for the things that do.
</p>

<section>
	<h2>Known limitations</h2>
	<ul>
		<li>
			<strong>It is an alpha.</strong> The install is verified end to end in a virtual machine and on
			real hardware, but coverage is thin. Install on a machine you can afford to reinstall.
		</li>
		<li><strong>Whole-disk installs only</strong> — no dual-boot and no manual partitioning yet.</li>
		<li><strong>x86_64 and unsigned</strong> — no ARM image, and Secure Boot must be off.</li>
		<li>
			<strong>The screen never powers off on idle</strong> — it locks instead. A deliberate
			workaround for a graphics driver bug on some Intel hardware; re-enable it on hardware without
			that bug.
		</li>
		<li>On battery, the machine locks at five minutes and suspends at fifteen. Both are one edit away.</li>
		<li>The session lock works, but it is the youngest security-relevant component here.</li>
		<li>Multi-monitor hotplug is lightly tested.</li>
		<li>No input method yet — CJK and complex-script input is not wired up.</li>
		<li>Chromecast mirroring carries a few seconds of latency; Miracast is the real-time path.</li>
	</ul>
</section>

<section>
	<h2>First checks</h2>
	<dl class="rows">
		<div class="row">
			<dt>The desktop looks stale after an update</dt>
			<dd>Run <code>ewe-setup</code>, then log out and back in. It refreshes the shipped files and never touches your own state.</dd>
		</div>
		<div class="row">
			<dt>A setting will not stick</dt>
			<dd>Check you are editing the source, not a generated file: <code>ewe-conf get &lt;key&gt;</code>, then <code>ewe-conf apply</code>. <a href="/docs/one-file/editing/">More →</a></dd>
		</div>
		<div class="row">
			<dt>Sign-in cannot reach the keyring</dt>
			<dd>Ask the tools: <code>ewe-cloud status</code> reports the keyring state. A keyring created with a password other than your login one can never be unlocked automatically — <code>ewe-auth keyring-reset</code> moves it aside so your next login recreates it.</dd>
		</div>
		<div class="row">
			<dt>Sync refuses to upload</dt>
			<dd><code>ewe-conf sync-status</code> names which machine saved the backup and when. <code>remote-newer</code> means pull first; <code>remote-exists</code> means restore first. <a href="/docs/account/settings-sync/">More →</a></dd>
		</div>
		<div class="row">
			<dt>The mail badge is empty</dt>
			<dd><code>ewe-mail status</code>, then <code>ewe-mail unseen</code>. An <code>auth-failed</code> usually means the provider wants an application-specific password.</dd>
		</div>
	</dl>
	<Code
		code={`ewe-cloud status      # account and keyring
ewe-conf sync-status  # the backup, and this machine
ewe-mail status       # the mail account
ewe-auth status       # the optional Google client`}
	/>
</section>

<section>
	<h2>The long guides</h2>
	<div class="grid">
		<div class="card">
			<h3><a href={TROUBLE}>ISO and installer</a></h3>
			<p>Boot problems, the installer, and the first boots of a new machine.</p>
		</div>
		<div class="card">
			<h3><a href={DE_TROUBLE}>The desktop</a></h3>
			<p>The running system: the shell, the keyring, sign-in, sleep and freezes.</p>
		</div>
		<div class="card">
			<h3><a href={ISSUES}>Issues</a></h3>
			<p>Bugs and feature requests. Security reports go privately through the Security tab.</p>
		</div>
		<div class="card">
			<h3><a href="{DE_REPO}/discussions">Discussions</a></h3>
			<p>Questions, setups, and anything that is not a bug yet.</p>
		</div>
	</div>
</section>

<section>
	<h2>Reporting well</h2>
	<p>
		The output of the status commands above, the machine's hardware, and what you expected instead —
		that is usually enough. Reports from real hardware are the most useful thing anyone can send.
	</p>
</section>

<PageNav />

<style>
	.grid {
		margin-top: 1rem;
	}
	.card h3 a {
		text-decoration: none;
	}
	.card h3 a:hover {
		text-decoration: underline;
		text-decoration-color: var(--accent);
	}
</style>
