<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const theme = [
		['scheme', '"ewe-dark"', 'Ewe Dark, Ewe Light, or the slug of a palette in [[desktop.theme.schemes]] — imported, hand-written or taken from the wallpaper (ewe-theme scheme …).'],
		['accent', '"#eeb407"', 'Any color. The accent roles and the accent ramp are derived from it, live.'],
		['corner', '"medium"', 'The radii: none, small, medium or large.'],
		['density', '"comfortable"', 'Control and row heights: compact (24), comfortable (28) or roomy (32).'],
		['stroke', '"thin"', 'Outlines: none, thin (1px) or thick (2px).'],
		['bar_opacity', '100', '0–100. Below 100 the bar, dock and lock card go glass and what is behind them is blurred; the Glass preset is 80. It moves only those three: the Overview and desktop widgets keep the Glass material at 80%.'],
		['app_blur', 'false', 'Every window at 85%, blurred behind. Fullscreen windows stay solid. Without it, Glass never blurs behind an app window.'],
		['window_transparency', 'false', 'Unfocused windows at 97%.'],
		['tint_borders', 'true', 'Accent-tinted window borders.'],
		['avatar_shape', '"circle"', 'The greeter and bar avatar mask; or "rounded".']
	];
</script>

<svelte:head>
	<title>ewe.conf schema — ewe docs</title>
	<meta
		name="description"
		content="Every section of ewe.conf: theme, bar, dock, animations, power, displays, workspaces, window rules, wallpapers, input, layout, keybinds, apps, system, sync and network."
	/>
</svelte:head>

<p class="eyebrow">The one file</p>
<h1>Schema reference.</h1>
<p class="lede">
	Every section of the document, what it holds, and which runtime files it generates. Written by the
	settings surfaces; readable and editable by you.
</p>

<section>
	<h2><code>schema</code></h2>
	<p>The version of the document's shape. Bumped only when a key changes meaning.</p>
</section>

