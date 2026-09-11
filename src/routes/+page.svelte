<script>
	import Icon from '$lib/Icon.svelte';
	import Shot from '$lib/Shot.svelte';
	import { VERSION, ISO_SIZE } from '$lib/release.js';
	import { derive, BRAND_STOPS } from '$lib/theme-engine.js';

	// the parts ewe is assembled from — named, not hidden
	const STACK = [
		'Arch Linux', 'Hyprland', 'Quickshell', 'btrfs', 'systemd-boot', 'PipeWire',
		'NetworkManager', 'greetd', 'Nextcloud', 'KDE Connect', 'Lucide', 'Inter'
	];

	// the installer's four questions, in the order it asks them
	const ASKS = [
		['keyboard', 'Your keyboard', 'The layout, with a field to test it before you move on.'],
		['globe', 'Your place', 'Timezone detected — two providers have to agree — plus language and locale.'],
		['hard-drive', 'Which disk', "The whole disk is erased, and you're told so twice."],
		['circle-user', 'Who you are', 'Name, username, password, and a name for the computer.']
	];

	// Two accents through the same engine /theming/ runs live, derived at build
	// time: the default this page wears, and the orange in the screenshots.
	const RAMPS = [
		['#0a84ff', 'this page'],
		['#ff9f0a', 'the screenshots']
	].map(([hex, who]) => ({ who, brand: derive(hex).brand }));
</script>

<svelte:head>
	<title>ewe — a complete Arch-based operating system</title>
	<meta
		name="description"
		content="ewe is an Arch-based operating system that installs from one ISO in about ten minutes. It asks what's personal — keyboard, place, disk, who you are — and decides everything technical for you."
	/>
</svelte:head>

<!-- ── hero ─────────────────────────────────────────────────────────────── -->
<section class="hero">
	<!-- the wallpaper the screenshots below were taken on — ewe, literally -->
	<div class="meadow" aria-hidden="true">
		<picture>
			<source srcset="/img/meadow.webp" type="image/webp" />
			<!-- the largest paint on the page: fetched first, decoded in step -->
			<img src="/img/meadow.jpg" alt="" width="2400" height="1350" fetchpriority="high" />
		</picture>
	</div>

	<div class="wrap hero-in">
		<a class="news" href="/download/">
			<span class="dot"></span>ewe {VERSION} is out
			<Icon name="arrow-right" size={14} />
		</a>
		<h1 class="display">A whole desktop, already <mark>decided</mark>.</h1>
		<p class="lede">
			ewe is a complete, Arch-based operating system. One ISO, about ten minutes, and a finished
			desktop — installer to lock screen, themed end to end.
		</p>
		<div class="btns center">
			<a class="btn primary lg" href="/download/">
				<Icon name="download" size={17} /> Download ewe <span class="sz">{ISO_SIZE}</span>
			</a>
			<a class="btn ghost lg" href="/docs/">Read the docs <Icon name="arrow-right" size={16} /></a>
		</div>
		<ul class="facts" aria-label="At a glance">
			<li>x86_64</li>
			<li>UEFI</li>
			<li>Rolling releases</li>
			<li>GPL-2.0</li>
		</ul>
	</div>

	<div class="wrap wide">
		<div class="stage">
			<Shot
				priority
				src="/img/settings"
				fallback="jpg"
				w={2560}
				h={1440}
				alt="The ewe desktop over a photo of a sheep in a meadow: the bar across the top, the dock along the bottom, and ewe-settings open on Layout & Dock with toggles for the power profile, keyboard layout, system tray, screenshot button and dock autohide, all in an orange accent."
			/>
		</div>
		<p class="figcap center">
			A real session, with Settings open on Layout &amp; Dock. The toggles, the selected pane and the
			active dock item all follow one accent.
		</p>
	</div>
</section>

