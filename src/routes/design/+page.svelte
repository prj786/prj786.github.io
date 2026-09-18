<script>
	import Icon from '$lib/Icon.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Downloads from '$lib/design/Downloads.svelte';
	import { TOPICS, DOCS, FLAT } from '$lib/design/nav.js';
	import DATA from '$lib/design/token-data.json';

	// Nielsen Norman Group's ten usability heuristics, which Ewe adopts as its
	// UX values, each with what it means on this desktop.
	const VALUES = [
		['Show what is happening', 'Every press answers inside 100 ms. A wait over 300 ms gets a spinner, a known length gets a progress bar, and the bar always carries network, sound, battery and pending updates.'],
		['Speak plainly', 'Wi-Fi, Restart, Updates — the words people use, app names before package names, sizes in GB and waits in minutes.'],
		['Leave a way out', 'Esc closes anything. Dialogs have Cancel or Later, clicking the scrim throws nothing away, and reversible things offer Undo in a toast instead of asking first.'],
		['One component per job', 'The volume slider in the bar popup is the slider in Settings. Super opens the launcher, the primary action sits on the right, labels are sentence case.'],
		['Prevent the error', 'Limits are stated before people type, a primary button stays disabled until its input is valid, and anything irreversible is confirmed by a dialog that names what will be lost.'],
		['Show, do not ask people to remember', 'Current values sit in select triggers and settings rows, shortcuts sit in tooltips and menus, and the launcher lists recent apps before anyone types.'],
		['Reward the keyboard', 'Everything works without a pointer. Shortcuts are always shown and never required, and roomier sizes exist for people who want them.'],
		['Keep it quiet', 'One primary action per view, flat surfaces, slight gradients, and rare options behind Advanced rather than on the page.'],
		['Explain a failure', 'What happened, then what to do: "Disk is full. Free up 2.1 GB and try again." Codes go in a details section, never the headline, and there is always a way to recover.'],
		['Help where the question is', 'Settings explain themselves in their description line, empty states say what to do next, icon-only controls have tooltips, and longer help works offline.']
	];

	const DOWNLOADS = [
		{ href: '/schemes/scheme-template.yaml', label: 'scheme-template.yaml', note: 'Start your own scheme' },
		{ href: '/schemes/ewe-dark.yaml', label: 'ewe-dark.yaml', note: 'Ewe Dark' },
		{ href: '/schemes/ewe-light.yaml', label: 'ewe-light.yaml', note: 'Ewe Light' },
		{ href: '/design/tokens.css', label: 'tokens.css', note: 'Every token, both schemes' },
		{ href: '/design/tokens.json', label: 'tokens.json', note: 'Every token, with usage notes' }
	];

	// the short review: what the system decides, in one line each
	const GLANCE = [
		['palette', 'One gold, one near-black', 'Ewellow #eeb407 on warm near-black, with a warm grey scale between. One black and one white; nothing goes past either.'],
		['swatch-book', 'Roles, not colors', 'A component asks for surface-raised or text-muted, never a hex. The scheme decides what the role is worth.'],
		['wand-sparkles', 'One generator', 'ewe-theme derives every token from a palette and an accent, then checks contrast. The shell, the apps, GTK, Qt, kitty and this site read its output.'],
		['accessibility', 'Readable in every mode', 'WCAG 2.2 AA in both schemes, and four modes — reduce motion, reduce transparency, increase contrast, text size — applied as remaps.']
	];

	const PRINCIPLES = [
		['sparkles', 'Modern, but restrained', 'Contemporary without chasing a trend: flat, solid color, no gloss, no glow, no heavy shadow.'],
		['move-horizontal', 'Symmetric', 'Padding and spacing mirror across opposite sides. 4px on the left is 4px on the right.'],
		['component', 'Consistent', 'One job, one component, used the same way everywhere it appears.'],
		['square-round-corner', 'Softly rounded', 'Gentle corners — 8px on controls, 10px on panels. Full pills are kept for badges and tags.'],
		['ruler', 'Two line weights', 'A border is 1px or 2px. There is no third.'],
		['book-open', 'Readable first, then compact', 'Legibility comes before density, and density never costs comfort.']
	];
</script>

<svelte:head>
	<title>Design system — ewe</title>
	<meta
		name="description"
		content="The Ewe design system: the principles, color roles and schemes, typography, shape, motion, accessibility, writing and the 85 component specs that decide how every surface of the ewe desktop looks."
	/>
</svelte:head>

<p class="eyebrow">Design system · version 3</p>
<h1>How ewe looks, written down.</h1>
<p class="lede">
	Ewe is a desktop with one look: the bar, the panels, the launcher, Settings, Komble and the
	installer are drawn from the same tokens and the same component specs. This section is that
	system — the decisions, the values behind them, and the vocabulary a plugin or an app can reach
	for. The website you are reading wears it too, so every swatch below is live.
</p>

