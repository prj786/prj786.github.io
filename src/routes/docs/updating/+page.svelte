<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Updating — ewe docs</title>
	<meta
		name="description"
		content="ewe is Arch, so it rolls: one command updates the system and the desktop together, and the desktop refreshes itself at your next login."
	/>
</svelte:head>

<p class="eyebrow">Get started</p>
<h1>It rolls.</h1>
<p class="lede">
	ewe is Arch, so there are no version upgrades to plan. The <code>[ewe]</code> repository is already
	in your package configuration, which means the system and the desktop move forward in the same
	command.
</p>

<section>
	<h2>Updating</h2>
	<Code code={'sudo pacman -Syu'} />
	<p>
		Or use Komble's Updates pane — the download glyph in the top bar tells you when something is
		waiting. Komble offers exactly one action there, a full system upgrade, because upgrading a
		single package against a newer database is the most common way to break an Arch install.
	</p>
	<p>
		When an update delivers a newer desktop payload, your session picks it up at the next login: the
		per-user deploy runs automatically. <a href="/docs/cli/ewe-setup/">How that works →</a>
	</p>
</section>

<section>
	<h2>After a desktop update</h2>
	<p>
		Log out and back in. Most of the desktop reloads live, but the session wrapper is what refreshes
		the payload, and a few changes — a new shell component, a new tool — only appear in a fresh
		session.
	</p>
	<Callout>
		<p>
			If the desktop looks stale after an update, running <code>ewe-setup</code> yourself and logging
			in again is the safe repair. It never touches your own state.
		</p>
	</Callout>
</section>

<section>
	<h2>Your settings are not part of the update</h2>
	<p>
		Package updates replace shipped files. Your configuration lives in
		<a href="/docs/one-file/">the one file</a> and is regenerated, never overwritten — which is also
		why restoring a machine is a separate, deliberate act.
	</p>
</section>

<PageNav />
