<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { DE_REPO } from '$lib/nav.js';
</script>

<svelte:head>
	<title>Keyboard shortcuts — ewe docs</title>
	<meta
		name="description"
		content="The ewe keymap: launching, window management and workspaces. Everything is on Super, so nothing collides with what applications use."
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
			<div><dt><kbd>Super</kbd><kbd>Return</kbd></dt><dd>Terminal</dd></div>
			<div><dt><kbd>Super</kbd><kbd>D</kbd></dt><dd>Launcher — apps and files</dd></div>
			<div><dt><kbd>Super</kbd><kbd>E</kbd></dt><dd>File manager</dd></div>
			<div><dt><kbd>Super</kbd><kbd>B</kbd></dt><dd>Browser</dd></div>
			<div><dt><kbd>Super</kbd><kbd>,</kbd></dt><dd>Settings</dd></div>
			<div><dt><kbd>Super</kbd><kbd>N</kbd></dt><dd>Control centre</dd></div>
			<div><dt><kbd>Super</kbd><kbd>C</kbd></dt><dd>Calendar</dd></div>
			<div><dt><kbd>Super</kbd><kbd>Shift</kbd><kbd>C</kbd></dt><dd>Cast to TV</dd></div>
		</dl>
	</div>
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
		</dl>
	</div>
</section>

<section>
	<h2>Your own bindings</h2>
	<p>
		Launch bindings live in the one file and follow you to every machine — Settings → Shortcuts
		writes them, and they are <code>[[desktop.keybinds]]</code> in
		<a href="/docs/one-file/schema/">the schema</a>.
	</p>
	<p>
		<a href="{DE_REPO}/blob/main/dotfiles/hypr/SHORTCUTS.md">The complete keymap →</a>
	</p>
</section>

<PageNav />

<style>
	.keys {
		background: var(--elevated);
		border: 1px solid var(--stroke);
		border-radius: var(--r-in);
		padding: 1.1rem 1.2rem;
		margin-top: 1rem;
		max-width: 52rem;
	}
	dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	dl > div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
	dt {
		display: flex;
		gap: 0.2rem;
		flex: none;
		color: var(--fg2);
		font-size: 0.82rem;
	}
	dd {
		margin: 0;
		color: var(--fg2);
		font-size: 0.9rem;
		text-align: right;
	}
	kbd {
		font-family: var(--mono);
		font-size: 0.72rem;
		background: var(--bg);
		border: 1px solid var(--stroke);
		border-radius: 5px;
		padding: 0.1rem 0.34rem;
		color: var(--fg);
	}
</style>
