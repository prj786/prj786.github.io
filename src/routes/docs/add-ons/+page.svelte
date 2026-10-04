<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Icon from '$lib/Icon.svelte';
	import { ADDONS, GITHUB } from '$lib/docs/addons.js';
</script>

<svelte:head>
	<title>Add-ons — ewe docs</title>
	<meta
		name="description"
		content="The thirteen official ewe add-ons — dock, music, Places, phone, mail, VPN, SSH, Cast to TV, Insomnia, system monitor, clipboard, screenshot, passwords — what each one is, how to get one, and what an upgrade keeps."
	/>
</svelte:head>

<p class="eyebrow">Get started</p>
<h1>Add-ons.</h1>
<p class="lede">
	A fresh ewe is the smallest honest desktop: the bar, the launcher, the Overview, Quick settings,
	notifications, lock screen and the three apps — Settings, Komble and ewe-sync. Everything else
	ewe makes is an <strong>add-on</strong>: it ships inside ewe, works offline, and is installed only
	when you ask. Pick what your desk needs and nothing else.
</p>

<section>
	<h2>Getting one</h2>
	<p>Four doors, one result — the add-on appears after the shell restarts for a second.</p>
	<dl class="rows">
		<div class="row">
			<dt><Icon name="hard-drive" size={16} />The installer</dt>
			<dd>The <strong>Add-ons</strong> screen, after your account. Nothing is pre-checked; an empty pick is a fine answer. <a href="/docs/install/">The screens →</a></dd>
		</div>
		<div class="row">
			<dt><Icon name="circle-user" size={16} />The Welcome screen</dt>
			<dd>The first login's last step offers the same list, with <em>Install selected</em> and <em>Browse in Komble</em>. <a href="/docs/first-login/">First login →</a></dd>
		</div>
		<div class="row">
			<dt><Icon name="package" size={16} />Komble → Add-ons</dt>
			<dd>Every add-on as a card, one click to install, its settings as a form. A package an add-on needs — KDE Connect for Phone, the casting engine for Cast — is installed for you in the same step.</dd>
		</div>
		<div class="row">
			<dt><Icon name="terminal" size={16} />The terminal</dt>
			<dd><code>ewe-plugin install &lt;id&gt;</code>. <a href="/docs/cli/ewe-plugin/">The reference →</a></dd>
		</div>
	</dl>
	<Code
		code={`ewe-plugin list --json | jq '.available[].id'   # what ewe carries
ewe-plugin install ewe.dock                      # one add-on, on
ewe-plugin set ewe.insomnia auto_off 30          # its settings, like any plugin
ewe-plugin remove ewe.dock                       # gone, and an update leaves it out`}
	/>
	<p>
		Once installed, an add-on is an ordinary <a href="/docs/plugins/">plugin</a> with source
		<code>bundled</code>: turn it off, change its settings in Komble, remove it for good. A removal
		is remembered in <code>[plugins].removed</code> of <a href="/docs/one-file/">the one file</a>,
		so the next ewe update does not put it back — <code>install</code> does. A newer ewe refreshes
		an installed add-on's copy when its version changes.
	</p>
</section>

<section>
	<h2>The thirteen</h2>
	<p>
		Each one has its own repository under <a href="{GITHUB}">prj786</a> and a one-sentence job.
		The shell's legacy names still work once the add-on is installed — <code>qs ipc call cast
		toggle</code>, <code>quicksettings tab mail</code> — so old keybinds and scripts need no change.
	</p>
	<div class="catalogue">
		{#each ADDONS as a}
			<article class="card">
				<header>
					<span class="ico"><Icon name={a.icon} size={18} /></span>
					<h3>{a.name}</h3>
					<code class="id">{a.id}</code>
				</header>
				<p>{a.blurb}</p>
				<dl class="facts">
					<div><dt>Shows</dt><dd>{a.shows}</dd></div>
					{#if a.keys}<div><dt>Keys</dt><dd>{a.keys}</dd></div>{/if}
					{#if a.needs}<div><dt>Needs</dt><dd><code>{a.needs}</code></dd></div>{/if}
				</dl>
				{#if a.note}<p class="note">{a.note}</p>{/if}
				<a class="repo" href="{GITHUB}{a.repo}">{a.repo} <Icon name="arrow-right" size={13} /></a>
			</article>
		{/each}
	</div>
</section>

<section>
	<h2>What an upgrade keeps</h2>
	<p>
		Before 0.25 most of these were built into the shell. Moving a feature out must not take it
		away from the people who had it, so the first login after the update runs a one-time
		migration: every add-on that replaces a built-in feature is installed and enabled — the dock
		only if it was on, and never one you had removed. A fresh install records the same list as
		considered and installs none.
	</p>
	<Code
		code={`ewe-plugin migrate            # what ewe-setup ran for you; safe to run again
cat ~/.local/state/ewe/addons-migrated   # the ids already considered — local, never synced`}
	/>
	<Callout title="Where did my dock go?">
		<p>
			On a <em>fresh</em> install, nowhere — it was never there. The dock is an add-on like the
			others: Komble → Add-ons → Dock, or <code>ewe-plugin install ewe.dock</code>. Until then
			the launcher is <kbd>Super</kbd>+<kbd>D</kbd>, the Overview is a tap of <kbd>Super</kbd>,
			and Settings → Layout says so in one sentence instead of showing dock controls.
		</p>
	</Callout>
</section>

<section>
	<h2>Why not preinstall them</h2>
	<p>
		Every extra is a choice you make, visibly, from a list that explains it — the opposite of a
		desktop that grows features nobody asked for. It also keeps the shell core small, so there are
		fewer places for an error to take the desktop down, and gives every feature its own repository
		and release line. The trade-off is one honest screen at install time, and it is skippable.
	</p>
	<p>
		The <a href="/docs/plugins/">plugin</a> pages are for making your own. The add-ons are built on
		exactly that API, and their repositories are the worked examples.
	</p>
</section>

<PageNav />

<style>
	.catalogue {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-md);
	}
	.catalogue .card {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}
	header {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: auto auto;
		column-gap: var(--space-s);
		align-items: center;
	}
	.ico {
		grid-row: 1 / span 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--primary);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	header h3 {
		margin: 0;
	}
	.id {
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: none;
		border: 0;
		padding: 0;
	}
	.catalogue p {
		margin: 0;
	}
	.facts {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
	}
	.facts div {
		display: flex;
		gap: var(--space-s);
	}
	.facts dt {
		flex: none;
		width: 3.2rem;
		color: var(--text-muted);
	}
	.facts dd {
		margin: 0;
		color: var(--text-secondary);
	}
	.facts code {
		font-size: 0.9em;
	}
	.note {
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
		color: var(--text-muted);
	}
	.repo {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: var(--space-xxs);
		font-size: var(--font-size-s);
		font-family: var(--font-mono);
		color: var(--text-secondary);
		text-decoration: none;
	}
	.repo:hover {
		color: var(--accent-text);
	}
</style>
