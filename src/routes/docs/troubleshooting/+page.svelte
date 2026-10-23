<script>
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO, DE_REPO, ISSUES } from '$lib/nav.js';
	const TROUBLE = OS_REPO + '/blob/main/docs/TROUBLESHOOTING.md';
	const DE_TROUBLE = DE_REPO + '/blob/main/docs/TROUBLESHOOTING.md';
</script>

<svelte:head>
	<title>Troubleshooting — ewe docs</title>
	<meta
		name="description"
		content="What ewe can't do yet, the first things to check when the desktop, a plugin, the keyring or sync misbehaves, and where to report what you find."
	/>
</svelte:head>

<p class="eyebrow">Reference</p>
<h1>When something is wrong.</h1>
<p class="lede">
	ewe is in beta. Most things just work now; this page lists what still doesn't, and the first
	things to check when something goes wrong.
</p>

<section>
	<h2>Known limitations</h2>
	<ul>
		<li><strong>Whole disk only.</strong> The installer erases the disk you pick — no dual-boot yet.</li>
		<li><strong>64-bit PCs with UEFI.</strong> No ARM image, and Secure Boot has to be off.</li>
		<li><strong>The screen locks but doesn't switch off</strong> when you're away — a workaround for a graphics bug on some Intel laptops.</li>
		<li><strong>No input method yet</strong> for Chinese, Japanese, Korean and similar scripts.</li>
		<li><strong>Older X11 apps</strong> get one scale for all screens, chosen when you log in.</li>
		<li><strong>Chromecast</strong> runs a few seconds behind; Miracast is the real-time way to cast.</li>
	</ul>
	<p>Found something else? <a href={ISSUES}>Tell us</a> — reports from real machines help most.</p>
</section>

<section>
	<h2>First checks</h2>
	<dl class="rows">
		<div class="row">
			<dt>No dock, or a plugin's button is missing</dt>
			<dd>A fresh ewe has no plugins until you pick them. Komble → Plugins, or <code>ewe-plugin list</code> to see what's on. A plugin's <em>Show in bar</em> switch can also hide its button. <a href="/docs/plugins/built-in/">Built-in plugins →</a></dd>
		</div>
		<div class="row">
			<dt>The desktop looks stale after an update</dt>
			<dd>Log out and back in. Still stale? Run <code>ewe-setup</code>, then log in again — it never touches your own settings.</dd>
		</div>
		<div class="row">
			<dt>A black screen</dt>
			<dd><kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> turns every display back on.</dd>
		</div>
		<div class="row">
			<dt>Asked for a keyring password at every start</dt>
			<dd>With Safe: Safe → Settings → Keyring → <em>Fix the keyring password prompt</em>. Without it: <code>ewe-auth keyring-reset</code>, then log in again.</dd>
		</div>
		<div class="row">
			<dt>Sync won't upload</dt>
			<dd><code>ewe-conf sync-status</code> says which machine saved last and what to do. <a href="/docs/account/settings-sync/">More →</a></dd>
		</div>
		<div class="row">
			<dt>A setting won't stick</dt>
			<dd>Change it in Settings or with <code>ewe-conf set</code>, never in a generated file. <a href="/docs/one-file/editing/">More →</a></dd>
		</div>
		<div class="row">
			<dt>Casting finds no TV</dt>
			<dd>Run <code>~/.config/ewe/plugins/ewe.cast/cast-check.sh</code> — it checks what casting needs and prints the fix.</dd>
		</div>
		<div class="row">
			<dt>The mail count is empty</dt>
			<dd><code>ewe-mail status</code>. An <code>auth-failed</code> usually means your provider wants an app password.</dd>
		</div>
	</dl>
	<Code
		code={`ewe-plugin list       # your plugins: on, off, safe mode
ewe-cloud status      # your account and the keyring
ewe-conf sync-status  # the backup, and this machine`}
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
		margin-top: var(--space-md);
	}
	.card h3 a {
		color: var(--text-primary);
		text-decoration: none;
	}
	.card h3 a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
