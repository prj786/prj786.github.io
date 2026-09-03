<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>ewe.conf — the one file — ewe docs</title>
	<meta
		name="description"
		content="Everything an ewe machine knows about itself lives in one TOML document. Everything Hyprland and the shell read is generated from it, by one tool."
	/>
</svelte:head>

<p class="eyebrow">The one file</p>
<h1><code class="title">~/.config/ewe/ewe.conf</code></h1>
<p class="lede">
	Everything you can express about your desktop — the theme, the dock, animations, displays,
	wallpapers, window rules, pinned apps, what Komble installed — is one declarative document. Save
	it, restore the machine.
</p>

<section>
	<h2>How it fits together</h2>
	<Code
		code={`~/.config/ewe/ewe.conf          the document
ewe-conf apply                  turns it into the runtime files
~/.config/hypr/generated/*      build artifacts — never edit
~/.config/quickshell/*.json     build artifacts — never edit`}
		copyable={false}
	/>
</section>

<section>
	<h2>Three rules worth knowing</h2>
	<dl class="rows">
		<div class="row">
			<dt>One writer</dt>
			<dd>
				Only <a href="/docs/cli/ewe-conf/">ewe-conf</a> writes the file. The shell, the settings
				app, Komble and the installer all persist <em>through</em> it. You may edit it by hand — it
				round-trips — but a settings change rewrites it wholesale, so your comments do not survive.
			</dd>
		</div>
		<div class="row">
			<dt>Everything else is generated</dt>
			<dd>
				Editing a file under <code>generated/</code> works exactly until the next apply, then it is
				gone. Change the source instead.
			</dd>
		</div>
		<div class="row">
			<dt>Secrets never enter it</dt>
			<dd>
				This is the file that syncs. It may name an account; it never carries a token, password or
				private key. Those live in the system keyring behind a broker.
			</dd>
		</div>
	</dl>
	<Callout title="Why it is designed this way">
		<p>
			A desktop that scatters itself across a dozen files cannot be backed up, diffed or reasoned
			about. One document with one writer can be — which is what makes signing in on a new machine
			enough to get your old one back. <a href="/philosophy/">The reasoning →</a>
		</p>
	</Callout>
</section>

<section>
	<h2>Reading and writing it</h2>
	<Code
		code={`ewe-conf path                     # where it is
ewe-conf dump | jq .desktop.theme # the whole document, as JSON
ewe-conf get desktop.dock.enabled # one value
ewe-conf set desktop.dock.enabled false
ewe-conf apply                    # rebuild every runtime file`}
	/>
</section>

<section>
	<h2>Next</h2>
	<ul>
		<li><a href="/docs/one-file/schema/">Schema reference</a> — every section and key.</li>
		<li><a href="/docs/one-file/editing/">Editing by hand</a> — supported, with caveats.</li>
		<li><a href="/docs/account/settings-sync/">Settings sync</a> — the file on your other machines.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.52em;
		background: var(--elevated);
		border-color: var(--stroke);
		padding: 0.15em 0.4em;
	}
</style>
