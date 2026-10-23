<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO, DE_REPO, PKG_REPO } from '$lib/nav.js';
	import { ADDONS, GITHUB, EXAMPLE } from '$lib/docs/addons.js';
</script>

<svelte:head>
	<title>Repositories — ewe docs</title>
	<meta
		name="description"
		content="ewe is built as layers, each in its own repository: the distro, the desktop, the package repository, the software manager, settings, the account app, the casting daemon — and one repository per first-party plugin."
	/>
</svelte:head>

<p class="eyebrow">Reference</p>
<h1>Where the pieces live.</h1>
<p class="lede">
	ewe is built as layers. Each one is a repository you can read, build and replace — the ISO is only
	the assembly of them.
</p>

<section>
	<h2>The layers</h2>
	<dl class="rows">
		<div class="row">
			<dt><a href={OS_REPO}>ewe-os</a></dt>
			<dd>The distro: the archiso profile that builds the live and install ISO, and the graphical installer.</dd>
		</div>
		<div class="row">
			<dt><a href={DE_REPO}>ewe</a></dt>
			<dd>The desktop environment — the compositor configuration, the Quickshell shell, the command-line tools, the vendored first-party plugins — and the <code>ewe</code> package that installs it.</dd>
		</div>
		<div class="row">
			<dt><a href={PKG_REPO}>ewe-repo</a></dt>
			<dd>The <code>[ewe]</code> pacman repository everything ships through, and the workflow that builds it.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}komble-arch">komble-arch</a></dt>
			<dd>Komble, the software manager: your repositories, the AUR and AppImages in one window — and the Plugins page.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-settings">ewe-settings</a></dt>
			<dd>The settings application — the one that edits the one file.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-sync">ewe-sync</a></dt>
			<dd>The account application: your machines, settings sync, folder sync, and the tray icon.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-cast">ewe-cast</a></dt>
			<dd>The headless casting daemon behind the Cast plugin — Miracast and Chromecast, with no foreign window.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-browser">ewe-browser</a></dt>
			<dd>ewe browser, the desktop's browser: the web, your files, PDFs and your music in one window, themed by ewe.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-safe">ewe-safe</a></dt>
			<dd>Safe, ewe's password manager: the app, the <code>ewe-safe</code> command and the SSH agent. The Safe plugin brings it.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}ewe-companion">ewe-companion</a></dt>
			<dd>Shaun, the desktop companion behind the notch. The Shaun plugin brings it.</dd>
		</div>
		<div class="row">
			<dt><a href={EXAMPLE}>ewe-plugin-example</a></dt>
			<dd>The reference shell plugin — a service, a panel with its own IPC target, a bar widget. Clone it to start yours.</dd>
		</div>
		<div class="row">
			<dt><a href="{GITHUB}prj786.github.io">prj786.github.io</a></dt>
			<dd>This website.</dd>
		</div>
	</dl>
</section>

<section>
	<h2>One repository per first-party plugin</h2>
	<p>
		Every <a href="/docs/plugins/built-in/">plugin that ships with ewe</a> is developed and released in its
		own repository and copied into the ewe package at release time, so a fix lands in the plugin's
		repo first and reaches you with the next ewe. The sixteen:
	</p>
	<dl class="rows addons">
		{#each ADDONS as a}
			<div class="row">
				<dt><a href="{GITHUB}{a.repo}">{a.repo}</a></dt>
				<dd>{a.name} — <code>{a.id}</code></dd>
			</div>
		{/each}
	</dl>
</section>

<section>
	<h2>Which one do I file an issue against?</h2>
	<dl class="rows">
		<div class="row"><dt>The installer or the ISO</dt><dd><a href={OS_REPO}>ewe-os</a></dd></div>
		<div class="row"><dt>The bar, the Overview, a keybinding, a tool</dt><dd><a href={DE_REPO}>ewe</a></dd></div>
		<div class="row"><dt>The dock, music, mail, Cast — a plugin from ewe</dt><dd>Its own repository above, <code>ewe-plugin-&lt;name&gt;</code></dd></div>
		<div class="row"><dt>Installing software, or the Plugins page</dt><dd><a href="{GITHUB}komble-arch">komble-arch</a></dd></div>
		<div class="row"><dt>Sync, or the account</dt><dd><a href="{GITHUB}ewe-sync">ewe-sync</a></dd></div>
		<div class="row"><dt>The browser, its home page, files or music</dt><dd><a href="{GITHUB}ewe-browser">ewe-browser</a></dd></div>
		<div class="row"><dt>Safe, its window or the command</dt><dd><a href="{GITHUB}ewe-safe">ewe-safe</a></dd></div>
		<div class="row"><dt>Shaun's answers or its agents</dt><dd><a href="{GITHUB}ewe-companion">ewe-companion</a></dd></div>
		<div class="row"><dt>Not sure</dt><dd><a href={OS_REPO}>ewe-os</a> — it gets routed.</dd></div>
	</dl>
</section>

<PageNav />

<style>
	.addons dt a {
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
	}
</style>
