<script>
	import Command from '$lib/Command.svelte';
	import { OS_RELEASES, PKG_REPO, JOIN, VERIFY, WRITE } from '$lib/nav.js';
	import Installer from '$lib/Installer.svelte';
</script>

<svelte:head>
	<title>Download — ewe</title>
	<meta
		name="description"
		content="Download the ewe OS ISO, write it to a USB stick, and install in about ten minutes. Six screens, and everything technical decided for you."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Download</p>
	<h1>Get ewe on a stick.</h1>
	<p class="lede">
		One image, one USB stick, about ten minutes. The stick boots into the real desktop first, so you
		can try everything before a single byte is written to your disks.
	</p>

	<div class="btns hero-btns">
		<a class="btn primary" href={OS_RELEASES}>Latest release on GitHub</a>
		<a class="btn" href="#requirements">Requirements</a>
	</div>

	<section>
		<p class="eyebrow">Step 1</p>
		<h2>Download and join the image.</h2>
		<p>
			GitHub caps release files at 2 GiB, so the ISO arrives as <code>.part</code> files alongside a
			<code>SHA256SUMS</code>. Download all of them into one folder, then put the image back together
			and check it:
		</p>
		<Command value={JOIN} />
		<Command value={VERIFY} />
		<p class="note">
			Verifying is worth the two seconds — a half-downloaded image fails in confusing ways much later.
			You want to see <code>OK</code>.
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
			Boot the stick in <strong>UEFI</strong> mode; legacy BIOS works as a fallback. If your firmware
			has Secure Boot on, turn it off — the image isn't signed.
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
			Screen five, drawn to scale: what you chose, what ewe decided, and the only button in the flow
			that writes anything.
		</p>
	</section>

	<section>
		<p class="eyebrow">Step 5</p>
		<h2>First login.</h2>
		<p>
			The installed machine boots through the ewe splash into the greeter. Your first login opens a
			short welcome flow: one optional Google sign-in, an offer to
			<a href="/sync/">restore a backup</a> if your account has one from another ewe machine, and a
			sixty-second tour. It runs once, and never on the live stick.
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
			It's an alpha. The installer is verified end to end in a VM; real-hardware coverage is thin, so
			install on something you can afford to reinstall, and please
			<a href="/docs/#help">report what happens</a>.
		</p>
	</section>

	<section>
		<p class="eyebrow">Already running Arch?</p>
		<h2>Take the desktop without the distro.</h2>
		<p>
			ewe's desktop is a normal package in a normal pacman repository. Add <code>[ewe]</code> to your
			<code>/etc/pacman.conf</code> as described in
			<a href={PKG_REPO}>the repo's README</a>, then:
		</p>
		<Command value="sudo pacman -S ewe" />
		<p>
			That pulls the whole desktop and its dependencies onto your existing system. You'll get the DE,
			the software manager and the settings app — but not the installer's decisions, since your disk
			layout is already yours.
		</p>
	</section>
</div>

<style>
	.hero-btns {
		margin-top: 1.6rem;
	}
	section :global(.cmd + .cmd) {
		margin-top: 0.55rem;
	}
	section :global(.cmd) {
		margin-top: 0.85rem;
	}
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
</style>
