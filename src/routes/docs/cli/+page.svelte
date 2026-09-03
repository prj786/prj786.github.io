<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { SECTIONS } from '$lib/docs/nav.js';
	const tools = SECTIONS.find((s) => s.title === 'CLI reference').items.filter(
		(i) => i.href !== '/docs/cli/'
	);
</script>

<svelte:head>
	<title>CLI reference — ewe docs</title>
	<meta
		name="description"
		content="Every command in ewe, one page each: what it is for, every verb, its output, its errors, and where it keeps its state."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1>Small tools, one job each.</h1>
<p class="lede">
	Every graphical thing in ewe is a front end to one of these. The settings app calls
	<code>ewe-conf</code>; the sign-in button calls <code>ewe-cloud</code>; the mail badge calls
	<code>ewe-mail</code>. There is no second, hidden path — so anything you can click you can script,
	and anything that breaks you can debug by running the same command yourself.
</p>

<section>
	<h2>Three conventions</h2>
	<dl class="rows">
		<div class="row">
			<dt>One JSON object, exit 0</dt>
			<dd>
				The brokers print a single JSON object and exit 0 whether they succeeded or failed, with an
				<code>error</code> code and a human message when they did not. A user interface waiting on
				one can never hang, and a script can always read the result.
			</dd>
		</div>
		<div class="row">
			<dt>Secrets live in the keyring</dt>
			<dd>
				Only a broker touches a credential. Passwords and tokens are in the system keyring; the
				configuration file names accounts and never holds a secret, which is what makes it safe to
				sync.
			</dd>
		</div>
		<div class="row">
			<dt>Obvious verbs</dt>
			<dd>
				<code>status</code>, <code>login</code>, <code>logout</code>, <code>mount</code>,
				<code>push</code>, <code>pull</code>. Small tools with a handful of verbs each, not one
				binary with forty flags.
			</dd>
		</div>
	</dl>
	<Code
		code={`# every broker answers the same question the same way
ewe-cloud status
ewe-auth status
ewe-mail status
ewe-conf sync-status`}
	/>
</section>

<section>
	<h2>The commands</h2>
	<div class="grid">
		{#each tools as t}
			<div class="card">
				<h3><a href={t.href}><code>{t.label}</code></a></h3>
				<p>{t.blurb}</p>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2>Which one do I want?</h2>
	<dl class="rows">
		<div class="row"><dt>Change a setting</dt><dd><a href="/docs/cli/ewe-conf/">ewe-conf</a> — or the settings app, which calls it.</dd></div>
		<div class="row"><dt>Sign in, or check who I am</dt><dd><a href="/docs/cli/ewe-cloud/">ewe-cloud</a> for your account; <a href="/docs/cli/ewe-auth/">ewe-auth</a> for optional Google.</dd></div>
		<div class="row"><dt>Back this machine up, or restore it</dt><dd><a href="/docs/cli/ewe-conf/">ewe-conf</a> <code>push</code> and <code>pull</code>, or the <a href="/docs/cli/ewe-sync/">ewe-sync</a> app.</dd></div>
		<div class="row"><dt>Get at my files</dt><dd><a href="/docs/cli/ewe-files/">ewe-files</a> to mount the account, or folder pairs in <a href="/docs/cli/ewe-sync/">ewe-sync</a>.</dd></div>
		<div class="row"><dt>Fix the desktop after an update</dt><dd><a href="/docs/cli/ewe-setup/">ewe-setup</a>, then log out and in.</dd></div>
		<div class="row"><dt>Install on another machine</dt><dd><a href="/docs/cli/ewe-install/">ewe-install</a>.</dd></div>
		<div class="row"><dt>Cast to a television</dt><dd>The Control Center — <a href="/docs/cli/ewe-castd/">ewe-castd</a> is what it drives.</dd></div>
	</dl>
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
	.card code {
		background: none;
		border: 0;
		padding: 0;
		font-size: 0.95em;
	}
</style>