<section>
	<h2>At a glance</h2>
	<p>
		Ewe’s design language is quiet on purpose: people come to a desktop to do something else, so the
		interface stays out of the way, reads easily, and behaves the same everywhere. Version
		{DATA.version} of the system is what ewe <code>{DATA.ewe}</code> ships.
	</p>
	<dl class="rows">
		{#each GLANCE as [icon, title, body]}
			<div class="row">
				<dt><Icon name={icon} size={16} />{title}</dt>
				<dd>{body}</dd>
			</div>
		{/each}
	</dl>
</section>

<section>
	<h2>The goal is calm</h2>
	<p>
		Ewe pairs a warm gold with a near-black ground, keeps layouts compact and readable, and avoids
		anything glossy or loud. Nothing on screen carries a color of its own: a surface asks for a
		<em>role</em> — the ground, a raised panel, secondary text, an outline — and the active
		<a href="/design/color/">scheme</a> decides what that role is worth. Swap the scheme, or just the
		accent, and everything moves together.
	</p>
	<div class="grid principles">
		{#each PRINCIPLES as [icon, title, body]}
			<div class="card">
				<h3><Icon name={icon} size={16} />{title}</h3>
				<p>{body}</p>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2>UX values</h2>
	<p>
		Ewe takes the Nielsen Norman Group's ten usability heuristics as its UX values, and every
		component and screen is checked against them. They are the reason a dialog always has a way
		out, and the reason an error names the next step instead of a code.
	</p>
	<ol class="values">
		{#each VALUES as [title, body], i}
			<li>
				<span class="n">{i + 1}</span>
				<div>
					<h3>{title}</h3>
					<p>{body}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<section>
	<h2>What is in it</h2>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="swatch-book" size={16} />Tokens</dt>
			<dd>
				Every value the interface may use, named: color roles, the type scale and its styles,
				spacing, radii, line weights, sizes, shadows, gradients, opacity. If something needs a
				value that has no token, the token is added here first.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="blocks" size={16} />85 components</dt>
			<dd>
				Each one a spec: anatomy, variants, sizes, states, behavior, accessibility and the exact
				tokens it uses. Implementations follow the spec — behavior from headless primitives,
				appearance from Ewe. <a href="/design/components/">See them all</a>.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="palette" size={16} />Two built-in schemes</dt>
			<dd>
				Ewe Dark, the default, and Ewe Light. Both are Base24 palettes run through the same
				generator as any scheme someone imports or writes.
			</dd>
		</div>
		<div class="row">
			<dt><Icon name="pen-line" size={16} />Guidelines</dt>
			<dd>
				How schemes derive their roles, how the old Fluent 2 names map onto Ewe ones, how to write
				the words, and the plan the repositories follow to implement it.
			</dd>
		</div>
	</dl>
</section>

<section>
	<h2>One generator, everything downstream</h2>
	<p>
		The tokens are not a document that code copies. <code>ewe-theme</code> derives them from the
		active scheme and accent and writes two files: the JSON the shell reads through its
		<code>Theme</code> singleton, and the CSS that Settings, Komble and ewe-sync read. From there the
		same values reach GTK, Qt, the icon theme, kitty and the Hyprland window border — and this site,
		whose <code>tokens.css</code> is built by that generator too. There is one place a color is
		decided, and it is never a component.
	</p>
	<p class="note">
		Since ewe 0.22.0-beta the whole desktop runs on this system; <a href="/design/changelog/">Versions</a>
		lists the few places where it differs from the documents on purpose.
		<a href="/theming/">Theming</a> shows the derivation running live, and
		<a href="/docs/cli/ewe-theme/">ewe-theme</a> is the command that does it.
	</p>
</section>

<section>
	<h2 id="documentation">Documentation</h2>
	<p>
		For people who build with the system or write their own scheme: the files, the names and the
		values, generated from the code that ships.
	</p>
	<div class="grid docs two">
		{#each DOCS as p}
			<a class="card act" href={p.href}>
				<h3>{p.label}</h3>
				<p>{p.blurb}</p>
			</a>
		{/each}
	</div>
	<Downloads items={DOWNLOADS} label="Design system files" />
</section>

<section>
	<h2 id="foundations">Foundations</h2>
	<p>The decisions themselves, one topic a page.</p>
	<div class="grid docs">
		{#each TOPICS as p}
			<a class="card act" href={p.href}>
				<h3>{p.label}</h3>
				<p>{p.blurb}</p>
			</a>
		{/each}
	</div>
</section>

<PageNav flat={FLAT} />

<style>
	.principles,
	.docs {
		margin-top: var(--space-md);
	}
	.two {
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}
	.values {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		max-width: 46rem;
	}
	.values li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		margin: 0;
	}
	.n {
		flex: none;
		display: grid;
		place-items: center;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		background: var(--accent-subtle);
		color: var(--accent-text);
		font-family: var(--font-mono);
		font-size: var(--font-size-s);
		font-variant-numeric: tabular-nums;
	}
	.values h3 {
		margin: 0 0 var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.values p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		margin: 0;
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	.card h3 :global(.icon) {
		color: var(--accent-text);
	}
</style>
