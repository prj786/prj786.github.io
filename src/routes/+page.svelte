<script>
	import Command from '$lib/Command.svelte';
	import { INSTALL, RELEASES } from '$lib/nav.js';
</script>

<svelte:head>
	<title>ewe — a complete desktop for Arch Linux</title>
	<meta
		name="description"
		content="ewe is a clean, dark, complete desktop environment for Arch Linux: Hyprland + Quickshell turned into a full DE by one installer. Your whole machine described by one file."
	/>
</svelte:head>

<div class="wrap page">
	<section class="hero">
		<img src="/ewe-logo.png" alt="the ewe sheep mark" width="104" height="104" />
		<h1>ewe</h1>
		<p class="lede">
			A clean, dark, <strong>complete</strong> desktop environment for Arch Linux. Hyprland and Quickshell,
			turned into a full DE by one installer — greeter to lock screen, themed end to end, working the
			minute it boots.
		</p>

		<div class="install">
			<Command value={INSTALL} />
			<p class="muted">
				Run as your normal user on a minimal Arch install. It prompts before every change; re-run the
				same line to update.
			</p>
		</div>

		<div class="btns">
			<a class="btn primary" href={RELEASES}>Download the beta</a>
			<a class="btn" href="/docs/">Read the docs</a>
		</div>

		<p class="status">
			<span class="dot"></span> Beta · Arch only · Wayland · GPL-2.0
		</p>
	</section>

	<hr />

	<section class="goal">
		<p class="eyebrow">The goal</p>
		<h2>Log in, get your machine back.</h2>
		<p>
			Not a dotfiles repo you maintain forever. ewe describes your entire desktop in
			<strong>one file</strong>, keeps that file in your own Google Drive, and rebuilds the machine
			from it. New laptop, fresh install, broken disk — sign in, pull the file, and you're home.
		</p>
		<div class="btns">
			<a class="btn" href="/philosophy/">Why one file →</a>
			<a class="btn" href="/sync/">How sync works →</a>
		</div>
	</section>

	<section>
		<p class="eyebrow">Why it's different</p>
		<div class="grid">
			<div class="card">
				<h3>A desktop, not a starting point</h3>
				<p>
					Bar, dock, launcher, notifications, control centre, lock, OSD, clipboard history, greeter
					and a silent boot splash — all first-party, all matching. Nothing to assemble.
				</p>
			</div>
			<div class="card">
				<h3>Decisions already made</h3>
				<p>
					One theme, one icon language, one curated app set with sane defaults. Opinionated so you
					can stop configuring and start working — every choice still editable.
				</p>
			</div>
			<div class="card">
				<h3>Your setup follows you</h3>
				<p>
					Settings sync to your own Drive, never to us. Restore rebuilds the desktop and offers your
					package list back. Secrets stay in the keyring by design.
				</p>
			</div>
		</div>
	</section>

	<section>
		<p class="eyebrow">What you get</p>
		<dl class="rows">
			<div class="row">
				<dt>The shell</dt>
				<dd>
					Quickshell (QML) bar, dock, fuzzy launcher, notifications, Quick Settings, session lock,
					OSD and clipboard history — on Hyprland, configured in Lua.
				</dd>
			</div>
			<div class="row">
				<dt>Komble</dt>
				<dd>First-party software manager: pacman, the AUR and AppImages behind one search field.</dd>
			</div>
			<div class="row">
				<dt>ewe-settings</dt>
				<dd>A real settings app that writes real config — theme, input, displays, animations, apps.</dd>
			</div>
			<div class="row">
				<dt>Cast to TV</dt>
				<dd>
					One tile mirrors the desktop to a Samsung or Android TV over Miracast or Chromecast, with
					ewe's own share picker for every screen-share.
				</dd>
			</div>
			<div class="row">
				<dt>Phone link</dt>
				<dd>
					Battery, notifications and SMS from your Android phone, in the control centre — KDE
					Connect's daemon, ewe's interface.
				</dd>
			</div>
			<div class="row">
				<dt>Google account</dt>
				<dd>Optional and native: calendar, Gmail unread, and settings sync. No GNOME Online Accounts.</dd>
			</div>
		</dl>
		<p class="more"><a href="/features/">All features in detail →</a></p>
	</section>
</div>

<style>
	.hero {
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}
	.hero img {
		opacity: 0.94;
		margin-left: -0.35rem;
	}
	.hero h1 {
		margin: 0;
	}
	.hero .lede {
		max-width: 40rem;
	}
	.install {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.install .muted {
		max-width: 40rem;
	}
	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--dim);
		font-size: 0.85rem;
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--warning);
		display: inline-block;
	}
	.goal h2 {
		margin-bottom: 0.7rem;
	}
	.goal .btns {
		margin-top: 1.1rem;
	}
	.more {
		margin-top: 1.1rem;
		font-size: 0.94rem;
	}
</style>
