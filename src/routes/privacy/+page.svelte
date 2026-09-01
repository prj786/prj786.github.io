<script>
	import { ISSUES } from '$lib/nav.js';
	const UPDATED = '1 September 2026';
</script>

<svelte:head>
	<title>Privacy policy — ewe</title>
	<meta
		name="description"
		content="The privacy policy for ewe, the Arch-based operating system, and for this website. ewe runs no servers and collects nothing; Google account access is optional, read-only and stays between your computer and Google."
	/>
</svelte:head>

<div class="wrap page prose">
	<p class="eyebrow">Legal</p>
	<h1>Privacy policy</h1>
	<p class="muted">Last updated: {UPDATED}</p>

	<p class="lede">
		<strong>ewe has no servers and collects nothing.</strong> Everything ewe does with your data happens
		on your own computer — during installation and afterwards. If you choose to connect a Google account, that data moves directly between your
		computer and Google — never through us.
	</p>

	<section>
		<h2>What this policy covers</h2>
		<p>
			This policy applies to <strong>ewe</strong>, a free and open-source, Arch-based operating system,
			and to everything shipped with it: the installer, the ewe desktop and its shell, the
			<strong>Komble</strong> software manager, the <strong>ewe-settings</strong> app, the casting
			daemon, the <code>ewe-conf</code> configuration tool and the <code>ewe-auth</code> sign-in
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
		<h2>Connecting a Google account (optional)</h2>
		<p>
			Connecting a Google account is entirely optional. Until you connect one, no Google functionality
			appears anywhere in ewe. If you do connect one, ewe requests these scopes and uses them for
			exactly these purposes:
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
				<dt><code>calendar.readonly</code></dt>
				<dd>
					Your upcoming events — displayed in the calendar in your own Quick Settings, and used for
					local reminder notifications. Read-only: ewe cannot create, change or delete events.
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
				<dt><code>drive.appdata</code></dt>
				<dd>
					Hidden per-app storage on your own Drive, used to hold your <code>ewe.conf</code> settings
					file so a new machine can restore your desktop. This scope gives ewe access
					<strong>only to its own hidden folder</strong> — not to your Drive files.
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
					Your OAuth refresh token is stored only in your computer's encrypted system keyring
					(gnome-keyring, via the Secret Service API). It is never written to a file, never
					transmitted to us, and never included in anything that syncs.
				</dd>
			</div>
			<div class="row">
				<dt>Your settings file</dt>
				<dd>
					If you switch sync on, <code>ewe.conf</code> is uploaded to the hidden per-app folder in
					your own Google Drive. By design it contains no passwords, tokens or keys — it may name an
					account by email address, never a credential.
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
					ewe ships its own OAuth client in the package, so there is nothing for you to register. A
					desktop-app client secret is explicitly non-confidential under Google's own guidance, and it
					identifies the application — not you.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<h2>Revoking access and deleting your data</h2>
		<ul>
			<li>
				<strong>Sign out</strong> in Settings → User. This revokes the token at Google and clears the
				keyring entry and every local cache.
			</li>
			<li>
				You can also revoke ewe at any time from
				<a href="https://myaccount.google.com/permissions">your Google account permissions</a>.
			</li>
			<li>
				<strong>Delete the synced file</strong> by turning sync off and removing the app's hidden Drive
				data from
				<a href="https://drive.google.com/drive/settings">Drive settings → Manage apps</a>. It is your
				Drive; we cannot see or reach it.
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
