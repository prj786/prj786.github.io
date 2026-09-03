<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Editing ewe.conf by hand — ewe docs</title>
	<meta
		name="description"
		content="Editing ewe.conf in a text editor is supported. Two rules: apply afterwards, and expect the settings app to rewrite the file wholesale."
	/>
</svelte:head>

<p class="eyebrow">The one file</p>
<h1>Editing by hand.</h1>
<p class="lede">
	Entirely supported. The file round-trips, so what you write is read back as written — with two
	things to keep in mind.
</p>

<section>
	<h2>The loop</h2>
	<Code
		code={`$EDITOR "$(ewe-conf path)"   # edit
ewe-conf apply               # make it real`}
	/>
	<p>
		A syntax error fails the apply loudly and changes nothing: the generated files are only replaced
		by a successful run, so a typo cannot leave you with half a desktop.
	</p>
</section>

<section>
	<h2>Two caveats</h2>
	<dl class="rows">
		<div class="row">
			<dt>Comments do not survive</dt>
			<dd>
				Every settings change rewrites the file wholesale. The explanatory comments you see in it
				are regenerated on each write, so the file always explains itself — but yours are lost.
			</dd>
		</div>
		<div class="row">
			<dt>Generated files are not the source</dt>
			<dd>
				Editing something under <code>~/.config/hypr/generated/</code> works until the next apply.
				If a value is not in <code>ewe.conf</code>, it is derived from something that is.
			</dd>
		</div>
	</dl>
</section>

<section>
	<h2>When the file and reality disagree</h2>
	<p>
		After a repair, a manual change made outside the file, or on a machine set up before it existed,
		<code>import</code> rebuilds the document from what the machine is actually doing — including
		your installed packages, your SSH host definitions and your VPN profiles.
	</p>
	<Code code={'ewe-conf import'} />
	<Callout type="warning">
		<p>
			Import is a union, not a replacement: it adopts what it finds and leaves the rest alone.
			Removing something is <code>ewe-conf unset</code>, because a key you deleted locally may still
			belong to another machine that shares the file.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — what you can write.</li>
		<li><a href="/docs/cli/ewe-conf/">ewe-conf</a> — every verb.</li>
	</ul>
</section>

<PageNav />
