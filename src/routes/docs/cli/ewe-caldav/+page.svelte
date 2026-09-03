<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import CommandTable from '$lib/docs/CommandTable.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const verbs = [
		{ cmd: 'events', args: '[--days N] [--no-cache]', does: 'Upcoming events from every calendar in the account. Seven days by default; N is clamped between 1 and 60. --no-cache forces a fetch.', prints: 'ok, events, offline, fetched_at' },
		{ cmd: 'calendars', does: 'The calendars the account holds, with their display names and colours.', prints: 'ok, calendars' },
		{ cmd: 'parse', args: '<file.ics>', does: 'Parse a local iCalendar file into the same event shape. For debugging what a server sent.', prints: 'the parsed events' }
	];
</script>

<svelte:head>
	<title>ewe-caldav — ewe docs</title>
	<meta
		name="description"
		content="ewe-caldav reads upcoming events from the Nextcloud account over plain CalDAV — no vendor API and no extra scope — for the shell's calendar widget."
	/>
</svelte:head>

<p class="eyebrow">CLI reference</p>
<h1><code class="title">ewe-caldav</code></h1>
<p class="lede">The calendar of your account, over plain CalDAV.</p>

<section>
	<h2>Why it exists</h2>
	<p>
		The calendar in the top bar has to come from somewhere, and tying it to one vendor's interface
		would mean asking that vendor for permission. CalDAV is an open standard your Nextcloud already
		speaks, so the widget reads events over it with no extra scope, no application registration and
		no third party in the middle.
	</p>
	<p>
		It reuses the account you are already signed in to: the credential comes from
		<a href="/docs/cli/ewe-cloud/">ewe-cloud</a>, so the app password never leaves the keyring except
		through that one call.
	</p>
</section>

<section>
	<h2>Synopsis</h2>
	<Code code={'ewe-caldav events [--days N] [--no-cache] | calendars | parse <file.ics>'} copyable={false} />
	<p class="muted">With no command, <code>events</code> is assumed.</p>
</section>

<section>
	<h2>Commands</h2>
	<CommandTable rows={verbs} />
</section>

<section>
	<h2>The event shape</h2>
	<p>
		One shape for every source, so the shell speaks it whether events came from CalDAV or elsewhere.
		Timed events carry ISO 8601 timestamps with an offset; all-day events are plain dates, and the
		end is exclusive, as iCalendar has it.
	</p>
	<Code
		code={`{"ok": true, "offline": false, "fetched_at": "2026-09-03T09:12:04Z",
 "events": [
   {"id": "…", "summary": "Design review", "start": "2026-09-03T14:00:00+04:00",
    "end": "2026-09-03T15:00:00+04:00", "allDay": false, "location": "",
    "video": "https://meet.example.org/abc", "color": "#0a84ff",
    "calendar": "Personal", "reminders": [10]}
 ]}`}
		copyable={false}
	/>
</section>

<section>
	<h2>Caching and offline</h2>
	<p>
		The last good fetch is kept in <code>~/.cache/ewe/caldav-events.json</code> for five minutes. When
		the server cannot be reached, that copy is returned with <code>offline: true</code> rather than an
		error, so the widget keeps showing yesterday's answer instead of going blank.
	</p>
</section>

<section>
	<h2>Errors</h2>
	<dl class="rows">
		<div class="row"><dt><code>not-signed-in</code></dt><dd>No account. Sign in with <a href="/docs/cli/ewe-cloud/">ewe-cloud</a> first.</dd></div>
		<div class="row"><dt><code>unauthorized</code></dt><dd>The server rejected the credential — usually a revoked app password.</dd></div>
		<div class="row"><dt><code>usage</code></dt><dd>An unknown command.</dd></div>
	</dl>
	<p class="muted">Every command exits 0 and prints one JSON object, failure included.</p>
</section>

<section>
	<h2>How it finds your calendars</h2>
	<Callout>
		<p>
			It looks in <code>&lt;server&gt;/remote.php/dav/calendars/&lt;user&gt;/</code>, which is
			Nextcloud's convention, rather than discovering the principal first. Recurring events are
			expanded by the server, so every event it returns is one concrete instance.
		</p>
	</Callout>
</section>

<section>
	<h2>See also</h2>
	<ul>
		<li><a href="/docs/account/mail-calendar/">Mail &amp; calendar</a> — how both cards get their data.</li>
		<li><a href="/docs/cli/ewe-cloud/">ewe-cloud</a> — the account this reads from.</li>
	</ul>
</section>

<PageNav />

<style>
	code.title {
		font-size: 0.62em;
		background: var(--elevated);
		border-color: var(--stroke);
		padding: 0.15em 0.4em;
	}
</style>
