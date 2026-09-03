<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'setup', does: 'One time: request the Drive scope, write the rclone remote, add the sidebar bookmark, and mount.', prints: 'progress lines' },
		{ cmd: 'mount', does: 'Mount if configured. Autostart calls this at login.', prints: 'progress lines' },
		{ cmd: 'unmount', does: 'Unmount the folder.', prints: 'progress lines' },
		{ cmd: 'status', does: 'Whether the remote is configured and currently mounted.', prints: 'configured, mounted' }
	];
</script>

<svelte:head>
	<title>ewe-drive — ewe docs</title>
	<meta
		name="description"
		content="ewe-drive mounts Google Drive at ~/Google Drive using the same identity the ewe-auth broker holds — one consent, no second sign-in system."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-drive</code></h1>
<p class="lede">Google Drive as a folder.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		If you have configured the optional <a href="/docs/cli/ewe-auth/">Google client</a>, this extends
		that one identity to files: rclone mounts Drive at <code>~/Google Drive</code> using the refresh
		token already in the keyring and the same OAuth client. No second consent system, and none of
		the account frameworks a desktop environment usually drags in. The file manager sees a plain
		folder; files shared with you appear inside it.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-drive setup | mount | unmount | status'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/rclone-drive.conf</code></dt><dd>Its own rclone configuration file, so an existing <code>~/.config/rclone</code> of yours is never touched.</dd></div>
		<div class="row"><dt><code>~/Google Drive</code></dt><dd>The mount point.</dd></div>
		<div class="row"><dt><code>~/.config/gtk-3.0/bookmarks</code></dt><dd>Where the sidebar entry is added.</dd></div>
	</dl>
	<Callout>
		<p>
			<code>setup</code> asks the broker for a consent that includes the Drive scope, so running it
			re-opens the browser once. The credential itself stays in the keyring.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/cli/ewe-auth/">ewe-auth</a> — the identity this uses.</li>
		<li><a href="/docs/cli/ewe-files/">ewe-files</a> — the same idea for your Nextcloud account.</li>
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
