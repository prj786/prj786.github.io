// The 86 component specs of the Ewe design system, in the five groups the
// system uses. Each line is a short version of what that component's spec
// says it is for; the specs themselves (anatomy, variants, states, behavior,
// accessibility, the tokens used) live in the design system, not here.
export const GROUPS = [
	{
		title: 'Core',
		blurb: 'The pieces every other component is assembled from.',
		items: [
			['Button', 'Starts an action. Primary for the one main action, secondary beside it, ghost in toolbars, danger only for what cannot be undone.'],
			['Icon button', 'The same action with only an icon, where a label will not fit. Always has a tooltip.'],
			['Button group', 'Related buttons joined into one control; a split button pairs the main action with a menu of alternatives.'],
			['Icon', 'Lucide outlines on a 24px grid, in seven sizes and a small set of tones.'],
			['Badge', 'A small, non-interactive label: a count, a state, or that something is new.'],
			['Tag', 'A pill people can select, filter by or remove.'],
			['Kbd', 'A key or a shortcut, so the faster way to do something is visible.'],
			['Divider', 'The 1px line that separates groups inside a panel, a menu or the bar.'],
			['Link', 'Takes people to another page, app or website, and reads as its destination.'],
			['Avatar', 'A person, an account or a machine — a photo, initials or an icon.'],
			['Spinner', 'Something is happening and its length is unknown.'],
			['Skeleton', 'Placeholder shapes while content loads, so the layout does not jump.']
		]
	},
	{
		title: 'Forms and feedback',
		blurb: 'Everything people type into, choose from, or are answered by.',
		items: [
			['Text field', 'One line of text: a device name, a username, a URL.'],
			['Textarea', 'Several lines: a description, a note, a bug report.'],
			['Search field', 'Filters or finds — apps in the launcher, pages in Settings, packages in Komble.'],
			['Select', 'One value from a list: a language, a layout, a resolution. The trigger shows the current one.'],
			['Combobox', 'A field that suggests matches as people type, such as time zones or apps to pin.'],
			['Number stepper', 'An exact number in small steps: a gap, a count, a timeout.'],
			['Checkbox', 'An option on or off, in a form or a list that is applied later.'],
			['Radio', 'Exactly one of a short list, where seeing the options at once helps.'],
			['Switch', 'A setting that takes effect the moment it is flipped.'],
			['Slider', 'A value from a continuous or stepped range: volume, brightness, scale.'],
			['Segmented control', 'Two to five exclusive options that apply immediately.'],
			['Date and time picker', 'A typed date or time, or one picked from a calendar.'],
			['Shortcut recorder', 'Captures a key combination for the shortcuts page.'],
			['File drop zone', 'Takes files that are dropped or chosen: a scheme to import, a wallpaper to add.'],
			['Accent picker', 'Sets the color that buttons, switches, the focus ring and window borders follow.'],
			['Dialog', 'Interrupts for a decision or a little input, on a scrim, with a way out.'],
			['Popover', 'A small panel anchored to the control that opened it.'],
			['Menu', 'A floating list of actions — dropdowns, context menus, the user menu, the content of Select.'],
			['Sheet', 'A tall panel that slides in from a screen edge, such as the notification center.'],
			['Tooltip', 'A short label that names a control on hover or keyboard focus.'],
			['Toast', 'Confirms what just happened inside an app and offers one way back, usually Undo.'],
			['Notification', 'Something happened elsewhere: a message, a finished download, a low battery.'],
			['Notification center', 'Every notification, grouped by app and day, with Do not disturb.'],
			['Inline alert', 'A message that belongs to the page it is on: a paused sync, a needed restart.'],
			['Empty state', 'Why there is nothing here, and what to do about it.'],
			['Progress bar', 'How far a task of known length has come.'],
			['Progress ring', 'The same, where only a small square is available.'],
			['Meter', 'How full something is: CPU, memory, disk, battery, storage by kind.'],
			['Step indicator', 'Progress through a multi-step flow, such as the installer.']
		]
	},
	{
		title: 'Content and navigation',
		blurb: 'How content is grouped, listed and moved between.',
		items: [
			['Card', 'Groups related content and its actions into one block with a 1px outline.'],
			['List row', 'One item in a list: a network, a device, a file, a setting with its control.'],
			['Table', 'Items with several comparable values, such as packages with version, source and size.'],
			['Tabs', 'Pages of related content in the same place, like Discover, Installed and Updates.'],
			['Accordion', 'Hides sections until they are wanted — “Advanced” options, troubleshooting.'],
			['Side navigation', 'The rail of an app: its main sections, the selected one filled with accent-subtle.'],
			['Header bar', 'The top of a window or page: title, the way back, the main actions.'],
			['Breadcrumb', 'Where a page sits, and the way back up.'],
			['Section header', 'Names a group of settings or rows, with an optional description and action.'],
			['Key–value list', 'Labelled details: system information, the properties of a network.'],
			['Scrollbar', 'A thin overlay that stays out of the way until it is reached for.'],
			['Calendar', 'A month with today, the selected day and the days that have events.'],
			['Scheme card', 'Previews a color scheme so two can be compared and one picked.'],
			['Wallpaper picker', 'Shows the current desktop and takes a new picture for it.']
		]
	},
	{
		title: 'Shell and apps',
		blurb: 'The surfaces of the desktop itself, and the patterns the three apps share.',
		items: [
			['Bar', 'Edge to edge along the top: workspace and focused app on the left; tray, updates, layout, Quick settings and the clock on the right.'],
			['Workspace indicator', 'The chip at the start of the bar showing the focused workspace.'],
			['Dock', 'Floats at the bottom with the launchers and one group per workspace.'],
			['Launcher panel', 'Opens above the dock: pinned apps and a quick search.'],
			['Launcher', 'Apps, settings pages, files and commands from the keyboard.'],
			['Overview', 'Every window at once, a search across apps, windows and files, and a pager.'],
			['Places', 'A small file browser above the dock: pinned places, then the current folder.'],
			['Quick settings', 'The panel behind the status module: account, toggles, sliders, media, battery.'],
			['Quick settings tile', 'One feature toggled, its state shown, with a way into its details.'],
			['Agenda', 'The month and what is coming, inside Quick settings, with reminders before events.'],
			['Media player', 'Controls whatever is playing, from any app that speaks MPRIS.'],
			['On-screen display', 'Confirms hardware keys: volume, brightness, microphone, layout, Caps Lock.'],
			['Power menu', 'Lock, sign out, suspend, restart, shut down — with a countdown for what closes apps.'],
			['Lock screen', 'The time over the wallpaper, and the password or fingerprint. Always Ewe Dark.'],
			['Screensaver', 'A quiet clock or a blank screen when the machine is idle, dimming before it locks.'],
			['Window', 'How the compositor draws windows: gaps, corners, borders, groups.'],
			['Window switcher', 'The open windows while Alt+Tab is held.'],
			['Desktop widgets', 'Plugin cards placed on the wallpaper, below windows or kept above them.'],
			['Share picker', 'Which display, window or region an app may see.'],
			['Wi-Fi picker', 'Nearby networks, with the password typed right in the list.'],
			['Bluetooth pairing', 'Confirms codes, asks for PINs and grants access when a device connects.'],
			['Authentication prompt', 'Asks for the password when something needs administrator rights, and names who is asking.'],
			['Welcome', 'The first run: connect, update, sign in, restore a backup, take a short tour.'],
			['Glass', 'How the bar, the dock and the lock card turn translucent without losing contrast.'],
			['App shell', 'The window layout Settings, Komble and ewe-sync share: a rail and a content pane.'],
			['App card', 'How Komble presents apps — grid cards, a featured banner, list rows.'],
			['Settings page', 'Related options with their current values, applied as they change.'],
			['Install wizard', 'The multi-step flow the installer runs on.']
		]
	},
	{
		title: 'Foundations',
		blurb: 'Settings that remap tokens rather than add components.',
		items: [
			['Look presets', 'Corner, density and stroke: the feel of the desktop, as a remap of a few tokens.'],
			['Accessibility modes', 'Reduce motion, reduce transparency, increase contrast and text size — remaps too.']
		]
	}
];

export const COUNT = GROUPS.reduce((n, g) => n + g.items.length, 0);
