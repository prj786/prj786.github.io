<svelte:head>
	<title>Sync — ewe</title>
	<meta
		name="description"
		content="ewe syncs one config file to your own Nextcloud — a server you run or a hosted account. Sign in on a fresh install, pull the file, apply it, and the desktop is yours again, with no credentials ever leaving the keyring."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Sync</p>
	<h1>Log in to your cloud, get your machine back.</h1>
	<p class="lede">
		Because the whole machine is <a href="/philosophy/">one file</a>, syncing it is not a backup
		system — it's a file in your own <strong>Nextcloud</strong>. A server you run, or an account from
		a provider: ewe doesn't care which, and never asks anyone's permission. Install ewe on anything,
		sign in, and it offers you your desktop back.
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
					<h3>Sign in to your Nextcloud</h3>
					<p>
						The welcome flow asks for your server's address and opens its own login page — your
						password, your two-factor, your single sign-on, whatever your server uses. ewe never sees
						the password; it receives an app password that shows up under your account's security
						page as “ewe (your computer)”. If the account already holds a backup, ewe notices and
						says so.
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
						Komble reads the package list inside the file and <em>offers</em> what is missing —
						repository apps in one go, AUR apps through the PKGBUILD review. A restored file never
						silently installs software.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<section>
		<p class="eyebrow">Your cloud</p>
		<h2>Any Nextcloud. Yours first.</h2>
		<p>
			Nextcloud is an open standard stack — WebDAV for files, CalDAV for calendars — and ewe speaks
			those, nothing vendor-specific. That is why there is no “ewe account”, no console to register
			an app in, and nothing about the project baked into the package. Where the account lives is
			your choice:
		</p>
		<dl class="rows">
			<div class="row">
				<dt>Run your own</dt>
				<dd>
					A <a href="https://nextcloud.com/install/">Nextcloud server</a> on a machine you control —
					a home box, a VPS, a NAS. The one setup where nobody else is in the loop at all.
				</dd>
			</div>
			<div class="row">
				<dt><a href="https://murena.io/">Murena</a></dt>
				<dd>Hosted Nextcloud from the /e/ Foundation, with mail and calendar under the same account.</dd>
			</div>
			<div class="row">
				<dt><a href="https://disroot.org/">Disroot</a></dt>
				<dd>A volunteer-run platform; Nextcloud plus mail, calendar and more, on one account.</dd>
			</div>
			<div class="row">
				<dt><a href="https://www.infomaniak.com/">Infomaniak</a></dt>
				<dd>A Swiss host whose kSuite is built on Nextcloud, with a free tier.</dd>
			</div>
			<div class="row">
				<dt><a href="https://tab.digital/">tab.digital</a></dt>
				<dd>One of the hosts listed by Nextcloud itself; a plain hosted instance.</dd>
			</div>
		</dl>
		<p class="note">
			Providers change; these are examples, not endorsements. Any server that answers
			<code>/status.php</code> with a Nextcloud version works.
		</p>
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
					<li>The account's server and login name, as identity</li>
				</ul>
			</div>
			<div class="card bad">
				<h3>Never synced</h3>
				<ul>
					<li>Passwords, tokens, app passwords or keys — of any kind</li>
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
					A folder called <code>ewe</code> in your account's files — <code>ewe.conf</code> and a
					small note beside it saying which machine saved it and when. Visible, readable, yours to
					delete.
				</dd>
			</div>
			<div class="row">
				<dt>Going up</dt>
				<dd>
					After a settings change, debounced by twenty seconds, and only while sync is switched on.
					A machine that has never synced never pushes by itself — the first backup is a button.
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
					The server decides. Every upload says which version it is replacing; if another machine
					saved in between, the server refuses and ewe tells you — pull theirs, or push anyway. No
					clocks, no hostnames, no race. The loser of a pull is kept beside the file as a timestamped
					<code>.bak</code>.
				</dd>
			</div>
			<div class="row">
				<dt>One credential</dt>
				<dd>
					A small broker, <code>ewe-cloud</code>, keeps the app password in the keyring and hands it
					to the sync, the calendar and the file mount. One sign-in, one sign-out that revokes it on
					the server.
				</dd>
			</div>
			<div class="row">
				<dt>The app</dt>
				<dd>
					<code>ewe-sync</code>, in the tray: your machines and who saved the last backup, folder
					sync with your account (two-way or one-way; on change, on a timer, at login), conflicts
					resolved in place. Komble and Settings only write the one file; ewe-sync moves it.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<p class="eyebrow">Google</p>
		<h2>Optional, and only with your own client.</h2>
		<p>
			ewe ships no Google client and asks Google for nothing. If you want Gmail notifications in the
			Control Center or your Drive as a folder, drop your own OAuth client file into
			<code>~/.config/ewe/oauth-client.json</code> and a Google card appears in Settings → Account.
			Sync never goes to Google. <a href="/privacy/">The policy →</a>
		</p>
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
				<p>The project runs no backend. Your file goes between your computer and your server.</p>
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
		<h2>Landing in the 0.9 wave.</h2>
		<p>
			The Nextcloud broker, the WebDAV round-trip with the server-side conflict guard, the push and
			pull verbs, the first-login sign-in and restore offer, and the software manager's read-only
			app list are in, with a test suite that mocks a Nextcloud server and walks every branch. The
			Google-Drive sync it replaces is gone rather than kept beside it. What's left before 1.0 is the
			full restore demo on a machine that has never seen your account, and the account app that
			owns your folders.
		</p>
		<div class="btns" style="margin-top:1.1rem">
			<a class="btn" href="/docs/#account">The account →</a>
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
