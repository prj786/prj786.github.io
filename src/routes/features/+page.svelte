<svelte:head>
	<title>Features — ewe</title>
	<meta
		name="description"
		content="ewe OS in full: the installer and its decisions, rolling updates, the shell, theming, Komble, cast to TV, phone link, your Nextcloud account and the safety model."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Features</p>
	<h1>An OS, already assembled.</h1>
	<p class="lede">
		ewe isn't a set of parts with a config to write. It's a whole system built as one product — the
		installer, the desktop and the software manager designed together and themed as one thing.
	</p>

	<nav class="toc" aria-label="On this page">
		<a href="#os">The OS</a>
		<a href="#shell">The shell</a>
		<a href="#look">The look</a>
		<a href="#apps">Apps</a>
		<a href="#cast">Cast to TV</a>
		<a href="#phone">Phone</a>
		<a href="#account">Your account</a>
		<a href="#system">System</a>
	</nav>

	<section id="os">
		<p class="eyebrow">The OS</p>
		<h2>Arch underneath, decided on top.</h2>
		<p>
			ewe is a real distribution with its own ISO, not a theme you apply to something else. Underneath
			it's ordinary Arch — pacman, the AUR, normal packages — so nothing you learn is wasted.
		</p>
		<dl class="rows">
			<div class="row">
				<dt>A first-party installer</dt>
				<dd>
					Six screens in the same design language as the desktop. It asks what's personal and decides
					the rest — btrfs subvolumes, systemd-boot, GPU drivers, hibernation —
					<a href="/download/#decided">showing you every decision</a> before you commit.
				</dd>
			</div>
			<div class="row">
				<dt>A live session that's the real thing</dt>
				<dd>
					The stick boots the actual desktop, not a demo shell. Nothing is written to your disks
					until you press Install.
				</dd>
			</div>
			<div class="row">
				<dt>Rolling, from one repository</dt>
				<dd>
					The <code>[ewe]</code> pacman repo is preconfigured on the ISO and on installed systems, so
					<code>pacman -Syu</code> — or Komble's Updates pane — moves the system and the desktop
					forward together. Nothing is pinned.
				</dd>
			</div>
			<div class="row">
				<dt>Branded end to end</dt>
				<dd>
					Splash from firmware to greeter with no kernel text and no Arch logo, a themed greeter, and
					an installer that never ends up on the installed machine.
				</dd>
			</div>
			<div class="row">
				<dt>A welcome flow, once</dt>
				<dd>
					First login connects you, installs what's waiting, signs you in to your Nextcloud, offers
					a restore if the account holds a backup, and gives a sixty-second tour. Then it never
					appears again.
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
				<h3>Bar</h3>
				<p>Workspaces, window title, tray, battery, network, mail, media — 30px, out of your way.</p>
			</div>
			<div class="card">
				<h3>Dock</h3>
				<p>
					Pinned apps, then your windows grouped by workspace — so you can see what's on 3 without
					going there. Optional intelligent hide, three icon sizes.
				</p>
			</div>
			<div class="card">
				<h3>Launcher</h3>
				<p><code>Super+D</code> — fuzzy search across apps and files, press again to dismiss.</p>
			</div>
			<div class="card">
				<h3>Control centre</h3>
				<p>
					Wi-Fi, Bluetooth, VPN, SSH, Do Not Disturb and Insomnia as tiles; live CPU and memory;
					volume and brightness. An icon rail switches to calendar, mail, phone and cast.
				</p>
			</div>
			<div class="card">
				<h3>Notifications</h3>
				<p>Toasts with actions and inline reply, plus a history you can go back to.</p>
			</div>
			<div class="card">
				<h3>Lock &amp; OSD</h3>
				<p>Wayland session-lock, volume and brightness OSDs, and clipboard history.</p>
			</div>
		</div>
	</section>

	<section id="look">
		<p class="eyebrow">The look</p>
		<h2>One theme, applied live.</h2>
		<dl class="rows">
			<div class="row">
				<dt>Dark, by decision</dt>
				<dd>
					There is no light mode, deliberately. Two dark looks instead: <strong>Flock</strong>, the
					ewe look in soft dark greys — and <strong>Black Sheep</strong>, the same look on absolute
					black (<code>#020202</code>) surfaces, for OLED panels. Bar, dock and panels follow the
					style; shape, icons and your accent stay identical. (This site wears Black Sheep.)
				</dd>
			</div>
			<div class="row">
				<dt>One accent</dt>
				<dd>
					Ten colours, applying instantly to the shell, your window borders and GTK/Qt apps at once —
					no relogin. Text on the accent auto-contrasts, so a pale yellow stays as legible as a deep
					blue.
				</dd>
			</div>
			<div class="row">
				<dt>One icon language</dt>
				<dd>Phosphor glyphs throughout the shell; a matching icon theme and cursor for apps.</dd>
			</div>
			<div class="row">
				<dt>Motion you control</dt>
				<dd>
					An animations pane sets speed and curve for the compositor and the shell together — from
					snappy to off, one setting for both halves.
				</dd>
			</div>
		</dl>
	</section>

	<section id="apps">
		<p class="eyebrow">Apps</p>
		<h2>First-party where it matters.</h2>
		<dl class="rows">
			<div class="row">
				<dt>Komble</dt>
				<dd>
					The software manager: official repos, the AUR and AppImages behind one search field, an
					Updates pane, and a “For You” surface that restores from your synced package list.
				</dd>
			</div>
			<div class="row">
				<dt>ewe-settings</dt>
				<dd>
					Sixteen panes, all writing the one config file: Appearance, Animations, Layout &amp; Dock,
					Window Rules, Displays, Networking, Wallpaper, Keyboard &amp; Mouse, Screensaver, Power,
					Default Apps, Startup, Shortcuts, Time &amp; Place, User and System.
				</dd>
			</div>
			<div class="row">
				<dt>A curated set</dt>
				<dd>
					Nemo, Engrampa, imv, Zathura, mpv, kitty and Zed: traditional GTK apps chosen to match,
					made borderless under Hyprland, with defaults managed in one place.
				</dd>
			</div>
		</dl>
	</section>

	<section id="cast">
		<p class="eyebrow">Cast to TV</p>
		<h2>One card, any TV in the room.</h2>
		<p>
			Screen mirroring on Wayland is usually a research project, or a borrowed GTK window bolted onto
			a desktop that has no GTK. In ewe it's a card in the control centre, served by ewe's own
			headless daemon — <strong>no foreign window ever appears</strong>.
		</p>
		<dl class="rows">
			<div class="row">
				<dt>Miracast</dt>
				<dd>
					Samsung “Screen Mirroring” and most Android TVs, over Wi-Fi Direct. Field-tested against a
					real Samsung at 1080p30 — this is the real-time path.
				</dd>
			</div>
			<div class="row">
				<dt>Chromecast</dt>
				<dd>
					Chromecast built-in and Google TV, discovered on the local network. Honest about the
					trade-off: it streams with a few seconds of latency.
				</dd>
			</div>
			<div class="row">
				<dt>The flow</dt>
				<dd>
					Expand the Cast card, watch it scan for sinks, pick one. The card shows the sink name and a
					stop button. That's the whole interface.
				</dd>
			</div>
			<div class="row">
				<dt>ewe's own share picker</dt>
				<dd>
					When anything asks to capture the screen, you get live thumbnails of every display named by
					its actual model, every window with a preview, or a region — instead of a bare list of
					connector names. The same picker serves browser calls, OBS and recorders.
				</dd>
			</div>
		</dl>
	</section>

	<section id="phone">
		<p class="eyebrow">Phone</p>
		<h2>Your Android, in the control centre.</h2>
		<p>
			Pair over Wi-Fi and the Mobile card gives you phone battery in the bar, your phone's
			notifications — read, dismiss, reply inline — and <strong>full SMS</strong>: conversation list,
			thread view, and sending. KDE Connect provides the daemon; the entire interface is ewe's.
			Pairing keys stay in the daemon.
		</p>
	</section>

	<section id="account">
		<p class="eyebrow">Your account</p>
		<h2>Your Nextcloud, not ours.</h2>
		<p>
			Sign in to <strong>any Nextcloud</strong> — a server you run, or a hosted account — and three
			things light up: <strong>settings sync</strong> of the one file, your <strong>calendar</strong>
			with agenda and reminders over CalDAV, and your <strong>files</strong> as a folder at
			<code>~/Nextcloud</code>. It's Nextcloud's own browser login: your server's page, your
			password, your two-factor; ewe receives an app password you can revoke from the account's
			security page any time. No vendor console, no permission from anyone.
		</p>
		<p>
			<strong>Mail</strong> is any IMAP account — the one your provider gives you, or another —
			for the unread badge and notifications. <strong>Google</strong> is optional and needs your own
			OAuth client file: it adds Gmail notifications and a Drive folder, and nothing about the
			project's Google standing ever touches your sign-in, because there is none.
		</p>
		<p class="note">
			Until you sign in, no cloud functionality appears anywhere in ewe. Signed out or offline,
			everything degrades cleanly. <a href="/sync/">How sync works →</a>
		</p>
	</section>

	<section id="system">
		<p class="eyebrow">System</p>
		<h2>The unglamorous parts, done.</h2>
		<dl class="rows">
			<div class="row">
				<dt>Silent boot</dt>
				<dd>A Plymouth splash from early boot straight to the themed greeter — no wall of kernel text, no menu.</dd>
			</div>
			<div class="row">
				<dt>Survives a crash</dt>
				<dd>
					The shell runs as a restart-on-failure user service, so bar, dock and lock come back on
					their own. Outputs stay locked even if the shell dies while locked.
				</dd>
			</div>
			<div class="row">
				<dt>Sensible power behaviour</dt>
				<dd>
					Locks at 5 minutes; on battery, suspends at 15. Warns at 20% and 10%, suspends at 5% to
					protect unsaved work. Hibernation is configured at install when there's a battery.
				</dd>
			</div>
			<div class="row">
				<dt>A rescue console</dt>
				<dd>The greeter owns tty1; a root rescue console lives on tty3 for when something goes wrong.</dd>
			</div>
			<div class="row">
				<dt>Keyboard-first</dt>
				<dd>
					A full Hyprland keymap — windows, groups, workspaces, scratchpad.
					<a href="/docs/#shortcuts">The shortcuts →</a>
				</dd>
			</div>
		</dl>
	</section>
</div>

<style>
	.toc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 1.6rem;
	}
	.toc a {
		font-size: 0.85rem;
		color: var(--fg2);
		text-decoration: none;
		border: 1px solid var(--stroke);
		background: var(--elevated);
		border-radius: var(--r-pill);
		padding: 0.3rem 0.7rem;
	}
	.toc a:hover {
		background: var(--hover);
		color: var(--fg);
	}
</style>
