<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'status', does: 'The current state, any detail behind it, the sink in use, and every sink discovered so far.', prints: 'event, state, detail, sink, sinks' },
		{ cmd: 'scan', does: 'Look for displays on the network now, then answer with the refreshed status.', prints: 'the same status object' },
		{ cmd: 'start', args: 'with a sink id', does: 'Begin casting to that display. Restarts cleanly if a session is already running; reports an error if the display has gone out of range.', prints: 'a broadcast state change' },
		{ cmd: 'stop', does: 'End the session and restore the desktop.', prints: 'a broadcast state change' }
	];
</script>

<svelte:head>
	<title>ewe-castd — ewe docs</title>
	<meta
		name="description"
		content="ewe-castd is the headless casting daemon behind the Cast card: it captures through the desktop portal and speaks Miracast and Chromecast itself, so no foreign window ever opens."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-castd</code></h1>
<p class="lede">Casting, without a window.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		Casting on Linux usually means launching somebody else's application — a window in a toolkit this
		desktop does not use, controlled by killing the process. ewe does the protocols itself instead:
		this daemon captures through the desktop portal and speaks to the television directly, so the
		whole flow stays in the Control Center and no foreign window ever appears.
	</p>
	<p>
		It is a <strong>daemon</strong>, not a command with subcommands. It runs outside the shell on
		purpose: a reload or a crash of the desktop must never drop a presentation halfway through.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-castd'} copyable={false} />
	<p>
		Started on demand by the Cast card, never enabled at boot — no televisions, no daemon. It listens
		on a Unix socket at <code>$XDG_RUNTIME_DIR/ewe-cast.sock</code> and takes one JSON command per
		line, broadcasting a status object to every connected client whenever the state changes.
	</p>
</section>

<section>
	<h2>Socket commands</h2>
	<CommandTable rows={verbs} head="Command" />
	<Callout>
		<p>
			The Control Center sends exactly these. There is no separate command-line client — the socket
			is the interface, which is why the Cast card and any script see the same state.
		</p>
	</Callout>
</section>

<section>
	<h2>What it speaks</h2>
	<dl class="rows">
		<div class="row"><dt>Source</dt><dd>The desktop portal's screen capture, the same path any screen-sharing application uses.</dd></div>
		<div class="row"><dt>Miracast</dt><dd>Over Wi-Fi Direct, discovered through NetworkManager. The real-time path.</dd></div>
		<div class="row"><dt>Chromecast</dt><dd>Discovered on the local network. It carries a few seconds of latency, which is honest rather than hidden.</dd></div>
	</dl>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/features/">Features</a> — casting in context.</li>
		<li><a href="/docs/cli/ewe-share-picker/">ewe-share-picker</a> — the chooser that decides what is captured.</li>
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
