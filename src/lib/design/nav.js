// The design section's own navigation — one source of truth for the sidebar,
// the cards on /design/ and the previous/next links at the foot of a page.
export const PAGES = [
	{
		href: '/design/color/',
		label: 'Color',
		blurb: 'The gold, the warm neutrals, the roles every surface reads, and the schemes people bring.'
	},
	{
		href: '/design/typography/',
		label: 'Typography',
		blurb: 'Geist and Geist Mono, the size ladder and the twenty-three text styles.'
	},
	{
		href: '/design/shape/',
		label: 'Shape and space',
		blurb: 'Two line weights, four radii, six spacing steps, and the look presets that remap them.'
	},
	{
		href: '/design/motion/',
		label: 'Motion and layers',
		blurb: 'Four durations, two curves, the stacking order, and Glass.'
	},
	{
		href: '/design/accessibility/',
		label: 'Accessibility',
		blurb: 'WCAG 2.2 AA in both schemes, the 1px focus ring, and the four modes.'
	},
	{
		href: '/design/writing/',
		label: 'Writing',
		blurb: 'Plain, calm, short — with the word list the interface is held to.'
	},
	{
		href: '/design/components/',
		label: 'Components',
		blurb: 'All 85 specs, in five groups, from Button to Workspace indicator.'
	},
	{
		href: '/design/schemes/',
		label: 'Scheme files',
		group: 'Documentation',
		blurb: 'Write your own scheme: every key, every palette slot, and the ways a file comes in.'
	},
	{
		href: '/design/tokens/',
		label: 'Token reference',
		group: 'Documentation',
		blurb: 'Every token with its CSS and QML name and its value in both schemes.'
	}
];

export const TOPICS = PAGES.filter((p) => !p.group);
export const DOCS = PAGES.filter((p) => p.group === 'Documentation');

export const FLAT = [{ href: '/design/', label: 'Design system' }, ...PAGES];

