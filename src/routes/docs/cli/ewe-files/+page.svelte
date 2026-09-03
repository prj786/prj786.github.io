<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'setup', args: '[--offline]', does: 'One time: write the rclone remote from the signed-in account, add the sidebar bookmark, and mount. Regenerating it later is harmless — the keyring stays the source of truth.', prints: 'progress lines' },
		{ cmd: 'mount', does: 'Mount if configured. Autostart calls this at login.', prints: 'progress lines' },
		{ cmd: 'unmount', does: 'Unmount the folder. The remote configuration is kept.', prints: 'progress lines' },
		{ cmd: 'forget', does: 'Remove the remote configuration — the companion to signing out.', prints: 'progress lines' },
		{ cmd: 'status', does: 'Whether the remote is configured and currently mounted.', prints: 'configured, mounted, path' }
	];
</script>

<svelte:head>
	<title>ewe-files — ewe docs</title>
	<meta
		name="description"
		content="ewe-files mounts your Nextcloud account at ~/Nextcloud over WebDAV, using the same app password the account broker already holds — no second login, no client daemon."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-files</code></h1>
<p class="lede">Your account, as a folder.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The account you sign in to is also where your files are. <code>ewe-files</code> mounts it at
		<code>~/Nextcloud</code> over WebDAV using the <em>same</em> app password the account broker
		already holds, so there is no second login and no background client to keep running. The file
		manager sees an ordinary folder, and a bookmark puts it in the sidebar.
	</p>
	<p>
		A mount shows the whole account and stores nothing locally. If you want particular folders kept
		on disk and synced both ways, that is <a href="/docs/account/folder-sync/">folder sync</a> in
		ewe-sync instead.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-files setup [--offline] | mount | unmount | forget | status'} copyable={false} />
	<p class="muted">With no command, <code>status</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Where its state lives</h2>
	<dl class="rows">
		<div class="row"><dt><code>~/.config/ewe/rclone-nextcloud.conf</code></dt><dd>The remote, mode 0600, with the app password obscured as rclone expects. Regenerated from the keyring by <code>setup</code> — your own <code>~/.config/rclone</code> is never touched.</dd></div>
		<div class="row"><dt><code>~/Nextcloud</code></dt><dd>The mount point. Override it with <code>EWE_FILES_MOUNT</code>.</dd></div>
		<div class="row"><dt><code>~/.config/gtk-3.0/bookmarks</code></dt><dd>Where the file manager sidebar entry is added.</dd></div>
	</dl>
	<Callout>
		<p>
			The credential comes from <a href="/docs/cli/ewe-cloud/">ewe-cloud</a>. Sign in there first;
			<code>setup</code> has nothing to write otherwise.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/nextcloud/">Nextcloud account</a> — signing in.</li>
		<li><a href="/docs/account/folder-sync/">Folder sync</a> — keeping folders on disk instead.</li>
		<li><a href="/docs/cli/ewe-drive/">ewe-drive</a> — the same idea for Google Drive.</li>
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
