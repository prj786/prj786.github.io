// The sitemap, generated from the same nav the site renders from.
//
// It used to be a hand-kept file in static/, which drifted: it listed
// /philosophy/ and /sync/ (now merged into /how/) and none of the 26 docs
// pages. Building it from $lib/docs/nav.js means adding a page adds it here.
import { SECTIONS } from '$lib/docs/nav.js';

export const prerender = true;

const ORIGIN = 'https://prj786.github.io';

const PAGES = [
	['/', 1.0],
	['/download/', 0.9],
	['/features/', 0.8],
	['/theming/', 0.8],
	['/how/', 0.8],
	['/docs/', 0.8],
	['/privacy/', 0.4],
	...SECTIONS.flatMap((s) => s.items.map((i) => [i.href, 0.6]))
];

export function GET() {
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		PAGES.map(([p, w]) => `\t<url><loc>${ORIGIN}${p}</loc><priority>${w}</priority></url>`).join('\n') +
		'\n</urlset>\n';
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
