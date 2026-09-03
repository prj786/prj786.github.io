<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO } from '$lib/nav.js';

	const verbs = [
		{ cmd: 'ewe-install', does: 'Guided install: archinstall handles the base system — disks, locale, users, bootloader — then this layers the ewe desktop onto the mounted target.', prints: 'progress lines' },
		{ cmd: '--layer-only', does: 'Skip archinstall and layer onto whatever is already mounted. For resuming an interrupted run, for scripted installs, and for putting ewe on an Arch system that already exists.', prints: 'progress lines' }
	];
</script>

<svelte:head>
	<title>ewe-install — ewe docs</title>
	<meta
		name="description"
		content="ewe-install is the command-line installer on the live ISO: the same primitives the graphical installer drives, for scripted, headless and rescue installs."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-install</code></h1>
<p class="lede">The installer, as a command.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The live ISO boots a graphical installer, which is the right first experience. But an installer
		you cannot script is an installer you cannot automate or repair from, so the same primitives are
		a command on the live session — and the graphical one drives exactly these.
	</p>
	<p>
		It is also how ewe reaches a machine that is already running Arch. <code>--layer-only</code> adds
		the repository, the package, the greeter stack and the per-user deploy to a system you already
		have, without touching your partitions.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-install [--layer-only]'} copyable={false} />
	<p class="muted">It re-runs itself with elevated privileges if you did not.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} head="Invocation" />
</section>

<section>
	<h2>What layering does</h2>
	<dl class="rows">
		<div class="row"><dt>The repository</dt><dd>Adds the signed <code>[ewe]</code> repository to the target and trusts its key.</dd></div>
		<div class="row"><dt>The package</dt><dd>Installs <code>ewe</code>, which pulls the desktop and the first-party applications.</dd></div>
		<div class="row"><dt>The greeter</dt><dd>Configures the login stack so the installed machine boots to a graphical greeter.</dd></div>
		<div class="row"><dt>Every account</dt><dd>Runs the per-user deploy for each human account created during the install.</dd></div>
		<div class="row"><dt>Updates</dt><dd>Brings the target fully up to date before first boot, so a fresh install owes no updates.</dd></div>
	</dl>
	<Callout type="warning" title="Using it inside archinstall">
		<p>
			When running the guided path, add your user account in archinstall's Authentication section
			and make it a superuser, leave the profile and extra packages empty, and answer <em>no</em>
			when it offers to chroot at the end — this script continues from there.
		</p>
	</Callout>
</section>

<section>
	<h2>Environment</h2>
	<dl class="rows">
		<div class="row"><dt><code>EWE_INSTALL_MNT</code></dt><dd>Where the target is mounted. Defaults to archinstall's own mount point.</dd></div>
	</dl>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/install/">Install ewe</a> — the graphical path, screen by screen.</li>
		<li><a href="{OS_REPO}/blob/main/docs/INSTALL.md">The full install guide</a> in the distro repository.</li>
		<li><a href="/docs/cli/ewe-setup/">ewe-setup</a> — the per-user half of the deploy.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--elevated);
		border-color: var(--stroke);
		padding: 0.15em 0.4em;
	}
</style>
