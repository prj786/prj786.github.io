<script>
	import Icon from '$lib/Icon.svelte';

	const TOC = [
		['os', 'The OS'],
		['shell', 'The shell'],
		['look', 'The look'],
		['apps', 'Apps'],
		['cast', 'Cast & phone'],
		['account', 'Your account'],
		['system', 'System']
	];
</script>

<svelte:head>
	<title>Features — ewe</title>
	<meta
		name="description"
		content="ewe OS in full: the installer and its decisions, rolling updates, the Quickshell desktop, theming, Komble, cast to TV, phone link, your Nextcloud account and the system parts."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Features</p>
	<h1>An OS, already assembled.</h1>
	<p class="lede">
		Not a set of parts with a config to write — a whole system built as one product, with the
		installer, the desktop and the software manager designed together and themed as one thing.
	</p>

	<nav class="toc" aria-label="On this page">
		{#each TOC as [id, label]}<a href="#{id}">{label}</a>{/each}
	</nav>

	<section id="os">
		<p class="eyebrow">The OS</p>
		<h2>Arch underneath, decided on top.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="hard-drive" size={16} />A first-party installer</dt>
				<dd>
					Six screens in the desktop's own design. It asks what's personal and decides the rest —
					btrfs subvolumes, systemd-boot, GPU drivers, hibernation —
					<a href="/download/#decided">showing every decision</a> before you commit.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="usb" size={16} />A live session that's the real thing</dt>
				<dd>The stick boots the actual desktop, not a demo shell. Nothing is written until you press Install.</dd>
			</div>
			<div class="row">
				<dt><Icon name="refresh-cw" size={16} />Rolling, from one repository</dt>
				<dd>
					The <code>[ewe]</code> pacman repo is preconfigured, so <code>pacman -Syu</code> — or
					Komble's Updates pane — moves the system and the desktop forward together. Nothing is pinned.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="eye" size={16} />Branded end to end</dt>
				<dd>
					Splash from firmware to greeter with no kernel text, a themed greeter, and an installer
					that never ends up on the installed machine.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="circle-user" size={16} />A welcome flow, once</dt>
				<dd>
					First login connects you, installs what's waiting, offers your Nextcloud and a restore, and
					gives a sixty-second tour. Then it never appears again.
				</dd>
			</div>
		</dl>
	</section>

	<section id="shell">
		<p class="eyebrow">The shell</p>
		<h2>Written once, in QML.</h2>
		<p>
			Hyprland is the Wayland compositor, configured in Lua. Everything you actually touch is a
			first-party Quickshell shell — one codebase, one design language, no widget zoo.
		</p>
		<div class="grid">
			<div class="card">
				<h3><Icon name="layout-panel-top" size={16} />Bar</h3>
				<p>Workspaces, window title, tray, battery, network, mail, media. Counts sit in accent badges; sync state is a glyph.</p>
			</div>
			<div class="card">
				<h3><Icon name="panel-bottom" size={16} />Dock</h3>
				<p>Pinned apps, then your windows grouped by workspace — see what's on 3 without going there. Optional hide, three sizes.</p>
			</div>
			<div class="card">
				<h3><Icon name="search" size={16} />Launcher</h3>
				<p><code>Super+D</code> — fuzzy search across apps and files, press again to dismiss.</p>
			</div>
			<div class="card">
				<h3><Icon name="sliders-horizontal" size={16} />Control centre</h3>
				<p>Wi-Fi, Bluetooth, VPN, SSH, Do Not Disturb and Insomnia as tiles; live CPU and memory. A rail switches to calendar, mail, phone and cast.</p>
			</div>
			<div class="card">
				<h3><Icon name="bell" size={16} />Notifications</h3>
				<p>Toasts with actions and inline reply, plus a history you can go back to.</p>
			</div>
			<div class="card">
				<h3><Icon name="lock" size={16} />Lock &amp; OSD</h3>
				<p>Wayland session-lock, volume and brightness OSDs, and clipboard history.</p>
			</div>
		</div>
	</section>

	<section id="look">
		<p class="eyebrow">The look</p>
		<h2>One accent, applied live.</h2>
		<p>
			There is no theme file and no light mode. You pick one colour, and a generator derives the
			whole Fluent 2 token set from it — every background level, stroke weight and foreground —
			then applies it to the shell, GTK, Qt, the icons, the cursor and your window borders without a
			relogin. <a href="/theming/">See it derive, live →</a>
		</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="palette" size={16} />Any accent</dt>
				<dd>
					Presets, or any hex you like. Text on the accent is <em>measured</em> against it, so a pale
					yellow stays as legible as a deep blue.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="ruler" size={16} />Shape and density are tokens too</dt>
				<dd>
					Corner radius, border weight and spacing move as a system — <code>corner = "none"</code>
					squares everything, with no stray rounded corner left behind.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="image" size={16} />One icon language</dt>
				<dd>Lucide throughout the shell and the apps, with a matching icon theme and cursor.</dd>
			</div>
			<div class="row">
				<dt><Icon name="zap" size={16} />Motion you control</dt>
				<dd>One pane sets speed and curve for the compositor and the shell together — snappy to off.</dd>
			</div>
		</dl>
	</section>

	<section id="apps">
		<p class="eyebrow">Apps</p>
		<h2>First-party where it matters.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="package" size={16} />Komble</dt>
				<dd>
					Official repos, the AUR and AppImages behind one search field, an Updates pane, and a “For
					You” surface that restores from your synced package list.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="settings-2" size={16} />ewe-settings</dt>
				<dd>
					Sixteen panes, all writing the one config file: Appearance, Animations, Layout &amp; Dock,
					Window Rules, Displays, Networking, Wallpaper, Keyboard &amp; Mouse, Screensaver, Power,
					Default Apps, Startup, Shortcuts, Time &amp; Place, User and System.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="box" size={16} />A curated set</dt>
				<dd>
					Nemo, Engrampa, imv, Zathura, mpv, kitty and Zed — traditional GTK apps chosen to match,
					made borderless under Hyprland, with defaults managed in one place.
				</dd>
			</div>
		</dl>
	</section>

	<section id="cast">
		<p class="eyebrow">Cast &amp; phone</p>
		<h2>The TV in the room, and the phone in your pocket.</h2>
		<p>
			Screen mirroring on Wayland is usually a research project, or a borrowed GTK window bolted onto
			a desktop that has no GTK. Here it's a card in the control centre, served by ewe's own headless
			daemon — <strong>no foreign window ever appears</strong>.
		</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="cast" size={16} />Miracast</dt>
				<dd>
					Samsung “Screen Mirroring” and most Android TVs over Wi-Fi Direct. Field-tested against a
					real Samsung at 1080p30 — this is the real-time path.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="cast" size={16} />Chromecast</dt>
				<dd>Chromecast built-in and Google TV, found on the local network. Honest about the trade-off: a few seconds of latency.</dd>
			</div>
			<div class="row">
				<dt><Icon name="monitor" size={16} />ewe's own share picker</dt>
				<dd>
					When anything asks to capture the screen you get live thumbnails — every display named by
					its actual model, every window with a preview, or a region. The same picker serves browser
					calls, OBS and recorders.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="smartphone" size={16} />Phone link</dt>
				<dd>
					Pair over Wi-Fi for phone battery in the bar, notifications you can dismiss and reply to,
					and full SMS. KDE Connect provides the daemon; the interface is ewe's, and pairing keys
					stay in the daemon.
				</dd>
			</div>
		</dl>
	</section>

	<section id="account">
		<p class="eyebrow">Your account</p>
		<h2>Your Nextcloud, not ours.</h2>
		<p>
			Sign in to <strong>any Nextcloud</strong> and three things light up: <strong>settings sync</strong>
			of the one file, your <strong>calendar</strong> over CalDAV, and your <strong>files</strong> at
			<code>~/Nextcloud</code>. It's Nextcloud's own browser login — your server's page, your
			password, your two-factor — and ewe receives an app password you can revoke any time.
		</p>
		<p>
			<strong>Mail</strong> is any IMAP account, for the unread badge and notifications.
			<strong>Google</strong> is optional and needs your own OAuth client file.
			<a href="/docs/cli/ewe-sync/"><strong>ewe-sync</strong></a> lives in the tray and is the only
			thing with a sync button: your machines, folder sync, conflicts resolved in place.
		</p>
		<p class="note">
			Until you sign in, no cloud functionality appears anywhere. Signed out or offline, everything
			degrades cleanly. <a href="/how/">How it works →</a> ·
			<a href="/docs/account/nextcloud/">The account, documented →</a>
		</p>
	</section>

	<section id="system">
		<p class="eyebrow">System</p>
		<h2>The unglamorous parts, done.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="zap" size={16} />Silent boot</dt>
				<dd>A splash from early boot straight to the themed greeter — no wall of kernel text, no menu.</dd>
			</div>
			<div class="row">
				<dt><Icon name="shield-check" size={16} />Survives a crash</dt>
				<dd>
					The shell is a restart-on-failure user service, so bar, dock and lock come back on their
					own. Outputs stay locked even if the shell dies while locked.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="monitor" size={16} />Sensible power behaviour</dt>
				<dd>
					Locks at 5 minutes; on battery, suspends at 15. Warns at 20% and 10%, suspends at 5% to
					protect unsaved work. Hibernation is set up at install when there's a battery.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="terminal" size={16} />A rescue console</dt>
				<dd>The greeter owns tty1; a root rescue console lives on tty3 for when something goes wrong.</dd>
			</div>
			<div class="row">
				<dt><Icon name="keyboard" size={16} />Keyboard-first</dt>
				<dd>A full Hyprland keymap — windows, groups, workspaces, scratchpad. <a href="/docs/shortcuts/">The shortcuts →</a></dd>
			</div>
		</dl>
	</section>
</div>

<style>
	.toc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 1.5rem;
	}
	.toc a {
		font-size: 0.85rem;
		color: var(--fg-2);
		text-decoration: none;
		border: var(--stroke-width) solid var(--stroke-2);
		background: var(--bg-2);
		border-radius: var(--radius-control);
		padding: 0.3rem 0.7rem;
	}
	.toc a:hover {
		background: var(--bg-2-hover);
		color: var(--fg-1);
	}
	.rows :global(.icon) {
		color: var(--fg-3);
	}
	.card h3 :global(.icon) {
		color: var(--accent);
	}
</style>
