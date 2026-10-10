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
			in again is the safe repair. It never touches your own state. If the system side needs a
			re-run too — the greeter, the boot splash — it is
			<code>bash /usr/share/ewe/install.sh --no-packages</code>, as <em>your user</em>: it asks for
			<code>sudo</code> where it needs it and refuses to start under it.
		</p>
	</Callout>
</section>

<section>
	<h2>Updating to 0.25: the plugins that ship with ewe</h2>
	<p>
		0.25 moved ten features out of the shell into <a href="/docs/add-ons/">plugins</a> — the dock,
		music, Places, phone, mail, VPN, SSH, Cast to TV, Insomnia and the system monitor — beside the
		three that already were plugins (clipboard, screenshot, passwords). Your first login after the update
		runs a one-time migration that installs and enables the ones that replace what you had built
		in: the dock only if it was on, and never a plugin you had removed. The marker is local to
		the machine, so every machine you own migrates once, on its own.
	</p>
	<Code
		code={`ewe-plugin list                 # what came back, and what did not
ewe-plugin migrate              # the same step again — safe, it skips what it already considered
ewe-plugin install ewe.dock     # anything you want that the migration left out`}
	/>
	<p>
		Everything else is unchanged: old keybinds and scripts that call <code>cast</code>,
		<code>player</code>, <code>places</code> or <code>mail</code> still work once the plugin is in,
		and the greeter's files are refreshed by the package itself.
	</p>
</section>

<section>
	<h2>Your settings are not part of the update</h2>
	<p>
		Package updates replace shipped files. Your configuration lives in
		<a href="/docs/one-file/">the one file</a> and is regenerated, never overwritten — which is also
		why restoring a machine is a separate, deliberate act. Your plugins live outside the payload
		too: an update refreshes the copy of one that ships with ewe when its version changed, and never
		touches a plugin you installed from a git URL.
	</p>
</section>

<PageNav />
