// The docs sidebar — one source of truth for the sidebar, the landing page
// cards and the previous/next links at the foot of every page.
export const SECTIONS = [
	{
		title: 'Get started',
		items: [
			{ href: '/docs/install/', label: 'Install ewe', blurb: 'The ISO, the six screens, and the headless path.' },
			{ href: '/docs/first-login/', label: 'First login', blurb: 'The welcome flow, and the keys worth knowing.' },
			{ href: '/docs/updating/', label: 'Updating', blurb: 'It rolls: one command for the system and the desktop.' }
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
			{ href: '/docs/plugins/', label: 'Plugins', blurb: 'Bar and desktop widgets, panels and services — a git URL in, or ewe-plugin create.' },
			{ href: '/docs/plugins/writing/', label: 'Writing a plugin', blurb: 'create, the manifest, the entry points, settings, dev.' },
			{ href: '/docs/plugins/api/', label: 'What a plugin may use', blurb: 'Theme roles, the public Globals, IPC.' }
		]
	},
	{
		title: 'CLI reference',
		items: [
			{ href: '/docs/cli/', label: 'Overview', blurb: 'Small tools, one job each, JSON out.' },
			{ href: '/docs/cli/ewe-conf/', label: 'ewe-conf', blurb: 'The one writer of the one file.' },
			{ href: '/docs/cli/ewe-plugin/', label: 'ewe-plugin', blurb: 'Shell plugins: create, add, enable, place, set.' },
			{ href: '/docs/cli/ewe-theme/', label: 'ewe-theme', blurb: 'Tokens from an accent or a scheme; import, wallpaper.' },
			{ href: '/docs/cli/ewe-pass/', label: 'ewe-pass', blurb: 'Logins from your password manager, typed into any app.' },
			{ href: '/docs/cli/ewe-cloud/', label: 'ewe-cloud', blurb: 'Your Nextcloud account, and its app password.' },
			{ href: '/docs/cli/ewe-sync/', label: 'ewe-sync', blurb: 'The account app: machines, sync, folders.' },
			{ href: '/docs/cli/ewe-files/', label: 'ewe-files', blurb: 'The account, mounted as a folder.' },
			{ href: '/docs/cli/ewe-caldav/', label: 'ewe-caldav', blurb: 'The calendar of the account, over CalDAV.' },
			{ href: '/docs/cli/ewe-mail/', label: 'ewe-mail', blurb: 'The mail badge, from any IMAP account.' },
			{ href: '/docs/cli/ewe-auth/', label: 'ewe-auth', blurb: 'Google, with a client you supply.' },
			{ href: '/docs/cli/ewe-drive/', label: 'ewe-drive', blurb: 'Google Drive as a folder.' },
			{ href: '/docs/cli/ewe-setup/', label: 'ewe-setup', blurb: 'Deploy the desktop for your user.' },
			{ href: '/docs/cli/ewe-share-picker/', label: 'ewe-share-picker', blurb: 'The screen-share picker the portal calls.' },
			{ href: '/docs/cli/ewe-install/', label: 'ewe-install', blurb: 'The installer, as a command.' },
			{ href: '/docs/cli/ewe-castd/', label: 'ewe-castd', blurb: 'The casting daemon behind the Cast card.' }
		]
	},
	{
		title: 'Reference',
		items: [
			{ href: '/docs/shortcuts/', label: 'Keyboard shortcuts', blurb: 'The full keymap, grouped.' },
			{ href: '/docs/repositories/', label: 'Repositories', blurb: 'Which layer lives where.' },
			{ href: '/docs/troubleshooting/', label: 'Troubleshooting', blurb: 'Known limitations, and where to get help.' }
		]
	}
];

// flat order, for previous/next (PageNav)
export const FLAT = [{ href: '/docs/', label: 'Docs' }, ...SECTIONS.flatMap((s) => s.items)];

