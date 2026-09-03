<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const theme = [
		['color_scheme', '"dark"', 'Always dark — ewe is dark-only by decision. The key stays because Komble reads it to follow the desktop.'],
		['accent', '"#0a84ff"', 'Recolours the whole shell live.'],
		['theme_name', '"flock"', 'Soft greys, or "blacksheep" for absolute black.'],
		['tint_borders', 'true', 'Accent-tinted window borders.'],
		['window_transparency', 'false', 'Translucent unfocused windows.'],
		['avatar_shape', '"circle"', 'The greeter and bar avatar mask; or "rounded".']
	];
</script>

<svelte:head>
	<title>ewe.conf schema — ewe docs</title>
	<meta
		name="description"
		content="Every section of ewe.conf: theme, dock, animations, power, displays, window rules, wallpapers, input, layout, keybinds, apps, system, sync and network."
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
	<p>Colours and look. Applying this section re-themes every toolkit — GTK, Qt, the cursor and the icon hue — in one pass.</p>
	<dl class="rows">
		{#each theme as [key, dflt, meaning]}
			<div class="row">
				<dt><code>{key}</code></dt>
				<dd>{meaning} <span class="dflt">Default <code>{dflt}</code></span></dd>
			</div>
		{/each}
	</dl>
</section>

<section>
	<h2><code>[desktop.dock]</code></h2>
	<p><code>enabled</code>, <code>autohide</code> and <code>icon_size</code> — small, medium or large.</p>
</section>

<section>
	<h2><code>[desktop.animations]</code></h2>
	<p>
		<code>speed</code> is one multiplier over every animation: zero turns them off, one is the
		default, two is showy. <code>detail</code> holds per-animation overrides exactly as the
		Animations pane writes them.
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
	<h2><code>[[desktop.window_rules]]</code></h2>
	<p>
		One block per application: <code>name</code>, <code>class</code> (matched without regard to
		case), <code>workspace</code> where zero means any, and <code>mode</code> — float, or empty.
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
		<div class="row"><dt><code>pinned</code></dt><dd>The dock's pinned launchers, in order.</dd></div>
		<div class="row"><dt><code>[[apps.startup]]</code></dt><dd>Login autostart entries: name, exec, icon, enabled.</dd></div>
		<div class="row"><dt><code>[[apps.places]]</code></dt><dd>The Places panel's folder shortcuts.</dd></div>
		<div class="row"><dt><code>[apps.installed]</code></dt><dd>Komble's manifest of every package and AppImage it manages here. This is the restore loop: a fresh machine that pulls your file can offer to reinstall all of it. Komble maintains this section; nothing else touches it.</dd></div>
	</dl>
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
		<code>layout</code> chooses the browser's tab layout — vertical, ewe's default, or horizontal. The
		browser's own colours always follow <code>[desktop.theme]</code>.
	</p>
</section>

<PageNav />

<style>
	.dflt {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.86rem;
		color: var(--dim);
	}
	section h2 code {
		font-size: 0.8em;
	}
</style>
