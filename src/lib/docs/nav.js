// The docs sidebar — one source of truth for the sidebar, the landing page
// cards and the previous/next links at the foot of every page.
export const SECTIONS = [
	{
		title: 'Get started',
		items: [
			{ href: '/docs/install/', label: 'Install ewe', blurb: 'The ISO, the eight screens, and the headless path.' },
			{ href: '/docs/first-login/', label: 'First login', blurb: 'The welcome flow, your first plugins, and the keys worth knowing.' },
			{ href: '/docs/desktop/', label: 'The desktop', blurb: 'The bar, the Overview, minimize, workspaces on every display, light and dark.' },
			{ href: '/docs/updating/', label: 'Updating', blurb: 'It rolls: one command for the system and the desktop.' }
		]
	},
	{
		title: 'Apps',
		items: [
			{ href: '/docs/apps/browser/', label: 'ewe browser', blurb: 'The web, your files and your music in one window — with Safe built in.' },
			{ href: '/docs/apps/safe/', label: 'Safe', blurb: 'Your passwords, cards and keys, encrypted, in your own Nextcloud.' },
			{ href: '/docs/apps/shaun/', label: 'Shaun', blurb: 'The companion in the notch: your AI agents, quick actions, a chat.' },
			{ href: '/docs/apps/komble/', label: 'Komble', blurb: 'Apps, updates and plugins, from one search field.' },
			{ href: '/docs/apps/settings/', label: 'Settings', blurb: 'Every setting of the machine, in one window.' }
		]
	},
	{
		title: 'Your account',
		items: [
			{ href: '/docs/account/nextcloud/', label: 'Nextcloud account', blurb: 'One sign-in to a server you choose.' },
			{ href: '/docs/account/settings-sync/', label: 'Settings sync', blurb: 'The one file, on every machine you own.' },
			{ href: '/docs/account/folder-sync/', label: 'Folder sync', blurb: 'Which folders sync where, and conflicts.' },
			{ href: '/docs/account/mail-calendar/', label: 'Mail & calendar', blurb: 'Any IMAP inbox; CalDAV from the account.' },
			{ href: '/docs/account/google/', label: 'Google (optional)', blurb: 'Gmail and Drive, with your own OAuth client.' }
		]
	},
	{
		title: 'The one file',
		items: [
			{ href: '/docs/one-file/', label: 'ewe.conf', blurb: 'The machine as one declarative document.' },
			{ href: '/docs/one-file/schema/', label: 'Schema reference', blurb: 'Every section and key, with defaults.' },
			{ href: '/docs/one-file/editing/', label: 'Editing by hand', blurb: 'Supported, with two rules.' }
		]
	},
	{
		title: 'Plugins',
		items: [
			{ href: '/docs/plugins/', label: 'Plugins', blurb: 'What a plugin is, where it shows up, and how to add, set up or remove one.' },
			{ href: '/docs/plugins/built-in/', label: 'Built-in plugins', blurb: 'The sixteen that ship with ewe — the dock, Shaun, Safe, mail, Cast and more.' },
			{ href: '/docs/plugins/writing/', label: 'Writing a plugin', blurb: 'create, the API 3 manifest, one QML file per kind, settings, dev.' },
			{ href: '/docs/plugins/api/', label: 'What a plugin may use', blurb: 'The Shell singleton, the public components, Theme roles, IPC — API 3.' }
		]
	},
	{
		title: 'CLI reference',
		items: [
			{ href: '/docs/cli/', label: 'Overview', blurb: 'Small tools, one job each, JSON out.' },
			{ href: '/docs/cli/ewe-conf/', label: 'ewe-conf', blurb: 'The one writer of the one file.' },
			{ href: '/docs/cli/ewe-plugin/', label: 'ewe-plugin', blurb: 'Plugins from ewe or a git URL: install, add, bar, place, set, create, dev.' },
			{ href: '/docs/cli/ewe-theme/', label: 'ewe-theme', blurb: 'Tokens from an accent or a scheme; import, wallpaper.' },
			{ href: '/docs/cli/ewe-pass/', label: 'ewe-pass', blurb: 'Logins from your password manager, typed into any app.' },
			{ href: '/docs/cli/ewe-cloud/', label: 'ewe-cloud', blurb: 'Your Nextcloud account, and its app password.' },
			{ href: '/docs/cli/ewe-sync/', label: 'ewe-sync', blurb: 'The account app: machines, sync, folders.' },
			{ href: '/docs/cli/ewe-files/', label: 'ewe-files', blurb: 'The account, mounted as a folder.' },
			{ href: '/docs/cli/ewe-caldav/', label: 'ewe-caldav', blurb: 'The calendar of the account, over CalDAV.' },
			{ href: '/docs/cli/ewe-mail/', label: 'ewe-mail', blurb: 'The mail badge, from any IMAP account.' },
			{ href: '/docs/cli/ewe-auth/', label: 'ewe-auth', blurb: 'Google, with a client you supply.' },
			{ href: '/docs/cli/ewe-drive/', label: 'ewe-drive', blurb: 'Google Drive as a folder.' },
			{ href: '/docs/cli/ewe-setup/', label: 'ewe-setup', blurb: 'Deploy the desktop for your user; the plugin migration runs here.' },
			{ href: '/docs/cli/ewe-share-picker/', label: 'ewe-share-picker', blurb: 'The screen-share picker the portal calls.' },
			{ href: '/docs/cli/ewe-install/', label: 'ewe-install', blurb: 'The installer, as a command — with --addons.' },
			{ href: '/docs/cli/ewe-castd/', label: 'ewe-castd', blurb: 'The casting daemon behind the Cast plugin.' }
		]
	},
	{
		title: 'Reference',
		items: [
			{ href: '/docs/shortcuts/', label: 'Keyboard shortcuts', blurb: 'The keymap, grouped — and which keys come from a plugin.' },
			{ href: '/docs/repositories/', label: 'Repositories', blurb: 'Which layer lives where, one repo per first-party plugin.' },
			{ href: '/docs/troubleshooting/', label: 'Troubleshooting', blurb: 'Known limitations, where the dock went, and where to get help.' }
		]
	}
];

// flat order, for previous/next (PageNav)
export const FLAT = [{ href: '/docs/', label: 'Docs' }, ...SECTIONS.flatMap((s) => s.items)];

