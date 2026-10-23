<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>The desktop — ewe docs</title>
	<meta
		name="description"
		content="Find your way around the ewe desktop: the bar, the launcher, the Overview, Quick settings, minimizing windows, workspaces on one or more displays, desktop widgets, light and dark, and the lock screen."
	/>
</svelte:head>

<p class="eyebrow">Get started</p>
<h1>The desktop.</h1>
<p class="lede">
	Everything you see is ewe's own: one bar, one launcher, one look. Windows tile side by side on
	their own, and everything has a key — but the mouse works everywhere too.
</p>

<section>
	<h2>Around the screen</h2>
	<dl class="rows">
		<div class="row"><dt>The bar</dt><dd>Along the top: your workspaces, the window you're in, the clock, and the status of Wi-Fi, sound and battery. Click the status for Quick settings.</dd></div>
		<div class="row"><dt>The launcher</dt><dd><kbd>Super</kbd>+<kbd>D</kbd>. Type to find an app, a file or a folder. Press the key again to close it.</dd></div>
		<div class="row"><dt>Quick settings</dt><dd><kbd>Super</kbd>+<kbd>N</kbd>. Wi-Fi, Bluetooth, sound, Do not disturb, your calendar, your notifications, and lock, log out or shut down.</dd></div>
		<div class="row"><dt>Notifications</dt><dd>They pop up in the corner, with buttons and a reply field when the app offers them, and wait in Quick settings until you clear them.</dd></div>
		<div class="row"><dt>The dock</dt><dd>Optional — it's a plugin. <a href="/docs/plugins/built-in/#dock">Get the dock →</a></dd></div>
	</dl>
</section>

<section>
	<h2>The Overview</h2>
	<p>
		Tap <kbd>Super</kbd> and every open window spreads out in front of you, with your workspaces along
		the top. Click a window to go to it. Drag a window onto a workspace to move it there. Tap
		<kbd>Super</kbd> again, or press <kbd>Esc</kbd>, to go back.
	</p>
</section>

<section>
	<h2>Minimize</h2>
	<p>
		<kbd>Super</kbd>+<kbd>Z</kbd> puts the window away. With the dock installed it waits there as a
		small picture of itself — click it to bring it back. <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>
		brings back the last one you put away.
	</p>
</section>

<section>
	<h2>Workspaces</h2>
	<p>
		A workspace is a separate screenful of windows. <kbd>Super</kbd>+<kbd>1</kbd>, <kbd>2</kbd>,
		<kbd>3</kbd> … switches; add <kbd>Shift</kbd> to take the window with you. A three-finger swipe
		flips between them.
	</p>
	<p>
		With more than one display, each display has its own workspaces, like on a Mac, and the keys act
		on the display you're using. Prefer one set for all displays? Settings → Displays → Workspaces →
		<strong>Shared</strong>.
	</p>
</section>

<section>
	<h2>Desktop widgets</h2>
	<p>
		Some plugins put a card on the desktop — Slack's unread messages, for one. Drag it where you want
		it. Point at it for a small toolbar: pin it above your windows, lock it in place, or hide it.
		<kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> shows every widget at once to arrange them.
	</p>
</section>

<section>
	<h2>Light, dark and your colors</h2>
	<p>
		ewe is dark by default and has a light mode. Settings → Appearance switches between them, picks
		your accent color, or takes the colors from your wallpaper. The bar, your apps and the window
		borders all change at once. <a href="/theming/">How theming works →</a>
	</p>
</section>

<section>
	<h2>Lock and sleep</h2>
	<p>
		The screen locks after five minutes on its own, or at once from Quick settings. On battery, the
		computer sleeps after fifteen minutes, and when the battery is almost empty it sleeps to keep your
		work safe. Settings → Screensaver sets when it locks; Settings → Power has the lid and the
		battery.
	</p>
	<Callout>
		<p>
			If the desktop ever crashes, it comes back by itself in a second — your apps keep running, and a
			locked screen stays locked. A screen that stays black: <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>
			turns every display back on.
		</p>
	</Callout>
	<p><a href="/docs/shortcuts/">Every keyboard shortcut →</a></p>
</section>

<PageNav />
