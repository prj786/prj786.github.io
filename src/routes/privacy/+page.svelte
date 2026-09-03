<script>
	import { ISSUES } from '$lib/nav.js';
	const UPDATED = '2 September 2026';
</script>

<svelte:head>
	<title>Privacy policy — ewe</title>
	<meta
		name="description"
		content="The privacy policy for ewe, the Arch-based operating system, and for this website. ewe runs no servers and collects nothing; it talks only to the Nextcloud server you choose, and to Google only if you configure your own client."
	/>
</svelte:head>

<div class="wrap page prose">
	<p class="eyebrow">Legal</p>
	<h1>Privacy policy</h1>
	<p class="muted">Last updated: {UPDATED}</p>

	<p class="lede">
		<strong>ewe has no servers and collects nothing.</strong> Everything ewe does with your data happens
		on your own computer — during installation and afterwards. If you sign in to a cloud account,
		that data moves directly between your computer and <strong>the server you chose</strong> — never
		through us.
	</p>

	<section>
		<h2>What this policy covers</h2>
		<p>
			This policy applies to <strong>ewe</strong>, a free and open-source, Arch-based operating system,
			and to everything shipped with it: the installer, the ewe desktop and its shell, the
			<strong>Komble</strong> software manager, the <strong>ewe-settings</strong> app, the casting
			daemon, the <a href="/docs/cli/ewe-conf/"><code>ewe-conf</code></a> configuration tool and the <a href="/docs/cli/ewe-auth/"><code>ewe-auth</code></a> sign-in
			broker. It also covers this website, <strong>prj786.github.io</strong>.
		</p>
		<p>
			ewe is published by the ewe project (an individual open-source developer), and is licensed under
			the GPL-2.0. There is no company, no account system and no backend service behind it. Installing
			ewe does not create an account with anyone.
		</p>
	</section>

	<section>
		<h2>Data ewe handles on your computer</h2>
		<p>
			Like any operating system, ewe reads and writes things on your machine to work: the details you
			give the installer (your name, username, computer name and password, which are written into the
			installed system and nowhere else), your configuration file
			(<code>~/.config/ewe/ewe.conf</code>), your wallpaper and theme choices, your clipboard history,
			notifications delivered by your applications, your list of installed packages, and the Wi-Fi,
			Bluetooth and audio state your system already exposes.
		</p>
		<p>
			<strong>None of it is transmitted anywhere.</strong> It stays in your home directory and your
			system's own services. Uninstalling ewe or deleting those files removes it.
		</p>
	</section>

	<section>
		<h2>Your Nextcloud account (optional)</h2>
		<p>
			Signing in is optional. Until you do, ewe talks to no server at all. When you sign in, you
			choose the server — one you run, or a hosted provider — and ewe uses Nextcloud's own browser
			login: your server's page authenticates you, and ewe receives an <em>app password</em> scoped
			to your account. ewe never sees or stores your real password. With that account ewe does
			exactly three things:
		</p>
		<dl class="rows">
			<div class="row">
				<dt>Settings sync</dt>
				<dd>
					Your <code>ewe.conf</code> file is uploaded to a folder named <code>ewe</code> in your
					account's files, and read back when you ask for a restore. By design it contains no
					passwords, tokens or keys.
				</dd>
			</div>
			<div class="row">
				<dt>Calendar</dt>
				<dd>
					Your upcoming events are read over CalDAV and shown in your own Quick Settings, with local
					reminder notifications. Read-only.
				</dd>
			</div>
			<div class="row">
				<dt>Files</dt>
				<dd>
					Your account's files are mounted as a folder on your machine for the file manager, if you
					enable it.
				</dd>
			</div>
		</dl>
		<p>
			<strong>Mail</strong>, if you configure an account, is read over IMAP — unread count and message
			subjects for the desktop badge and notifications, never bodies, never sending. All of this data
			flows <strong>directly between your computer and your server</strong>. It is never sent to,
			stored by, proxied through, or visible to the ewe project.
		</p>
	</section>

	<section>
		<h2>Connecting a Google account (optional, your own client)</h2>
		<p>
			ewe ships no Google client. Google functionality exists only if you register your own OAuth
			client with Google and place its file at <code>~/.config/ewe/oauth-client.json</code>; until
			then no Google functionality appears anywhere in ewe, and settings sync never uses Google. If
			you do configure one, ewe requests these scopes and uses them for exactly these purposes:
		</p>
		<dl class="rows">
			<div class="row">
				<dt><code>openid email profile</code></dt>
				<dd>
					Your name, email address and profile picture — shown in your own Settings so you can see
					which account is connected.
				</dd>
			</div>
			<div class="row">
				<dt><code>gmail.readonly</code></dt>
				<dd>
					Your unread count and message subjects — shown on your own desktop as a bar indicator, new
					mail notifications and a list that deep-links into Gmail. Read-only: ewe cannot send,
					modify or delete mail. Message bodies are not fetched.
				</dd>
			</div>
			<div class="row">
				<dt><code>drive.readonly</code> (optional)</dt>
				<dd>
					Requested only if you enable the “Google Drive” folder, which mounts your Drive files
					locally for browsing in the file manager.
				</dd>
			</div>
		</dl>
		<p>
			All of this data flows <strong>directly between your computer and Google</strong>. It is never
			sent to, stored by, proxied through, or visible to the ewe project. It is never sold, never
			shared with third parties, never used for advertising, and never used to train any AI or machine
			learning model. It is not used for any purpose other than providing the features listed above,
			on your own screen.
		</p>
	</section>

	<section>
		<h2>Limited Use</h2>
		<p class="limited">
			ewe's use and transfer of information received from Google APIs to any other app will adhere to
			the
			<a href="https://developers.google.com/terms/api-services-user-data-policy"
				>Google API Services User Data Policy</a
			>, including the Limited Use requirements.
		</p>
	</section>

	<section>
		<h2>What is stored, and where</h2>
		<dl class="rows">
			<div class="row">
				<dt>Sign-in credentials</dt>
				<dd>
					Your Nextcloud app password, any IMAP password, and — if you configured one — your Google
					refresh token are stored only in your computer's encrypted system keyring (gnome-keyring,
					via the Secret Service API). They are never written to a file, never transmitted to us,
					and never included in anything that syncs.
				</dd>
			</div>
			<div class="row">
				<dt>Your settings file</dt>
				<dd>
					If you switch sync on, <code>ewe.conf</code> is uploaded to the <code>ewe</code> folder in
					your own Nextcloud account. By design it contains no passwords, tokens or keys — it may name
					a server and a login name, never a credential.
				</dd>
			</div>
			<div class="row">
				<dt>Local caches</dt>
				<dd>
					Calendar events and mail headers are cached on your machine so the desktop works offline.
					Signing out deletes them.
				</dd>
			</div>
			<div class="row">
				<dt>OAuth client details</dt>
				<dd>
					ewe ships no OAuth client. If you use Google, the client is one you registered yourself; its
					file stays on your machine and identifies your registration — not you, and not us.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<h2>Revoking access and deleting your data</h2>
		<ul>
			<li>
				<strong>Sign out</strong> in Settings → Account. This revokes the app password on your
				Nextcloud server and clears the keyring entry and every local cache. You can also revoke
				“ewe (your computer)” from your account's <em>Security</em> page at any time.
			</li>
			<li>
				<strong>Delete the synced file</strong> by turning sync off and deleting the
				<code>ewe</code> folder in your account's files. It is your server; we cannot see or reach it.
			</li>
			<li>
				If you configured a Google client: sign out of the Google card (revokes the token at Google),
				or revoke it from
				<a href="https://myaccount.google.com/permissions">your Google account permissions</a>.
			</li>
			<li>
				<strong>Remove it entirely</strong> by deleting <code>~/.config/ewe</code> to clear your local
				configuration, or by reinstalling over the disk. Nothing survives elsewhere, because nothing
				was sent elsewhere.
			</li>
		</ul>
	</section>

	<section>
		<h2>What the ewe project receives</h2>
		<p>
			Nothing. There is no telemetry, no analytics, no crash reporting, no update ping, and no account
			of ours to hold anything. Two things do involve someone else's servers, and you should know about
			both:
		</p>
		<ul>
			<li>
				<strong>The ISO, packages and updates</strong> come from GitHub's infrastructure and Arch's
				package mirrors, which see your IP address like any download does — during installation and
				every time you update. GitHub's handling is covered by
				<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
					>GitHub's privacy statement</a
				>.
			</li>
			<li>
				<strong>Automatic timezone detection</strong> — in the installer and on the running system —
				asks geolocation services where your public IP is, so it can suggest your time zone. It sends
				nothing else, you are shown what was chosen, and you can change or disable it.
			</li>
		</ul>
	</section>

	<section>
		<h2>This website</h2>
		<p>
			This site sets <strong>no cookies</strong>, runs <strong>no analytics</strong>, and makes
			<strong>no third-party requests</strong> — the fonts are served from this domain rather than from
			a font CDN. It is static HTML hosted on GitHub Pages, so GitHub's servers process your IP address
			in order to deliver the page; see GitHub's privacy statement above.
		</p>
	</section>

	<section>
		<h2>Children</h2>
		<p>
			ewe is a general-purpose operating system and is not directed at children under 13.
			We do not knowingly collect personal information from anyone — including children — because we do
			not collect personal information at all.
		</p>
	</section>

	<section>
		<h2>Changes to this policy</h2>
		<p>
			If this policy changes, the date at the top changes with it and the revision is visible in this
			site's public git history. Material changes to what ewe accesses will also appear in the release
			notes.
		</p>
	</section>

	<section>
		<h2>Contact</h2>
		<p>
			Questions about privacy, or a request about data: open an issue at
			<a href={ISSUES}>github.com/prj786/ewe-os/issues</a>. Security matters should go privately
			through the repository's Security tab.
		</p>
	</section>
</div>

<style>
	.prose section {
		margin-top: 2.6rem;
	}
	.prose h2 {
		font-size: 1.25rem;
	}
	.prose .lede {
		margin-top: 1.4rem;
	}
	.limited {
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		padding: 1rem 1.15rem;
		max-width: none;
	}
</style>
