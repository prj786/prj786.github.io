<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe-share-picker — ewe docs</title>
	<meta
		name="description"
		content="ewe-share-picker is the screen-share chooser the desktop portal calls: the ewe shell draws it, with live previews of every monitor and window."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-share-picker</code></h1>
<p class="lede">The screen-share picker the portal calls.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		When an application asks to record or share your screen, the desktop portal has to ask you what
		to share. The stock chooser is a plain list of window titles that looks nothing like the rest of
		the desktop and shows you no picture of what you are about to reveal.
	</p>
	<p>
		This is the replacement. The portal runs it; it asks the running ewe shell to draw the picker —
		themed, with live previews of every monitor and window — and returns the one line the portal
		expects. You see what you are sharing before you share it.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-share-picker [--allow-token]'} copyable={false} />
	<Callout type="warning" title="Not for you to run">
		<p>
			This is invoked by <code>xdg-desktop-portal-hyprland</code>, which executes the path verbatim
			and reads one line from its output. Running it by hand does nothing useful; it is documented
			because it appears in the process list and in portal logs.
		</p>
	</Callout>
</section>

<section>
	<h2>How it behaves</h2>
	<dl class="rows">
		<div class="row"><dt>Input</dt><dd>The portal passes the window list in an environment variable, and <code>--allow-token</code> when restore tokens are permitted.</dd></div>
		<div class="row"><dt>Output</dt><dd>One line naming a screen, a window or a region — with a flag when a restore token may be issued. No line means you cancelled.</dd></div>
		<div class="row"><dt>If the shell is not running</dt><dd>It hands over to the stock Hyprland picker, so screen sharing never silently breaks.</dd></div>
	</dl>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/features/">Features</a> — casting and screen sharing in context.</li>
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
