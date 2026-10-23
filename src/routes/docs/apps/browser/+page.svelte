<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe browser — ewe docs</title>
	<meta
		name="description"
		content="ewe browser, ewe's own web browser: tabs and workspaces, passwords from Safe, gestures, privacy settings, history and sync, downloads, and your files and music in the same window."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>ewe browser.</h1>
<p class="lede">
	ewe's own web browser. The web, your files, your PDFs and your music in one window, in your
	desktop's colors and fonts. <kbd>Super</kbd>+<kbd>B</kbd> opens it. New installs open links in it;
	on a machine set up before it arrived, pick it in ewe Settings → Default apps.
</p>

<section>
	<h2>Find your way around</h2>
	<dl class="rows">
		<div class="row"><dt>Tabs</dt><dd>Down the left side. Drag one to move it, pin the ones you always keep open. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> collapses the column.</dd></div>
		<div class="row"><dt>The bottom bar</dt><dd>A thin bar along the bottom: your workspaces on the left; Bookmarks, Downloads, History, Music, Files and Settings on the right.</dd></div>
		<div class="row"><dt>Workspaces</dt><dd>Separate sets of tabs — work, home, a trip you are planning. Click one to switch. <strong>+</strong> starts a new one. Double-click a name to rename it; right-click to change its color or remove it. Drag a tab onto a workspace to move it there.</dd></div>
		<div class="row"><dt>Home</dt><dd>Where a new workspace starts: one field for a search, an address or a folder, your folders, and what you opened recently.</dd></div>
		<div class="row"><dt>Command palette</dt><dd><kbd>Ctrl</kbd>+<kbd>K</kbd>. Type to find an open tab, a bookmark or a page you visited, or to search the web.</dd></div>
		<div class="row"><dt>Site search</dt><dd>Start with <code>@</code> and a site's name — <code>@zara men's shoes</code> — and you land on that site's own results.</dd></div>
	</dl>
</section>

<section>
	<h2>Passwords with Safe</h2>
	<dl class="rows">
		<div class="row"><dt>Sign in</dt><dd>Click a login field and Safe lists the logins it has for the site. Pick one and it fills. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> opens the same list.</dd></div>
		<div class="row"><dt>Save</dt><dd>When you sign in or sign up with a new password, the browser asks to save it to Safe, or to update the old one. If Safe is locked, <em>Unlock and save</em> does both.</dd></div>
		<div class="row"><dt>Passkeys</dt><dd>Sites that offer passkeys can save one in Safe and sign you in with it.</dd></div>
		<div class="row"><dt>Cards and addresses</dt><dd>Fill from Safe the same way. Cards fill only on secure pages, and Safe may ask for your password first.</dd></div>
	</dl>
	<Callout>
		<p>
			Safe is the only password manager the browser uses. Known password-manager extensions are
			turned off, so your passwords live in one place. <a href="/docs/apps/safe/">About Safe →</a>
		</p>
	</Callout>
</section>

<section>
	<h2>Swipes, clicks and keys</h2>
	<dl class="rows">
		<div class="row"><dt>Two fingers</dt><dd>Swipe sideways on the touchpad to go back or forward.</dd></div>
		<div class="row"><dt>Four fingers</dt><dd>While the browser is in front, swipe sideways for the next or previous workspace.</dd></div>
		<div class="row"><dt>Mouse buttons</dt><dd>The side buttons go back and forward.</dd></div>
		<div class="row"><dt>Right-click</dt><dd>Links, images, selected text and the page each have their own menu.</dd></div>
		<div class="row"><dt>Find in page</dt><dd><kbd>Ctrl</kbd>+<kbd>F</kbd> shows how many matches there are; <kbd>Ctrl</kbd>+<kbd>G</kbd> goes to the next one.</dd></div>
		<div class="row"><dt>Shortcuts</dt><dd>The usual ones work: <kbd>Ctrl</kbd>+<kbd>T</kbd> a new tab, <kbd>Ctrl</kbd>+<kbd>W</kbd> closes it, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> brings it back, <kbd>Ctrl</kbd>+<kbd>L</kbd> the address. Every shortcut can be changed in Settings → Keyboard shortcuts.</dd></div>
	</dl>
	<p><a href="/docs/shortcuts/">The desktop's own keys →</a></p>
</section>

<section>
	<h2>Privacy and security</h2>
	<p>All of it is in Settings → Privacy and security.</p>
	<dl class="rows">
		<div class="row"><dt>Third-party cookies</dt><dd>Blocked from the start.</dd></div>
		<div class="row"><dt>Data sharing</dt><dd>Sites are asked not to sell or share your data. On from the start.</dd></div>
		<div class="row"><dt>Secure DNS</dt><dd>Looks sites up over an encrypted connection. Off until you pick a provider.</dd></div>
		<div class="row"><dt>HTTPS-Only</dt><dd>Warns you before a page that is not secure opens. Off until you choose.</dd></div>
		<div class="row"><dt>Site permissions</dt><dd>A site that wants your camera, microphone, location or notifications has to ask, and your answer is remembered. Click the lock beside the address to see or change what a site may do.</dd></div>
	</dl>
</section>

<section>
	<h2>History, sync and downloads</h2>
	<dl class="rows">
		<div class="row"><dt>History</dt><dd><kbd>Ctrl</kbd>+<kbd>H</kbd>. Search it, delete from it, or choose in Settings how long it is kept.</dd></div>
		<div class="row"><dt>Sync</dt><dd>Turn on <em>Sync with Nextcloud</em> in Settings and your bookmarks, history, open tabs, shortcuts and look follow you to your other ewe computers. Tabs open on those computers show on the history page. <a href="/docs/account/nextcloud/">Your Nextcloud →</a></dd></div>
		<div class="row"><dt>Downloads</dt><dd><kbd>Ctrl</kbd>+<kbd>J</kbd>, or Downloads in the bottom bar. With the Dock plugin, the dock shows a ring while a download runs; click it to open the file or show it in its folder. <a href="/docs/plugins/built-in/">The Dock →</a></dd></div>
		<div class="row"><dt>Bookmarks</dt><dd><kbd>Ctrl</kbd>+<kbd>D</kbd> bookmarks the page. Coming from Chrome? Settings → Bookmarks → Import brings yours over.</dd></div>
	</dl>
</section>

<section>
	<h2>More than the web</h2>
	<dl class="rows">
		<div class="row"><dt>Files</dt><dd><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>, or Files in the bottom bar. A file manager with your places, your Nextcloud and your drives: copy, move, trash, compress and extract. Settings → Files can make it open your folders, too.</dd></div>
		<div class="row"><dt>Pictures, video and PDFs</dt><dd>Open right in the window, and you can step through the rest of the folder.</dd></div>
		<div class="row"><dt>Music</dt><dd><kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>. Your Music folder by album, artist and song, with a queue, shuffle and repeat. The desktop's media controls and media keys work with it.</dd></div>
		<div class="row"><dt>Extensions</dt><dd>From the Chrome Web Store: open one and press <em>Add to ewe browser</em> under the address field.</dd></div>
	</dl>
	<p>
		The browser also has a command line, for scripts. Every command answers in JSON;
		<code>ewe-browser help</code> lists them all.
	</p>
	<Code code={`ewe-browser open ~/Documents                    # a folder, a file, an address or a search
ewe-browser search "men's shoes" --site zara    # a site's own results`} />
</section>

<PageNav />
