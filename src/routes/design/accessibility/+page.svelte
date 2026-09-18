<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const MODES = [
		[
			'Reduce motion',
			'Slides and zooms become 150ms fades. Nothing scales, nothing bounces; spinners keep turning, because a spinner is the message.'
		],
		[
			'Reduce transparency',
			'Glass turns solid — the glass roles take their surface values — the blur is switched off, and app blur and window transparency go with it.'
		],
		[
			'Increase contrast',
			'Subtle outlines become strong ones, muted text becomes secondary, hover uses the pressed fill, the focus ring doubles to 2px, and Glass is solid.'
		],
		[
			'Text size',
			'100%, 115% or 130%. The type scale grows and controls grow with it rather than clipping; at 130% the bar’s icons are one size larger.'
		]
	];
</script>

<svelte:head>
	<title>Accessibility — Ewe design system</title>
	<meta
		name="description"
		content="How Ewe meets WCAG 2.2 AA in both schemes: contrast guarantees on every surface, a visible 1px focus ring, full keyboard operation, and four accessibility modes."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Accessibility</h1>
<p class="lede">
	Ewe targets WCAG 2.2 Level AA in both built-in schemes and in any scheme someone brings. The
	contrast rules are not a review step at the end — they are part of the generator, which moves a
	color rather than ship one that cannot be read.
</p>

<section>
	<h2>Contrast</h2>
	<ul>
		<li>
			Text holds at least <strong>4.5:1</strong> against the surfaces its role is meant for. That
			covers primary, secondary and muted text, the accent mark and the status colors.
		</li>
		<li>
			Control outlines, focus rings and icons that carry meaning hold at least
			<strong>3:1</strong>.
		</li>
		<li>
			Surfaces stay at least 2 L apart, so a panel never dissolves into the ground behind it.
		</li>
		<li>
			On glass at the 80% preset, text and the accent mark keep 4.5:1 over a white and a black
			wallpaper alike, and status glyphs keep 3:1.
		</li>
	</ul>
	<p>
		Color is never the only signal: a status is paired with an icon or a word, warning is orange so
		it is never mistaken for the brand gold, and a selected row is a fill, not a hue shift.
		<a href="/design/color/">Color</a> has the full derivation and the guarantees behind it.
	</p>
</section>

<section>
	<h2>Focus</h2>
	<p>
		Focus is obvious and still quiet: one solid <strong>1px ring</strong> in the
		<code>focus-ring</code> role, never a glow and never two colors. Buttons and other controls draw
		it 1px outside their edge; a text field or another boxed input turns its own border instead of
		growing a second one. Tab to the buttons below to see it.
	</p>
	<div class="focusdemo">
		<button class="btn">Secondary</button>
		<button class="btn primary">Primary</button>
		<a class="btn ghost" href="/design/">A link styled as a button</a>
	</div>
	<p>
		Every interactive element is reachable and operable from the keyboard — the launcher, the
		pickers, the notification center, every dialog. Shortcuts are always shown and never required.
	</p>
</section>

<section>
	<h2>Accessibility modes</h2>
	<p>
		Four settings change how the desktop looks and moves without changing where anything is. They
		are role remaps, like a scheme or a look preset, so they combine with both and no component
		needs a variant of its own.
	</p>
	<dl class="rows">
		{#each MODES as [name, what]}
			<div class="row"><dt>{name}</dt><dd>{what}</dd></div>
		{/each}
	</dl>
	<p class="muted">
		They live in Settings → Accessibility, and in <code>ewe.conf</code> under
		<code>[desktop.accessibility]</code>, so they sync with everything else.
	</p>
	<p class="note">
		Display scaling is a separate matter, handled by the compositor. Everything here is drawn on
		whole pixels at 100% and has to stay centered at fractional scales — which is why labels are
		centered on their cap height rather than on the font's line box.
	</p>
</section>

<section>
	<h2>On this site</h2>
	<p>
		The same rules apply to these pages: both schemes are generated with the contrast guarantees,
		the focus ring is the one above, every page reads without JavaScript, and
		<code>prefers-reduced-motion</code> removes what little motion there is. The scheme follows your
		system until you choose otherwise with the toggle in the header.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.focusdemo {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s);
		margin-top: var(--space-md);
	}
</style>
