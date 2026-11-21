<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe Settings — ewe docs</title>
	<meta
		name="description"
		content="ewe Settings: appearance, displays, networks, Bluetooth, keyboard and mouse, typing in other languages, spell checking, power, default apps and the rest of the machine in one window — every change saved to your one settings file."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>ewe Settings.</h1>
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
		<div class="row"><dt>Keyboard and mouse</dt><dd>Layouts, typing in other languages, the mouse and the touchpad. <a href="#languages">Languages →</a></dd></div>
		<div class="row"><dt>Screensaver · Power</dt><dd>When the screen locks; the lid, the battery, the power profile.</dd></div>
		<div class="row"><dt>Default apps · Startup</dt><dd>Which app opens what; what opens when you sign in.</dd></div>
		<div class="row"><dt>Shortcuts</dt><dd>Every key, listed. <a href="/docs/shortcuts/">The keymap →</a></dd></div>
		<div class="row"><dt>Time and place</dt><dd>Time zone, and how dates and numbers are written.</dd></div>
		<div class="row"><dt>Language</dt><dd>The language of menus and dates, spell checking, and your apps' language packs. <a href="#languages">Languages →</a></dd></div>
		<div class="row"><dt>User · About this computer</dt><dd>Who you are on this computer; what it runs.</dd></div>
	</dl>
</section>

<section>
	<h2 id="languages">Languages</h2>
	<dl class="rows">
		<div class="row"><dt>Typing in other languages</dt><dd>Keyboard and mouse → <em>Typing in other languages</em> → <em>Add a language</em>: Chinese, Japanese, Korean, Vietnamese, Hindi and other Indian scripts, Thai and more. The first one downloads what it needs, behind one password prompt. <kbd>Ctrl</kbd>+<kbd>Space</kbd> switches between your keyboard and the language; <kbd>Super</kbd>+<kbd>Space</kbd> still changes the keyboard layout. While a language is on, the bar shows its mark — 拼, あ, 한. Older apps follow after you sign out once. Online suggestions for Chinese stay off.</dd></div>
		<div class="row"><dt>Display language</dt><dd>Language → <em>Display language</em>: the language of menus and dates in your apps. Apps that are open switch after you sign out and back in.</dd></div>
		<div class="row"><dt>Spell checking</dt><dd>Language → <em>Spell checking</em>. US English comes with ewe; <em>Add a language…</em> downloads another dictionary, or opens Komble when only the AUR has it (Georgian, for one). ewe Browser checks in the languages you list; LibreOffice, Firefox and other apps use the same dictionaries.</dd></div>
		<div class="row"><dt>Also for your apps</dt><dd>Language packs for Firefox, Thunderbird and LibreOffice in your display language — offered only for the ones you have.</dd></div>
		<div class="row"><dt>Formats</dt><dd>Time and place → <em>Formats</em>: how dates, times, numbers, money, measurements and paper are written, apart from the language — an English desktop with a 24-hour clock and weeks from Monday, say. Applies after you sign out.</dd></div>
	</dl>
</section>

<section>
	<h2>Where the rest lives</h2>
	<dl class="rows">
		<div class="row"><dt>Your account and sync</dt><dd>The ewe Sync app — open it from the launcher, or click your name in Quick settings. <a href="/docs/account/nextcloud/">Your account →</a></dd></div>
		<div class="row"><dt>Plugins</dt><dd>Komble → Plugins — click one for its options. <a href="/docs/plugins/">Plugins →</a></dd></div>
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
