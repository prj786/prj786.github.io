<script>
	import Icon from '$lib/Icon.svelte';
	import Command from '$lib/Command.svelte';
</script>

<svelte:head>
	<title>How it works — ewe</title>
	<meta
		name="description"
		content="In Linux everything is a file; in ewe the machine is one file. One declarative config, one writer, kept in your own Nextcloud — so backup, sync and install are the same operation."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">How it works</p>
	<h1>The machine is one file.</h1>
	<p class="lede">
		In Linux, everything is a file. In ewe, <strong>the machine</strong> is a file. Every setting you
		can express lives in one declarative document — <code>~/.config/ewe/ewe.conf</code>. Settings
		apps edit it, one tool applies it, everything else is generated from it. Keep that file in your
		own Nextcloud and a fresh install becomes: sign in, and your desktop is waiting.
	</p>

	<!-- ── why ──────────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Why</p>
		<h2>Config drift is an architecture bug.</h2>
		<p>
			A desktop's settings normally scatter across a dozen files in a dozen formats, kept consistent
			by care rather than by design. ewe had that too — fourteen files and <em>two</em> generators
			expected to write byte-identical output forever. That contract holds until it doesn't.
		</p>
		<p>
			One file with one writer deletes the whole class of problem, and makes backup, sync and install
			<strong>the same operation</strong>: produce the file, apply the file.
		</p>
	</section>

	<!-- ── the rules ────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The rules</p>
		<h2>Five constraints, no exceptions.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="file-text" size={16} />One canonical file</dt>
				<dd><code>~/.config/ewe/ewe.conf</code>, in TOML — human-readable, diffable, versionable.</dd>
			</div>
			<div class="row">
				<dt><Icon name="square-terminal" size={16} />One writer</dt>
				<dd>
					The <code>ewe-conf</code> CLI. Not the shell, not the settings app, not the installer, not
					the software manager — they all call it.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="shuffle" size={16} />Everything else is generated</dt>
				<dd>
					What Hyprland and the shell actually read are build artifacts of <code>ewe-conf apply</code>.
					Hand-edits survive exactly until the next apply.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="key" size={16} />Secrets never enter it</dt>
				<dd>
					The file is the thing that syncs, so it may name an account — never a credential. Tokens
					live in the system keyring, behind a broker.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="zap" size={16} />Live-apply stays</dt>
				<dd>
					Declarative doesn't mean “reboot to see it”. UIs apply changes instantly, then persist by
					writing <em>through</em> <code>ewe-conf</code>.
				</dd>
			</div>
		</dl>
	</section>

	<!-- ── sync ─────────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Sync</p>
		<h2>Your Nextcloud, not ours.</h2>
		<p>
			Because the machine is one file, syncing it isn't a backup system — it's a file in a
			<strong>Nextcloud you choose</strong>: one you run at home, or a hosted account from
			<a href="https://murena.io/">Murena</a>, <a href="https://disroot.org/">Disroot</a>,
			<a href="https://www.infomaniak.com/">Infomaniak</a> or any other. ewe speaks plain WebDAV and
			CalDAV, so there is no “ewe account”, no console to register in, and
			<strong>no server of ours in the path</strong>.
		</p>
		<ol class="steps">
			<li>
				<span class="n">1</span>
				<div>
					<h3>Sign in</h3>
					<p>
						Your server opens its own login page — your password, your two-factor, your SSO. ewe
						never sees the password, only an app password you can revoke, listed on your account's
						security page as “ewe (your computer)”.
					</p>
				</div>
			</li>
			<li>
				<span class="n">2</span>
				<div>
					<h3>Restore</h3>
					<p>
						One button, or <code>ewe-conf pull &amp;&amp; ewe-conf apply</code>. Theme, accent, dock,
						wallpapers, keyboard, displays, window rules and startup apps come back.
					</p>
				</div>
			</li>
			<li>
				<span class="n">3</span>
				<div>
					<h3>Say yes to your apps</h3>
					<p>
						Komble reads the package list inside the file and <em>offers</em> what's missing. A
						restored file never silently installs software.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- ── what moves ───────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">What moves</p>
		<h2>One file, and nothing else.</h2>
		<div class="two">
			<div class="card">
				<h3><Icon name="circle-check" size={16} />Synced</h3>
				<ul>
					<li>Scheme, accent, look and animations</li>
					<li>Dock, pinned apps, startup apps, places</li>
					<li>Wallpapers, window rules, display profiles</li>
					<li>Keyboard, touchpad and input devices</li>
					<li>SSH hosts and VPN profiles — the shape, never the secret</li>
					<li>Your explicit package list: repo, AUR and AppImage</li>
				</ul>
			</div>
			<div class="card bad">
				<h3><Icon name="lock" size={16} />Never synced</h3>
				<ul>
					<li>Passwords, tokens, app passwords or keys of any kind</li>
					<li>Wi-Fi pre-shared keys — deliberately dropped</li>
					<li>Your documents and personal files</li>
					<li>Mail, calendar or message content</li>
					<li>Anything at all to the ewe project</li>
				</ul>
			</div>
		</div>
		<p class="note">
			Secrets can't leak through the file because they were never in it. That's rule four, not a
			filter applied on the way out — a restore simply re-prompts once.
		</p>
	</section>

	<!-- ── the boring guarantees ────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The mechanics</p>
		<h2>Deliberately boring.</h2>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="folder-sync" size={16} />Going up</dt>
				<dd>
					After a settings change, debounced by twenty seconds, and only while sync is on. A machine
					that has never synced never pushes by itself — the first backup is a button.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="rotate-ccw" size={16} />Coming down</dt>
				<dd>
					<strong>On demand only.</strong> Nothing ever overwrites your desktop in the background.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="git-branch" size={16} />Conflicts</dt>
				<dd>
					The server decides. Every upload says which version it replaces; if another machine saved
					in between, the server refuses and ewe tells you. No clocks, no hostnames, no race. The
					loser is kept beside the file as a timestamped <code>.bak</code>.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="shield-check" size={16} />One credential</dt>
				<dd>
					<a href="/docs/cli/ewe-cloud/"><code>ewe-cloud</code></a> keeps the app password in the
					keyring and hands it to sync, calendar and the file mount. One sign-in; one sign-out that
					revokes it on the server.
				</dd>
			</div>
		</dl>
		<Command value="ewe-conf pull && ewe-conf apply" />
	</section>

	<!-- ── decisions ────────────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">The other half</p>
		<h2>Decisions are a feature.</h2>
		<p>
			A config file only helps with what you were going to configure. The bigger cost of a
			do-it-yourself system is the hundred questions before you've done anything — filesystem,
			subvolumes, bootloader, microcode, swap, drivers, audio, login manager. Most people answer them
			once, badly, and never revisit them.
		</p>
		<p>
			So ewe answers them, and shows you every answer on the summary screen before anything is
			written. <strong>An opinion you can read is not lock-in</strong> — it's a default with its work
			shown, on ordinary Arch, under GPL-2.0. Swap any app, remove any package, or fork the lot.
		</p>
		<div class="btns">
			<a class="btn" href="/download/#decided">What ewe decides <Icon name="arrow-right" size={15} /></a>
			<a class="btn" href="/theming/">How theming works <Icon name="arrow-right" size={15} /></a>
		</div>
	</section>

	<!-- ── where it's going ─────────────────────────────────────────────── -->
	<section>
		<p class="eyebrow">Where it's going</p>
		<h2>1.0 is called “Dolly”.</h2>
		<p>
			After the sheep that proved you can rebuild the whole animal from a single cell. That's the
			roadmap in one word: the one file, synced, and a machine that comes back from it. The remaining
			gates are honest ones — installs proven on real hardware, and the restore demo run end to end
			on a machine that has never seen your account.
		</p>
	</section>
</div>

<style>
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	section :global(.cmd) {
		margin-top: var(--space-md);
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		max-width: 44rem;
	}
	.steps li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-s) + var(--space-xs));
		margin: 0;
	}
	/* the step number: the Step indicator's dot */
	.n {
		flex: none;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		display: grid;
		place-items: center;
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.steps h3 {
		margin-bottom: var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.steps p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		margin: 0;
	}
	.two {
		display: grid;
		gap: var(--space-s);
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}
	.two ul {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		margin: 0;
	}
	.two h3 :global(.icon) {
		color: var(--success);
	}
	.two .bad h3 :global(.icon) {
		color: var(--text-muted);
	}
</style>
