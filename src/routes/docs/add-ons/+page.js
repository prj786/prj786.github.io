// /docs/add-ons/ became /docs/plugins/built-in/ when the plugin docs moved
// under Plugins. The URL is kept and redirected: the installer, Komble and
// the plugin repos' READMEs link to it.
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	redirect(308, '/docs/plugins/built-in/');
}
