<script>
	import Icon from '$lib/Icon.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import { FLAT } from '$lib/design/nav.js';
	import DATA from '$lib/design/token-data.json';

	const find = (name) => DATA.groups.flatMap((g) => g.tokens).find((t) => t.name === name);
	const onStatus = find('on-status');
	const barLg = find('bar-height-lg');
	const barMd = find('bar-height');
	const field = find('field-border-width');

	// Version 3, as design/system/guidelines/50-changelog.md lists it
	const V3 = [
		['Components', 'Fifteen new: Glass, Toast, Overview, Launcher panel, Places, Authentication prompt, Bluetooth pairing, Share picker, Wi-Fi picker, Agenda, Welcome, Desktop widgets, Screensaver, Accessibility modes and Look presets.'],
		['Tokens', 'focus-width (1px) for every focus ring, 2px under Increase contrast. The glass-* roles, blur-glass and the opacity-* tokens.'],
		['Bar and dock', 'They follow the shipped shell layout. The bar’s Quick settings button holds the status indicators in a fixed order; the dock has launchers and workspace groups.'],
		['Glass', 'Translucency is specified for the bar, the dock and the lock card. The Glass preset is 80% (it was 72%).'],
		['Side navigation', 'The selected item is an accent-subtle fill, with no edge bar.'],
		['Badge', 'Labels are centered on cap height, so they sit right in every browser and at fractional scales.'],
		['Look presets', 'corner is none, small, medium or large, medium by default; the old round becomes large. stroke defaults to thin.'],
		['Schemes', 'Scheme files are Base24 YAML with ewe keys (slug, variant, accent, semantic, overrides, builtin). They come in through ewe-theme scheme import or the Import button in Settings; there is no scheme editor screen. The Sheet example is now the Import scheme sheet.'],
		['Accessibility modes', 'Reduce motion, reduce transparency, increase contrast and text size, stored under [desktop.accessibility].'],
		['Motion', 'A fixed table: fast 150, base 200, slow 250 and dim 1500 ms. No overshoot.'],
		['Guides', 'Writing (voice, word list, formats, Georgian), Implementation (work plan, token-to-QML map, file-to-card map, settings keys) and the changelog itself.']
	];

	const V2 = [
		['Foundations', 'The palette built on ewellow (#eeb407) and near-black. Geist and Geist Mono with a Georgian fallback. The type scale and weights; spacing, radius, border, size, shadow and gradient tokens. The Ewe look — 8px and 10px radii, 28px controls, 1px outlines — the 1px focus ring, and the UX values based on Nielsen’s heuristics.'],
		['Color', 'Ewe Dark and Ewe Light as built-in schemes, the user scheme model, role derivation and its contrast guarantees.'],
		['Components', 'The first 70, from Button to Wallpaper picker.'],
		['Migration', 'The map from the Fluent 2 token names ewe used before.']
	];
</script>

<svelte:head>
	<title>Versions — Ewe design system</title>
	<meta
		name="description"
		content="The Ewe design system's versions: what version 3 changed, how versions are raised, and how ewe 0.22.0-beta implements version 3, including the owner's deliberate differences."
	/>
</svelte:head>

<p class="eyebrow">Design system · documentation</p>
<h1>Versions</h1>
<p class="lede">
	The system is on version {DATA.version}. ewe <code>{DATA.ewe}</code> implements it, with a few
	deliberate differences listed below.
</p>

<section>
	<h2 id="versioning">How versions work</h2>
	<p>
		The version is the <code>version</code> field in <code>tokens.json</code>. Each repository says
		which version it follows, in the header of its <code>tokens.css</code>, so it’s always clear what
		still has to be done.
	</p>
	<ul>
		<li>The version goes up when a token is added, renamed, removed or changes value, or when a component’s anatomy, states or behavior change.</li>
		<li>Wording, examples and preview-only changes don’t raise it.</li>
		<li>Every version gets an entry: what changed, and what an implementation has to do about it.</li>
		<li>Renamed or removed tokens stay in the migration table until no repository uses them.</li>
	</ul>
</section>

