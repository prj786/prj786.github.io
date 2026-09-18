// What a token is worth right now, read off the page itself.
//
// The swatches on the design pages are painted with `var(--token)`, so they
// follow the scheme with no script at all. The hex beside them is the one
// thing CSS cannot print, so it is read from the computed styles once the
// page is live and re-read when the scheme changes — the attribute the
// header toggle sets, or the system setting when nothing was chosen.
let version = $state(0);

if (typeof window !== 'undefined') {
	const bump = () => version++;
	new MutationObserver(bump).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-theme']
	});
	window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', bump);
}

/** The computed value of `--name`, or '' while prerendering. */
export function tokenValue(name, el) {
	version;
	if (typeof window === 'undefined') return '';
	return getComputedStyle(el ?? document.documentElement)
		.getPropertyValue('--' + name)
		.trim();
}
