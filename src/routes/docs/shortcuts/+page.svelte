<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { DE_REPO } from '$lib/nav.js';
</script>

<svelte:head>
	<title>Keyboard shortcuts — ewe docs</title>
	<meta
		name="description"
		content="The ewe keymap: launching, the Overview, window management, workspaces — and the keys that arrive with a plugin. Everything is on Super, so nothing collides with what applications use."
	/>
</svelte:head>

<p class="eyebrow">Reference</p>
<h1>The keys worth knowing.</h1>
<p class="lede">
	Everything the desktop owns is on <kbd>Super</kbd>, so it never collides with what an application
	wants. These are the ones you will use daily.
</p>

<section>
	<h2>Launching</h2>
	<div class="keys">
		<dl>
			<div><dt><kbd>Super</kbd></dt><dd>Tap: the Overview — every window spread out, your workspaces along the top</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Return</kbd></dt><dd>Terminal</dd></div>
			<div><dt><kbd>Super</kbd><kbd>D</kbd></dt><dd>Launcher — apps and files</dd></div>
			<div><dt><kbd>Super</kbd><kbd>E</kbd></dt><dd>File manager</dd></div>
			<div><dt><kbd>Super</kbd><kbd>B</kbd></dt><dd>Browser</dd></div>
			<div><dt><kbd>Super</kbd><kbd>,</kbd></dt><dd>Settings</dd></div>
			<div><dt><kbd>Super</kbd><kbd>N</kbd></dt><dd>Quick settings</dd></div>
			<div><dt><kbd>Super</kbd><kbd>C</kbd></dt><dd>Calendar</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Z</kbd></dt><dd>Minimize — the window waits in the dock as its picture; click it to bring it back</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>Z</kbd></dt><dd>Bring back the window minimized last</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>W</kbd></dt><dd>Arrange desktop widgets — drag, pin, lock, hide; Esc</dd></div>
		</dl>
	</div>
</section>

<section>
	<h2>From plugins</h2>
	<p>
		These keys exist only while their <a href="/docs/plugins/built-in/">plugin</a> is installed and on — the
		plugin's manifest declares them, and ewe generates the bind.
	</p>
	<div class="keys">
		<dl>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>C</kbd></dt><dd>Cast to TV — Cast</dd></div>
			<div><dt><kbd>Super</kbd><kbd>P</kbd></dt><dd>Fill a login from your password manager — Passwords</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>P</kbd></dt><dd>Quick Access to everything in your safe — Safe</dd></div>
			<div><dt><kbd>Super</kbd><kbd>A</kbd></dt><dd>Open Shaun, the companion — Shaun</dd></div>
			<div><dt><kbd>Print</kbd></dt><dd>Screenshot of the screen — Screenshot</dd></div>
			<div><dt><kbd>Shift</kbd><kbd>Print</kbd></dt><dd>Screenshot of a region</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Print</kbd></dt><dd>Screenshot of the focused window</dd></div>
		</dl>
	</div>
	<p class="muted">
		Clipboard history has no key of its own; it is the scissors in the bar. The old
		<kbd>Super</kbd>+<kbd>.</kbd> bind is gone.
	</p>
</section>

<section>
	<h2>Windows</h2>
	<div class="keys">
		<dl>
			<div><dt><kbd>Super</kbd><kbd>H J K L</kbd></dt><dd>Focus, or the arrow keys</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>H J K L</kbd></dt><dd>Move the window</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Ctrl</kbd><kbd>H J K L</kbd></dt><dd>Resize</dd></div>
			<div><dt><kbd>Super</kbd><kbd>G</kbd></dt><dd>Group or ungroup — tabs</dd></div>
			<div><dt><kbd>Super</kbd><kbd>[</kbd><kbd>]</kbd></dt><dd>Previous, next tab</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Q</kbd></dt><dd>Close</dd></div>
			<div><dt><kbd>Super</kbd><kbd>F</kbd></dt><dd>Fullscreen</dd></div>
			<div><dt><kbd>Super</kbd><kbd>V</kbd></dt><dd>Float</dd></div>
		</dl>
	</div>
</section>

<section>
	<h2>Workspaces</h2>
	<div class="keys">
		<dl>
			<div><dt><kbd>Super</kbd><kbd>1</kbd>–<kbd>8</kbd></dt><dd>Switch</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>1</kbd>–<kbd>8</kbd></dt><dd>Move the window there</dd></div>
			<div><dt><kbd>Super</kbd> + scroll</dt><dd>Cycle</dd></div>
			<div><dt>Three-finger swipe</dt><dd>Switch</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Ctrl</kbd><kbd>R</kbd></dt><dd>Reload the compositor configuration</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>R</kbd></dt><dd>Display recovery — every screen back on, even from a black screen</dd></div>
		</dl>
	</div>
	<p>
		With two or more displays, every display has its own workspaces 1, 2, 3 …, as on macOS, and
		these keys act on the display you are on. Settings → Displays → Workspaces → <em>Shared</em>
		makes it one set across all displays instead: switching one switches every display
		(<code>[desktop.workspaces] mode</code>).
	</p>
</section>

<section>
	<h2>Your own bindings</h2>
	<p>
		Launch bindings live in the one file and follow you to every machine: they are
		<code>[[desktop.keybinds]]</code> in <a href="/docs/one-file/schema/">the schema</a>, and you add
		them from a terminal, for example
		<code>ewe-conf set desktop.keybinds '[&#123;"combo": "SUPER + T", "exec": "kitty"&#125;]'</code>
		(the list replaces the old one). Settings → Shortcuts lists every key but does not change them
		yet. The Overview is a Hyprland global shortcut named <code>ewe:overview</code>, so you can bind
		it to anything in <code>user.lua</code>.
	</p>
	<p>
		<a href="{DE_REPO}/blob/main/dotfiles/hypr/SHORTCUTS.md">The complete keymap →</a>
	</p>
</section>

<PageNav />

<style>
	.keys {
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: var(--space-md);
		margin-top: var(--space-md);
		max-width: 52rem;
	}
	dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	dl > div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-md);
		min-height: var(--control-md);
	}
	dt {
		display: flex;
		align-items: baseline;
		gap: var(--space-xxs);
		flex: none;
		color: var(--text-secondary);
	}
	dd {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		text-align: right;
	}
</style>
