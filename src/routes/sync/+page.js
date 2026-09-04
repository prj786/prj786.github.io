// /sync/ merged into /how/ when the site was cut down. The URL is kept and
// redirected rather than deleted: it is in the sitemap, in old release notes
// and in links from the docs.
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	redirect(308, '/how/');
}