<section>
	<h2 id="v3">Version 3</h2>
	<dl class="rows">
		{#each V3 as [what, body]}
			<div class="row"><dt>{what}</dt><dd>{body}</dd></div>
		{/each}
	</dl>
	<p class="muted">
		The design system’s changelog still ends with “nothing has been implemented yet”. That was true
		when it was written; ewe 0.22.0-beta implements it, as below.
	</p>
</section>

<section>
	<h2 id="ewe-0-22">How ewe implements it</h2>
	<p>
		ewe 0.22.0-beta is the release that moved the whole desktop onto version 3: the generator, the
		shell, the greeter, Hyprland and the bundled plugins, with Settings, Komble and ewe-sync on the
		same <code>tokens.css</code> and <code>components.css</code>. The Fluent names
		are gone everywhere, <code>Sheen.qml</code> and the overshooting curves are deleted, and the only
		raw colors left are in the token generator. Where ewe differs from the documents, it does so on
		purpose, by the owner’s decision, and the shipped code is what counts.
	</p>

	<ol class="diffs">
		<li>
			<span class="ic"><Icon name="contrast" size={16} /></span>
			<div>
				<h3>One black and one white</h3>
				<p>
					Nothing is darker than <code>black</code> or lighter than <code>neutral-0</code>. So in Ewe
					Light, <code>on-status</code> is <code>{onStatus.light}</code> (<code>neutral-0</code>), not
					the <code>{onStatus.spec?.split(' / ')[1] ?? '#ffffff'}</code> the token file writes, and
					dark shadows are <code>black</code> (<code>#020202</code>), not <code>#000000</code>. The same rule clamps an imported
					<code>#000000</code> or <code>#ffffff</code>.
				</p>
			</div>
		</li>
		<li>
			<span class="ic"><Icon name="panel-bottom" size={16} /></span>
			<div>
				<h3>The bar follows its icons</h3>
				<p>
					<code>[desktop.bar] icon_size</code> is small, normal or large, and the bar is its icons’
					module plus <code>space-s</code> above and below: 44, {parseInt(barMd.dark)} or
					{parseInt(barLg.dark)} px. The v3 documents had two bar sizes, 48 and 64;
					<code>bar-height-lg</code> is {barLg.dark} here, not {barLg.spec}. An old
					<code>size = large</code> still reads as large, and text size 130% moves the icons one
					size up.
				</p>
			</div>
		</li>
		<li>
			<span class="ic"><Icon name="bell" size={16} /></span>
			<div>
				<h3>No Toast shortcut</h3>
				<p>
					A toast’s action is a button, and nothing else. There is no keyboard shortcut for it, and
					the Toast card no longer names one.
				</p>
			</div>
		</li>
		<li>
			<span class="ic"><Icon name="square-round-corner" size={16} /></span>
			<div>
				<h3>A new token: field-border-width</h3>
				<p>
					Fields, checkboxes and switches always keep an outline, even at the none stroke preset, so
					they get a width of their own: {field.dark} by default, following thick up, and 2px under
					Increase contrast. It is <code>--field-border-width</code> in CSS and
					<code>Theme.fieldBorderWidth</code> in QML, and it isn’t in <code>tokens.json</code> yet.
				</p>
			</div>
		</li>
		<li>
			<span class="ic"><Icon name="type" size={16} /></span>
			<div>
				<h3>Text size grows the controls</h3>
				<p>
					At 115% and 130% the <code>control-*</code> heights scale with the type, rounded to whole
					pixels, so buttons, fields, rows and tabs grow to fit instead of clipping. Icons, spacing,
					radii and panels stay put, and the dock keeps its cells.
				</p>
			</div>
		</li>
		<li>
			<span class="ic"><Icon name="puzzle" size={16} /></span>
			<div>
				<h3>Plugin API 2</h3>
				<p>
					Shell plugins see <code>Theme</code> under the Ewe names only, so the plugin API moved to
					version 2 and the bundled plugins to 1.1.0. A plugin that still says
					<code>"apiVersion": 1</code> is refused at install.
					<a href="/docs/plugins/api/#api-1-to-2">Moving a plugin from API 1 to API 2</a> has the
					rename table.
				</p>
			</div>
		</li>
	</ol>

	<Callout title="Derived colors">
		<p>
			Most of the other differences you’ll see on the <a href="/design/tokens/">token reference</a> are
			a digit or two in a hex value. The generator derives every role in OKLCH from the palette and
			the accent instead of copying the table, and the table was written by hand.
		</p>
	</Callout>
</section>

<section>
	<h2 id="v2">Version 2 and earlier</h2>
	<dl class="rows">
		{#each V2 as [what, body]}
			<div class="row"><dt>{what}</dt><dd>{body}</dd></div>
		{/each}
	</dl>
</section>

<PageNav flat={FLAT} />

<style>
	.rows {
		margin-top: var(--space-md);
	}
	.diffs {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		max-width: 46rem;
	}
	.diffs li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		margin: 0;
	}
	.ic {
		flex: none;
		display: grid;
		place-items: center;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.diffs h3 {
		margin: 0 0 var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.diffs p {
		margin: 0;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
</style>
