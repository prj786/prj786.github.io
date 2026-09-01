<script>
	import { OS_RELEASES } from '$lib/nav.js';
	import Shot from '$lib/Shot.svelte';
</script>

<svelte:head>
	<title>ewe — a complete Arch-based operating system</title>
	<meta
		name="description"
		content="ewe is an Arch-based operating system that installs from one ISO in about ten minutes. It asks what's personal — keyboard, place, disk, who you are — and decides everything technical for you."
	/>
</svelte:head>

<div class="wrap top">
	<section class="hero">
		<img src="/ewe-logo.png" alt="the ewe sheep mark" width="104" height="104" />
		<h1>ewe</h1>
		<p class="lede">
			A complete, Arch-based <strong>operating system</strong>. One ISO, about ten minutes, and a
			finished desktop — installer to lock screen, themed end to end, decided so you don't have to.
		</p>

		<div class="btns">
			<a class="btn primary" href="/download/">Download the ISO</a>
			<a class="btn" href="/docs/">Read the docs</a>
		</div>

		<p class="status">
			<span class="dot"></span> Alpha · x86_64 · UEFI · rolling releases · GPL-2.0
		</p>
	</section>
</div>

<div class="wrap wide figure">
	<Shot
			priority
			alt="The ewe desktop: the Settings app open on Appearance showing the Flock and Black Sheep shell styles and a row of accent colours, the control centre open at the right with Wi-Fi, Bluetooth, VPN, SSH, Do Not Disturb and Insomnia tiles above CPU and memory meters, and the dock along the bottom."
			caption="A running ewe session: Settings on Appearance, the control centre open, the dock below. The accent was switched to purple a moment earlier — which is why the control-centre tiles and the window border are purple too. One setting, applied everywhere, instantly."
	/>
</div>

<div class="wrap rest">
	<hr />

	<section class="goal">
		<p class="eyebrow">The goal</p>
		<h2>Log in, get your machine back.</h2>
		<p>
			Not a distro you reconfigure for a week. ewe describes your entire machine in
			<strong>one file</strong>, keeps that file in your own Google Drive, and rebuilds from it. New
			laptop, fresh install, broken disk — install, sign in, and your desktop is waiting.
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
				<h3>It asks four things</h3>
				<p>
					Your keyboard, your place, which disk, who you are. Filesystem, bootloader, drivers,
					hibernation and audio are decided by ewe — and shown to you before you commit.
				</p>
			</div>
			<div class="card">
				<h3>A desktop, not a starting point</h3>
				<p>
					Greeter, bar, dock, launcher, control centre, software manager, settings app and lock
					screen — all first-party, all matching. Nothing to assemble afterwards.
				</p>
			</div>
			<div class="card">
				<h3>Your setup follows you</h3>
				<p>
					Settings sync to your own Drive, never to us. A fresh install offers to restore your
					desktop and your apps at first sign-in.
				</p>
			</div>
		</div>
	</section>

	<section>
		<p class="eyebrow">Before you install</p>
		<h2>Try the whole thing from the stick.</h2>
		<p>
			The ISO boots into the real desktop, not a demo. Open the control centre, browse software in
			Komble, change the accent colour. <strong>Nothing touches your disks</strong> until you press
			Install on the summary screen — and the installer tells you exactly what it decided first.
		</p>
		<div class="btns">
			<a class="btn" href="/download/">Get the ISO →</a>
		</div>
	</section>

	<section>
		<p class="eyebrow">What you get</p>
		<dl class="rows">
			<div class="row">
				<dt>The installer</dt>
				<dd>
					Six screens, first-party, in the same design as the rest of the system. btrfs with
					subvolumes, systemd-boot, GPU-matched drivers and automatic hibernation, all chosen for you.
				</dd>
			</div>
			<div class="row">
				<dt>The desktop</dt>
				<dd>
					Hyprland and a Quickshell shell — bar, dock, fuzzy launcher, notifications, control
					centre, session lock, OSD and clipboard history. Dark, by decision.
				</dd>
			</div>
			<div class="row">
				<dt>Komble</dt>
				<dd>The software manager: official repos, the AUR and AppImages behind one search field.</dd>
			</div>
			<div class="row">
				<dt>Settings that write real config</dt>
				<dd>Theme, input, displays, wallpapers, window rules, startup apps — into one declarative file.</dd>
			</div>
			<div class="row">
				<dt>Cast to TV</dt>
				<dd>
					First-party and headless: mirror the desktop to a Samsung or Android TV from the control
					centre, with ewe's own picker for every screen-share. No foreign window.
				</dd>
			</div>
			<div class="row">
				<dt>Phone link</dt>
				<dd>Android battery, notifications and SMS, in the control centre.</dd>
			</div>
			<div class="row">
				<dt>Rolling, from one repo</dt>
				<dd>
					It's Arch underneath. The <code>[ewe]</code> repository is preconfigured, so
					<code>pacman -Syu</code> rolls the system and the desktop forward together.
				</dd>
			</div>
		</dl>
		<p class="more"><a href="/features/">All features in detail →</a></p>
	</section>

	<section>
		<p class="eyebrow">Honestly</p>
		<h2>It's an alpha.</h2>
		<p>
			The install has been verified end to end in QEMU — six screens to a booted desktop — and casting
			has been proven against a real television. <strong>Real-hardware installs are still thin</strong>,
			and that's the next gate. If you try it on metal, a report is the most useful thing you can send.
		</p>
		<div class="btns">
			<a class="btn" href={OS_RELEASES}>Releases →</a>
			<a class="btn" href="/docs/#limits">Known limitations →</a>
		</div>
	</section>
</div>

<style>
	.top {
		padding-block: 3.5rem 0;
	}
	/* the screenshot earns more width than the text measure */
	.figure {
		margin-top: 2.6rem;
	}
	.rest {
		padding-block: 0 5rem;
	}
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
	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--dim);
		font-size: 0.85rem;
		flex-wrap: wrap;
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--warning);
		display: inline-block;
	}
	.goal .btns,
	.more {
		margin-top: 1.1rem;
	}
	.rest :global(hr) {
		margin-top: 3.5rem;
	}
	.more {
		font-size: 0.94rem;
	}
</style>
