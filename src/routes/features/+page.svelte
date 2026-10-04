<script>
	import Icon from '$lib/Icon.svelte';
	import { ADDONS } from '$lib/docs/addons.js';

	const TOC = [
		['os', 'The OS'],
		['shell', 'The shell'],
		['addons', 'Add-ons'],
		['look', 'The look'],
		['apps', 'Apps'],
		['plugins', 'Plugins'],
		['cast', 'Cast & phone'],
		['account', 'Your account'],
		['system', 'System']
	];
</script>

<svelte:head>
	<title>Features — ewe</title>
	<meta
		name="description"
		content="ewe OS in full: the installer and its decisions, rolling updates, the Quickshell desktop, the thirteen add-ons you choose, theming, Komble, plugins, cast to TV, phone link, your Nextcloud account and the system parts."
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
					Eight screens in the desktop's own design. It asks what's personal — and which add-ons
					you want — and decides the rest: btrfs subvolumes, systemd-boot, GPU drivers,
					hibernation, <a href="/download/#decided">showing every decision</a> before you commit.
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
					First login connects you, installs what's waiting, offers your Nextcloud and a restore, lets
					you pick add-ons, and gives a sixty-second tour. Then it never appears again.
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
				<p>Workspaces, window title, tray, battery, network, sound. Counts sit in accent badges; sync state is a glyph — and the add-ons add theirs: an envelope, a shield, a phone.</p>
			</div>
			<div class="card">
				<h3><Icon name="layers" size={16} />Overview</h3>
				<p>Tap <code>Super</code>: every window on every workspace over the wallpaper, in one step. Type and you are searching.</p>
			</div>
			<div class="card">
				<h3><Icon name="search" size={16} />Launcher</h3>
				<p><code>Super+D</code> — fuzzy search across apps and files, press again to dismiss.</p>
			</div>
			<div class="card">
				<h3><Icon name="sliders-horizontal" size={16} />Quick settings</h3>
				<p>Wi-Fi, Bluetooth, sound and Do not disturb as tiles; a rail for calendar and notifications. Add-ons add their own tiles and pages — VPN, SSH, Insomnia, CPU and memory, mail, phone, Cast.</p>
			</div>
			<div class="card">
				<h3><Icon name="bell" size={16} />Notifications</h3>
				<p>Toasts with actions and inline reply, plus a history you can go back to.</p>
			</div>
			<div class="card">
				<h3><Icon name="lock" size={16} />Lock &amp; OSD</h3>
				<p>Wayland session-lock, volume and brightness OSDs. Lid open fades in once, with no flicker and no instant re-sleep.</p>
			</div>
		</div>
	</section>
	<section id="addons">
		<p class="eyebrow">Add-ons</p>
		<h2>Lean by default. Yours by choice.</h2>
		<p>
			A fresh ewe is the core above plus Settings, Komble and ewe-sync — and nothing else. Thirteen
			first-party add-ons ship inside ewe, work offline, and install only when you ask: at install,
			on first login, or one click in Komble → Add-ons, which also fetches any package an add-on
			needs. Upgraders keep what they had. <a href="/docs/add-ons/">Each one, documented →</a>
		</p>
		<ul class="addons">
			{#each ADDONS as a}
				<li><Icon name={a.icon} size={16} /><strong>{a.name}</strong><span>{a.blurb}</span></li>
			{/each}
		</ul>
	</section>

	<section id="look">
		<p class="eyebrow">The look</p>
		<h2>One accent — or a whole scheme — applied live.</h2>
		<p>
			A scheme and an accent decide everything: one generator derives every role — surfaces, text,
			outlines, the accent set, status and glass — and applies them to the shell, GTK, Qt, the
			icons, the cursor and your window borders without signing out. ewe ships Ewe Dark and Ewe
			Light; import a palette (Base16/24, Omarchy, Catppuccin, Gogh), write your own, or take the
			colors from your wallpaper. <a href="/theming/">See it derive, live →</a>
		</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="palette" size={16} />Any accent</dt>
				<dd>
					Nine presets, or any hex you like. Text on the accent is <em>measured</em> against it, so a
					pale yellow stays as legible as a deep blue.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="layers" size={16} />Schemes and wallpaper colors</dt>
				<dd>
					Settings → Appearance lists every scheme as a card, with Import, Export and Duplicate.
					Import a palette or take one from the picture on screen; a scheme is a file, so it travels.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="ruler" size={16} />Shape and density are presets</dt>
				<dd>
					Corner, density and stroke remap a few tokens at once — <code>corner = "none"</code>
					squares everything, with no stray rounded corner left behind.
					<a href="/design/shape/#presets">Every value</a>.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="image" size={16} />One icon language</dt>
				<dd>Lucide throughout the shell and the apps, with a matching icon theme and cursor.</dd>
			</div>
			<div class="row">
				<dt><Icon name="zap" size={16} />Motion you control</dt>
				<dd>One pane sets speed and curve for the compositor and the shell together, from snappy to off. Nothing bounces or overshoots.</dd>
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
					Eighteen panes, all writing the one config file: Appearance, Accessibility, Animations,
					Layout and dock, Window rules, Displays, Networking, Bluetooth, Wallpaper, Keyboard and
					mouse, Screensaver, Power, Default apps, Startup, Shortcuts, Time and place, User and
					System. A pane for a feature you have not installed says so and offers the add-on.
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

	<section id="plugins">
		<p class="eyebrow">Plugins</p>
		<h2>Extend it without forking it.</h2>
		<p>
			The shell is one Quickshell process, so a plugin is QML it loads beside its own components —
			not a widget bolted on from outside. <code>ewe-plugin add &lt;git-url&gt;</code> and it is
			there at the next start, wearing the desktop's own roles.
		</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="puzzle" size={16} />Ten kinds</dt>
				<dd>
					Quick settings tiles and pages, glyphs in the bar's pill, dock items, bar widgets packed
					between the built-in indicators, desktop widgets you drag into place, panels and
					overlays summoned over IPC, headless services that run from login. The thirteen add-ons
					are made of exactly these.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="palette" size={16} />The same vocabulary</dt>
				<dd>
					<code>import qs</code> gives a plugin every <code>Theme</code> role, the
					<code>Shell</code> singleton and the components the desktop itself is built from. Ask for a
					role, never a value, and it recolors with the accent.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="shield-check" size={16} />Honest about trust</dt>
				<dd>
					Installing never runs plugin code; enabling does, unsandboxed, and the tool says so. A
					plugin that crashes the shell gets three strikes in a minute, then the desktop boots
					without it and names the suspects.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="git-branch" size={16} />Yours to write</dt>
				<dd>
					A manifest and one QML file per kind. <a href="/docs/plugins/writing/">The guide</a>
					starts from the reference plugin; <code>ewe-plugin add ./my-plugin</code> tries it before
					it has a repository.
				</dd>
			</div>
		</dl>
	</section>

	<section id="cast">
		<p class="eyebrow">Cast &amp; phone</p>
		<h2>The TV in the room, and the phone in your pocket.</h2>
		<p>
			Screen mirroring on Wayland is usually a research project, or a borrowed GTK window bolted onto
			a desktop that has no GTK. Here it's the Cast add-on in Quick settings, served by ewe's own
			headless daemon — <strong>no foreign window ever appears</strong>. Both are add-ons: install
			the ones you have a TV or a phone for.
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
					The Phone add-on: pair over Wi-Fi for phone battery in the bar, notifications you can
					dismiss and reply to, and full SMS. KDE Connect provides the daemon — Komble installs it
					with the add-on; the interface is ewe's, and pairing keys stay in the daemon.
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
			<strong>Mail</strong> — the Mail add-on — is any IMAP account or Gmail, for the unread badge,
			an Inbox page and notifications. <strong>Google</strong> is optional and needs your own OAuth
			client file.
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
					The shell is a restart-on-failure user service, so bar, add-ons and lock come back on their
					own. Outputs stay locked even if the shell dies while locked. A plugin that crashes it
					three times in a minute is left out of the next start, and named.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="monitor" size={16} />Sensible power behavior</dt>
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
	/* the thirteen add-ons: a glyph, the name, one line */
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
