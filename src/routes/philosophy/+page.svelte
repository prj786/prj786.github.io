<svelte:head>
	<title>Philosophy — ewe</title>
	<meta
		name="description"
		content="In Linux everything is a file; in ewe the machine is one file. Why a single declarative config beats a dotfiles repo, and why an OS that decides for you is the better configuration."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Philosophy</p>
	<h1>The machine is one file.</h1>
	<p class="lede">
		In Linux, everything is a file. In ewe, <strong>the machine</strong> is a file. Every piece of
		configuration you can express lives in one declarative document —
		<code>~/.config/ewe/ewe.conf</code>. Settings apps edit it, one tool applies it, everything else is
		generated from it. That's why ewe had to become a whole operating system: you can't hand someone
		their machine back if you only ever owned the desktop.
	</p>

	<section>
		<p class="eyebrow">The problem</p>
		<h2>Config drift is an architecture bug.</h2>
		<p>
			A desktop's settings normally scatter across a dozen files in a dozen formats, kept consistent
			by care rather than by design. ewe had that too: roughly fourteen files, and
			<em>two</em> separate generators — the in-shell settings panel and the settings app — expected to
			write byte-identical output forever.
		</p>
		<p>
			That contract holds until it doesn't. Backup means gathering files. Install writes them
			imperatively. The restore list lives somewhere else again. One file with one writer deletes the
			entire class of problem, and makes backup, sync and install <strong>the same operation</strong>:
			produce the file, apply the file.
		</p>
	</section>

	<section>
		<p class="eyebrow">The rules</p>
		<h2>Five constraints, no exceptions.</h2>
		<dl class="rows">
			<div class="row">
				<dt>One canonical file</dt>
				<dd>
					<code>~/.config/ewe/ewe.conf</code>, in TOML. Human-readable, diffable, with comment
					headers regenerated on write.
				</dd>
			</div>
			<div class="row">
				<dt>One writer</dt>
				<dd>
					The <code>ewe-conf</code> CLI. Not the shell, not the settings app, not the installer, not
					the software manager — they all call it.
				</dd>
			</div>
			<div class="row">
				<dt>Everything else is generated</dt>
				<dd>
					The runtime files Hyprland and the shell actually read are build artifacts of
					<code>ewe-conf apply</code>. Hand-edits survive exactly until the next apply.
				</dd>
			</div>
			<div class="row">
				<dt>Secrets never enter the file</dt>
				<dd>
					The file is the thing that syncs, so it may name an account — never a credential. Tokens
					live in the system keyring, behind a broker.
				</dd>
			</div>
			<div class="row">
				<dt>Live-apply stays</dt>
				<dd>
					Declarative doesn't mean "reboot to see it". UIs still apply changes instantly, then
					persist by writing <em>through</em> <code>ewe-conf</code>.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<p class="eyebrow">Why this is the better configuration</p>
		<h2>What one file buys you.</h2>
		<div class="grid">
			<div class="card">
				<h3>Backup is a copy</h3>
				<p>No collection step, no manifest of what to gather. The backup is the file.</p>
			</div>
			<div class="card">
				<h3>Sync is a file move</h3>
				<p>One document up, one document down. Not a bundle format with its own bugs.</p>
			</div>
			<div class="card">
				<h3>Conflicts are diffs</h3>
				<p>Two machines disagree? Read the diff. The loser is kept beside it as a backup.</p>
			</div>
			<div class="card">
				<h3>Install is apply</h3>
				<p>A fresh machine isn't configured imperatively — it's the file, applied.</p>
			</div>
			<div class="card">
				<h3>Honest history</h3>
				<p>Stable key ordering and atomic writes, so a <code>git diff</code> shows what changed.</p>
			</div>
			<div class="card">
				<h3>No drift by construction</h3>
				<p>Two UIs can't disagree about a format neither of them writes.</p>
			</div>
		</div>
	</section>

	<section>
		<p class="eyebrow">The other half</p>
		<h2>Decisions are a feature.</h2>
		<p>
			A configuration file only helps with what you were going to configure. The bigger cost of a
			do-it-yourself system is the hundred questions you have to answer before you've done anything —
			filesystem, subvolume layout, bootloader, microcode, swap, drivers, audio stack, login manager.
			Most people answer them once, badly, and never revisit them.
		</p>
		<p>
			So ewe answers them. The installer asks what is genuinely personal — your keyboard, your place,
			your disk, your name — and decides the rest: btrfs with proper subvolumes, systemd-boot,
			hibernation sized to your RAM, drivers matched to the hardware it found.
			<strong>Every decision is shown to you on the summary screen</strong> before anything is written.
			An opinion you can read is not a lock-in; it's a default with its work shown.
		</p>
		<div class="btns" style="margin-top:1.1rem">
			<a class="btn" href="/download/#decided">What ewe decides →</a>
		</div>
	</section>

	<section>
		<p class="eyebrow">Compared with</p>
		<h2>Where it sits.</h2>
		<dl class="rows">
			<div class="row">
				<dt>A dotfiles repo</dt>
				<dd>
					Powerful, and entirely yours to maintain: your files, your bootstrap script, your bugs. ewe
					gives you the same reproducibility as a product feature — the settings UI is the editor,
					and restore is a menu item rather than a bootstrap you wrote at 2am.
				</dd>
			</div>
			<div class="row">
				<dt>A fully declarative distro</dt>
				<dd>
					Whole-system declarative setups (NixOS and friends) are stricter and go further, at the
					cost of a new language and a new packaging world. ewe stays ordinary Arch — pacman, the
					AUR, normal packages, one rolling repository — and makes the <em>machine you interact
					with</em> declarative rather than the whole build graph.
				</dd>
			</div>
			<div class="row">
				<dt>A stock desktop</dt>
				<dd>
					GNOME or KDE hide settings in dconf or scattered rc files: fine to use, awkward to move.
					ewe's state is one text file you can read, diff, version and carry.
				</dd>
			</div>
			<div class="row">
				<dt>The Arch wiki path</dt>
				<dd>
					Installing Arch by hand teaches you a great deal and costs you an afternoon, every time.
					ewe is that afternoon's output, made repeatable — and it stays plain Arch underneath, so
					none of what the wiki taught you stops being true.
				</dd>
			</div>
		</dl>
	</section>

	<section>
		<p class="eyebrow">Taste</p>
		<h2>Opinionated on purpose.</h2>
		<p>
			An opinionated system is only worth it if the opinions are good ones. There is
			<strong>no light mode</strong>, by decision — one look, done properly, beats two done
			half-heartedly. ewe picks traditional GTK
			apps over half-ported Qt or libadwaita islands, so file manager, archive tool, image and document
			viewers, player and terminal all look like they belong together and stay borderless under
			Hyprland. One accent colour drives the shell, GTK, Qt strays, icons and cursor — and applies
			live. Defaults are set once, in one <code>mimeapps.list</code>, not rediscovered per app.
		</p>
		<p class="note">
			Every one of those decisions is a default, not a lock. It's GPL-2.0 software on ordinary Arch:
			swap any app, remove any package, edit any generated file, or fork the whole thing.
		</p>
	</section>

	<section>
		<p class="eyebrow">Where it's going</p>
		<h2>1.0 is called “Dolly”.</h2>
		<p>
			After the sheep that proved you can rebuild the whole animal from a single cell. That is the
			entire roadmap in one word: the one file, synced, and a machine that comes back from it. The
			remaining gates are honest ones — installs proven on real hardware, and the restore demo run
			end to end on a machine that has never seen your account.
		</p>
		<div class="btns" style="margin-top:1.1rem">
			<a class="btn" href="/sync/">How sync works →</a>
			<a class="btn" href="/download/">Try the alpha →</a>
		</div>
	</section>
</div>
