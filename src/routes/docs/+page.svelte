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
	Start at the top and you'll have a working machine in about ten minutes. Then learn your way
	around the desktop and the apps, pick your <a href="/docs/plugins/built-in/">plugins</a>, and —
	if you like a terminal — find every command here too.
</p>

<section>
	<h2>How ewe is put together</h2>
	<p>
		A machine is one file. <code>~/.config/ewe/ewe.conf</code> holds everything the desktop knows
		about itself; every runtime file Hyprland and the shell read is generated from it, and
		<code>ewe-conf</code> is the only thing that writes it. Save that file, restore the machine.
	</p>
	<p>
		The rest are small tools around it: Settings edits the file, Komble installs software and
		notes it there, <code>ewe-sync</code> carries it between your machines, and
		<code>ewe-plugin</code> adds plugins and records which are on. Anything you can click, you can
		also run from a terminal.
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
			ewe is in beta. Install it on a machine you can reinstall, and tell us what breaks.
			<a href="/docs/troubleshooting/">What it can't do yet →</a>
		</p>
	</Callout>
</section>

<PageNav />

<style>
	section {
		margin-top: var(--space-lg);
	}
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
