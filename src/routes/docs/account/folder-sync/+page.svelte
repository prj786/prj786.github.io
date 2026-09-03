<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Folder sync — ewe docs</title>
	<meta
		name="description"
		content="Folder pairs in ewe-sync: which local folder maps to which folder in your account, two-way or one-way, on change or on a timer, and how conflicts are resolved."
	/>
</svelte:head>

<p class="eyebrow">Your account</p>
<h1>Folder sync.</h1>
<p class="lede">
	A folder pair is a local folder and a folder in your account. The definitions live in the one file,
	so they follow you to every machine; the local path can differ per machine.
</p>

<section>
	<h2>Mount, or sync?</h2>
	<dl class="rows">
		<div class="row"><dt>Mount</dt><dd><a href="/docs/cli/ewe-files/">ewe-files</a> shows the whole account at <code>~/Nextcloud</code> and stores nothing locally. Simple, and useless offline.</dd></div>
		<div class="row"><dt>Sync</dt><dd>Folder pairs keep real files on disk and reconcile both sides. Works offline, costs disk space, and can conflict.</dd></div>
	</dl>
</section>

<section>
	<h2>A pair</h2>
	<dl class="rows">
		<div class="row"><dt>Local and remote</dt><dd>A folder on this machine, and a folder in your account.</dd></div>
		<div class="row"><dt>Mode</dt><dd><strong>Two-way</strong> reconciles both sides. <strong>Upload only</strong> and <strong>download only</strong> copy in one direction and never delete.</dd></div>
		<div class="row"><dt>Trigger</dt><dd><strong>On change</strong> watches the folder and runs once a burst of writes has settled. <strong>Every N minutes</strong>, or <strong>at login</strong>, otherwise.</dd></div>
		<div class="row"><dt>Excludes</dt><dd>Patterns to skip — build directories and version-control folders are the usual ones.</dd></div>
	</dl>
	<p>
		Automatic runs honour the auto-sync switch; <em>Sync now</em> always runs. Runs are serialised,
		one pair at a time.
	</p>
</section>

<section>
	<h2>Conflicts</h2>
	<p>
		When both sides changed the same file, the sync engine keeps the server's version and writes
		yours beside it as a conflicted copy. The Folders pane lists them and offers two actions:
		<strong>keep mine</strong>, which renames your copy over the original so it uploads on the next
		run, and <strong>keep theirs</strong>, which deletes your copy. Only paths inside that pair's own
		folder are ever touched.
	</p>
</section>

<section>
	<h2>What runs underneath</h2>
	<p>
		Two-way pairs run <code>nextcloudcmd</code>, the headless twin of the Nextcloud desktop client —
		the same engine for renames, deletions and conflicts, without its window and tray. One-way modes
		copy with rclone. The app password is written to a private credentials file with mode 0600 inside
		a dedicated directory, so it is never on a command line.
	</p>
	<Callout type="warning" title="Current limits">
		<p>
			No selective sync inside a pair — use excludes — and no bandwidth limits.
		</p>
	</Callout>
</section>

<section>
	<h2>Where the definitions live</h2>
	<Code
		code={`# in ewe.conf, and therefore on every machine you own
[[sync.folders]]
remote = "/"
local = "~/Nextcloud"
mode = "two-way"       # two-way | upload | download
trigger = "change"     # change | interval | login
interval = 10          # minutes, when trigger = interval
exclude = [".git", "node_modules"]`}
		copyable={false}
	/>
	<p class="muted">
		Per-machine local paths, each pair's last run and its conflict list live in
		<code>~/.local/state/ewe/ewe-sync.json</code>, which does not sync.
	</p>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/cli/ewe-sync/">ewe-sync</a> — the app that owns folder sync.</li>
		<li><a href="/docs/cli/ewe-files/">ewe-files</a> — the mount, if you would rather not keep files.</li>
	</ul>
</section>

<PageNav />
