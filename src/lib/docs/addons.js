// The thirteen first-party plugins — one source for /docs/add-ons/ and the
// repositories page. Facts come from ewe's plugins/bundle.json and each
// plugin's manifest.json (names, descriptions, kinds, keybinds); the repo is
// prj786/ewe-plugin-<name>. Keep the order the catalogue shows: the dock
// first, then what a desk tends to want, then the three that were bundled
// plugins before 0.25.
export const GITHUB = 'https://github.com/prj786/';

export const ADDONS = [
	{
		id: 'ewe.dock',
		name: 'Dock',
		repo: 'ewe-plugin-dock',
		icon: 'dock',
		blurb: 'A centred bottom dock on the main screen: the app launcher, Overview, Komble, the Pen, one box per workspace with its windows, and the items other plugins provide.',
		shows: 'the dock',
		note: 'Upgraders who had the dock keep it; a fresh install has none until you pick it.'
	},
	{
		id: 'ewe.media',
		name: 'Music',
		repo: 'ewe-plugin-media',
		icon: 'music',
		blurb: 'Now playing for any MPRIS player — artwork, controls and a seek bar — above the dock or under the bar.',
		shows: 'a dock item, or a bar button while something plays',
		note: 'Its own “Where the button lives” setting places it — dock, bar or both — so it has no Show in bar switch.'
	},
	{
		id: 'ewe.places',
		name: 'Places',
		repo: 'ewe-plugin-places',
		icon: 'folder',
		blurb: 'A compact file browser: your home, pinned folders, drag any file out into another app.',
		shows: 'a dock item, or a bar button',
		note: 'Its own “Where the button lives” setting places it — dock, bar or both — so it has no Show in bar switch.'
	},
	{
		id: 'ewe.phone',
		name: 'Phone',
		repo: 'ewe-plugin-phone',
		icon: 'smartphone',
		blurb: 'Your phone through KDE Connect: pairing, battery, its notifications and your SMS conversations on the Mobile page.',
		shows: 'a Quick settings page and a glyph while the phone is connected',
		needs: 'kdeconnect'
	},
	{
		id: 'ewe.mail',
		name: 'Mail',
		repo: 'ewe-plugin-mail',
		icon: 'mail',
		blurb: 'Unread mail from your IMAP account or Gmail: an Inbox page, an envelope with the count in the bar, a notification for new mail.',
		shows: 'a Quick settings page and a glyph while there is unread mail'
	},
	{
		id: 'ewe.vpn',
		name: 'VPN',
		repo: 'ewe-plugin-vpn',
		icon: 'shield',
		blurb: 'Your NetworkManager VPN connections: a toggle tile, a list with a one-time sign-in form, and a shield while one is up.',
		shows: 'a tile, a Quick settings page and a glyph'
	},
	{
		id: 'ewe.ssh',
		name: 'SSH',
		repo: 'ewe-plugin-ssh',
		icon: 'square-terminal',
		blurb: 'Your ~/.ssh/config hosts: a terminal in one click, a SOCKS tunnel with a saved browse script per host.',
		shows: 'a tile, a Quick settings page and a glyph while a tunnel is up'
	},
	{
		id: 'ewe.cast',
		name: 'Cast to TV',
		repo: 'ewe-plugin-cast',
		icon: 'cast',
		blurb: 'Mirror the screen to a Miracast or Chromecast TV from Quick settings, through the ewe-castd engine.',
		shows: 'a tile, a Quick settings page and a glyph while casting',
		keys: 'Super+Shift+C',
		needs: 'ewe-cast, gnome-network-displays'
	},
	{
		id: 'ewe.insomnia',
		name: 'Insomnia',
		repo: 'ewe-plugin-insomnia',
		icon: 'eye',
		blurb: 'Keeps the screen awake and stops sleep until you turn it off; an optional timer turns it off for you.',
		shows: 'a tile and an eye in the bar while it is on'
	},
	{
		id: 'ewe.sysmon',
		name: 'System monitor',
		repo: 'ewe-plugin-sysmon',
		icon: 'cpu',
		blurb: 'CPU and memory meters in Quick settings, and a compact readout in the top bar if you want one.',
		shows: 'a whole-row tile, an optional bar readout'
	},
	{
		id: 'ewe.clipboard',
		name: 'Clipboard & emoji',
		repo: 'ewe-plugin-clipboard',
		icon: 'scissors',
		blurb: 'Clipboard history and an emoji picker under a scissors icon in the bar; records copies, never passwords.',
		shows: 'a bar widget and its popup'
	},
	{
		id: 'ewe.screenshot',
		name: 'Screenshot',
		repo: 'ewe-plugin-screenshot',
		icon: 'camera',
		blurb: 'A camera in the bar and the Print keys: region, screen or window to ~/Pictures/Screenshots, with a draggable preview stack.',
		shows: 'a bar widget and the preview stack',
		keys: 'Print · Shift+Print · Super+Print'
	},
	{
		id: 'ewe.passwords',
		name: 'Passwords',
		repo: 'ewe-plugin-passwords',
		icon: 'lock',
		blurb: 'Fill a login from your password manager (1Password, Bitwarden, pass) into any window.',
		shows: 'a picker panel',
		keys: 'Super+P'
	}
];

export const EXAMPLE = GITHUB + 'ewe-plugin-example';
