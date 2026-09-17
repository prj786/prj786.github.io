<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';

	// The twenty-three text styles, in the order the system lists them.
	// `sample` is what the specimen says; the numbers are the style's own.
	const STYLES = [
		['display-xl', '64 / 72 · light', 'Lock screen clock'],
		['display-lg', '48 / 56 · regular', 'Welcome'],
		['display', '36 / 44 · medium', 'Page headers'],
		['h1', '28 / 34 · semibold', 'The title of a panel or page'],
		['h2', '22 / 28 · semibold', 'A section inside it'],
		['h3', '18 / 24 · semibold', 'A group of settings'],
		['h4', '15 / 20 · semibold', 'A card title'],
		['h4-italic', '15 / 20 · semibold italic', 'A card title that names a file'],
		['body-lg', '15 / 22 · regular', 'Longer reading text'],
		['body', '13 / 18 · regular', 'The default'],
		['body-strong', '13 / 18 · medium', 'The part that matters'],
		['body-italic', '13 / 18 · regular italic', 'A file name, a hint'],
		['body-strong-italic', '13 / 18 · medium italic', 'Both at once, rarely'],
		['label', '12 / 16 · medium', 'Controls and rows'],
		['label-italic', '12 / 16 · medium italic', 'A pending value'],
		['caption', '11 / 14 · regular', 'Timestamps and helper text'],
		['caption-italic', '11 / 14 · regular italic', 'A note under a field'],
		['overline', '11 / 14 · semibold · wide', 'A group header, in capitals'],
		['mono', '12 / 16 · regular', 'Paths, commands, output'],
		['mono-strong', '12 / 16 · semibold', 'The command in a block of output'],
		['mono-italic', '12 / 16 · regular italic', 'A placeholder inside a command'],
		['mono-numeric', '12 / 16 · medium · tabular', '18:42 · 84% · 2.1 GB']
	];

	const SIZES = [
		['xs', 11, 14, 'Captions, badges, the overline'],
		['s', 12, 16, 'Labels and code'],
		['md', 13, 18, 'Body — the desktop default'],
		['lg', 15, 20, 'Card titles; body on a web page'],
		['xl', 18, 24, 'h3'],
		['2xl', 22, 28, 'h2'],
		['3xl', 28, 34, 'h1'],
		['4xl', 36, 44, 'display'],
		['5xl', 48, 56, 'display-lg'],
		['6xl', 64, 72, 'display-xl']
	];

	const WEIGHTS = [
		['regular', 400, 'Body copy and captions'],
		['medium', 500, 'Labels, buttons, the emphasised part of a line'],
		['semibold', 600, 'Every heading'],
		['light', 300, 'The display sizes only']
	];
</script>

<svelte:head>
	<title>Typography — Ewe design system</title>
	<meta
		name="description"
		content="Geist and Geist Mono, the Ewe size and line-height ladder, the twenty-three text styles, the weights and tracking tokens, and the Georgian rule."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Typography</h1>
<p class="lede">
	Interface text is set in Geist, code in Geist Mono — both variable faces with matching italics,
	under the SIL Open Font License. This page is set in them; so is the desktop.
</p>

<section>
	<h2>The two faces</h2>
	<div class="faces">
		<div class="card">
			<h3>Geist</h3>
			<p class="specimen sans">Aa Bb Cc 0123456789</p>
			<p>
				Weights 100–900 with italics. Everything that is not code: labels, headings, body copy,
				the clock.
			</p>
		</div>
		<div class="card">
			<h3>Geist Mono</h3>
			<p class="specimen mono">Aa Bb Cc 0123456789</p>
			<p>
				Paths, commands, output, hex values, and any number that changes in place — those use the
				<code>mono-numeric</code> style so digits keep their column.
			</p>
		</div>
	</div>
	<p class="note">
		Neither face has Georgian glyphs, so both stacks fall back to <strong>Noto Sans Georgian</strong
		>, which every ewe machine installs. Georgian letters reach higher and lower than Latin ones —
		check that a line still fits before shipping a layout.
	</p>
</section>

<section>
	<h2>The styles</h2>
	<p>
		Text is set with a named style, not by picking a size and a weight. Each one pairs a size with
		the line height of the same step; italics are for secondary emphasis — a file name, a hint, a
		pending value — never for a whole paragraph.
	</p>
	<div class="styles">
		{#each STYLES as [name, spec, use]}
			<div class="style">
				<div class="sample t-{name}">The quick brown sheep</div>
				<div class="meta">
					<code>{name}</code>
					<span class="spec">{spec}</span>
					<span class="use">{use}</span>
				</div>
			</div>
		{/each}
	</div>
	<p class="muted">
		Capitalization is not part of the style: <code>overline</code> is set in capitals in English and
		left alone in Georgian, which has none.
	</p>
</section>

<section>
	<h2>The ladder</h2>
	<p>
		Custom text is built from the scale tokens, always pairing a size with the line height of the
		same step. <code>line-height-lg-relaxed</code> (22px) is the one extra rung, for reading text.
	</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Step</th><th>Size</th><th>Line height</th><th>Where</th></tr>
			</thead>
			<tbody>
				{#each SIZES as [step, size, lh, where]}
					<tr>
						<td><code>{step}</code></td>
						<td class="num">{size}px</td>
						<td class="num">{lh}px</td>
						<td>{where}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<section>
	<h2>Weight and tracking</h2>
	<p>
		Interface text uses three weights. Bold and heavier belong to branding and artwork: hierarchy
		comes from size and color, not from heavy type.
	</p>
	<dl class="rows">
		{#each WEIGHTS as [name, value, use]}
			<div class="row">
				<dt><code>font-weight-{name}</code></dt>
				<dd><span class="w" style="font-weight: {value}">{value} — {use}</span></dd>
			</div>
		{/each}
	</dl>
	<p>
		Tracking tightens as type grows — from <code>tracking-tightest</code> (−0.03em) on the display
		sizes to <code>tracking-normal</code> at body size — and opens again only for
		<code>tracking-wide</code> (0.06em), the overline.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.faces {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: var(--space-s);
		margin-top: var(--space-md);
	}
	.specimen {
		margin: var(--space-s) 0;
		font-size: var(--font-size-3xl);
		line-height: var(--line-height-3xl);
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}
	.sans {
		font-family: var(--font-sans);
	}
	.mono {
		font-family: var(--font-mono);
	}

	.styles {
		margin-top: var(--space-md);
		border-top: var(--border-width-1) solid var(--border-subtle);
		max-width: 46rem;
	}
	.style {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-s) var(--space-md);
		padding: var(--space-s) 0;
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	.sample {
		color: var(--text-primary);
		min-width: 0;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-xs) var(--space-s);
		text-align: right;
		margin-left: auto;
	}
	.meta code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
		font-size: var(--font-size-s);
	}
	.spec,
	.use {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-xs);
		color: var(--text-muted);
	}
	.use {
		flex-basis: 100%;
	}

	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 46rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 30rem;
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
	td code {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-primary);
	}
	.w {
		color: var(--text-primary);
	}
</style>
