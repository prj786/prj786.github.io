<script>
	import { SECTIONS } from '$lib/docs/nav.js';
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO, DE_REPO } from '$lib/nav.js';
	const INSTALL_DOC = OS_REPO + '/blob/main/docs/INSTALL.md';
	const MANUAL = DE_REPO + '/blob/main/docs/MANUAL.md';
</script>

<svelte:head>
	<title>Docs — ewe</title>
	<meta
		name="description"
		content="Documentation for ewe OS: install it, sign in to your Nextcloud, understand the one config file, and a reference page for every command."
	/>
</svelte:head>

<p class="eyebrow">Docs</p>
<h1>Everything you need, in order.</h1>
<p class="lede">
	Start at the top and you'll have a working machine in about ten minutes. Every graphical thing in
	ewe is a front end to one of the commands documented here, so anything you can click, you can
	script — and anything that breaks, you can debug by running the same command yourself.
</p>

<section>
	<h2>How ewe is put together</h2>
	<p>
		A machine is one file. <code>~/.config/ewe/ewe.conf</code> holds everything the desktop knows
		about itself; every runtime file Hyprland and the shell read is generated from it, and
		<code>ewe-conf</code> is the only thing that writes it. Save that file, restore the machine.
	</p>
	<p>
		The rest are small tools around it: <code>ewe-cloud</code> holds one account, the app
		<code>ewe-sync</code> moves the file and your folders between machines, Komble installs software
		and records it in the file, and Settings edits the file. There is no second, hidden path.
	</p>
	<dl class="rows">
		<div class="row">
			<dt>One job each</dt>
			<dd>Small tools with obvious verbs, not one binary with forty flags.</dd>
		</div>
		<div class="row">
			<dt>JSON out, exit 0</dt>
			<dd>
				Every broker prints a single JSON object and exits 0, even on failure — so a waiting user
				interface can never hang on one, and a script can always read the result.
			</dd>
		</div>
		<div class="row">
			<dt>Secrets in one place</dt>
			<dd>
				Passwords and tokens live only in the system keyring, behind a broker. They are never in
				<code>ewe.conf</code>, which is the file that syncs.
			</dd>
		</div>
	</dl>
	<Code
		code={`ewe-cloud login cloud.example.org   # sign in to your Nextcloud
ewe-conf push                       # back this machine up
ewe-conf pull && ewe-conf apply     # become that machine again`}
	/>
</section>

{#each SECTIONS as section}
	<section>
		<h2>{section.title}</h2>
		<div class="grid">
			{#each section.items as item}
				<div class="card">
					<h3><a href={item.href}>{item.label}</a></h3>
					<p>{item.blurb}</p>
				</div>
			{/each}
		</div>
	</section>
{/each}

<section>
	<h2>Deeper than this site</h2>
	<p>
		These pages are the map. The repositories carry the long-form documents they are drawn from: the
		<a href={INSTALL_DOC}>install guide</a> for the ISO path, and the
		<a href={MANUAL}>desktop manual</a> for everything the running system does.
	</p>
	<Callout>
		<p>
			ewe is alpha software. The install is verified end to end in a virtual machine and on real
			hardware, but coverage is still thin — install on a machine you can afford to reinstall.
			<a href="/docs/troubleshooting/">The known limitations →</a>
		</p>
	</Callout>
</section>

<PageNav />

<style>
	section {
		margin-top: 3rem;
	}
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
