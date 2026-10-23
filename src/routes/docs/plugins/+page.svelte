<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Icon from '$lib/Icon.svelte';
	import { ADDONS, EXAMPLE } from '$lib/docs/addons.js';
</script>

<svelte:head>
	<title>Plugins — ewe docs</title>
	<meta
		name="description"
		content="What a plugin is in ewe, where plugins show up on the desktop, how to add, set up, turn off and remove one — from ewe or from a git URL — and what keeps a broken one from taking your desktop down."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>Plugins.</h1>
<p class="lede">
	A plugin adds something to the desktop itself — a tile, a button in the bar, a dock, a card on the
	desktop. Apps come from Komble; plugins change the desktop around them. ewe ships
	<a href="/docs/plugins/built-in/">{ADDONS.length} of its own</a>, and anyone can write more.
</p>

<section>
	<h2>Where they show up</h2>
	<dl class="rows">
		<div class="row"><dt><Icon name="layout-grid" size={16} />Quick settings</dt><dd>A tile you tap, or a page of its own — VPN, Mail, Cast.</dd></div>
		<div class="row"><dt><Icon name="layout-panel-top" size={16} />The bar</dt><dd>A button, or a small sign that appears only when there is news — an unread count, a shield while a VPN is on.</dd></div>
		<div class="row"><dt><Icon name="dock" size={16} />The dock</dt><dd>An icon next to your apps — Music, Places.</dd></div>
		<div class="row"><dt><Icon name="app-window" size={16} />The desktop</dt><dd>A card you can drag anywhere and pin above your windows — Slack's unread messages.</dd></div>
		<div class="row"><dt><Icon name="layers" size={16} />A panel</dt><dd>A window that opens on a key — Super+P for Passwords, Super+A for Shaun.</dd></div>
		<div class="row"><dt><Icon name="zap" size={16} />In the background</dt><dd>Some only watch and tell you — new mail, a phone that connected.</dd></div>
	</dl>
</section>

<section>
	<h2>Add, set up, remove</h2>
	<p>
		Everything is on one page: <strong>Komble → Plugins</strong>. Install, turn on and off, and
		<em>Options</em> for each plugin's settings and its <em>Show in bar</em> switch. The terminal does
		the same.
	</p>
	<Code
		code={`ewe-plugin list                          # what you have, on or off
ewe-plugin install ewe.insomnia          # one that ships with ewe
ewe-plugin add https://github.com/you/plugin --enable   # one from a git URL
ewe-plugin disable ewe.insomnia          # off, kept
ewe-plugin remove ewe.insomnia           # gone`}
	/>
	<p>
		Your list of plugins is part of <a href="/docs/one-file/">your settings</a>, so it follows you to
		a new machine: sign in, restore, and the same plugins come back.
	</p>
	<p><a href="/docs/cli/ewe-plugin/">Every ewe-plugin command →</a></p>
</section>

<section>
	<h2>Trust</h2>
	<p>
		Installing a plugin never runs it. Turning it on does — inside your desktop, with the same rights
		your desktop has. The plugins ewe ships are written and checked by ewe. For one from a git URL,
		read it first or pick authors you know; plugins are small, and reading one takes minutes.
	</p>
	<Callout title="A broken plugin can't lock you out">
		<p>
			If the desktop crashes three times in a minute, the next start comes up with no plugins and a
			note names the ones that were on. Turn the culprit off in Komble or with
			<code>ewe-plugin disable &lt;id&gt;</code>, and you're back.
		</p>
	</Callout>
</section>

<section>
	<h2>Make your own</h2>
	<p>
		A plugin is a folder with a small manifest and a QML file for each place it shows up. It draws
		with the desktop's own colors and parts, so it follows your accent and light or dark mode on its
		own.
	</p>
	<Code
		code={`ewe-plugin create acme.weather --name "Weather" --kinds quick-tile,bar-status
cd acme.weather && ewe-plugin dev .      # on, live, with its log`}
	/>
	<ul>
		<li><a href="/docs/plugins/writing/">Writing a plugin</a> — step by step, from the first file to publishing it.</li>
		<li><a href="/docs/plugins/api/">What a plugin may use</a> — the parts of the desktop a plugin can reach.</li>
		<li><a href={EXAMPLE}>ewe-plugin-example</a> — a small working plugin to copy from.</li>
	</ul>
</section>

<PageNav />
