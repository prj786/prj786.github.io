<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const VOICE = [
		['Plain', 'The words people use: Wi-Fi, Restart, Updates. Never a service name, a package name or command output in a headline.'],
		['Calm', 'No exclamation marks, no “Oops”, no blame. What happened, then what to do.'],
		['Short', 'One idea per sentence. “Please”, “successfully”, “in order to” and “simply” are cut.'],
		['Direct', 'Name the thing rather than the person: “Wallpaper saved to Pictures”, not “You have saved your wallpaper”.'],
		['Honest', 'If something will be lost, say what. If it will take a while, say roughly how long.']
	];

	const MESSAGES = [
		['Error', 'What happened. What to do.', '“Disk is full. Free up 2.1 GB and try again.”'],
		['Confirmation', 'Past tense, name the thing, offer the way back', '“Moved report.pdf to Trash” · Undo'],
		['Question', 'The decision, as a question', '“Remove linux-zen?”'],
		['Warning', 'The consequence first', '“3 partitions will be deleted”'],
		['Empty state', 'What is missing. What to do.', '“No pinned apps yet” / “Search for an app and use its pin to keep it here.”'],
		['Progress', 'Present participle and an ellipsis', '“Checking…”, “Moving 3 files…”'],
		['Offline', 'The state, and what still works', '“Offline” / “Showing events from the last sync.”']
	];

	const WORDS = [
		['Quick settings', 'control center, control centre, action center'],
		['Overview', 'activities, expose, mission control'],
		['workspace', 'desktop, virtual desktop'],
		['window', 'client, surface'],
		['app', 'application, program'],
		['sign in, sign out', 'log in, login (as a verb)'],
		['Wi-Fi', 'WiFi, wifi, WLAN'],
		['Bluetooth', 'BT'],
		['update, updates', 'upgrade, sync (for packages)'],
		['Trash', 'recycle bin, bin'],
		['Places', 'file panel'],
		['Komble', 'the store, package manager (in the interface)'],
		['scheme', 'theme (for color schemes)'],
		['accent color', 'primary color, brand color (in the interface)'],
		['pin, unpin', 'favorite, bookmark'],
		['keep awake', 'caffeine, inhibit']
	];
</script>

<svelte:head>
	<title>Writing — Ewe design system</title>
	<meta
		name="description"
		content="Ewe's writing guide: voice, sentence case, buttons and actions, message patterns, numbers and time, the Georgian rules, and the word list the interface is held to."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Writing</h1>
<p class="lede">
	The words should feel like the design: calm, clear and short. People are in the middle of
	something; text is there to help them finish it, not to ask for attention.
</p>

<section>
	<h2>Voice</h2>
	<dl class="rows">
		{#each VOICE as [name, what]}
			<div class="row"><dt>{name}</dt><dd>{what}</dd></div>
		{/each}
	</dl>
</section>

<section>
	<h2>Capitalization and punctuation</h2>
	<ul>
		<li>
			Sentence case everywhere — titles, buttons, menu items, tabs, settings. “Reduce transparency”,
			not “Reduce Transparency”.
		</li>
		<li>App and place names keep their capitals: Komble, ewe-sync, Places, Overview, Quick settings, Welcome.</li>
		<li>
			No period after a title, a button, a label or a single-line list item. Descriptions and
			helper text are sentences and end with one.
		</li>
		<li>
			An ellipsis marks an action that needs more input (“Select a region…”) or work in progress
			(“Installing…”), and it is the single character, not three dots.
		</li>
		<li>Curly quotes in English, „ “ in Georgian.</li>
		<li>Keys are written out and shown as key caps: <kbd>Super</kbd>, <kbd>Esc</kbd>, combinations joined with “+”.</li>
	</ul>
</section>

<section>
	<h2>Buttons and actions</h2>
	<ul>
		<li>Start with the verb that says what happens: “Install”, “Restart now”, “Remove linux-zen”, “Allow”.</li>
		<li>The primary button repeats the verb of the title: “Restart to finish updating?” → “Restart now”.</li>
		<li>The way out is “Cancel”, or “Later” and “Skip for now” when nothing is being undone.</li>
		<li>A destructive action names what it takes: “Delete 3 files”, never a bare “Delete”.</li>
		<li>“OK”, “Yes” and “No” are not answers to anything. Neither is “click here” — a link reads as its destination.</li>
	</ul>
</section>

<section>
	<h2>Messages</h2>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Kind</th><th>Pattern</th><th>Example</th></tr>
			</thead>
			<tbody>
				{#each MESSAGES as [kind, pattern, example]}
					<tr><td class="k">{kind}</td><td>{pattern}</td><td class="ex">{example}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="muted">
		Error codes and technical details belong in a details section or the log, never in the
		headline. Don't apologise, and don't thank people for waiting.
	</p>
</section>

<section>
	<h2>Numbers, units and time</h2>
	<ul>
		<li>Sizes use decimal units, one decimal under 10: “2.1 GB”, “84 KB”, “412 GB” — with a space, a non-breaking one in the interface.</li>
		<li>Percentages have no space: “72%”.</li>
		<li>Durations take the largest sensible unit: “45 min”, “about 2 minutes”, “1 h 20 min”.</li>
		<li>Recent things are relative — “now”, “2 min ago”, “Yesterday” — and then dated.</li>
		<li>Dates and times follow the locale; numbers that change in place use tabular figures so nothing shifts.</li>
	</ul>
</section>

<section>
	<h2>Georgian</h2>
	<ul>
		<li>Georgian runs about 30% longer than English. Buttons and labels grow; they never truncate.</li>
		<li>
			There are no capitals in running text, so no uppercase transform may ever touch it — CSS and
			Qt would turn Mkhedruli into Mtavruli. An overline header in Georgian keeps its letters and
			only its letter spacing.
		</li>
		<li>Noto Sans Georgian is the fallback in both font stacks; check that line heights still fit.</li>
		<li>Georgian uses 24-hour time and day-month order, and the keyboard indicator reads “GE”.</li>
	</ul>
</section>

<section>
	<h2>Word list</h2>
	<p>The short list that keeps one thing from having two names.</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Use</th><th>Don't use</th></tr>
			</thead>
			<tbody>
				{#each WORDS as [use, dont]}
					<tr><td class="k">{use}</td><td class="no">{dont}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<PageNav flat={FLAT} />

<style>
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 50rem;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 28rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	th {
		text-align: left;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-muted);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		background: var(--surface-base);
		border-bottom: var(--border-width-1) solid var(--border-subtle);
	}
	td {
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		color: var(--text-secondary);
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	.k {
		color: var(--text-primary);
		white-space: nowrap;
	}
	.ex {
		color: var(--text-primary);
	}
	.no {
		color: var(--text-muted);
	}
</style>
