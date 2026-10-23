<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Settings — ewe docs</title>
	<meta
		name="description"
		content="ewe Settings: appearance, displays, networks, Bluetooth, keyboard and mouse, power, default apps and the rest of the machine in one window — every change saved to your one settings file."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Settings.</h1>
<p class="lede">
	One window for the whole machine. <kbd>Super</kbd>+<kbd>,</kbd> opens it. Every change applies at
	once and is saved to <a href="/docs/one-file/">one settings file</a> — so it can follow you to your
	next computer.
</p>

<section>
	<h2>What's in it</h2>
	<dl class="rows">
		<div class="row"><dt>Appearance</dt><dd>Light or dark, your accent color, color schemes, the glass of the bar. <a href="/theming/">Theming →</a></dd></div>
		<div class="row"><dt>Wallpaper</dt><dd>Your picture — and its colors for the whole desktop, if you like.</dd></div>
		<div class="row"><dt>Accessibility</dt><dd>Bigger text, more contrast, less transparency, less motion.</dd></div>
		<div class="row"><dt>Animations</dt><dd>How fast things move, from snappy to off.</dd></div>
		<div class="row"><dt>Layout</dt><dd>How windows tile, the space around them, the top bar, and the dock's options.</dd></div>
		<div class="row"><dt>Window rules</dt><dd>Always open an app on a chosen workspace, or make it float.</dd></div>
		<div class="row"><dt>Displays</dt><dd>Resolution, scale, where each display sits — and, with two or more, separate or shared workspaces.</dd></div>
		<div class="row"><dt>Networking · Bluetooth</dt><dd>Wi-Fi, wired and saved networks; pair and connect devices.</dd></div>
		<div class="row"><dt>Keyboard and mouse</dt><dd>Layouts and typing, the mouse and the touchpad.</dd></div>
		<div class="row"><dt>Screensaver · Power</dt><dd>When the screen locks; the lid, the battery, the power profile.</dd></div>
		<div class="row"><dt>Default apps · Startup</dt><dd>Which app opens what; what opens when you sign in.</dd></div>
		<div class="row"><dt>Shortcuts</dt><dd>Every key, listed. <a href="/docs/shortcuts/">The keymap →</a></dd></div>
		<div class="row"><dt>Time and place · User · System</dt><dd>Time zone and language; who you are on this computer; what it runs.</dd></div>
	</dl>
</section>

<section>
	<h2>Where the rest lives</h2>
	<dl class="rows">
		<div class="row"><dt>Your account and sync</dt><dd>The ewe-sync app in the tray. <a href="/docs/account/nextcloud/">Your account →</a></dd></div>
		<div class="row"><dt>Plugins</dt><dd>Komble → Plugins, each with its own Options. <a href="/docs/plugins/">Plugins →</a></dd></div>
		<div class="row"><dt>Quick changes</dt><dd>Wi-Fi, sound and Do not disturb are one click away in Quick settings, <kbd>Super</kbd>+<kbd>N</kbd>.</dd></div>
	</dl>
	<Callout>
		<p>
			A pane for something you haven't installed — the dock, say — tells you which plugin brings it,
			instead of showing controls that do nothing.
		</p>
	</Callout>
</section>

<PageNav />
