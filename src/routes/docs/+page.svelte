<script>
	import Command from '$lib/Command.svelte';
	import { INSTALL, REPO } from '$lib/nav.js';
	const MANUAL = REPO + '/blob/main/docs/MANUAL.md';
</script>

<svelte:head>
	<title>Docs — ewe</title>
	<meta
		name="description"
		content="Install ewe, learn the keymap, understand the one config file, set up a Google account, and read the safety model and known limitations."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Docs</p>
	<h1>Everything you need, in order.</h1>
	<p class="lede">
		Start at the top and you'll have a working desktop in a few minutes. The deep dive lives in
		<a href={MANUAL}>the manual</a>; this page is the map.
	</p>

	<nav class="toc" aria-label="On this page">
		<a href="#install">Install</a>
		<a href="#first">First run</a>
		<a href="#shortcuts">Shortcuts</a>
		<a href="#config">The one file</a>
		<a href="#google">Google</a>
		<a href="#safety">Safety</a>
		<a href="#limits">Limitations</a>
		<a href="#help">Getting help</a>
	</nav>

	<section id="install">
		<p class="eyebrow">Install</p>
		<h2>One line, on Arch.</h2>
		<p>Run it as your normal user — not root — on a minimal Arch install:</p>
		<Command value={INSTALL} />
		<dl class="rows">
			<div class="row">
				<dt>What it does</dt>
				<dd>
					Downloads the latest release to <code>~/.local/share/ewe</code> and runs the installer. No
					git, no clone. It prompts before every change.
				</dd>
			</div>
			<div class="row">
				<dt>Useful flags</dt>
				<dd>
					<code>--dry-run</code> to see everything it would do · <code>--yes</code> for unattended ·
					<code>--gaming</code> and <code>--dev</code> for the optional package stacks.
				</dd>
			</div>
			<div class="row">
				<dt>Updating</dt>
				<dd>Re-run the same line. From a clone, <code>./update.sh</code> pulls and restarts the shell.</dd>
			</div>
			<div class="row">
				<dt>Requirements</dt>
				<dd>
					Arch Linux with <code>pacman</code> and the AUR. Derivatives — EndeavourOS, CachyOS, Garuda,
					Manjaro — should work.
				</dd>
			</div>
			<div class="row">
				<dt>Backing out</dt>
				<dd><code>uninstall.sh</code> unlinks and restores your backed-up configs.</dd>
			</div>
		</dl>
	</section>

	<section id="first">
		<p class="eyebrow">First run</p>
		<h2>Reboot, pick “Ewe”, go.</h2>
		<p>
			At the greeter, choose the <strong>Ewe</strong> session. Three keys get you moving:
			<code>Super+Return</code> for a terminal, <code>Super+D</code> for the launcher, and
			<code>Super+,</code> for Settings.
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
					<div><dt><kbd>Super</kbd><kbd>N</kbd></dt><dd>Quick Settings</dd></div>
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
		<p class="more">
			<a href="{REPO}/blob/main/dotfiles/hypr/SHORTCUTS.md">The complete keymap →</a>
		</p>
	</section>

	<section id="config">
		<p class="eyebrow">The one file</p>
		<h2><code>~/.config/ewe/ewe.conf</code></h2>
		<p>
			Everything the desktop knows about itself is in this TOML file. The settings apps write it for
			you; <code>ewe-conf</code> is the only thing that touches it directly, and every runtime file
			Hyprland and the shell read is regenerated from it.
		</p>
		<dl class="rows">
			<div class="row">
				<dt><code>ewe-conf get &lt;key&gt;</code></dt>
				<dd>Read one value, by dotted key.</dd>
			</div>
			<div class="row">
				<dt><code>ewe-conf set &lt;key&gt; &lt;value&gt;</code></dt>
				<dd>Write it and apply immediately.</dd>
			</div>
			<div class="row">
				<dt><code>ewe-conf dump</code></dt>
				<dd>The whole file as JSON.</dd>
			</div>
			<div class="row">
				<dt><code>ewe-conf import</code></dt>
				<dd>Build the file from a machine that's already set up.</dd>
			</div>
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
		<h2>Optional, and a one-time setup.</h2>
		<p>
			Native desktop apps have to bring their own OAuth client, so connecting an account takes a few
			minutes in the Google Cloud console once:
		</p>
		<ul>
			<li>New project → enable the <strong>Calendar</strong>, <strong>Drive</strong> and <strong>Gmail</strong> APIs.</li>
			<li>
				OAuth consent screen → External, then <strong>publish it to production</strong>. Left in
				Testing, refresh tokens expire every seven days and you re-login weekly.
			</li>
			<li>Credentials → create an OAuth client ID of type <strong>Desktop app</strong>.</li>
			<li>Save the id and secret to <code>~/.config/quickshell/google-oauth.json</code>, then sign in from Settings → User.</li>
		</ul>
		<p class="note">
			Scopes are <code>openid email profile</code>, calendar read-only, Gmail read-only and Drive's
			hidden app folder — read access and its own storage, nothing more. The refresh token never
			touches a file; it lives in the keyring. Signing out revokes it at Google.
			<a href="{REPO}/blob/main/docs/GOOGLE-CLIENT.md">Full setup →</a>
		</p>
	</section>

	<section id="safety">
		<p class="eyebrow">Safety model</p>
		<h2>What the installer will and won't do.</h2>
		<ul>
			<li>Existing configs are moved to <code>*.bak.&lt;timestamp&gt;</code> before anything is linked.</li>
			<li>It's a symlink farm, not a copy — re-running re-links, and uninstalling restores your newest backup.</li>
			<li>A missing package is skipped, never a reason to abort the run.</li>
			<li>Your user-state files are never committed or clobbered; templates seed them only when missing.</li>
			<li>Packages stay installed after an uninstall unless you ask for <code>--purge</code>.</li>
		</ul>
	</section>

	<section id="limits">
		<p class="eyebrow">Known limitations</p>
		<h2>Read this before you daily-drive it.</h2>
		<ul>
			<li>
				<strong>The screen never powers off on idle</strong> — it locks instead. A deliberate
				workaround for an Intel Lunar Lake driver bug; re-enable it on hardware without that bug.
			</li>
			<li>On battery, the laptop locks at 5 minutes and suspends at 15. Both are one edit away.</li>
			<li>The session lock works, but it's the youngest security-relevant component here.</li>
			<li>Multi-monitor hotplug is lightly tested.</li>
			<li>No input method yet — CJK and complex-script input isn't wired up.</li>
			<li>Real-hardware coverage is still thin. It's a beta, and reports genuinely help.</li>
		</ul>
	</section>

	<section id="help">
		<p class="eyebrow">Getting help</p>
		<h2>Where to go.</h2>
		<div class="grid">
			<div class="card">
				<h3><a href={MANUAL}>The manual</a></h3>
				<p>Install phases, package sets, safety model, Google and phone setup, limitations.</p>
			</div>
			<div class="card">
				<h3><a href="{REPO}/blob/main/docs/TROUBLESHOOTING.md">Troubleshooting</a></h3>
				<p>The post-freeze playbook and other things that go wrong on real hardware.</p>
			</div>
			<div class="card">
				<h3><a href="{REPO}/issues">Issues</a></h3>
				<p>Bugs and feature requests, with templates. Security reports go via the Security tab.</p>
			</div>
			<div class="card">
				<h3><a href="{REPO}/discussions">Discussions</a></h3>
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
		margin-bottom: 1.2rem;
	}
</style>
