<script>
	import Icon from '$lib/Icon.svelte';
	import { ADDONS } from '$lib/docs/addons.js';

	const TOC = [
		['os', 'The OS'],
		['desktop', 'The desktop'],
		['apps', 'Apps'],
		['plugins', 'Plugins'],
		['look', 'The look'],
		['account', 'Your account'],
		['system', 'System']
	];
</script>

<svelte:head>
	<title>Features — ewe</title>
	<meta
		name="description"
		content="Everything ewe OS does, in short: the installer, the desktop, ewe browser, Safe, Shaun, Komble, Settings, sixteen plugins you choose, theming, your Nextcloud account and the quiet system parts."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Features</p>
	<h1>An OS, already assembled.</h1>
	<p class="lede">
		Not a pile of parts with a config to write — one system, made to fit together: the installer, the
		desktop, the apps and the look.
	</p>

	<nav class="toc" aria-label="On this page">
		{#each TOC as [id, label]}<a href="#{id}">{label}</a>{/each}
	</nav>

	<section id="os">
		<p class="eyebrow">The OS</p>
		<h2>Arch underneath, decided on top.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="hard-drive" size={16} />An installer that asks little</dt>
				<dd>Keyboard, place, disk, your account, your plugins. ewe decides the rest and shows you everything before it writes a byte. <a href="/docs/install/">Install →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="usb" size={16} />Try it first</dt>
				<dd>The USB stick runs the real desktop. Nothing is written until you press Install.</dd>
			</div>
			<div class="row">
				<dt><Icon name="refresh-cw" size={16} />Always up to date</dt>
				<dd>One update moves the system and the desktop forward together. <a href="/docs/updating/">Updating →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="circle-user" size={16} />A welcome, once</dt>
				<dd>The first login connects you, signs you in, offers your backup and your plugins — then never shows again.</dd>
			</div>
		</dl>
	</section>

	<section id="desktop">
		<p class="eyebrow">The desktop</p>
		<h2>Everything has its place.</h2>
		<div class="grid">
			<div class="card">
				<h3><Icon name="layers" size={16} />Overview</h3>
				<p>Tap <code>Super</code>: every window spreads out, your workspaces along the top. Drag a window to move it.</p>
			</div>
			<div class="card">
				<h3><Icon name="search" size={16} />Launcher</h3>
				<p><code>Super+D</code> finds apps, files and folders as you type.</p>
			</div>
			<div class="card">
				<h3><Icon name="minimize-2" size={16} />Minimize</h3>
				<p><code>Super+Z</code> tucks a window away; it waits in the dock as a small picture.</p>
			</div>
			<div class="card">
				<h3><Icon name="monitor" size={16} />Every display, its own workspaces</h3>
				<p>Like on a Mac — or one shared set, if you prefer.</p>
			</div>
			<div class="card">
				<h3><Icon name="sliders-horizontal" size={16} />Quick settings</h3>
				<p>Wi-Fi, Bluetooth, sound, Do not disturb, your calendar and notifications in one panel.</p>
			</div>
			<div class="card">
				<h3><Icon name="app-window" size={16} />Desktop widgets</h3>
				<p>Cards you drag anywhere and pin above your windows.</p>
			</div>
		</div>
		<p><a href="/docs/desktop/">The desktop, explained →</a></p>
	</section>

	<section id="apps">
		<p class="eyebrow">Apps</p>
		<h2>Made by ewe, where it matters.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="compass" size={16} />ewe browser</dt>
				<dd>The web, your files, PDFs and music in one window. Workspaces, site search, and Safe built in. <a href="/docs/apps/browser/">More →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="vault" size={16} />Safe</dt>
				<dd>Your own password manager: logins, cards, passkeys and SSH keys, encrypted, synced through your Nextcloud. <a href="/docs/apps/safe/">More →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="message-circle" size={16} />Shaun</dt>
				<dd>A companion in a notch under the bar: your AI agents at a glance, quick switches, and a chat. <a href="/docs/apps/shaun/">More →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="package" size={16} />Komble</dt>
				<dd>Apps from the Arch repos, the AUR and AppImages, updates in one click, and every plugin. <a href="/docs/apps/komble/">More →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="settings-2" size={16} />Settings</dt>
				<dd>The whole machine in one window. <a href="/docs/apps/settings/">More →</a></dd>
			</div>
			<div class="row">
				<dt><Icon name="folder-sync" size={16} />ewe-sync</dt>
				<dd>Your account, your machines and your synced folders, in the tray. <a href="/docs/account/nextcloud/">More →</a></dd>
			</div>
		</dl>
	</section>

	<section id="plugins">
		<p class="eyebrow">Plugins</p>
		<h2>Sixteen built in. Yours by choice.</h2>
		<p>
			They ship with ewe and install only when you ask — in the installer, at first login, or one
			click in Komble. <a href="/docs/plugins/built-in/">Each one →</a>
		</p>
		<ul class="addons">
			{#each ADDONS as a}
				<li><Icon name={a.icon} size={16} /><strong>{a.name}</strong><span>{a.blurb}</span></li>
			{/each}
		</ul>
		<p>
			And you can write your own: a little QML that wears the desktop's own colors. <a href="/docs/plugins/">How plugins work →</a>
		</p>
	</section>

	<section id="look">
		<p class="eyebrow">The look</p>
		<h2>One accent, everywhere, live.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="moon" size={16} />Dark or light</dt>
				<dd>Dark by default, with a light mode. Every app follows.</dd>
			</div>
			<div class="row">
				<dt><Icon name="palette" size={16} />Any accent</dt>
				<dd>Nine presets or any color you like — text on it always stays readable.</dd>
			</div>
			<div class="row">
				<dt><Icon name="image" size={16} />Schemes and wallpaper colors</dt>
				<dd>Import a color scheme, or take the colors from your wallpaper.</dd>
			</div>
			<div class="row">
				<dt><Icon name="zap" size={16} />Motion you control</dt>
				<dd>From snappy to off. Nothing bounces.</dd>
			</div>
		</dl>
		<p><a href="/theming/">See it work →</a></p>
	</section>

	<section id="account">
		<p class="eyebrow">Your account</p>
		<h2>Your Nextcloud, not ours.</h2>
		<p>
			Sign in to <strong>any Nextcloud</strong> and your settings, calendar and files follow you. Safe
			and ewe browser can sync through it too. You sign in on your own server's page; ewe never sees
			your password.
		</p>
		<p class="note">
			Until you sign in, nothing goes to the cloud. <a href="/how/">How it works →</a>
		</p>
	</section>

	<section id="system">
		<p class="eyebrow">System</p>
		<h2>The quiet parts, done.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="zap" size={16} />Silent boot</dt>
				<dd>A splash from power-on straight to the login screen.</dd>
			</div>
			<div class="row">
				<dt><Icon name="shield-check" size={16} />Survives a crash</dt>
				<dd>The desktop restarts itself in a second; your apps keep running and a locked screen stays locked.</dd>
			</div>
			<div class="row">
				<dt><Icon name="monitor" size={16} />Sensible power</dt>
				<dd>Locks when you're away, sleeps on battery, and saves your work before the battery runs out.</dd>
			</div>
			<div class="row">
				<dt><Icon name="keyboard" size={16} />Keyboard-first</dt>
				<dd>Everything has a key. <a href="/docs/shortcuts/">The shortcuts →</a></dd>
			</div>
		</dl>
	</section>
</div>

<style>
	.toc {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-md);
	}
	.toc a {
		display: inline-flex;
		align-items: center;
		height: var(--control-sm);
		padding: 0 var(--space-s);
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		text-decoration: none;
		border: var(--border-width-1) solid var(--border-strong);
		border-radius: var(--fully-rounded);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	.toc a:hover {
		background: var(--surface-hover);
		color: var(--text-primary);
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	.card h3 :global(.icon) {
		color: var(--accent-text);
	}
	/* the built-in plugins: a glyph, the name, one line */
	.addons {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-s) var(--space-md);
		max-width: none;
	}
	.addons li {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		column-gap: var(--space-s);
		align-items: baseline;
		margin: 0;
		padding: var(--space-s) 0;
		border-top: var(--border-width-1) solid var(--border-subtle);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-secondary);
	}
	.addons li :global(.icon) {
		color: var(--accent-text);
		align-self: start;
		margin-top: 0.2em;
	}
	.addons strong {
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
	}
	.addons span {
		grid-column: 2;
	}
</style>
