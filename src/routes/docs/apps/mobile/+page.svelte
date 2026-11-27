<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe Mobile — ewe docs</title>
	<meta
		name="description"
		content="ewe Mobile, your phone on your desktop: messages, contacts, notifications, files, its screen, its apps and a remote, in one ewe window over KDE Connect."
	/>
</svelte:head>

<p class="eyebrow">Apps <span class="badge">Beta</span></p>
<h1>ewe Mobile.</h1>
<p class="lede">
	ewe Mobile is your phone on your desktop: messages, contacts, notifications, what is playing, files,
	its screen, its apps and a remote — one ewe window instead of KDE Connect's five. It is the window
	over KDE Connect: the phone runs the KDE Connect app, and ewe Mobile is everything you see of it. It
	is a beta.
</p>

<section>
	<h2>Set it up</h2>
	<dl class="rows">
		<div class="row"><dt>Install</dt><dd><code>sudo pacman -S ewe-mobile</code>, or tick it on the installer's Apps screen. It brings <code>kdeconnect</code> and <code>sshfs</code>. Then open ewe Mobile from the launcher.</dd></div>
		<div class="row"><dt>On the phone</dt><dd>Install KDE Connect — from Google Play or F-Droid; on an iPhone, the App Store.</dd></div>
		<div class="row"><dt>Pair</dt><dd>Open the app on the same Wi-Fi as this computer. In ewe Mobile, choose the phone under <em>Devices</em> and accept on it. Both show the same key: check that they match.</dd></div>
		<div class="row"><dt>The Phone plugin</dt><dd>The bar's phone glyph and the Quick settings page come from the Phone plugin, a separate install: <strong>Komble → Plugins → Phone</strong>. <a href="/docs/plugins/built-in/#talk">Built-in plugins →</a></dd></div>
	</dl>
</section>

<section>
	<h2>What is in the window</h2>
	<dl class="rows">
		<div class="row"><dt>Phone</dt><dd>The phone at a glance: battery, mobile signal, ring it, send the clipboard or files, open its storage, the newest messages and notifications.</dd></div>
		<div class="row"><dt>Messages</dt><dd>SMS and MMS as conversations, with names and photos from the phone's contacts. Search, or write to a contact or a number. A sent message reads “Sending…” until the phone confirms it.</dd></div>
		<div class="row"><dt>Contacts</dt><dd>The phone's address book: search, message, have the phone dial, copy a number. It stays readable while the phone is away.</dd></div>
		<div class="row"><dt>Notifications</dt><dd>What the phone is showing, by app. Dismiss one — on the phone too — or reply to the ones that take a reply.</dd></div>
		<div class="row"><dt>Media</dt><dd>The phone's player: play, pause, skip, seek, volume, and which player.</dd></div>
		<div class="row"><dt>Files</dt><dd>Send files, text and links — drop files anywhere on the window. Browse the phone's storage in ewe Files. Open what the phone sent.</dd></div>
		<div class="row"><dt>Screen</dt><dd>The phone's screen in a window on this computer. <a href="#screen">More below.</a></dd></div>
		<div class="row"><dt>Apps</dt><dd>The phone's apps, searchable. A click opens one in its own window here when the debugging link is up, else on the phone; the menu offers both. They are kept while the phone is away.</dd></div>
		<div class="row"><dt>Remote</dt><dd>This computer's mouse and keyboard on the phone. <a href="#remote">More below.</a></dd></div>
		<div class="row"><dt>Devices</dt><dd>Pair and unpair, pick the phone in use, name this computer, switch single features on and off.</dd></div>
	</dl>
</section>

