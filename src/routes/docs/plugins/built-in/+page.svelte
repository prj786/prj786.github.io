<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Icon from '$lib/Icon.svelte';
	import { ADDONS, GROUPS, GITHUB } from '$lib/docs/addons.js';
</script>

<svelte:head>
	<title>Built-in plugins — ewe docs</title>
	<meta
		name="description"
		content="The sixteen plugins that ship with ewe — the dock, Shaun, Safe, music, Places, clipboard, screenshots, passwords, mail, Slack, phone, Cast to TV, VPN, SSH, Insomnia and the system monitor: what each does, how to use it, and how to get it."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Built-in plugins.</h1>
<p class="lede">
	ewe ships with {ADDONS.length} plugins. None of them is installed until you pick it, so your desktop
	has only what you asked for. They work offline, and you can add or remove any of them at any time.
</p>

<section>
	<h2>Getting one</h2>
	<dl class="rows">
		<div class="row"><dt><Icon name="hard-drive" size={16} />The installer</dt><dd>The <strong>Plugins</strong> step. Nothing is ticked; tick what you want.</dd></div>
		<div class="row"><dt><Icon name="circle-user" size={16} />First login</dt><dd>The welcome flow shows the same list once more.</dd></div>
		<div class="row"><dt><Icon name="package" size={16} />Komble → Plugins</dt><dd>One click. If a plugin needs a program — KDE Connect for Phone, Safe for the Safe plugin — Komble installs it too.</dd></div>
		<div class="row"><dt><Icon name="terminal" size={16} />A terminal</dt><dd><code>ewe-plugin install &lt;id&gt;</code></dd></div>
	</dl>
	<Code
		code={`ewe-plugin install ewe.dock     # add one
ewe-plugin remove ewe.dock      # take it away — updates leave it out`}
	/>
	<p>
		The desktop restarts for a second when a plugin comes or goes; your open apps stay as they are.
	</p>
</section>

{#each GROUPS as [key, title]}
	<section id={key}>
		<h2>{title}</h2>
		<div class="catalogue">
			{#each ADDONS.filter((a) => a.group === key) as a}
				<article class="card" id={a.id.replace('ewe.', '')}>
					<header>
						<span class="ico"><Icon name={a.icon} size={18} /></span>
						<h3>{a.name}</h3>
						<code class="id">{a.id}</code>
					</header>
					<p>{a.blurb}</p>
					<dl class="facts">
						<div><dt>Use</dt><dd>{a.use}</dd></div>
						{#if a.keys}<div><dt>Keys</dt><dd>{a.keys}</dd></div>{/if}
						{#if a.settings}<div><dt>Settings</dt><dd>{a.settings}</dd></div>{/if}
						{#if a.needs}<div><dt>Brings</dt><dd><code>{a.needs}</code>, installed with it</dd></div>{/if}
					</dl>
					<div class="links">
						{#if a.page}<a href={a.page}>More about {a.name} <Icon name="arrow-right" size={13} /></a>{/if}
						<a class="repo" href="{GITHUB}{a.repo}">{a.repo}</a>
					</div>
				</article>
			{/each}
		</div>
	</section>
{/each}

<section id="dock-settings">
	<h2>Settings</h2>
	<p>
		In Komble → Plugins, every plugin has an <strong>Options</strong> button. Changes apply at once;
		there is no Save. Plugins that put something in the bar also get a <strong>Show in bar</strong>
		switch there. The dock's auto-hide and icon size live here too — Settings → Layout has a button
		that opens them.
	</p>
	<Code
		code={`komble --options=ewe.dock           # the Dock's Options
ewe-plugin set ewe.dock autohide true`}
	/>
	<Callout title="No dock?">
		<p>
			A fresh ewe starts without one — the dock is a plugin like the others. Pick it in Komble →
			Plugins. Until then, <kbd>Super</kbd>+<kbd>D</kbd> opens the launcher and a tap of
			<kbd>Super</kbd> shows the Overview.
		</p>
	</Callout>
</section>

<section>
	<h2>After an update</h2>
	<p>
		Updates keep the plugins you have and refresh them when a newer version ships. A plugin you
		removed stays removed. If you came from an older ewe where some of these were built in, they
		were added for you once, so nothing you used went missing.
	</p>
	<p>
		Want to build your own? <a href="/docs/plugins/writing/">Writing a plugin</a> starts from the
		same API these sixteen use — their repositories are the worked examples.
	</p>
</section>

<PageNav />

<style>
	.catalogue {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-md);
	}
	.catalogue .card {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}
	header {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: auto auto;
		column-gap: var(--space-s);
		align-items: center;
	}
	.ico {
		grid-row: 1 / span 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--primary);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	header h3 {
		margin: 0;
	}
	.id {
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: none;
		border: 0;
		padding: 0;
	}
	.catalogue p {
		margin: 0;
	}
	.facts {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
	}
	.facts div {
		display: flex;
		gap: var(--space-s);
	}
	.facts dt {
		flex: none;
		width: 4.2rem;
		color: var(--text-muted);
	}
	.facts dd {
		margin: 0;
		color: var(--text-secondary);
	}
	.facts code {
		font-size: 0.9em;
	}
	.links {
		margin-top: auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-xs) var(--space-md);
		padding-top: var(--space-xs);
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
	}
	.links a {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xxs);
	}
	.repo {
		font-family: var(--font-mono);
		color: var(--text-muted);
		text-decoration: none;
	}
	.repo:hover {
		color: var(--accent-text);
	}
</style>
