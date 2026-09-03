<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO, DE_REPO, PKG_REPO } from '$lib/nav.js';
</script>

<svelte:head>
	<title>Repositories — ewe docs</title>
	<meta
		name="description"
		content="ewe is built as layers, each in its own repository: the distro, the desktop, the package repository, the software manager, settings, the account app and the casting daemon."
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
			<dd>The desktop environment — the compositor configuration, the Quickshell shell, the command-line tools — and the <code>ewe</code> package that installs it.</dd>
		</div>
		<div class="row">
			<dt><a href={PKG_REPO}>ewe-repo</a></dt>
			<dd>The <code>[ewe]</code> pacman repository everything ships through, and the workflow that builds it.</dd>
		</div>
		<div class="row">
			<dt><a href="https://github.com/prj786/komble-arch">komble-arch</a></dt>
			<dd>Komble, the software manager: your repositories, the AUR and AppImages in one window.</dd>
		</div>
		<div class="row">
			<dt><a href="https://github.com/prj786/ewe-settings">ewe-settings</a></dt>
			<dd>The settings application — the one that edits the one file.</dd>
		</div>
		<div class="row">
			<dt><a href="https://github.com/prj786/ewe-sync">ewe-sync</a></dt>
			<dd>The account application: your machines, settings sync, folder sync, and the tray icon.</dd>
		</div>
		<div class="row">
			<dt><a href="https://github.com/prj786/ewe-cast">ewe-cast</a></dt>
			<dd>The headless casting daemon behind the Cast card — Miracast and Chromecast, with no foreign window.</dd>
		</div>
		<div class="row">
			<dt><a href="https://github.com/prj786/prj786.github.io">prj786.github.io</a></dt>
			<dd>This website.</dd>
		</div>
	</dl>
</section>

<section>
	<h2>Which one do I file an issue against?</h2>
	<dl class="rows">
		<div class="row"><dt>The installer or the ISO</dt><dd><a href={OS_REPO}>ewe-os</a></dd></div>
		<div class="row"><dt>The bar, the dock, a keybinding, a tool</dt><dd><a href={DE_REPO}>ewe</a></dd></div>
		<div class="row"><dt>Installing software</dt><dd><a href="https://github.com/prj786/komble-arch">komble-arch</a></dd></div>
		<div class="row"><dt>Sync, or the account</dt><dd><a href="https://github.com/prj786/ewe-sync">ewe-sync</a></dd></div>
		<div class="row"><dt>Not sure</dt><dd><a href={OS_REPO}>ewe-os</a> — it gets routed.</dd></div>
	</dl>
</section>

<PageNav />
