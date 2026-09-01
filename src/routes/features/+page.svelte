<svelte:head>
	<title>Features — ewe</title>
	<meta
		name="description"
		content="The ewe desktop in full: shell, theming, Komble software manager, settings app, cast to TV, phone link, Google account and the safety model."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Features</p>
	<h1>Everything, already assembled.</h1>
	<p class="lede">
		ewe is not a collection of parts with a config to write. It is the whole desktop — from the boot
		splash to the lock screen — built as one product and themed as one thing.
	</p>

	<nav class="toc" aria-label="On this page">
		<a href="#shell">The shell</a>
		<a href="#look">The look</a>
		<a href="#apps">Apps</a>
		<a href="#cast">Cast to TV</a>
		<a href="#phone">Phone</a>
		<a href="#google">Google</a>
		<a href="#system">System</a>
	</nav>

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
				<p>Pinned and running apps, optional intelligent hide, three icon sizes.</p>
			</div>
			<div class="card">
				<h3>Launcher</h3>
				<p><code>Super+D</code> — fuzzy search across apps and files, press again to dismiss.</p>
			</div>
			<div class="card">
				<h3>Quick Settings</h3>
				<p>Wi-Fi, Bluetooth, audio, power profile, calendar, mail, phone and cast in one panel.</p>
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
				<dt>Two dark looks</dt>
				<dd>
					<strong>flock</strong>, the default dark neutral greys — and <strong>blacksheep</strong>,
					absolute black surfaces for OLED panels and pure-dark fans. (This site wears blacksheep.)
				</dd>
			</div>
			<div class="row">
				<dt>One accent</dt>
				<dd>
					Pick a colour and it moves through the shell, GTK apps, Qt strays, icons and cursor at
					once — no relogin. Text on the accent auto-contrasts so it stays legible at any hue.
				</dd>
			</div>
			<div class="row">
				<dt>One icon language</dt>
				<dd>Phosphor Fill glyphs throughout the shell; a matching icon theme and cursor for apps.</dd>
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
					The software manager: official repos, the AUR and AppImages behind one search field, with
					a “For You” restore surface that reads your synced package manifest.
				</dd>
			</div>
			<div class="row">
				<dt>ewe-settings</dt>
				<dd>
					A full settings app — theme, keyboard and touchpad, displays and profiles, wallpapers,
					window rules, startup apps, animations — writing the one config file.
				</dd>
			</div>
			<div class="row">
				<dt>A curated set</dt>
				<dd>
					Nemo, Engrampa, imv, Zathura, mpv and kitty: traditional GTK apps chosen to match, made
					borderless under Hyprland, with defaults managed in one place.
				</dd>
			</div>
		</dl>
	</section>

	<section id="cast">
		<p class="eyebrow">Cast to TV</p>
		<h2>One tile, any TV in the room.</h2>
		<p>
			Screen mirroring on Wayland is usually a research project. In ewe it's a tile in the control
			centre — or <code>Super+Shift+C</code> — that speaks both protocols a television might offer.
		</p>
		<dl class="rows">
			<div class="row">
				<dt>Miracast</dt>
				<dd>
					Samsung “Screen Mirroring” and most Android TVs, over Wi-Fi Direct. Needs a Wi-Fi card with
					P2P support.
				</dd>
			</div>
			<div class="row">
				<dt>Chromecast</dt>
				<dd>Chromecast built-in and Google TV, discovered on the local network over mDNS.</dd>
			</div>
			<div class="row">
				<dt>ewe's own share picker</dt>
				<dd>
					When anything asks to capture the screen, you get live thumbnails of every display named by
					its actual model, every window with a preview, or a region — instead of a bare list of
					connector names. The same picker serves browser calls, OBS and recorders.
				</dd>
			</div>
			<div class="row">
				<dt>It tells you what's missing</dt>
				<dd>
					The first cast of a session runs a preflight check and toasts anything absent together with
					the exact command that fixes it. A Chromecast-only or Miracast-only setup still works.
				</dd>
			</div>
			<div class="row">
				<dt>Clean stop</dt>
				<dd>
					Toggling the tile off ends the session properly; the tile and the bar's screencast glyph
					follow the real process, never the other way round.
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

	<section id="google">
		<p class="eyebrow">Google account</p>
		<h2>Optional, native, read-only.</h2>
		<p>
			Connect an account and three things light up: <strong>calendar</strong> events with agenda and
			reminders, <strong>Gmail</strong> unread count and notifications that deep-link into Gmail, and
			<strong>settings sync</strong>. It's a native OAuth flow — no GNOME Online Accounts — and the
			shell asks only for read access. It can never send or delete anything.
		</p>
		<p class="note">
			Until you connect an account, no Google functionality appears anywhere in ewe. Signed out or
			offline, everything degrades cleanly. <a href="/sync/">How sync works →</a>
		</p>
	</section>

	<section id="system">
		<p class="eyebrow">System</p>
		<h2>The unglamorous parts, done.</h2>
		<dl class="rows">
			<div class="row">
				<dt>Silent boot</dt>
				<dd>A Plymouth splash from early boot to the themed greeter — no wall of kernel text.</dd>
			</div>
			<div class="row">
				<dt>Never clobbers your config</dt>
				<dd>
					Existing configs are moved to timestamped backups before anything is linked, and the
					uninstaller puts them back. Re-running the installer is a no-op.
				</dd>
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
					protect unsaved work.
				</dd>
			</div>
			<div class="row">
				<dt>Keyboard-first</dt>
				<dd>
					A full Hyprland keymap ported so most muscle memory carries over — windows, groups,
					workspaces, scratchpad. <a href="/docs/#shortcuts">The shortcuts →</a>
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
