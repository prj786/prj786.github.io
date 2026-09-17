<script>
	import Command from '$lib/Command.svelte';
	import Installer from '$lib/Installer.svelte';
	import Icon from '$lib/Icon.svelte';
	import { PKG_REPO, VERIFY, WRITE } from '$lib/nav.js';
	import { VERSION, ISO_FILE, ISO_SIZE, ISO_URL, SUMS_URL, IA_DETAILS, RELEASE_URL, DOWNLOAD_URL, WHOLE_ISO_LIVE } from '$lib/release.js';
</script>

<svelte:head>
	<title>Download — ewe</title>
	<meta
		name="description"
		content="Download the ewe OS ISO as one file, write it to a USB stick, and install in about ten minutes. Six screens, and everything technical decided for you."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Download</p>
	<h1>Get ewe on a stick.</h1>
	<p class="lede">
		One image, one USB stick, about ten minutes. The stick boots into the real desktop first, so you
		can try everything before a single byte is written to your disks.
	</p>

	<!-- ── the one button ───────────────────────────────────────────────── -->
	<div class="getbox">
		<a class="btn primary big" href={DOWNLOAD_URL} download={WHOLE_ISO_LIVE || undefined}>
			<Icon name="download" size={18} />
			Download ewe {VERSION}
		</a>
		<div class="meta">
			<code>{ISO_FILE}</code>
			<span>{ISO_SIZE} · x86_64 · hybrid ISO</span>
		</div>
		{#if WHOLE_ISO_LIVE}
			<p class="hosted">
				Hosted whole on the <a href={IA_DETAILS}>Internet Archive</a> — one file, one click, no parts
				to join. <a href={SUMS_URL}>SHA256SUMS</a> · <a href={RELEASE_URL}>Release notes</a> ·
				<a href="#mirrors">Mirrors</a>
			</p>
		{:else}
			<p class="hosted">
				The button opens the GitHub release, where the image is in two <code>.part</code> files
				(GitHub caps a file at 2 GiB). <a href="#mirrors">Joining them</a> is one command. A
				one-file download arrives with the next image.
			</p>
		{/if}
	</div>

	<section>
		<p class="eyebrow">Step 1</p>
		<h2>Check it downloaded intact.</h2>
		<p>
			Put <code>SHA256SUMS</code> from the release next to the image and run:
		</p>
		<Command value={VERIFY} />
		<p class="note">
			Worth the two seconds — a half-downloaded image fails in confusing ways much later. You want to
			see <code>OK</code>.
		</p>
	</section>

	<section>
		<p class="eyebrow">Step 2</p>
		<h2>Write it to a USB stick.</h2>
		<p>It's a plain hybrid ISO, so any writer works — Ventoy, balenaEtcher, GNOME Disks, or:</p>
		<Command value={WRITE} />
		<p class="note">
			Replace <code>/dev/sdX</code> with the stick itself, not a partition — <code>lsblk</code> will
			show you which. This erases the stick.
		</p>
	</section>

	<section>
		<p class="eyebrow">Step 3</p>
		<h2>Boot it, and look around.</h2>
		<p>
			Boot in <strong>UEFI</strong> mode; legacy BIOS works as a fallback. If your firmware has Secure
			Boot on, turn it off — the image isn't signed.
		</p>
		<p>
			You land on the ewe desktop, running from the stick, with <strong>Install ewe</strong> first in
			the dock. Everything you see is the real system: open the control centre with
			<code>Super+N</code>, try Komble, change the accent. Nothing is written to your disks until you
			press the red Install button on the Summary screen.
		</p>
	</section>

	<section>
		<p class="eyebrow">Step 4</p>
		<h2>Six screens.</h2>
		<ol class="steps">
			<li><span class="n">1</span><div><h3>Welcome</h3><p>Your keyboard layout, with a field to test it.</p></div></li>
			<li><span class="n">2</span><div><h3>Time &amp; place</h3><p>Your timezone, detected — two providers have to agree, and you always see what was picked — plus language and locale.</p></div></li>
			<li><span class="n">3</span><div><h3>Disk</h3><p>Pick a disk. <strong>The whole disk is erased</strong>; you're warned here and again at the end.</p></div></li>
			<li><span class="n">4</span><div><h3>Your account</h3><p>Name, username, password, computer name.</p></div></li>
			<li><span class="n">5</span><div><h3>Summary</h3><p>Everything you chose, everything ewe decided, and the only Install button in the flow.</p></div></li>
			<li><span class="n">6</span><div><h3>Install</h3><p>Streamed progress, then reboot. Pull the stick when the screen goes dark.</p></div></li>
		</ol>
		<Installer />
		<p class="figcap">
			Screen five: what you chose, what ewe decided, and the only button in the flow that writes
			anything. First login then runs a short welcome flow — network, waiting updates, an optional
			<a href="/how/">restore from your Nextcloud</a>, and a sixty-second tour.
		</p>
	</section>

	<section id="decided">
		<p class="eyebrow">Decided by ewe</p>
		<h2>What you don't get asked.</h2>
		<p>
			These are the questions a normal Arch install makes you answer. ewe answers them, and shows you
			the answers on the summary screen before anything happens.
		</p>
		<dl class="rows">
			<div class="row"><dt>Filesystem</dt><dd>btrfs, with <code>@</code> and <code>@home</code> subvolumes and zstd compression.</dd></div>
			<div class="row"><dt>Bootloader</dt><dd>systemd-boot, splash only — no menu unless you hold a key.</dd></div>
			<div class="row"><dt>Hibernation</dt><dd>Set up automatically when there's a battery: a swapfile of RAM + 2 GB.</dd></div>
			<div class="row"><dt>Kernel</dt><dd>Stock Arch <code>linux</code>, plus the microcode for your CPU.</dd></div>
			<div class="row"><dt>Graphics</dt><dd>Drivers matched to whatever GPUs are found — Intel, AMD or NVIDIA.</dd></div>
			<div class="row"><dt>Sound, network, login</dt><dd>PipeWire, NetworkManager, greetd.</dd></div>
			<div class="row"><dt>Updates</dt><dd>The <code>[ewe]</code> repository, preconfigured. <code>pacman -Syu</code> rolls everything forward.</dd></div>
		</dl>
	</section>

	<section id="requirements">
		<p class="eyebrow">Requirements</p>
		<h2>What it needs.</h2>
		<ul>
			<li><strong>x86_64</strong> — no ARM image yet.</li>
			<li><strong>UEFI firmware</strong> preferred; BIOS boot is a supported fallback.</li>
			<li><strong>Secure Boot off</strong> — the ISO is unsigned.</li>
			<li><strong>A disk you can erase entirely.</strong> There is no dual-boot or manual partitioning path yet.</li>
			<li>A network connection during install, to fetch packages.</li>
		</ul>
		<p class="note">
			It's a beta. The installer is verified end to end in a VM; real-hardware coverage is thin, so
			install on something you can afford to reinstall, and please
			<a href="/docs/troubleshooting/">report what happens</a>.
		</p>
	</section>

	<section>
		<p class="eyebrow">Already running Arch?</p>
		<h2>Take the desktop without the distro.</h2>
		<p>
			ewe's desktop is a normal package in a normal pacman repository. Add <code>[ewe]</code> to your
			<code>/etc/pacman.conf</code> as described in <a href={PKG_REPO}>the repo's README</a>, then:
		</p>
		<Command value="sudo pacman -S ewe" />
		<p>
			That pulls the whole desktop and its dependencies onto your existing system — the DE, the
			software manager and the settings app, but not the installer's decisions, since your disk
			layout is already yours.
		</p>
	</section>

	<!-- ── the fallback, folded away ────────────────────────────────────── -->
	<section id="mirrors">
		<details>
			<summary><Icon name="hard-drive" size={16} /> Mirrors, and the split copy on GitHub</summary>
			<div class="det">
				<p>
					GitHub caps a release file at 2 GiB and the image is larger, so the copy on the
					<a href={RELEASE_URL}>GitHub release</a> is split into <code>.part</code> files. It's the
					same image — use it if the Archive is slow or unreachable. Download every part into one
					folder, then:
				</p>
				<Command value={`cat ${ISO_FILE}.*.part > ${ISO_FILE}`} />
				<Command value={VERIFY} />
				<p class="muted">
					<code>SHA256SUMS</code> on the GitHub release covers both the whole image and each part,
					so you can check the parts before joining them.
				</p>
			</div>
		</details>
	</section>
</div>

<style>
	/* ── the download box ────────────────────────────────────────────── */
	/* the box is the page's whole first act, so it owns the gap to Step 1 —
	   app.css's `section + section` rhythm can't see a div */
	.getbox + :global(section) {
		margin-top: var(--space-lg);
	}
	.getbox {
		margin-top: var(--space-md);
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-md) + var(--space-xs));
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-s);
		max-width: 44rem;
	}
	.big {
		height: var(--control-2xl);
		padding: 0 calc(var(--space-md) + var(--space-s));
		font-size: var(--font-size-lg);
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xs) var(--space-s);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-muted);
	}
	.hosted {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-muted);
		margin: 0;
	}

	section :global(.cmd + .cmd) {
		margin-top: var(--space-s);
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

	/* ── the folded fallback (the Accordion) ─────────────────────────── */
	details {
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		background: var(--surface-raised);
		max-width: 44rem;
	}
	summary {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		min-height: var(--control-xl);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		cursor: pointer;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		border-radius: var(--rounded);
	}
	summary:hover {
		background: var(--surface-hover);
	}
	summary :global(.icon) {
		color: var(--text-secondary);
	}
	.det {
		padding: 0 calc(var(--space-s) + var(--space-xs)) calc(var(--space-s) + var(--space-xs));
	}
	.det p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	.det :global(.cmd) {
		max-width: none;
	}
</style>
