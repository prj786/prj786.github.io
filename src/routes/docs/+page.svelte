<script>
	import Command from '$lib/Command.svelte';
	import { OS_REPO, DE_REPO, PKG_REPO, ISSUES } from '$lib/nav.js';
	const INSTALL_DOC = OS_REPO + '/blob/main/docs/INSTALL.md';
	const TROUBLE = OS_REPO + '/blob/main/docs/TROUBLESHOOTING.md';
	const MANUAL = DE_REPO + '/blob/main/docs/MANUAL.md';
</script>

<svelte:head>
	<title>Docs — ewe</title>
	<meta
		name="description"
		content="Install ewe OS, learn the keymap, understand the one config file, set up a Google account, keep the system updated, and read the known limitations."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Docs</p>
	<h1>Everything you need, in order.</h1>
	<p class="lede">
		Start at the top and you'll have a working machine in about ten minutes. The deep dives live in
		the <a href={INSTALL_DOC}>install guide</a> and the <a href={MANUAL}>desktop manual</a>; this page
		is the map.
	</p>

	<nav class="toc" aria-label="On this page">
		<a href="#install">Install</a>
		<a href="#first">First run</a>
		<a href="#shortcuts">Shortcuts</a>
		<a href="#updates">Updates</a>
		<a href="#config">The one file</a>
		<a href="#google">Google</a>
		<a href="#limits">Limitations</a>
		<a href="#project">The project</a>
		<a href="#help">Getting help</a>
	</nav>

	<section id="install">
		<p class="eyebrow">Install</p>
		<h2>From the ISO.</h2>
		<p>
			Download the image, join its parts, verify it, write it to a stick, and boot in UEFI mode with
			Secure Boot off. The stick runs the real desktop; nothing touches your disks until you press
			Install. The whole path — with the exact commands and what the installer decides for you — is on
			the <a href="/download/">download page</a>.
		</p>
		<div class="btns"><a class="btn primary" href="/download/">Download and install →</a></div>
		<dl class="rows">
			<div class="row">
				<dt>The short version</dt>
				<dd>Six screens: keyboard, time and place, disk, your account, summary, install.</dd>
			</div>
			<div class="row">
				<dt>The disk</dt>
				<dd>
					<strong>The chosen disk is erased entirely.</strong> There's no dual-boot or manual
					partitioning path yet.
				</dd>
			</div>
			<div class="row">
				<dt>Headless or scripted</dt>
				<dd>
					The same primitives are a CLI on the live session — <code>ewe-install --help</code>. It also
					layers ewe onto an existing Arch system with <code>--layer-only</code>.
				</dd>
			</div>
			<div class="row">
				<dt>Just the desktop</dt>
				<dd>
					On an Arch machine you already have, add the <code>[ewe]</code> repo and
					<code>pacman -S ewe</code>. <a href="/download/">Details →</a>
				</dd>
			</div>
		</dl>
	</section>

	<section id="first">
		<p class="eyebrow">First run</p>
		<h2>Sign in, or don't.</h2>
		<p>
			The installed machine boots through the splash into the greeter. Your first login runs a welcome
			flow once: an optional Google sign-in, an offer to restore a backup if your account holds one,
			and a short tour. Skip all of it and ewe is a fully local machine.
		</p>
		<p>
			Three keys get you moving: <code>Super+Return</code> for a terminal, <code>Super+D</code> for the
			launcher, <code>Super+,</code> for Settings.
		</p>
	</section>

	<section id="shortcuts">
		<p class="eyebrow">Shortcuts</p>
		<h2>The keys worth knowing.</h2>
		<div class="keys">
			<div class="kgroup">
				<h3>Launching</h3>
				<dl>
					<div><dt><kbd>Super</kbd><kbd>Return</kbd></dt><dd>Terminal</dd></div>
					<div><dt><kbd>Super</kbd><kbd>D</kbd></dt><dd>Launcher — apps and files</dd></div>
					<div><dt><kbd>Super</kbd><kbd>E</kbd></dt><dd>File manager</dd></div>
					<div><dt><kbd>Super</kbd><kbd>B</kbd></dt><dd>Browser</dd></div>
					<div><dt><kbd>Super</kbd><kbd>,</kbd></dt><dd>Settings</dd></div>
					<div><dt><kbd>Super</kbd><kbd>N</kbd></dt><dd>Control centre</dd></div>
					<div><dt><kbd>Super</kbd><kbd>C</kbd></dt><dd>Calendar</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>C</kbd></dt><dd>Cast to TV</dd></div>
				</dl>
			</div>
			<div class="kgroup">
				<h3>Windows</h3>
				<dl>
					<div><dt><kbd>Super</kbd><kbd>H J K L</kbd></dt><dd>Focus (or arrow keys)</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>H J K L</kbd></dt><dd>Move window</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Ctrl</kbd><kbd>H J K L</kbd></dt><dd>Resize</dd></div>
					<div><dt><kbd>Super</kbd><kbd>G</kbd></dt><dd>Group / ungroup (tabs)</dd></div>
					<div><dt><kbd>Super</kbd><kbd>[</kbd> <kbd>]</kbd></dt><dd>Previous / next tab</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Q</kbd></dt><dd>Close window</dd></div>
					<div><dt><kbd>Super</kbd><kbd>F</kbd></dt><dd>Fullscreen</dd></div>
					<div><dt><kbd>Super</kbd><kbd>V</kbd></dt><dd>Float</dd></div>
				</dl>
			</div>
			<div class="kgroup">
				<h3>Workspaces</h3>
				<dl>
					<div><dt><kbd>Super</kbd><kbd>1</kbd>–<kbd>8</kbd></dt><dd>Switch workspace</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>1</kbd>–<kbd>8</kbd></dt><dd>Move window there</dd></div>
					<div><dt><kbd>Super</kbd> + scroll</dt><dd>Cycle workspaces</dd></div>
					<div><dt>3-finger swipe</dt><dd>Switch workspaces</dd></div>
					<div><dt><kbd>Super</kbd><kbd>Ctrl</kbd><kbd>R</kbd></dt><dd>Reload Hyprland config</dd></div>
				</dl>
			</div>
		</div>
		<p class="more"><a href="{DE_REPO}/blob/main/dotfiles/hypr/SHORTCUTS.md">The complete keymap →</a></p>
	</section>

	<section id="updates">
		<p class="eyebrow">Updates</p>
		<h2>It rolls.</h2>
		<p>
			ewe is Arch, so there are no version upgrades to plan. The <code>[ewe]</code> repository is
			already in your <code>pacman.conf</code>, which means the system and the desktop move forward in
			the same command:
		</p>
		<Command value="sudo pacman -Syu" />
		<p>
			Or use Komble's Updates pane — the download glyph in the top bar tells you when something is
			waiting. The desktop refreshes itself at your next login when a newer payload has landed.
		</p>
	</section>

	<section id="config">
		<p class="eyebrow">The one file</p>
		<h2><code>~/.config/ewe/ewe.conf</code></h2>
		<p>
			Everything the machine knows about itself is in this TOML file. The settings apps write it for
			you; <code>ewe-conf</code> is the only thing that touches it directly, and every runtime file
			Hyprland and the shell read is regenerated from it.
		</p>
		<dl class="rows">
			<div class="row"><dt><code>ewe-conf get &lt;key&gt;</code></dt><dd>Read one value, by dotted key.</dd></div>
			<div class="row"><dt><code>ewe-conf set &lt;key&gt; &lt;value&gt;</code></dt><dd>Write it and apply immediately.</dd></div>
			<div class="row"><dt><code>ewe-conf dump</code></dt><dd>The whole file as JSON.</dd></div>
			<div class="row"><dt><code>ewe-conf import</code></dt><dd>Build the file from a machine that's already set up.</dd></div>
			<div class="row">
				<dt><code>ewe-conf apply</code></dt>
				<dd>Regenerate every artifact and reload the shell. Add <code>--only &lt;domain&gt;</code> to narrow it.</dd>
			</div>
			<div class="row">
				<dt><code>ewe-conf push</code> / <code>pull</code></dt>
				<dd>Send the file to your Drive, or fetch it back. <a href="/sync/">More on sync →</a></dd>
			</div>
		</dl>
		<p class="note">
			Editing a generated file by hand works exactly until the next apply overwrites it. Change the
			source, not the artifact.
		</p>
	</section>

	<section id="google">
		<p class="eyebrow">Google account</p>
		<h2>One sign-in, read-only.</h2>
		<p>
			Offered during the welcome flow, or later from Settings → User. One consent covers calendar,
			mail, settings sync and your Drive folder, shared by the desktop and the software manager
			through a single broker.
		</p>
		<p class="note">
			Scopes are <code>openid email profile</code>, calendar read-only, Gmail read-only and Drive's
			hidden app folder — read access and its own storage, nothing more. The refresh token never
			touches a file; it lives in the system keyring. Signing out revokes it at Google.
			<a href="/privacy/">The full policy →</a>
		</p>
	</section>

	<section id="limits">
		<p class="eyebrow">Known limitations</p>
		<h2>Read this before you install.</h2>
		<ul>
			<li>
				<strong>It's an alpha.</strong> The install is verified end to end in QEMU; real-hardware
				coverage is still thin. Install on a machine you can afford to reinstall.
			</li>
			<li><strong>Whole-disk installs only</strong> — no dual-boot and no manual partitioning yet.</li>
			<li><strong>x86_64 and unsigned</strong> — no ARM image, and Secure Boot must be off.</li>
			<li>
				<strong>The screen never powers off on idle</strong> — it locks instead. A deliberate
				workaround for an Intel Lunar Lake driver bug; re-enable it on hardware without that bug.
			</li>
			<li>On battery, the machine locks at 5 minutes and suspends at 15. Both are one edit away.</li>
			<li>The session lock works, but it's the youngest security-relevant component here.</li>
			<li>Multi-monitor hotplug is lightly tested.</li>
			<li>No input method yet — CJK and complex-script input isn't wired up.</li>
			<li>Chromecast mirroring carries a few seconds of latency; Miracast is the real-time path.</li>
		</ul>
	</section>

	<section id="project">
		<p class="eyebrow">The project</p>
		<h2>Where the pieces live.</h2>
		<p>ewe is built as layers, each in its own repository.</p>
		<dl class="rows">
			<div class="row"><dt><a href={OS_REPO}>ewe-os</a></dt><dd>The distro — the archiso profile that builds the live and install ISO.</dd></div>
			<div class="row"><dt><a href={DE_REPO}>ewe</a></dt><dd>The desktop environment: Hyprland, the Quickshell shell, and the <code>ewe</code> package.</dd></div>
			<div class="row"><dt><a href={PKG_REPO}>ewe-repo</a></dt><dd>The <code>[ewe]</code> pacman repository everything ships through.</dd></div>
			<div class="row"><dt><a href="https://github.com/prj786/komble-arch">komble-arch</a></dt><dd>Komble, the software manager.</dd></div>
			<div class="row"><dt><a href="https://github.com/prj786/ewe-settings">ewe-settings</a></dt><dd>The settings app.</dd></div>
			<div class="row"><dt><a href="https://github.com/prj786/ewe-cast">ewe-cast</a></dt><dd>The headless casting daemon behind the Cast card.</dd></div>
		</dl>
	</section>

	<section id="help">
		<p class="eyebrow">Getting help</p>
		<h2>Where to go.</h2>
		<div class="grid">
			<div class="card">
				<h3><a href={INSTALL_DOC}>Install guide</a></h3>
				<p>The full ISO path, what ewe decides, and the headless install.</p>
			</div>
			<div class="card">
				<h3><a href={TROUBLE}>Troubleshooting</a></h3>
				<p>When the boot, the installer or the desktop does something unexpected.</p>
			</div>
			<div class="card">
				<h3><a href={ISSUES}>Issues</a></h3>
				<p>Bugs and feature requests. Security reports go privately via the Security tab.</p>
			</div>
			<div class="card">
				<h3><a href="{DE_REPO}/discussions">Discussions</a></h3>
				<p>Questions, setups, and anything that isn't a bug yet.</p>
			</div>
		</div>
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
	.keys {
		display: grid;
		gap: 0.85rem;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}
	.kgroup {
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		padding: 1.1rem 1.2rem;
	}
	.kgroup h3 {
		margin-bottom: 0.6rem;
	}
	.kgroup dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.kgroup dl > div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.8rem;
	}
	.kgroup dt {
		display: flex;
		gap: 0.2rem;
		flex: none;
		color: var(--fg2);
		font-size: 0.8rem;
	}
	.kgroup dd {
		margin: 0;
		color: var(--fg2);
		font-size: 0.88rem;
		text-align: right;
	}
	kbd {
		font-family: var(--mono);
		font-size: 0.72rem;
		background: var(--bg);
		border: 1px solid var(--stroke);
		border-radius: 5px;
		padding: 0.1rem 0.34rem;
		color: var(--fg);
	}
	.more {
		margin-top: 1.1rem;
		font-size: 0.94rem;
	}
	section :global(.cmd) {
		margin-top: 0.85rem;
	}
	.btns {
		margin-top: 1.1rem;
	}
</style>
