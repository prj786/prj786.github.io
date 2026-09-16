<script>
	import Code from '$lib/docs/Code.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'status', does: 'The provider in use and whether it can answer — and, if not, what to turn on.' },
		{ cmd: 'providers', does: 'Every provider and whether its CLI is installed: 1Password (op), Bitwarden (rbw), pass.' },
		{ cmd: 'match', args: '[--class C] [--title T] [--query Q] [--limit N] [--refresh]', does: 'The logins that fit the focused window, best first — titles, usernames, hosts; never a secret. Omit --class/--title to read the active window.' },
		{ cmd: 'fill', args: '<id> --pid PID [--what login|username|password] [--enter]', does: 'Type into the window that owns PID — username, Tab, password — through a virtual keyboard. Refuses if focus moved elsewhere.' },
		{ cmd: 'copy', args: '<id> --what username|password', does: 'To the clipboard, without it landing in the clipboard history.' },
		{ cmd: 'remember', args: '<id> [--class C]', does: 'Pin a login to an app so it sorts first next time.' },
		{ cmd: 'forget', args: '<id> [--class C]', does: 'Unpin it.' }
	];
</script>

<svelte:head>
	<title>ewe-pass — ewe docs</title>
	<meta
		name="description"
		content="ewe-pass fills logins from your password manager into any app on the desktop — 1Password, Bitwarden or pass — by typing them, since no manager can on Linux."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-pass</code></h1>
<p class="lede">Logins from your password manager, typed into any window. <kbd>Super</kbd>+<kbd>P</kbd> is the picker.</p>
<p>
	Since ewe 0.21 the picker is the bundled <code>ewe.passwords</code> plugin and this tool ships
	inside it: <code>~/.config/ewe/plugins/ewe.passwords/ewe-pass</code>, not on your PATH. The
	provider and <code>press_enter</code> are the plugin's settings (<code>ewe-plugin set
	ewe.passwords provider 1password</code>, or Komble → Plugins); <code>[passwords]</code> in
	<code>ewe.conf</code> is the fallback the tool reads when they are unset.
</p>

<section>
	<h2>Why it exists</h2>
	<p>
		No password manager fills into native apps on Linux — 1Password and Bitwarden only copy, and
		there is no desktop standard for it. So the shell does the filling: the picker asks this tool for
		the logins that match the focused window, and the chosen one is typed through a virtual keyboard
		after the picker has closed and focus is confirmed back on the app. Secrets go from the manager's
		CLI straight to the keyboard; nothing else sees them.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-pass <command> [arguments]'} copyable={false} />
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>Setup, once</h2>
	<p>
		<strong>1Password:</strong> in the app, Settings → Developer → <em>Integrate with 1Password CLI</em>,
		and Settings → Security → <em>Unlock using system authentication</em>. Unlock prompts are the app's
		own. <strong>Bitwarden:</strong> <code>rbw login</code>, then <code>rbw unlock</code>.
		<strong>pass:</strong> an existing <code>~/.password-store</code>. Pick the provider in
		<code>ewe.conf</code> <code>[passwords]</code>, or leave it on <code>auto</code>.
	</p>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--bg-2);
		border-color: var(--stroke-2);
		padding: 0.15em 0.4em;
	}
	section {
		margin-top: 0;
	}
</style>
