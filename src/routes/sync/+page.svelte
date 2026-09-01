<svelte:head>
	<title>Sync — ewe</title>
	<meta
		name="description"
		content="ewe syncs one config file to your own Google Drive. Sign in on a fresh install, pull the file, apply it, and the desktop is yours again — with no credentials ever leaving the keyring."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Sync</p>
	<h1>Log in, get your machine back.</h1>
	<p class="lede">
		Because the whole machine is <a href="/philosophy/">one file</a>, syncing it is not a backup
		system — it's a file in your own Google Drive. Install ewe on anything, sign in, and it offers you
		your desktop back.
	</p>

	<section>
		<p class="eyebrow">The flow</p>
		<h2>Four steps, no magic.</h2>
		<ol class="steps">
			<li>
				<span class="n">1</span>
				<div>
					<h3>Install ewe</h3>
					<p>Ten minutes from the <a href="/download/">ISO</a>, same as any other machine.</p>
				</div>
			</li>
			<li>
				<span class="n">2</span>
				<div>
					<h3>Sign in</h3>
					<p>
						The welcome flow offers it at first login — one consent screen, shared by the desktop and
						the software manager. If your account already holds a backup, ewe notices and says so.
					</p>
				</div>
			</li>
			<li>
				<span class="n">3</span>
				<div>
					<h3>Restore</h3>
					<p>
						One button in Settings → Account — or <code>ewe-conf pull &amp;&amp; ewe-conf apply</code>
						if you'd rather type. Your file comes down and rebuilds the desktop: theme, accent, dock,
						wallpapers, keyboard, displays, window rules, startup apps.
					</p>
				</div>
			</li>
			<li>
				<span class="n">4</span>
				<div>
					<h3>Say yes to your apps</h3>
					<p>
						Komble reads the package manifest inside the file and <em>offers</em> the reinstall list.
						A restored file never silently installs software.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<section>
		<p class="eyebrow">What moves</p>
		<h2>One file, and nothing else.</h2>
		<div class="two">
			<div class="card good">
				<h3>Synced</h3>
				<ul>
					<li>Theme, accent, look and animations</li>
					<li>Dock, pinned apps, startup apps, places</li>
					<li>Wallpapers and window rules</li>
					<li>Keyboard, touchpad and input devices</li>
					<li>Display profiles</li>
					<li>SSH host definitions and VPN profiles — the shape, never the secret</li>
					<li>Power and screensaver behaviour</li>
					<li>Your explicit package list — repo, AUR and AppImage</li>
					<li>The account's email address, as identity</li>
				</ul>
			</div>
			<div class="card bad">
				<h3>Never synced</h3>
				<ul>
					<li>Passwords, tokens or keys — of any kind</li>
					<li>Wi-Fi pre-shared keys (deliberately dropped)</li>
					<li>SSH or VPN secrets</li>
					<li>Your documents or personal files</li>
					<li>Mail, calendar or message content</li>
					<li>Anything at all to the ewe project</li>
				</ul>
			</div>
		</div>
		<p class="note">
			Secrets can't leak through the file because they are never in it. That's rule four of the config
			design, not a filter applied on the way out — credentials live in the system keyring, and a
			restore simply re-prompts once.
		</p>
	</section>

	<section>
		<p class="eyebrow">How it works</p>
		<h2>Deliberately boring.</h2>
		<dl class="rows">
			<div class="row">
				<dt>Where it lives</dt>
				<dd>
					Google Drive's hidden per-app <code>appDataFolder</code>: your storage, your account, not
					visible among your files, and scoped so ewe sees only its own data.
				</dd>
			</div>
			<div class="row">
				<dt>Going up</dt>
				<dd>
					After a settings change, debounced by 30 seconds, and only while sync is switched on. The
					unit is the file itself plus a small manifest — schema version, machine name, timestamp.
				</dd>
			</div>
			<div class="row">
				<dt>Coming down</dt>
				<dd>
					<strong>On demand only.</strong> A pull is something you ask for — from the CLI or the
					“restore this machine?” prompt at first login. Nothing ever overwrites your desktop in the
					background.
				</dd>
			</div>
			<div class="row">
				<dt>Conflicts</dt>
				<dd>
					Newest wins, and the loser is written beside it as a timestamped
					<code>.bak</code>. One file means recovery is reading a diff, not hunting through a bundle.
				</dd>
			</div>
			<div class="row">
				<dt>One identity</dt>
				<dd>
					A small broker, <code>ewe-auth</code>, owns the refresh token in the keyring and hands
					short-lived access tokens to whichever app needs one. One sign-in, one consent screen, one
					sign-out that revokes everything.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<p class="eyebrow">Why it's worth having</p>
		<h2>The benefits, plainly.</h2>
		<div class="grid">
			<div class="card">
				<h3>A new machine in minutes</h3>
				<p>Install, sign in, pull. The setup you spent months refining arrives with you.</p>
			</div>
			<div class="card">
				<h3>Reinstall without fear</h3>
				<p>Breaking your system stops being expensive when the desktop is one file away.</p>
			</div>
			<div class="card">
				<h3>No servers of ours</h3>
				<p>The project runs no backend. Your file goes between your computer and your Drive.</p>
			</div>
			<div class="card">
				<h3>Nothing silent</h3>
				<p>No background overwrites, no surprise installs. Every restoring action is asked for.</p>
			</div>
			<div class="card">
				<h3>Readable backups</h3>
				<p>It's TOML. Open it, diff it, keep it in git, or edit it in a text editor and apply.</p>
			</div>
			<div class="card">
				<h3>Optional, entirely</h3>
				<p>Never sign in and ewe is a fully local desktop with no cloud surface at all.</p>
			</div>
		</div>
	</section>

	<section>
		<p class="eyebrow">Status</p>
		<h2>Shipping, in the alpha.</h2>
		<p>
			The broker, the Drive round-trip — verified byte-identical — the push and pull verbs, the
			conflict guard, the software manager's restore surface and the first-login restore offer are all
			in, with a test suite that mocks Drive and walks every branch. The legacy bundle-based sync it
			replaced was deleted rather than patched. What's left before 1.0 is a full restore demo on a
			machine that has never seen your account.
		</p>
		<div class="btns" style="margin-top:1.1rem">
			<a class="btn" href="/docs/#google">The account →</a>
			<a class="btn" href="/privacy/">Privacy policy →</a>
		</div>
	</section>
</div>

<style>
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		max-width: 44rem;
	}
	.steps li {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		padding: 1rem 1.15rem;
		margin: 0;
	}
	.n {
		flex: none;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 0.8rem;
		color: var(--accent);
		border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--stroke));
	}
	.steps h3 {
		margin-bottom: 0.25rem;
	}
	.steps p {
		font-size: 0.94rem;
		margin: 0;
	}

	.two {
		display: grid;
		gap: 0.85rem;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}
	.two ul {
		font-size: 0.94rem;
		margin-top: 0.5rem;
	}
	.good h3 {
		color: var(--success);
	}
	.bad h3 {
		color: var(--fg2);
	}
	.note {
		margin-top: 1.1rem;
	}
</style>
