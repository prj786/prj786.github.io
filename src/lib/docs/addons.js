// The sixteen built-in plugins — one source for /docs/plugins/built-in/, the
// features page and the repositories page. Facts come from ewe's
// plugins/bundle.json and each plugin's manifest.json (names, descriptions,
// settings, keybinds, requires); the repo is prj786/ewe-plugin-<name>.
// `group` orders them on the built-in page; keep the words plain — this is
// the user-facing catalogue, the manifests are the reference.
export const GITHUB = 'https://github.com/prj786/';

export const GROUPS = [
	['desk', 'On your desk'],
	['safety', 'Passwords'],
	['talk', 'Messages and your phone'],
	['connect', 'Connections'],
	['system', 'System']
];

export const ADDONS = [
	{
		id: 'ewe.dock',
		name: 'Dock',
		repo: 'ewe-plugin-dock',
		icon: 'dock',
		group: 'desk',
		blurb: 'A dock along the bottom of the screen: your apps, your workspaces, minimized windows and downloads.',
		use: 'Click an app to open it. A minimized window (Super+Z) waits here as a small picture — click it to bring it back. The ring at the end shows ewe browser downloads.',
		settings: 'Auto-hide, icon size.'
	},
	{
		id: 'ewe.companion',
		name: 'Shaun',
		repo: 'ewe-plugin-companion',
		icon: 'message-circle',
		group: 'desk',
		blurb: 'Your desktop companion: a small notch under the bar with what your AI agents are doing, quick actions and a chat.',
		use: 'Press the key or click the notch. Answer an agent’s request, flip a quick switch, or type a question or a command.',
		settings: 'Who answers questions, which screen, how long a line stays.',
		keys: 'Super+A',
		needs: 'ewe-companion',
		page: '/docs/apps/shaun/'
	},
	{
		id: 'ewe.media',
		name: 'Music',
		repo: 'ewe-plugin-media',
		icon: 'music',
		group: 'desk',
		blurb: 'What’s playing, with artwork and controls, for any music or video player.',
		use: 'A button in the dock or the bar opens it while something plays.',
		settings: 'Where the button lives — dock, bar or both.'
	},
	{
		id: 'ewe.places',
		name: 'Places',
		repo: 'ewe-plugin-places',
		icon: 'folder',
		group: 'desk',
		blurb: 'A small file browser: your home folder and pinned folders, one click away.',
		use: 'Open it from the dock or the bar; drag any file out into another app.',
		settings: 'Where the button lives — dock, bar or both.'
	},
	{
		id: 'ewe.clipboard',
		name: 'Clipboard & emoji',
		repo: 'ewe-plugin-clipboard',
		icon: 'scissors',
		group: 'desk',
		blurb: 'Everything you copied, and an emoji picker. Passwords are never kept.',
		use: 'Click the scissors in the bar and pick what to paste.',
		settings: 'Show the emoji tab.'
	},
	{
		id: 'ewe.screenshot',
		name: 'Screenshot',
		repo: 'ewe-plugin-screenshot',
		icon: 'camera',
		group: 'desk',
		blurb: 'Take a picture of the screen, a window or an area.',
		use: 'The camera in the bar, or the Print keys. Shots go to Pictures/Screenshots and show a preview you can drag into an app.',
		settings: 'Also copy the shot.',
		keys: 'Print · Shift+Print · Super+Print'
	},
	{
		id: 'ewe.safe',
		name: 'Safe',
		repo: 'ewe-plugin-safe',
		icon: 'vault',
		group: 'safety',
		blurb: 'Safe, ewe’s password manager, on your desktop: a lock in the bar and Quick Access to every item.',
		use: 'Press the key, search, and copy a password, a username or a one-time code. Lock and unlock from the bar.',
		keys: 'Super+Shift+P',
		needs: 'ewe-safe',
		page: '/docs/apps/safe/'
	},
	{
		id: 'ewe.passwords',
		name: 'Passwords',
		repo: 'ewe-plugin-passwords',
		icon: 'lock',
		group: 'safety',
		blurb: 'Fill a login into any app from your password manager — Safe, 1Password, Bitwarden or pass.',
		use: 'In a login form, press the key, pick the login, and it is typed in for you.',
		settings: 'Which password manager, press Enter after.',
		keys: 'Super+P'
	},
	{
		id: 'ewe.mail',
		name: 'Mail',
		repo: 'ewe-plugin-mail',
		icon: 'mail',
		group: 'talk',
		blurb: 'Unread mail from any IMAP account or Gmail: a count in the bar and a note when new mail arrives.',
		use: 'Click the envelope to see your inbox in Quick settings.',
		settings: 'Notifications for new mail.'
	},
	{
		id: 'ewe.slack',
		name: 'Slack',
		repo: 'ewe-plugin-slack',
		icon: 'messages-square',
		group: 'talk',
		blurb: 'Your unread Slack messages as a card on the desktop.',
		use: 'It asks for your Slack token once. Click a message to open the conversation in Slack.',
		settings: 'How often it checks, how many it shows, the card’s look.'
	},
	{
		id: 'ewe.phone',
		name: 'Phone',
		repo: 'ewe-plugin-phone',
		icon: 'smartphone',
		group: 'talk',
		blurb: 'Your phone on your desktop: its battery, its notifications and your text messages.',
		use: 'Pair your phone with the KDE Connect app, then open the Mobile page in Quick settings.',
		needs: 'kdeconnect'
	},
	{
		id: 'ewe.cast',
		name: 'Cast to TV',
		repo: 'ewe-plugin-cast',
		icon: 'cast',
		group: 'connect',
		blurb: 'Show your screen on a TV — Miracast or Chromecast.',
		use: 'Open Cast in Quick settings, or press the key, and pick your TV.',
		keys: 'Super+Shift+C',
		needs: 'ewe-cast'
	},
	{
		id: 'ewe.vpn',
		name: 'VPN',
		repo: 'ewe-plugin-vpn',
		icon: 'shield',
		group: 'connect',
		blurb: 'Your VPN connections in Quick settings, and a shield in the bar while one is on.',
		use: 'Tap the tile to connect; the VPN page lists every connection.'
	},
	{
		id: 'ewe.ssh',
		name: 'SSH',
		repo: 'ewe-plugin-ssh',
		icon: 'square-terminal',
		group: 'connect',
		blurb: 'The servers from your SSH config, one click from a terminal.',
		use: 'Open the SSH page in Quick settings and pick a host.'
	},
	{
		id: 'ewe.insomnia',
		name: 'Insomnia',
		repo: 'ewe-plugin-insomnia',
		icon: 'eye',
		group: 'system',
		blurb: 'Keeps the screen on and the computer awake until you turn it off.',
		use: 'Tap the tile in Quick settings. An eye in the bar shows it is on.',
		settings: 'Turn off by itself after a while.'
	},
	{
		id: 'ewe.sysmon',
		name: 'System monitor',
		repo: 'ewe-plugin-sysmon',
		icon: 'cpu',
		group: 'system',
		blurb: 'How busy your processor and memory are.',
		use: 'A meter in Quick settings, and a small readout in the bar if you want one.'
	}
];

export const EXAMPLE = GITHUB + 'ewe-plugin-example';
