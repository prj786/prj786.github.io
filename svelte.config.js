import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		// GitHub Pages serves files, not a Node process — so every route is
		// rendered to real HTML at build time instead of at request time.
		adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html' }),
		prerender: { entries: ['*'] }
	}
};
