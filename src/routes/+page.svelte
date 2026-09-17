<script>
	import Icon from '$lib/Icon.svelte';
	import Shot from '$lib/Shot.svelte';
	import { VERSION, ISO_SIZE } from '$lib/release.js';
	import { accentRamp, RAMP_STEPS, EWELLOW } from '$lib/theme-engine.js';

	// the parts ewe is assembled from — named, not hidden
	const STACK = [
		'Arch Linux', 'Hyprland', 'Quickshell', 'btrfs', 'systemd-boot', 'PipeWire',
		'NetworkManager', 'greetd', 'Nextcloud', 'KDE Connect', 'Lucide', 'Geist'
	];

	// the installer's four questions, in the order it asks them
	const ASKS = [
		['keyboard', 'Your keyboard', 'The layout, with a field to test it before you move on.'],
		['globe', 'Your place', 'Timezone detected — two providers have to agree — plus language and locale.'],
		['hard-drive', 'Which disk', "The whole disk is erased, and you're told so twice."],
		['circle-user', 'Who you are', 'Name, username, password, and a name for the computer.']
	];

	// Two accents through the same engine /theming/ runs live, derived at
	// build time: the gold ewe ships with, and the orange in the screenshots.
	const RAMPS = [
		[EWELLOW, 'ewe ships with'],
		['#ff9f0a', 'the screenshots wear']
	].map(([hex, who]) => ({ who, ramp: accentRamp(hex) }));
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
	<!-- The wallpaper the screenshots below were taken on — ewe, literally.
	     The photo and everything drawn on it wear Ewe Dark whatever the page
	     wears, the rule the lock screen follows, so the copy reads the same
	     over the picture in both schemes. -->
	<div class="meadow" data-scheme="ewe-dark" aria-hidden="true">
		<picture>
			<source srcset="/img/meadow.webp" type="image/webp" />
			<!-- the largest paint on the page: fetched first, decoded in step -->
			<img src="/img/meadow.jpg" alt="" width="2400" height="1350" fetchpriority="high" />
		</picture>
	</div>

	<div class="wrap hero-in" data-scheme="ewe-dark">
		<a class="news" href="/download/">
			<span class="dot"></span>ewe {VERSION} is out
			<Icon name="arrow-right" size={14} />
		</a>
		<h1 class="hero-title">A whole desktop, already <mark>decided</mark>.</h1>
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
		<div class="stage" data-scheme="ewe-dark">
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
	<ul class="track">
		{#each STACK as part}<li>{part}</li>{/each}
	</ul>
</section>

<!-- ── the four questions ───────────────────────────────────────────────── -->
<section class="wrap wide block">
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
<section class="wrap wide block">
	<div class="head">
		<p class="eyebrow">What you get</p>
		<h2>A desktop, not a starting point.</h2>
		<p>
			Greeter, bar, dock, launcher, control centre, software manager, settings and lock screen — all
			first-party, all matching. Nothing to assemble afterwards — and, since 0.14, plugins for what
			you would add.
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
		<a class="card act tile" href="/theming/">
			<span class="ico"><Icon name="palette" size={18} /></span>
			<h3>Your colours, everywhere</h3>
			<p>One accent, an imported scheme, or the wallpaper's own palette — the shell, GTK, Qt, icons, cursor and window borders follow, live.</p>
			{#each RAMPS as r}
				<div class="ramp" title="The accent ramp {r.who}">
					{#each RAMP_STEPS as s}<span style="background:{r.ramp[s]}"></span>{/each}
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
		<div class="card tile wide">
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
		<a class="card act tile wide" href="/docs/plugins/">
			<span class="ico"><Icon name="puzzle" size={18} /></span>
			<h3>Plugins</h3>
			<p>
				<code>ewe-plugin create</code> scaffolds a repo; a git URL installs one. Bar widgets, panels,
				services — and desktop widgets you drag where you like. You draw it; ewe places it, keeps
				its settings, and gives a crashing plugin three strikes, not your login.
			</p>
			<span class="go">How plugins work <Icon name="arrow-right" size={14} /></span>
		</a>
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
<section class="wrap wide block" id="decided">
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
<section class="wrap wide block">
	<div class="finale">
		<p class="eyebrow">Honestly</p>
		<h2>It's a beta.</h2>
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
		/* the photo runs up under the bar */
		margin-top: calc(-1 * var(--header-h));
		padding-block: calc(var(--header-h) + var(--space-xl)) 0;
		text-align: center;
		/* the ground the picture dissolves into: read here, in the page's own
		   scheme, so the Ewe Dark block below cannot change it */
		--fade-to: var(--surface-base);
	}

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
	}
	/* One wash, in Ewe Dark's own ground, so text holds over any part of the
	   photo; then the picture fades into the page below it. */
	.meadow::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--surface-base) 55%, transparent) 0%,
			color-mix(in srgb, var(--surface-base) 35%, transparent) 34%,
			color-mix(in srgb, var(--fade-to) 55%, transparent) 70%,
			color-mix(in srgb, var(--fade-to) 92%, transparent) 86%,
			var(--fade-to) 97%
		);
	}

	.hero-in {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/* the release note: a Tag */
	.news {
		display: inline-flex;
		align-items: center;
		gap: var(--space-s);
		height: var(--control-md);
		padding: 0 calc(var(--space-s) + var(--space-xs));
		border-radius: var(--fully-rounded);
		background: var(--glass-raised);
		border: var(--border-width-1) solid var(--glass-border);
		backdrop-filter: blur(var(--blur-glass));
		-webkit-backdrop-filter: blur(var(--blur-glass));
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-secondary);
		text-decoration: none;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	.news:hover {
		background: var(--glass-hover);
		color: var(--text-primary);
	}
	.dot {
		width: var(--space-s);
		height: var(--space-s);
		border-radius: var(--fully-rounded);
		background: var(--warning);
	}

	/* display-xl on a wide screen, down to display on a phone */
	.hero-title {
		margin-top: var(--space-lg);
		max-width: 16ch;
		font-size: clamp(var(--font-size-4xl), 9vw, var(--font-size-6xl));
		line-height: clamp(var(--line-height-4xl), 10.5vw, var(--line-height-6xl));
		font-weight: var(--font-weight-light);
		letter-spacing: var(--tracking-tightest);
	}
	/* one word marked, the way you would underline it on paper */
	mark {
		background: none;
		color: inherit;
		white-space: nowrap;
		box-shadow: inset 0 -0.11em 0 var(--accent);
	}

	.hero .lede {
		margin: var(--space-md) auto 0;
		max-width: 38rem;
		color: var(--text-primary);
	}
	.hero .btns {
		margin-top: var(--space-lg);
	}
	.sz {
		color: color-mix(in oklab, currentColor 70%, transparent);
		font-size: var(--font-size-md);
	}
	.facts {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		max-width: none;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-secondary);
	}
	.facts li {
		margin: 0;
	}
	.facts li + li::before {
		content: '·';
		margin-inline: var(--space-s);
		color: var(--text-muted);
	}

	/* ── the screenshot, on a glass stage over the photo ──────────────── */
	.stage {
		margin-top: var(--space-xl);
		padding: var(--space-s);
		border-radius: calc(var(--rounded) + var(--space-s));
		background: var(--glass-raised);
		border: var(--border-width-1) solid var(--glass-border);
		backdrop-filter: blur(var(--blur-glass));
		-webkit-backdrop-filter: blur(var(--blur-glass));
	}
	.stage :global(.shot picture) {
		border-color: var(--glass-border);
	}
	.figcap.center {
		text-align: center;
		margin-inline: auto;
	}

	/* ── built on ────────────────────────────────────────────────────── */
	.parts {
		margin-top: var(--space-xl);
	}
	.track {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-s) var(--space-lg);
		margin: var(--space-md) 0 0;
		padding-inline: var(--space-md);
		list-style: none;
		max-width: none;
	}
	.track li {
		margin: 0;
		white-space: nowrap;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
		font-weight: var(--font-weight-medium);
		color: var(--text-muted);
	}

	/* ── sections ─────────────────────────────────────────────────────── */
	.block {
		margin-top: calc(var(--space-xl) + var(--space-lg));
	}
	.head {
		max-width: 42rem;
		margin: 0 auto var(--space-lg);
		text-align: center;
	}
	.head p:not(.eyebrow) {
		margin: var(--space-md) auto 0;
	}
	/* the Card component's accent icon tile */
	.ico {
		display: inline-grid;
		place-items: center;
		width: var(--control-lg);
		height: var(--control-lg);
		margin-bottom: var(--space-md);
		border-radius: var(--primary);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.more {
		margin-top: var(--space-md);
		font-size: var(--font-size-md);
	}

	/* the four questions */
	.asks {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-s);
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
		top: var(--space-md);
		right: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
		color: var(--text-muted);
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
		grid-auto-flow: dense;
		gap: var(--space-s);
	}
	.tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-height: 13.5rem;
		padding: calc(var(--space-md) + var(--space-xs));
	}
	.tile.wide {
		grid-column: span 2;
	}
	/* the tile with a picture: text on the left, the launcher bleeding off
	   the bottom-right corner */
	.pic {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
		gap: var(--space-md);
		padding: 0 0 0 calc(var(--space-md) + var(--space-xs));
		overflow: hidden;
	}
	.pic .txt {
		padding-block: calc(var(--space-md) + var(--space-xs));
	}
	.pic picture {
		align-self: end;
		margin-top: var(--space-md);
	}
	.pic img {
		display: block;
		width: 100%;
		height: auto;
		border-top-left-radius: var(--rounded);
		border: var(--border-width-1) solid var(--border-subtle);
		border-width: var(--border-width-1) 0 0 var(--border-width-1);
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		margin-top: auto;
		padding-top: var(--space-md);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		font-weight: var(--font-weight-medium);
		color: var(--accent-text);
	}
	.ramp {
		display: flex;
		width: 100%;
		height: var(--space-md);
		margin-top: var(--space-s);
		border-radius: var(--slight);
		overflow: hidden;
		border: var(--border-width-1) solid var(--border-subtle);
	}
	.ramp + .ramp {
		margin-top: var(--space-xs);
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
			padding: calc(var(--space-md) + var(--space-xs)) calc(var(--space-md) + var(--space-xs)) 0 0;
		}
	}

	/* the comparison — the Table component */
	.scroll {
		overflow-x: auto;
		border-radius: var(--rounded);
	}
	.versus {
		width: 100%;
		min-width: 34rem;
		border-collapse: separate;
		border-spacing: 0;
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		overflow: hidden;
		text-align: left;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	.versus th,
	.versus td {
		padding: calc(var(--space-s) + var(--space-xs)) var(--space-md);
		vertical-align: top;
	}
	.versus tbody tr > * {
		border-top: var(--border-width-1) solid var(--border-subtle);
	}
	.versus thead th {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		background: var(--surface-base);
	}
	.versus thead img {
		vertical-align: -4px;
		margin-right: var(--space-xs);
	}
	.versus tbody th {
		width: 40%;
		font-weight: var(--font-weight-regular);
		color: var(--text-muted);
	}
	.versus td {
		color: var(--text-primary);
		/* the answer column: the side of the table ewe is on */
		background: var(--accent-subtle);
	}
	/* Icon is a block by default (it lives in flex rows); inline in a cell */
	.versus td :global(.icon) {
		display: inline-block;
		color: var(--accent-text);
		margin-right: var(--space-s);
		vertical-align: -2px;
	}

	/* the closing panel: the wallpapers' own glow, which is a slight one */
	.finale {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		padding: calc(2 * var(--space-lg)) var(--space-md);
		border-radius: var(--rounded);
		background: var(--surface-raised) var(--gradient-glow);
		border: var(--border-width-1) solid var(--border-subtle);
		text-align: center;
	}
	.finale::after {
		content: '';
		position: absolute;
		right: 4%;
		bottom: 8%;
		z-index: -1;
		width: min(11rem, 30%);
		aspect-ratio: 1;
		background: url('/ewe-logo.png') center / contain no-repeat;
		opacity: 0.07;
	}
	.finale p:not(.eyebrow) {
		margin: var(--space-md) auto 0;
		max-width: 38rem;
	}
	.finale .btns {
		margin-top: var(--space-lg);
	}
</style>
