<script>
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe Files, ewe Player, ewe Viewer — ewe docs</title>
	<meta
		name="description"
		content="ewe's own apps for folders, video and music, documents and pictures: ewe Files, ewe Player and ewe Viewer, in the ewe Browser look, following your theme. Video links from YouTube and other sites, subtitles in any language, iPhone photos."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Files, Player, Viewer.</h1>
<p class="lede">
	Folders, video and music, documents and pictures open in ewe's own apps. They look like ewe Browser,
	follow your colours and text size, and close completely when you close them. File names, song
	titles and tabs in Arabic or Hebrew read right to left, as they should.
</p>

<section>
	<h2>ewe Files</h2>
	<dl class="rows">
		<div class="row"><dt>Tabs and split view</dt><dd>Ctrl+T opens a tab, F3 shows two folders side by side, Ctrl+N a new window.</dd></div>
		<div class="row"><dt>Copy and move</dt><dd>Big copies show their progress, speed and time left; pause or cancel them. When a name is taken, you choose: replace, skip or keep both. Ctrl+Z undoes a move, a rename or Move to Trash.</dd></div>
		<div class="row"><dt>Trash</dt><dd>Restore what you deleted, delete it for good, or empty the Trash.</dd></div>
		<div class="row"><dt>Drives and phones</dt><dd>USB drives, SD cards and phones show up in the sidebar; eject them from there. <em>Connect to server…</em> opens SMB, SFTP, FTP and WebDAV shares.</dd></div>
		<div class="row"><dt>Archives</dt><dd>Open a zip, tar or RAR to see what's inside, extract it here or somewhere else, or compress a selection to zip, tar.gz, tar.zst or 7z.</dd></div>
		<div class="row"><dt>Find and preview</dt><dd>Search inside the folder as you type, or everywhere. Space shows a quick look; F9 keeps a preview pane open. Text files read right in any language, whatever their encoding, and iPhone photos (HEIC) get thumbnails.</dd></div>
		<div class="row"><dt>Open with</dt><dd>Pick another app for a file, and make it the default for that kind of file.</dd></div>
		<div class="row"><dt>Your account</dt><dd>Synced folders carry their sync state; <em>Keep in your account…</em> adds a folder to ewe Sync.</dd></div>
	</dl>
</section>

<section>
	<h2>ewe Player</h2>
	<dl class="rows">
		<div class="row"><dt>Video</dt><dd>Nearly every format plays, with hardware decoding on Intel and AMD. Subtitles from the file or next to it, other audio tracks, speed, a small player that stays on top, and it remembers where you stopped.</dd></div>
		<div class="row"><dt>Links</dt><dd>Videos from YouTube, Twitch and many other sites play too. <kbd>Ctrl</kbd>+<kbd>L</kbd> (<em>Open URL…</em>) takes a link, and in ewe Browser a right-click offers <em>Play in ewe Player</em>. If a site can't be played here, ewe Player says why and offers <em>Open in ewe Browser</em>.</dd></div>
		<div class="row"><dt>Languages</dt><dd>Audio and subtitle tracks are named in their own language — English, Русский, ქართული. A file with several tracks starts in your display language, or in the <em>Preferred language</em> you pick in either menu. Subtitles in any language read right; if one still looks garbled, <em>Subtitle encoding</em> picks another.</dd></div>
		<div class="row"><dt>Music</dt><dd>Your Music folder as albums, artists and songs, with search, a queue, shuffle, repeat and playlists.</dd></div>
		<div class="row"><dt>Media keys</dt><dd>The keyboard's play and skip keys and the dock's now-playing control it.</dd></div>
		<div class="row"><dt>Keys</dt><dd>Space plays and pauses, ←/→ skip 5 seconds, J/L 10, ↑/↓ change the volume, F is fullscreen, C turns subtitles on and off.</dd></div>
	</dl>
</section>

<section>
	<h2>ewe Viewer</h2>
	<dl class="rows">
		<div class="row"><dt>PDFs</dt><dd>Page thumbnails, the table of contents, find, forms you can fill in and save, presentation mode, printing, and a dark page mode. It remembers your page.</dd></div>
		<div class="row"><dt>Books and comics</dt><dd>EPUB books with font size and page colours; CBZ and CBR comics, one page or two.</dd></div>
		<div class="row"><dt>Documents</dt><dd>Markdown, text and code, Word documents and spreadsheets (xlsx, ods, csv) open to read. Text in any language reads right, whatever its encoding; the encoding button in the toolbar picks another when a file still looks garbled.</dd></div>
		<div class="row"><dt>Pictures</dt><dd>Zoom, rotate, a slideshow through the folder, the camera details, set as wallpaper or move to Trash. Photos from phones open too — HEIC from an iPhone, AVIF and JPEG XL.</dd></div>
		<div class="row"><dt>Tabs</dt><dd>Several documents in one window; the start screen shows what you opened last.</dd></div>
	</dl>
	<Callout>
		<p>
			They replaced Nemo, Engrampa, imv, Zathura and mpv in ewe 0.44. After the update, ewe makes them
			the default once for anything that still opened in the old apps; your own choices stay. The old apps
			stay installed until you remove them:
			<code>sudo pacman -Rns nemo engrampa imv zathura zathura-pdf-mupdf mpv-mpris mpv-uosc-git</code>.
		</p>
	</Callout>
</section>

<PageNav />