<section>
	<h2><code>[desktop.theme]</code></h2>
	<p>Colors and look. Applying this section re-themes every toolkit — GTK, Qt, the cursor and the icon hue — in one pass.</p>
	<dl class="rows">
		{#each theme as [key, dflt, meaning]}
			<div class="row">
				<dt><code>{key}</code></dt>
				<dd>{meaning} <span class="dflt">Default <code>{dflt}</code></span></dd>
			</div>
		{/each}
	</dl>
	<p>
		Two older keys are still read and written so a synced file from an older machine round-trips:
		<code>color_scheme</code> and <code>theme_name</code>. Neither changes anything any more — the
		<code>scheme</code> decides.
	</p>
</section>

<section>
	<h2><code>[[desktop.theme.schemes]]</code></h2>
	<p>
		One record per scheme: <code>name</code>, <code>slug</code>, <code>variant</code> (<code>dark</code>
		or <code>light</code>), an optional <code>accent</code>, <code>semantic</code> (status colors from
		the palette, default on), an optional <code>overrides</code> table for roles set by hand,
		and a <code>palette</code> of <code>base00</code>…<code>base0F</code>
		(<code>base10</code>…<code>base17</code> optional) — Base24. Written by
		<a href="/docs/cli/ewe-theme/">ewe-theme scheme</a>, never by hand; it syncs with the file. Ewe
		Dark and Ewe Light are not in here: the generator knows them, so a synced or hand-edited file
		can never lose them. They are a palette and an accent only, with no overrides.
	</p>
	<Code
		code={`[desktop.theme]
scheme = "gruvbox-dark-medium"

[[desktop.theme.schemes]]
name = "Gruvbox dark, medium"
slug = "gruvbox-dark-medium"
variant = "dark"
accent = "#fe8019"
[desktop.theme.schemes.palette]
base00 = "#282828"
# … base01 – base0F`}
		copyable={false}
	/>
</section>

<section>
	<h2><code>[desktop.accessibility]</code></h2>
	<p>
		<code>reduce_motion</code>, <code>reduce_transparency</code> and
		<code>increase_contrast</code> (all false), and <code>text_scale</code> — 100, 115 or 130.
		Each one remaps tokens rather than changing the layout;
		<a href="/design/accessibility/">what each changes</a> is in the design system.
	</p>
</section>

<section>
	<h2><code>[desktop.dock]</code></h2>
	<p>
		<code>enabled</code>, <code>autohide</code> and <code>icon_size</code> — small, normal or large.
		Since the dock became a plugin these are only where its settings carry over from: the Dock's own
		<code>autohide</code> and <code>icon_size</code> live in <code>[plugins.settings]."ewe.dock"</code>,
		and until you set one there, the value here stands. <code>enabled</code> no longer hides the
		dock — turning the <code>ewe.dock</code> plugin off does; it only told the 0.25 migration whether
		to bring the dock back. <a href="/docs/plugins/built-in/#dock-settings">The dock's settings →</a>
	</p>
</section>

<section>
	<h2><code>[desktop.bar]</code></h2>
	<p>
		<code>enabled</code>, <code>show</code> for each indicator, and <code>icon_size</code>: small,
		normal or large, default normal — Settings → Layout → Top bar. A plugin's bar button and pill
		glyph are <code>show."plugin:&lt;id&gt;"</code>, its <em>Show in bar</em> switch, written by
		<code>ewe-plugin bar</code> and Komble's Options. There is no height setting. The bar is its icons plus padding,
		44, 48 or 56px, and text size 130% moves the icons one size up. The older <code>size</code> key
		is gone; a <code>size = "large"</code> left in an older file still reads as large icons.
	</p>
	<Code
		code={`[desktop.bar]
icon_size = "large"   # 56px`}
		copyable={false}
	/>
</section>

<section>
	<h2><code>[desktop.animations]</code></h2>
	<p>
		<code>speed</code> is one multiplier over every animation: zero turns them off, one is the
		default, two is showy. <code>detail</code> holds per-animation overrides exactly as the
		Animations pane writes them. Nothing overshoots: a <code>detail</code> that uses the retired
		overshoot curve, as the old Bouncy preset did, is saved as the default, Snappy.
	</p>
</section>

<section>
	<h2><code>[desktop.tiling]</code> and <code>[desktop.power]</code></h2>
	<p>
		Tiling is one switch, <code>enabled</code>. Power holds <code>low_power</code> (battery-aware
		timers), <code>lid_docked_suspend</code> — set it false to keep working on external monitors with
		the lid shut — and <code>saver</code>, the screensaver stage with its own lock timing and style.
	</p>
</section>

<section>
	<h2><code>[desktop.displays]</code></h2>
	<p>
		Per-monitor-set profiles, keyed by the identity of every connected monitor, so docking at a desk
		restores that desk's layout. Owned by the Displays pane; hand-editing is possible but the user
		interface is the better editor.
	</p>
</section>

<section>
	<h2><code>[desktop.workspaces]</code></h2>
	<p>
		<code>mode</code>: <code>"separate"</code>, the default, gives every display its own workspaces
		1, 2, 3 …, as on macOS; <code>"shared"</code> makes them one set across all displays, so switching
		one switches every display. Switching modes moves no window. Settings → Displays → Workspaces,
		shown with two or more displays.
	</p>
	<Code
		code={`[desktop.workspaces]
mode = "shared"`}
		copyable={false}
	/>
</section>

<section>
	<h2><code>[[desktop.window_rules]]</code></h2>
	<p>
		One block per application: <code>name</code>, <code>class</code> (matched without regard to
		case), <code>workspace</code> — the first display's workspace of that number, zero means any —
		and <code>mode</code>: float, or empty.
	</p>
</section>

<section>
	<h2><code>[desktop.wallpapers]</code></h2>
	<p>
		<code>mode</code>, <code>mute</code> for video sound, <code>default</code> for every output, and
		an <code>outputs</code> table for per-monitor overrides. Images, animations and videos are all
		valid paths.
	</p>
</section>

<section>
	<h2><code>[desktop.input]</code></h2>
	<p>
		Keyboard and pointer, whole: layouts and variants as parallel lists, options, repeat rate and
		delay, numlock, sensitivity, acceleration profile, natural scroll, scroll factors, the touchpad
		switches, and a <code>devices</code> table of per-device overrides keyed by device name.
	</p>
</section>

<section>
	<h2><code>[desktop.layout]</code></h2>
	<p>
		Four numbers: <code>gaps_in</code>, <code>gaps_out</code>, <code>border_size</code> and
		<code>rounding</code>. Everything else in the generated layout file — the border tint, window
		transparency, the animation fallback — is derived from the other sections, so changing any of
		them regenerates it.
	</p>
</section>

<section>
	<h2><code>[[desktop.keybinds]]</code></h2>
	<p>Your own launch bindings, one record each:</p>
	<Code code={`[[desktop.keybinds]]
combo = "SUPER + T"
exec = "kitty"`} copyable={false} />
	<p class="muted">
		Launch bindings only. A binding that runs a command is data and syncs; rebinding the desktop's
		own actions stays in the Hyprland configuration.
	</p>
</section>

<section>
	<h2><code>[apps]</code></h2>
	<dl class="rows">
		<div class="row"><dt><code>pinned</code></dt><dd>Your pinned apps, in order — what the Dock plugin's launcher shows first.</dd></div>
		<div class="row"><dt><code>[[apps.startup]]</code></dt><dd>Login autostart entries: name, exec, icon, enabled.</dd></div>
		<div class="row"><dt><code>[[apps.places]]</code></dt><dd>The Places panel's folder shortcuts.</dd></div>
		<div class="row"><dt><code>[apps.installed]</code></dt><dd>Komble's manifest of every package and AppImage it manages here. This is the restore loop: a fresh machine that pulls your file can offer to reinstall all of it. Komble maintains this section; nothing else touches it.</dd></div>
	</dl>
</section>

<section>
	<h2><code>[plugins]</code></h2>
	<p>
		Shell plugins — the ones that ship with ewe and the ones from a git URL — written by
		<a href="/docs/cli/ewe-plugin/">ewe-plugin</a>.
		<code>enabled</code> is the list of plugin ids the shell loads at startup;
		<code>sources</code> is the installed set — every plugin <code>install</code> or <code>add</code>
		put in, on or off, until <code>remove</code> forgets it — so on a fresh machine
		<code>ewe-plugin restore</code> can bring them back: a git URL is cloned, <code>"bundled"</code>
		is copied from the ewe package, <code>"local"</code> cannot be fetched. <code>removed</code> is
		the first-party plugins you took away, so an update leaves them out. The plugins themselves live in
		<code>~/.config/ewe/plugins/</code> — code, not configuration — and never sync. Toggling one
		restarts the shell; the generated plugin keybinds are rewritten, nothing else.
	</p>
	<Code
		code={`[plugins]
enabled = ["ewe.dock", "ewe.media", "acme.weather"]
removed = ["ewe.clipboard"]

[plugins.sources]
"ewe.dock" = "bundled"
"ewe.media" = "bundled"
"acme.weather" = "https://github.com/acme/ewe-weather.git"

[plugins.widgets]
"acme.clock" = {x = 420, y = 300, layer = "top", visible = true, pin_level = "top", locked = false}

[plugins.settings]
"acme.clock" = {seconds = true}
"ewe.dock" = {autohide = true, icon_size = "small"}`}
		copyable={false}
	/>
	<p>
		<code>widgets</code> is where each desktop widget sits and how: <code>x</code>, <code>y</code>, an
		optional <code>output</code>, <code>layer</code> — <code>desktop</code> under the windows,
		<code>top</code> pinned above them, <code>overlay</code> pinned above everything, fullscreen apps
		too — <code>visible</code>, <code>pin_level</code> (<code>top</code> or <code>overlay</code>:
		where pinning puts it, remembered while it is unpinned) and <code>locked</code>, which stops
		dragging. Dragging a widget, its hover toolbar, arrange mode, Komble's Options and
		<code>ewe-plugin place</code> write it. <code>settings</code> holds the values of the options a
		plugin declared, typed by its manifest; Komble's Options dialog, <code>ewe-plugin set</code> and
		the plugin's own <code>Shell.setSetting</code> write it. Both apply live. Ids carry a dot, so they
		are quoted.
	</p>
</section>

<section>
	<h2><code>[system]</code></h2>
	<p>
		What this machine is, read by the installer and distro tooling only — the desktop never reads it.
		<code>gaming</code> and <code>development</code> record which install profiles this machine
		carries. Flags only ever raise on import: a machine with Steam installed is a gaming machine,
		whatever the file said.
	</p>
</section>

<section>
	<h2><code>[sync]</code></h2>
	<p>
		<code>provider</code> (<code>nextcloud</code> or <code>google</code>), <code>server</code>,
		<code>user</code>, <code>folder</code> — default <code>ewe</code> — and <code>enabled</code>,
		which is the auto-sync switch. Identity only, so a restored machine knows where its backup lives.
	</p>
	<p>
		Beside the file in your account, <code>ewe.conf.meta.json</code> records which machine saved it
		and when — its hostname, and <code>machine_id</code>: a salted hash of
		<code>/etc/machine-id</code>, never the raw id, so two computers with the same hostname are told
		apart. <a href="/docs/account/settings-sync/">How sync decides →</a>
	</p>
	<p>
		<code>[[sync.folders]]</code> holds the folder pairs.
		<a href="/docs/account/folder-sync/">Their fields →</a>
	</p>
</section>

<section>
	<h2><code>[accounts.mail]</code></h2>
	<p>
		<code>host</code>, <code>user</code> and <code>port</code> for the mail badge. The password is in
		the keyring, never here.
	</p>
</section>

<section>
	<h2><code>[network]</code> — SSH and VPN</h2>
	<p>
		Your hosts and VPN setup are part of your machine, so they restore too — with a firm line through
		the middle. <strong>Configuration syncs; credentials never do.</strong>
	</p>
	<dl class="rows">
		<div class="row">
			<dt><code>[[network.ssh.hosts]]</code></dt>
			<dd>
				Host definitions from your SSH configuration: aliases, host names, users, ports, per-host
				options. On restore they are written into a marker-bounded managed block at the end of your
				configuration — your own lines are never touched, and hosts you already define yourself are
				skipped. Keys are yours to bring; the aliases just work again.
			</dd>
		</div>
		<div class="row">
			<dt><code>[[network.vpn]]</code></dt>
			<dd>
				VPN profile definitions: name, type, service and the non-secret settings. On restore the
				profile is recreated, and the first connection asks you for the password and any pre-shared
				key, then stores them. WireGuard is recorded by name only, because its peer configuration
				<em>is</em> key material — re-import that file yourself.
			</dd>
		</div>
	</dl>
	<Callout title="Why not sync the secrets, encrypted?">
		<p>
			Because the file would become a vault, and a vault needs key management, passphrase handling,
			rotation and a threat model — a different product. Dedicated secret managers do that well.
			<code>ewe.conf</code> stays a document you can read, diff and email to yourself without a
			second thought.
		</p>
	</Callout>
</section>

<section>
	<h2><code>[desktop.browser]</code></h2>
	<p>
		Only for Helium, the browser ewe shipped before ewe browser, on machines that still have it:
		<code>layout</code> chooses its tab layout — vertical or horizontal. ewe browser has no key here;
		it follows <code>[desktop.theme]</code>, the fonts and the motion settings by itself.
	</p>
</section>

<PageNav />

<style>
	.dflt {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.86rem;
		color: var(--text-muted);
	}
	section h2 code {
		font-size: 0.8em;
	}
</style>
