<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const SPACE = [
		['xxs', 2, 'Between a glyph and its number'],
		['xs', 4, 'Inside a control; between bar modules'],
		['s', 8, 'Inside a panel; between related controls'],
		['md', 16, 'Between groups'],
		['lg', 32, 'Between sections'],
		['xl', 64, 'Around a page of prose']
	];

	const RADII = [
		['slight', 4, 'A chip, a small tile, a code span'],
		['secondary', 6, 'A row inside a list or a menu'],
		['primary', 8, 'Controls: buttons, fields, switches' + ' — and bar modules'],
		['rounded', 10, 'Panels, popups, cards, dialogs'],
		['fully-rounded', 9999, 'Badges, tags, switch tracks, round media buttons']
	];

	const CONTROLS = [
		['control-sm', 24, 'A dense row, a tag'],
		['control-md', 28, 'The default control and list row'],
		['control-lg', 32, 'A bar module, a roomier button'],
		['control-xl', 40, 'The launcher and the installer'],
		['control-2xl', 48, 'A large field in the installer']
	];

	// The bar is its icons plus space-s above and below.
	const BAR = [
		['small', '44px', 'control-md · 28px', 'icon-md · 16px'],
		['normal (default)', '48px · bar-height', 'control-lg · 32px', 'icon-lg · 20px'],
		['large', '56px · bar-height-lg', 'control-xl · 40px', 'icon-xl · 24px']
	];

	const ICONS = [
		['icon-xs', 12],
		['icon-sm', 14],
		['icon-md', 16],
		['icon-lg', 20],
		['icon-xl', 24],
		['icon-2xl', 32],
		['icon-3xl', 48],
		['icon-4xl', 64]
	];

	const CORNER = [
		['none', '0 · 0 · 0 · 0', 'square'],
		['small', '2 · 2 · 4 · 6', 'round'],
		['medium (default)', '4 · 6 · 8 · 10', 'round'],
		['large', '6 · 8 · 12 · 16', 'round']
	];
	const DENSITY = [
		['compact', '24px', '28px'],
		['comfortable (default)', '28px', '32px'],
		['roomy', '32px', '40px']
	];
	const STROKE = [
		['none', '0 on cards, panels and buttons', '2px'],
		['thin (default)', '1px', '2px'],
		['thick', '2px', '3px']
	];
</script>

<svelte:head>
	<title>Shape and space — Ewe design system</title>
	<meta
		name="description"
		content="Ewe's spacing steps, radii, line weights, control and icon sizes, panel widths — and the corner, density and stroke presets that remap them."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Shape and space</h1>
<p class="lede">
	Six spacing steps, five radii, two line weights, one ladder of control heights. Layout mirrors
	across opposite sides: a control with 4px on the left has 4px on the right.
</p>