<section>
	<h2>Around the desktop</h2>
	<dl class="rows">
		<div class="row"><dt>Notifications</dt><dd>A phone notification is a desktop card with the app's own icon and name and a chip with the phone's name. Where the app takes a reply, the card has a field for it. A click opens ewe Mobile's Notifications page. The Phone plugin does this.</dd></div>
		<div class="row"><dt>The dock</dt><dd>The Phone plugin adds a Phone button to the dock, on every display's dock. It shows while a phone is paired. Its card holds the phone's apps and its folders — Camera, Screenshots, Downloads, Documents, Music, Movies and the internal storage — and a click on a folder opens it in ewe Files.</dd></div>
		<div class="row"><dt>ewe Files</dt><dd>A paired phone is a row under <em>Devices</em>. Press <em>Connect</em> while it is in reach, browse its storage, eject it when you are done. <a href="/docs/apps/files-player-viewer/">ewe Files →</a></dd></div>
		<div class="row"><dt>The launcher</dt><dd>The phone's apps can sit in the launcher (<kbd>Super</kbd> <kbd>D</kbd>) beside your own, marked as phone apps. A switch on the Apps page (<em>Show the phone's apps in the launcher</em>) turns it off.</dd></div>
	</dl>
</section>

<section id="screen">
	<h2>The phone's screen and apps</h2>
	<p>
		The screen and the “open here” windows come over a second link beside KDE Connect's: Android's
		<em>Wireless debugging</em>, with scrcpy drawing the windows. On the phone, turn on Developer
		options and then Wireless debugging. Pair this computer once with a six-digit code; after that
		the phone is found on its own.
	</p>
	<dl class="rows">
		<div class="row"><dt>Packages</dt><dd><code>android-tools</code> and <code>scrcpy</code>. They are optional; when they are missing the Screen page hands them to Komble.</dd></div>
		<div class="row"><dt>Mirror</dt><dd>One button, with the phone's screen off, sound here, stay awake, and a quality pick.</dd></div>
		<div class="row"><dt>One app, one window</dt><dd>On the Apps page, “open here” puts one phone app in a window of its own.</dd></div>
	</dl>
	<Callout type="warning" title="It has a price.">
		<p>
			Developer options stay on while you use it, and a paired computer can do anything on the phone.
			Some banking apps refuse to run while Developer options is on; switch it off when you need
			them. The Screen page says all this before it asks for anything.
		</p>
	</Callout>
</section>

<section id="remote">
	<h2>The Remote page</h2>
	<p>
		It sends this computer's pointer and keys to the phone: a pad for the pointer (tap, swipe,
		long-press, turn the page, Back, Home, Recents) and a box that types into the field open on the
		phone. The phone takes them only once you allow KDE Connect as an accessibility service on it,
		once: in the KDE Connect app, under the plugins that need permissions, Mouse receiver →
		Accessibility settings. Until then it drops everything without a word, and the page looks dead.
		The page says what to switch on.
	</p>
</section>

<section>
	<h2>On the phone</h2>
	<dl class="rows">
		<div class="row"><dt>The KDE Connect app</dt><dd>It works for everything in ewe Mobile except real app icons on the Apps page.</dd></div>
		<div class="row"><dt>ewe Mobile for Android</dt><dd>ewe's own build of that app. It also sends the phone's apps and their icons. It is not released yet.</dd></div>
	</dl>
</section>

<section>
	<h2>What it keeps</h2>
	<p>
		Almost nothing: no database, no copy of your messages. Close the window and it ends. What stays:
		which phone was in use and the mirror's options; the phone's apps list and icons, so the dock and
		the launcher work while the phone is away; the launcher entries it writes for the phone's apps;
		and one setting, <code>mobile.launcher_apps</code>, in <code>ewe.conf</code>. All of it goes when
		you unpair the phone.
	</p>
</section>

<section>
	<h2>From a terminal</h2>
	<Code
		code={`ewe-mobile                    # open the window
ewe-mobile --page messages    # open it on a page
ewe-mobile --status           # is it installed, running, which phones`}
	/>
	<p><code>--status</code> answers in JSON and never starts the phone link by itself.</p>
</section>

<PageNav />

<style>
	.badge {
		display: inline-block;
		vertical-align: middle;
		margin-left: var(--space-s);
		padding: 0 var(--space-xs);
		border-radius: var(--fully-rounded);
		background: var(--surface-hover);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		letter-spacing: normal;
	}
</style>
