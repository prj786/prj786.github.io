<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'ewe-setup', does: 'Deploy or refresh the desktop for the current user now: copy the packaged payload into your home tree and re-run the dotfile deploy.', prints: 'progress lines' },
		{ cmd: '--sync-if-newer', does: 'Refresh only when the installed payload is newer than your copy. Exits 0 if a refresh ran, 3 if you were already current. The session wrapper runs this at every login.', prints: 'progress lines' }
	];
</script>

<svelte:head>
	<title>ewe-setup — ewe docs</title>
	<meta
		name="description"
		content="ewe-setup deploys the ewe desktop for the current user from the packaged payload, refreshing the shipped files while leaving your own state alone."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-setup</code></h1>
<p class="lede">Deploy the desktop for your user.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The <code>ewe</code> package installs a read-only payload at <code>/usr/share/ewe</code>, but the
		desktop needs a writable tree: your generated Hyprland files, your theme, your wallpapers.
		<code>ewe-setup</code> is the bridge. It copies the payload into
		<code>~/.local/share/ewe</code>, overwriting only the files the payload ships, then links the
		configuration directories into place.
	</p>
	<p>
		Because it overwrites only shipped files, your own state survives every refresh. It runs
		automatically at login when a package update has delivered a newer payload, so upgrading the
		desktop is just <code>pacman -Syu</code> and logging back in.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-setup [--sync-if-newer]'} copyable={false} />
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} head="Invocation" />
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>/usr/share/ewe</code></dt><dd>The read-only payload from the package. Override with <code>EWE_PAYLOAD</code>.</dd></div>
		<div class="row"><dt><code>~/.local/share/ewe</code></dt><dd>Your writable copy, with all runtime state inside it. Override with <code>EWE_HOME</code>.</dd></div>
		<div class="row"><dt><code>~/.config/*</code></dt><dd>Symlinks into that tree, created by the deploy.</dd></div>
	</dl>
	<Callout type="warning" title="Never as root">
		<p>
			Everything it does is per-user, and it refuses to run as root. System-level setup — the
			greeter, the boot splash, hibernation — is a separate step performed by the installer.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/updating/">Updating</a> — how a new payload reaches you.</li>
		<li><a href="/docs/cli/ewe-install/">ewe-install</a> — putting ewe on a machine in the first place.</li>
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
