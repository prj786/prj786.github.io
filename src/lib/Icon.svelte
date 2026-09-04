<script>
	// Lucide, inline. One <svg> wrapper so the grid, the stroke weight and the
	// caps are decided once — an icon that sets its own stroke-width is the
	// same class of mistake as a component that carries a colour literal.
	//
	// `size` defaults to the token the shell uses for a bar glyph, so an icon
	// beside 16px body text lands at the same optical weight it does on the
	// desktop. Colour is inherited: put the colour on the parent.
	import { ICONS } from './icons.js';

	let { name, size = 18, stroke = 2, label = '' } = $props();
</script>

<svg
	class="icon"
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : undefined}
	aria-label={label || undefined}
	aria-hidden={label ? undefined : 'true'}
>{@html ICONS[name] ?? ''}</svg>

<style>
	.icon {
		flex: none;
		display: block;
	}
</style>
