<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Komble — ewe docs</title>
	<meta
		name="description"
		content="Komble, ewe's software manager: apps from the Arch repositories, the AUR and AppImages behind one search field, system updates in one click, your apps back on a new machine, and every plugin."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Komble.</h1>
<p class="lede">
	Komble is where software comes from on ewe. One search field finds apps in the Arch repositories,
	the AUR and AppImages; one button keeps the whole system up to date.
</p>

<section>
	<h2>Getting apps</h2>
	<dl class="rows">
		<div class="row"><dt>Search</dt><dd>Type a name. Results from every source appear together, each marked with where it comes from.</dd></div>
		<div class="row"><dt>Popular</dt><dd>A short list of well-known apps to start from.</dd></div>
		<div class="row"><dt>The AUR</dt><dd>Apps the community packages. Komble shows you the build script first, then builds it for you.</dd></div>
		<div class="row"><dt>AppImages</dt><dd>Apps that come as one file. They install for you alone and need no password.</dd></div>
		<div class="row"><dt>For you</dt><dd>On a new machine, the apps your other ewe machine had — install them back in one go.</dd></div>
	</dl>
</section>

<section>
	<h2>Updates</h2>
	<p>
		A sign in the top bar tells you when updates are waiting. Komble's <strong>Updates</strong> page has
		one button: update everything. That's on purpose — on Arch, updating only part of the system is
		the usual way to break it.
	</p>
	<p>
		If two packages clash, Komble asks which one to keep instead of just failing. If an update needs a
		restart — a new kernel, for one — it tells you. <a href="/docs/updating/">More on updating →</a>
	</p>
</section>

<section>
	<h2>Plugins</h2>
	<p>
		<strong>Plugins</strong> lists the ones that ship with ewe and the ones you added. Install one with a
		click, turn it on or off, and open its <em>Options</em>. Add one from a git URL on the same page.
		<a href="/docs/plugins/">About plugins →</a>
	</p>
	<Callout>
		<p>
			Komble records what you install in your settings, so your apps can follow you to your next
			machine. <code>komble --search firefox</code> opens Komble straight to a search.
		</p>
	</Callout>
</section>

<PageNav />
