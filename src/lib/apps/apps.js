// The Apps page's data: eep's catalog, as `npm run apps` copied it from an eep
// release (scripts/sync-apps.sh). catalog.json is generated — don't edit it;
// refresh it. Its card and icon paths are relative to /apps/ on the site.
import catalog from './catalog.json';

export const RELEASE = catalog.release;
export const RELEASED = new Date(catalog.released);

// Plain words for each app. The catalog's own description comes from the
// app's package and is written for packagers ("Web browser built from Firefox
// source tree"), so the page says it simply here. An app the catalog gains
// later shows the first sentence of its own description until it has a line.
const PLAIN = {
	calculator: 'A calculator for everyday sums.',
	firefox: 'The web browser from Mozilla.',
	gimp: 'Edit photos and make pictures.',
	libreoffice: 'Documents, spreadsheets and slides.',
	ripgrep: 'Searches inside files, fast. You type rg in a terminal.',
	telegram: 'Chat with your Telegram contacts and groups.',
	vlc: 'Plays almost any video or music file.',
	vscodium: 'A code editor: VS Code without Microsoft’s branding or tracking.'
};

const firstSentence = (text = '') => {
	const line = text.replace(/\s+/g, ' ').trim();
	const end = line.search(/\.(\s|$)/);
	return end > 0 ? line.slice(0, end + 1) : line;
};

// bytes → "471 MB" / "1.6 GB" (decimal units, like a file manager)
export const size = (bytes) =>
	bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(bytes / 1e6))} MB`;

// a path from the catalog ("cards/Firefox.eep") → a URL on the site
const url = (rel) => '/apps/' + rel.split('/').map(encodeURIComponent).join('/');

export const APPS = catalog.apps
	.filter((a) => a.kind === 'gui' || a.kind === 'cli')
	.map((a) => ({
		id: a.id,
		name: a.name,
		kind: a.kind,
		version: a.version,
		homepage: a.homepage,
		blurb: PLAIN[a.id] ?? firstSentence(a.description),
		size: size(a.download),
		icon: a.icon ? url(a.icon) : null,
		card: url(a.card),
		file: a.card.split('/').pop()
	}))
	.sort((x, y) => x.name.localeCompare(y.name, 'en', { sensitivity: 'base' }));
