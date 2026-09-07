<script>
	import Icon from '$lib/Icon.svelte';
	import Shot from '$lib/Shot.svelte';
	import { ISO_SIZE } from '$lib/release.js';
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
		<img src="/ewe-logo.png" alt="the ewe sheep mark" width="96" height="96" />
		<h1>ewe</h1>
		<p class="lede">
			A complete, Arch-based <strong>operating system</strong>. One ISO, about ten minutes, and a
			finished desktop — installer to lock screen, themed end to end, decided so you don't have to.
		</p>

		<div class="btns">
			<a class="btn primary" href="/download/">
				<Icon name="download" size={16} /> Download the ISO
				<span class="sz">{ISO_SIZE}</span>
			</a>
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
		alt="The ewe desktop: the bar across the top with workspace, tray, notification and update badges; the control centre open at the right with Wi-Fi, Bluetooth, VPN, SSH, Do Not Disturb and Insomnia tiles above CPU and memory meters and volume and brightness sliders; the dock along the bottom."
		caption="A running ewe session with the control centre open. One accent decides the tiles, the badges, the sliders and the active dock item — and the ink on top of it is measured against the fill, not assumed white."
	/>
</div>

<div class="wrap rest">
	<section>
		<div class="grid">
			<div class="card">
				<h3><Icon name="hard-drive" size={16} />It asks four things</h3>
				<p>
					Your keyboard, your place, which disk, who you are. Filesystem, bootloader, drivers,
					hibernation and audio are decided by ewe — and shown to you before you commit.
				</p>
			</div>
			<div class="card">
				<h3><Icon name="monitor" size={16} />A desktop, not a starting point</h3>
				<p>
					Greeter, bar, dock, launcher, control centre, software manager, settings and lock screen —
					all first-party, all matching. Nothing to assemble afterwards.
				</p>
			</div>
			<div class="card">
				<h3><Icon name="cloud" size={16} />Your setup follows you</h3>
				<p>
					One config file, kept in your own Nextcloud — never ours. A fresh install offers your
					desktop and your apps back at first sign-in.
				</p>
			</div>
		</div>
	</section>

	<section>
		<p class="eyebrow">What you get</p>
		<dl class="rows">
			<div class="row">
				<dt><Icon name="hard-drive" size={16} />The installer</dt>
				<dd>
					Six screens. btrfs with subvolumes, systemd-boot, GPU-matched drivers and automatic
					hibernation, all chosen for you and all shown before anything is written.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="layout-panel-top" size={16} />The desktop</dt>
				<dd>
					Hyprland and a Quickshell shell — bar, dock, fuzzy launcher, notifications, control
					centre, session lock, OSD and clipboard history. Dark, by decision.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="package" size={16} />Komble</dt>
				<dd>The software manager: official repos, the AUR and AppImages behind one search field.</dd>
			</div>
			<div class="row">
				<dt><Icon name="palette" size={16} />One accent, everywhere</dt>
				<dd>
					Shell, GTK, Qt, icons, cursor and window borders, from a single colour, applied live.
					<a href="/theming/">How theming works →</a>
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="cast" size={16} />Cast &amp; phone</dt>
				<dd>
					Mirror the desktop to a Samsung or Android TV from the control centre; Android battery,
					notifications and SMS in the same panel.
				</dd>
			</div>
			<div class="row">
				<dt><Icon name="refresh-cw" size={16} />Rolling, from one repo</dt>
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
			The install is verified end to end in QEMU — six screens to a booted desktop — and casting has
			been proven against a real television. <strong>Real-hardware installs are still thin</strong>,
			and that's the next gate. If you try it on metal, a report is the most useful thing you can send.
		</p>
		<div class="btns">
			<a class="btn" href="/download/">Get the ISO <Icon name="arrow-right" size={15} /></a>
			<a class="btn" href="/docs/troubleshooting/">Known limitations <Icon name="arrow-right" size={15} /></a>
		</div>
	</section>
</div>

<style>
	.top {
		padding-block: 3.25rem 0;
	}
	/* the screenshot earns more width than the text measure */
	.figure {
		margin-top: 2.4rem;
	}
	.rest {
		padding-block: 3rem 4.5rem;
	}
	.hero {
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.2rem;
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
	.sz {
		opacity: 0.72;
		font-size: 0.82em;
	}
	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--fg-3);
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
	.more {
		margin-top: 1rem;
		font-size: 0.94rem;
	}
</style>