<!-- ── built on ─────────────────────────────────────────────────────────── -->
<section class="parts" aria-label="Built on">
	<p class="eyebrow center">Assembled from parts you already trust</p>
	<div class="marquee">
		{#each [0, 1] as copy}
			<ul class="track" aria-hidden={copy ? 'true' : undefined}>
				{#each STACK as part}<li>{part}</li>{/each}
			</ul>
		{/each}
	</div>
</section>

<!-- ── the four questions ───────────────────────────────────────────────── -->
<section class="wrap wide block reveal">
	<div class="head">
		<p class="eyebrow">The installer</p>
		<h2>It asks four things.</h2>
		<p>
			Everything technical is decided by ewe — and shown to you on one summary screen before a single
			byte is written.
		</p>
	</div>
	<ol class="asks">
		{#each ASKS as [icon, title, body], i}
			<li class="card">
				<span class="num">0{i + 1}</span>
				<span class="ico"><Icon name={icon} size={18} /></span>
				<h3>{title}</h3>
				<p>{body}</p>
			</li>
		{/each}
	</ol>
</section>

<!-- ── what you get ─────────────────────────────────────────────────────── -->
<section class="wrap wide block reveal">
	<div class="head">
		<p class="eyebrow">What you get</p>
		<h2>A desktop, not a starting point.</h2>
		<p>
			Greeter, bar, dock, launcher, control centre, software manager, settings and lock screen — all
			first-party, all matching. Nothing to assemble afterwards.
		</p>
	</div>

	<div class="bento">
		<div class="card tile wide pic">
			<div class="txt">
				<span class="ico"><Icon name="layout-panel-top" size={18} /></span>
				<h3>A shell written once</h3>
				<p>
					Hyprland and a first-party Quickshell shell — bar, dock, fuzzy launcher, notifications,
					control centre, lock, OSD and clipboard history. <code>Super+D</code> finds apps, files and
					folders.
				</p>
			</div>
			<picture>
				<source srcset="/img/launcher.webp" type="image/webp" />
				<img
					src="/img/launcher.jpg"
					alt="The launcher open over the desktop: a search field for apps, files and folders above a list of apps, the first highlighted in the accent."
					width="1320"
					height="1030"
					loading="lazy"
					decoding="async"
				/>
			</picture>
		</div>
		<div class="card tile">
			<span class="ico"><Icon name="package" size={18} /></span>
			<h3>Komble</h3>
			<p>The software manager: official repos, the AUR and AppImages behind one search field.</p>
		</div>
		<a class="card act tile lit" href="/theming/">
			<span class="ico"><Icon name="palette" size={18} /></span>
			<h3>One accent, everywhere</h3>
			<p>Shell, GTK, Qt, icons, cursor and window borders — derived from a single colour, applied live.</p>
			{#each RAMPS as r}
				<div class="ramp" title="The brand ramp {r.who} is wearing">
					{#each BRAND_STOPS as s}<span style="background:{r.brand[s]}"></span>{/each}
				</div>
			{/each}
			<span class="go">How theming works <Icon name="arrow-right" size={14} /></span>
		</a>
		<a class="card act tile wide" href="/how/">
			<span class="ico"><Icon name="cloud" size={18} /></span>
			<h3>Your setup follows you</h3>
			<p>
				One config file, kept in your own Nextcloud — never ours. A fresh install offers your desktop
				and your apps back at first sign-in.
			</p>
			<span class="go">How it works <Icon name="arrow-right" size={14} /></span>
		</a>
		<div class="card tile">
			<span class="ico"><Icon name="cast" size={18} /></span>
			<h3>Cast &amp; phone</h3>
			<p>
				Mirror to a Samsung or Android TV from the control centre; phone battery, notifications and
				SMS in the same panel.
			</p>
		</div>
		<div class="card tile">
			<span class="ico"><Icon name="refresh-cw" size={18} /></span>
			<h3>Rolling, from one repo</h3>
			<p>
				It's Arch underneath. <code>[ewe]</code> is preconfigured, so <code>pacman -Syu</code> rolls
				the system and the desktop forward together.
			</p>
		</div>
		<div class="card tile">
			<span class="ico"><Icon name="shield-check" size={18} /></span>
			<h3>The unglamorous parts</h3>
			<p>
				Silent boot to a themed greeter, a shell that restarts itself if it crashes, and power
				behaviour that protects unsaved work.
			</p>
		</div>
	</div>
	<p class="more center"><a href="/features/">All features in detail →</a></p>
</section>

<!-- ── decided ──────────────────────────────────────────────────────────── -->
<section class="wrap wide block reveal" id="decided">
	<div class="head">
		<p class="eyebrow">Decided by ewe</p>
		<h2>What you don't get asked.</h2>
		<p>
			The questions a normal Arch install makes you answer — and the answers ewe shows you on the
			summary screen before anything happens.
		</p>
	</div>
	<div class="scroll">
		<table class="versus">
			<thead>
				<tr>
					<th scope="col">A normal Arch install asks</th>
					<th scope="col"><img src="/ewe-logo.png" alt="" width="18" height="18" /> ewe decides</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Which filesystem?</th>
					<td><Icon name="check" size={15} />btrfs, with <code>@</code> and <code>@home</code> subvolumes and zstd</td>
				</tr>
				<tr>
					<th scope="row">Which bootloader?</th>
					<td><Icon name="check" size={15} />systemd-boot, splash only — no menu unless you hold a key</td>
				</tr>
				<tr>
					<th scope="row">Which graphics driver?</th>
					<td><Icon name="check" size={15} />Matched to whatever GPUs it finds — Intel, AMD or NVIDIA</td>
				</tr>
				<tr>
					<th scope="row">Hibernation?</th>
					<td><Icon name="check" size={15} />Set up when there's a battery: a swapfile of RAM + 2 GB</td>
				</tr>
				<tr>
					<th scope="row">Sound, network, login?</th>
					<td><Icon name="check" size={15} />PipeWire, NetworkManager, greetd</td>
				</tr>
				<tr>
					<th scope="row">Which desktop, and how to theme it?</th>
					<td><Icon name="check" size={15} />Hyprland and ewe's own shell, themed end to end from one accent</td>
				</tr>
				<tr>
					<th scope="row">How do I update?</th>
					<td><Icon name="check" size={15} />The <code>[ewe]</code> repo is preconfigured — <code>pacman -Syu</code></td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<!-- ── honestly ─────────────────────────────────────────────────────────── -->
<section class="wrap wide block reveal">
	<div class="finale">
		<div class="glow" aria-hidden="true"></div>
		<p class="eyebrow">Honestly</p>
		<h2>It's an alpha.</h2>
		<p>
			The install is verified end to end in QEMU — six screens to a booted desktop — and casting has
			been proven against a real television. <strong>Real-hardware installs are still thin</strong>,
			and that's the next gate. If you try it on metal, a report is the most useful thing you can send.
		</p>
		<div class="btns center">
			<a class="btn primary lg" href="/download/"><Icon name="download" size={17} /> Get the ISO</a>
			<a class="btn lg" href="/docs/troubleshooting/">Known limitations <Icon name="arrow-right" size={16} /></a>
		</div>
	</div>
</section>

<style>
	/* ── hero ─────────────────────────────────────────────────────────── */
	.hero {
		position: relative;
		isolation: isolate;
		overflow: clip;
		/* run the meadow up under the floating bar */
		margin-top: calc(-1 * var(--header-h));
		padding-block: calc(var(--header-h) + 5rem) 0;
		text-align: center;
	}

	/* The photo sits behind a scrim drawn from the page ground, so the text
	   stays legible whatever the wallpaper is, and the meadow dissolves into
	   --bg-3 before the screenshot ends. The accent tints the sky above it. */
	.meadow {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}
	.meadow img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 30%;
		/* the photo is a dark one already — lift it, don't bury it */
		filter: brightness(1.25) saturate(1.05);
	}
	.meadow::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(44% 30% at 50% 27%, color-mix(in srgb, var(--bg-3) 45%, transparent), transparent 80%),
			radial-gradient(60% 40% at 50% -6%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 75%),
			linear-gradient(
				to bottom,
				color-mix(in srgb, var(--bg-3) 35%, transparent) 0%,
				transparent 30%,
				color-mix(in srgb, var(--bg-3) 40%, transparent) 62%,
				color-mix(in srgb, var(--bg-3) 85%, transparent) 82%,
				var(--bg-3) 96%
			);
	}

	.hero-in {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.news {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.34rem 0.8rem 0.34rem 0.7rem;
		border-radius: var(--radius-pill);
		background: color-mix(in srgb, var(--bg-2) 70%, transparent);
		border: var(--stroke-width) solid var(--stroke-2);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		font-size: 0.84rem;
		color: var(--fg-2);
		text-decoration: none;
		transition:
			border-color 160ms ease,
			color 160ms ease;
	}
	.news:hover {
		border-color: var(--stroke-1);
		color: var(--fg-1);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--warning);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--warning) 22%, transparent);
	}

	.display {
		margin-top: 1.6rem;
		max-width: 15ch;
		font-size: clamp(2.7rem, 1rem + 6.4vw, 5.6rem);
		line-height: 1.02;
		letter-spacing: -0.045em;
		text-shadow: 0 2px 30px color-mix(in srgb, var(--bg-3) 60%, transparent);
	}
	/* one word underlined by hand, the way you'd mark a page — in the accent */
	mark {
		position: relative;
		isolation: isolate;
		background: none;
		color: inherit;
		white-space: nowrap;
	}
	mark::before {
		content: '';
		position: absolute;
		inset-inline: -0.08em;
		bottom: 0.08em;
		height: 0.42em;
		z-index: -1;
		border-radius: 0.12em;
		background: color-mix(in oklab, var(--accent) 45%, transparent);
		transform: rotate(-2deg);
		transform-origin: left center;
	}

	.hero .lede {
		margin: 1.5rem auto 0;
		max-width: 38rem;
		font-size: clamp(1.05rem, 1rem + 0.3vw, 1.2rem);
		color: var(--fg-1);
	}
	.hero .btns {
		margin-top: 2.2rem;
	}
	.sz {
		opacity: 0.72;
		font-size: 0.82em;
	}
	.facts {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 0;
		max-width: none;
		font-size: 0.86rem;
		color: var(--fg-2);
	}
	.facts li {
		margin: 0;
	}
	.facts li + li::before {
		content: '•';
		margin-inline: 0.7rem;
		color: var(--fg-4);
	}

	/* ── the screenshot, on a glass stage over the meadow ─────────────── */
	.stage {
		margin-top: 4rem;
		padding: 0.6rem;
		border-radius: calc(var(--radius-panel) + 0.6rem);
		background: color-mix(in srgb, var(--bg-1) 40%, transparent);
		border: var(--stroke-width) solid var(--stroke-1);
		backdrop-filter: blur(18px) saturate(1.3);
		-webkit-backdrop-filter: blur(18px) saturate(1.3);
		box-shadow:
			0 50px 120px -40px color-mix(in srgb, var(--bg-5) 90%, transparent),
			var(--elevation);
	}
	.stage :global(.shot picture) {
		border: 0;
		border-radius: var(--radius-panel);
		box-shadow: none;
	}
	.figcap.center {
		text-align: center;
	}

	/* ── motion: the page arriving ───────────────────────────────────────
	   CSS only, so it plays on the prerendered page before any script. */
	@keyframes up {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: perspective(1600px) rotateX(12deg) translateY(48px) scale(0.96);
		}
	}
	@keyframes ink {
		from {
			transform: rotate(-2deg) scaleX(0);
		}
	}
	@keyframes settle {
		from {
			transform: scale(1.06);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.hero-in > :global(*) {
			animation: up 800ms var(--ease) both;
		}
		.hero-in > :global(:nth-child(2)) {
			animation-delay: 70ms;
		}
		.hero-in > :global(:nth-child(3)) {
			animation-delay: 140ms;
		}
		.hero-in > :global(:nth-child(4)) {
			animation-delay: 210ms;
		}
		.hero-in > :global(:nth-child(5)) {
			animation-delay: 280ms;
		}
		mark::before {
			animation: ink 700ms var(--ease) 650ms both;
		}
		.stage {
			animation: rise 1100ms var(--ease) 250ms both;
		}
		.meadow img {
			animation: settle 2400ms var(--ease) both;
		}
	}

	/* ── built on: the marquee ───────────────────────────────────────── */
	.parts {
		margin-top: 5.5rem;
	}
	.marquee {
		display: flex;
		gap: 3rem;
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
	}
	.track {
		flex: none;
		display: flex;
		justify-content: space-around;
		gap: 3rem;
		min-width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: none;
		animation: marquee 45s linear infinite;
	}
	.marquee:hover .track {
		animation-play-state: paused;
	}
	.track li {
		margin: 0;
		white-space: nowrap;
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: -0.015em;
		color: var(--fg-3);
	}
	@keyframes marquee {
		to {
			transform: translateX(calc(-100% - 3rem));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			mask-image: none;
			-webkit-mask-image: none;
		}
		/* standing still, the list must be allowed to shrink or it cannot wrap */
		.track {
			flex: 1 1 auto;
			min-width: 0;
			animation: none;
			flex-wrap: wrap;
			justify-content: center;
			gap: 0.6rem 2rem;
			padding-inline: 1.4rem;
		}
		.track[aria-hidden] {
			display: none;
		}
	}

	/* ── sections ─────────────────────────────────────────────────────── */
	.block {
		margin-top: 7rem;
	}
	.head {
		max-width: 42rem;
		margin: 0 auto 2.6rem;
		text-align: center;
	}
	.head p:not(.eyebrow) {
		margin: 1rem auto 0;
		font-size: 1.05rem;
	}
	.ico {
		display: inline-grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		margin-bottom: 1rem;
		border-radius: var(--radius-control);
		background: color-mix(in oklab, var(--accent) 14%, transparent);
		color: var(--accent);
	}
	.more {
		margin-top: 1.6rem;
		font-size: 0.95rem;
	}

	/* the four questions */
	.asks {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.9rem;
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: none;
	}
	.asks li {
		position: relative;
		margin: 0;
	}
	.num {
		position: absolute;
		top: 1.2rem;
		right: 1.3rem;
		font-family: var(--mono);
		font-size: 0.8rem;
		color: var(--fg-4);
	}
	@media (max-width: 900px) {
		.asks {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 520px) {
		.asks {
			grid-template-columns: 1fr;
		}
	}

	/* the bento */
	.bento {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
	}
	.tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-height: 13.5rem;
		padding: 1.5rem;
	}
	.tile.wide {
		grid-column: span 2;
	}
	/* the tile with a picture: text on the left, the launcher bleeding off
	   the bottom-right corner */
	.pic {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
		gap: 1.5rem;
		padding: 0 0 0 1.5rem;
		overflow: hidden;
	}
	.pic .txt {
		padding-block: 1.5rem;
	}
	.pic picture {
		align-self: end;
		margin-top: 1.5rem;
	}
	.pic img {
		display: block;
		width: 100%;
		height: auto;
		border-top-left-radius: var(--radius-card);
		border: var(--stroke-width) solid var(--stroke-2);
		border-width: var(--stroke-width) 0 0 var(--stroke-width);
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: auto;
		padding-top: 1.1rem;
		font-size: 0.9rem;
		color: var(--accent);
	}
	.go :global(.icon) {
		transition: transform 200ms var(--ease);
	}
	.tile:hover .go :global(.icon) {
		transform: translateX(2px);
	}
	/* the featured tile gets a border that catches the accent at one corner */
	.lit {
		border-color: transparent;
		background:
			linear-gradient(var(--bg-2), var(--bg-2)) padding-box,
			linear-gradient(135deg, color-mix(in oklab, var(--accent) 65%, transparent), var(--stroke-2) 55%) border-box;
	}
	.lit:hover {
		border-color: transparent;
		background:
			linear-gradient(var(--bg-2-hover), var(--bg-2-hover)) padding-box,
			linear-gradient(135deg, var(--accent), var(--stroke-1) 55%) border-box;
	}
	.ramp {
		display: flex;
		width: 100%;
		height: 1.1rem;
		margin-top: 0.9rem;
		border-radius: var(--radius-pill);
		overflow: hidden;
	}
	.ramp + .ramp {
		margin-top: 0.4rem;
	}
	.ramp span {
		flex: 1;
	}
	@media (max-width: 860px) {
		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 560px) {
		.bento {
			grid-template-columns: 1fr;
		}
		.tile.wide {
			grid-column: auto;
		}
		.tile {
			min-height: 0;
		}
		.pic {
			grid-template-columns: 1fr;
			gap: 0;
			padding-bottom: 0;
		}
		.pic .txt {
			padding: 1.5rem 1.5rem 0 0;
		}
	}

	/* the comparison */
	.scroll {
		overflow-x: auto;
		border-radius: var(--radius-panel);
	}
	.versus {
		width: 100%;
		min-width: 34rem;
		border-collapse: separate;
		border-spacing: 0;
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-panel);
		overflow: hidden;
		text-align: left;
		font-size: 0.95rem;
	}
	.versus th,
	.versus td {
		padding: 1rem 1.3rem;
		vertical-align: top;
	}
	.versus tbody tr > * {
		border-top: var(--stroke-width) solid var(--stroke-3);
	}
	.versus thead th {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-4);
	}
	.versus thead th:last-child {
		color: var(--accent);
	}
	.versus thead img {
		vertical-align: -4px;
		margin-right: 0.3rem;
	}
	.versus tbody th {
		width: 40%;
		font-weight: 500;
		color: var(--fg-3);
	}
	.versus td {
		color: var(--fg-1);
		/* the answer column, faintly lit — the side of the table ewe is on */
		background: color-mix(in oklab, var(--accent) 5%, transparent);
	}
	/* Icon is a block by default (it lives in flex rows); inline in a cell */
	.versus td :global(.icon) {
		display: inline-block;
		color: var(--accent);
		margin-right: 0.55rem;
		vertical-align: -2px;
	}

	/* the closing panel: the wallpapers' glow, drawn from the accent, with
	   the sheep where the wallpapers keep it */
	.finale {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		padding: 4.5rem 1.5rem;
		border-radius: var(--radius-panel);
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		text-align: center;
	}
	.glow {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(60% 70% at 50% 115%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 72%),
			radial-gradient(40% 50% at 10% 100%, color-mix(in oklab, var(--brand-bg) 40%, transparent), transparent 72%);
	}
	.glow::after {
		content: '';
		position: absolute;
		right: 4%;
		bottom: 8%;
		width: min(11rem, 30%);
		aspect-ratio: 1;
		background: url('/ewe-logo.png') center / contain no-repeat;
		opacity: 0.07;
	}
	.finale h2 {
		font-size: clamp(2rem, 1.3rem + 2.8vw, 3.3rem);
		letter-spacing: -0.04em;
	}
	.finale p:not(.eyebrow) {
		margin: 1.1rem auto 0;
		max-width: 38rem;
	}
	.finale .btns {
		margin-top: 2rem;
	}
</style>