<section>
	<h2>Spacing</h2>
	<p>
		Padding inside a control is 2–4px; a panel breathes at 8px; groups and sections are separated
		at 16px and above. There are no half steps — pick the nearer rung.
	</p>
	<div class="list">
		{#each SPACE as [name, px, use]}
			<div class="line">
				<span class="bar" style="width: var(--space-{name})"></span>
				<code>space-{name}</code>
				<span class="px">{px}px</span>
				<span class="use">{use}</span>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2>Radius</h2>
	<p>
		Corners are gentle and consistent: one radius for controls, one for the things that hold them.
		Full pills are reserved — a button is not a capsule.
	</p>
	<div class="shapes">
		{#each RADII as [name, px, use]}
			<div class="shape">
				<span class="box" style="border-radius: var(--{name})"></span>
				<code>{name}</code>
				<span class="px">{px === 9999 ? 'pill' : px + 'px'}</span>
				<span class="use">{use}</span>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2>Lines</h2>
	<p>
		A border is <code>border-width-1</code> (1px) or <code>border-width-2</code> (2px), and nothing
		else. Surfaces are separated by color plus a <code>border-subtle</code> outline; the focus ring
		has its own width, <code>focus-width</code>, which no preset changes.
	</p>
	<div class="lines">
		<div><span class="rule one"></span><code>border-width-1</code></div>
		<div><span class="rule two"></span><code>border-width-2</code></div>
	</div>
	<p class="note">
		Shadows are short and tight, never a glow: <code>shadow-sm</code> for a tooltip,
		<code>shadow-float</code> (0 2px 6px) for something that floats above other windows, and
		<code>shadow-none</code> everywhere else.
	</p>
</section>

<section>
	<h2>Sizes</h2>
	<p>Control heights follow one ladder, and icons another.</p>
	<div class="list">
		{#each CONTROLS as [name, px, use]}
			<div class="line">
				<span class="ctl" style="height: var(--{name})"></span>
				<code>{name}</code>
				<span class="px">{px}px</span>
				<span class="use">{use}</span>
			</div>
		{/each}
	</div>
	<div class="icons">
		{#each ICONS as [name, px]}
			<div class="ico">
				<span class="sq" style="width: var(--{name}); height: var(--{name})"></span>
				<code>{name}</code>
				<span class="px">{px}</span>
			</div>
		{/each}
	</div>
	<p>
		Side panels are <code>panel-sm</code> (360px) or <code>panel-md</code> (400px); the launcher
		and wide popups use <code>panel-lg</code> (560px). Tiled windows keep <code>window-gap</code>
		(8px) from each other and from the screen edge.
	</p>

	<h3 id="bar">The bar</h3>
	<p>
		The bar’s size follows its icons. It has no height of its own: it is its modules plus
		<code>space-s</code> above and below. <code>[desktop.bar] icon_size</code> picks one of three
		steps.
	</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Icon size</th><th>Bar</th><th>Modules</th><th>Glyphs</th></tr>
			</thead>
			<tbody>
				{#each BAR as [v, bar, mod, ico]}<tr><td>{v}</td><td class="num">{bar}</td><td>{mod}</td><td>{ico}</td></tr>{/each}
			</tbody>
		</table>
	</div>
	<p class="muted">
		Taller content, such as a larger text size or Georgian, makes the bar taller. Text size 130%
		moves the icons one size up.
	</p>
</section>

<section id="presets">
	<h2>Look presets</h2>
	<p>
		Three settings change the feel of the desktop without touching color or type: they remap a few
		shape and size tokens, and every component is specified at the defaults but has to hold up at
		every value.
	</p>

	<h3>Corner</h3>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Value</th><th>slight · secondary · primary · rounded</th><th>Pills</th></tr>
			</thead>
			<tbody>
				{#each CORNER as [v, r, pill]}<tr><td>{v}</td><td class="num">{r}</td><td>{pill}</td></tr>{/each}
			</tbody>
		</table>
	</div>

	<h3>Density</h3>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Value</th><th>Controls and rows</th><th>Large controls</th></tr>
			</thead>
			<tbody>
				{#each DENSITY as [v, md, lg]}<tr><td>{v}</td><td class="num">{md}</td><td class="num">{lg}</td></tr>{/each}
			</tbody>
		</table>
	</div>
	<p class="muted">
		The bar and the dock have their own size settings and ignore density. See
		<a href="#bar">the bar</a>.
	</p>

	<h3>Stroke</h3>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Value</th><th>Outlines</th><th>Heavy lines</th></tr>
			</thead>
			<tbody>
				{#each STROKE as [v, one, two]}<tr><td>{v}</td><td>{one}</td><td class="num">{two}</td></tr>{/each}
			</tbody>
		</table>
	</div>
	<p class="muted">
		Fields, checkboxes and switches keep their 1px outline whatever the preset says — without it
		there is nothing to aim at.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.list {
		margin-top: var(--space-md);
		border-top: var(--border-width-1) solid var(--border-subtle);
		max-width: 44rem;
	}
	.line {
		display: grid;
		grid-template-columns: 4.5rem 9rem 3rem minmax(0, 1fr);
		align-items: center;
		gap: var(--space-s);
		padding: var(--space-xs) 0;
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	.bar {
		height: var(--space-s);
		border-radius: var(--slight);
		background: var(--accent);
	}
	.ctl {
		width: calc(2 * var(--space-lg));
		border-radius: var(--primary);
		border: var(--border-width-1) solid var(--border-strong);
		background: var(--surface-raised);
	}
	.shapes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: var(--space-s);
		margin-top: var(--space-md);
	}
	.shape {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
	}
	.box {
		display: block;
		height: calc(2 * var(--control-md));
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-strong);
		margin-bottom: var(--space-xs);
	}
	.lines {
		display: flex;
		gap: var(--space-lg);
		margin-top: var(--space-md);
		max-width: 44rem;
	}
	.lines div {
		flex: 1;
	}
	.rule {
		display: block;
		margin-bottom: var(--space-xs);
		background: var(--border-strong);
	}
	.one {
		height: var(--border-width-1);
	}
	.two {
		height: var(--border-width-2);
	}
	.icons {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: var(--space-md);
		margin-top: var(--space-md);
	}
	.ico {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xxs);
	}
	.sq {
		border-radius: var(--slight);
		background: var(--accent-subtle);
		border: var(--border-width-1) solid var(--accent-text);
	}
	code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
		font-size: var(--font-size-s);
	}
	.px {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
		color: var(--text-muted);
	}
	.use {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		color: var(--text-muted);
	}
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-s);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 46rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 28rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	th {
		text-align: left;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		background: var(--surface-base);
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	td {
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		color: var(--text-secondary);
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	.num {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
</style>
