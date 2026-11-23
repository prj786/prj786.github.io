<script>
	import Icon from '$lib/Icon.svelte';
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import { APPS, RELEASED } from '$lib/apps/apps.js';

	const asOf = RELEASED.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
</script>

<svelte:head>
	<title>Apps — ewe</title>
	<meta
		name="description"
		content="Apps for ewe, one small file each: double-click the file and press Install, move it to the Trash and the app is gone, restore it and it's back. With eep, ewe's new app manager."
	/>
</svelte:head>

<div class="wrap page">
	<p class="eyebrow">Apps <span class="badge warning">Beta</span></p>
	<h1>One app, one file.</h1>
	<p class="lede">
		Press <strong>Get</strong> and you have a small file. Double-click it, press
		<strong>Install</strong>, and the app arrives, keeping its file in your Applications folder. Move
		that file to the Trash and the app is gone.
	</p>

	<Callout title="eep comes with ewe">
		<p>
			These apps come with <strong>eep</strong>, ewe's app manager. It's part of ewe from 0.49 on:
			update ewe (Komble's Updates, or <code>sudo pacman -Syu</code>), then sign out and back in.
			After that, every app here installs with a double-click — or straight from Komble. eep is new,
			so it's a beta.
		</p>
	</Callout>

	<p>
		<strong>Your other apps have a file too.</strong> The apps you already have — ewe's own, the
		ones from Komble, your games — each get a file in Applications. Move one to the Trash and that
		app leaves the launcher; restore it and it's back. Nothing is uninstalled that way: Komble still
		does that.
	</p>

	<!-- ── the apps ─────────────────────────────────────────────────────── -->
	<section id="get">
		<h2>Get an app.</h2>
		<ul class="apps">
			{#each APPS as app (app.id)}
				<li class="card app">
					<div class="head">
						{#if app.icon}
							<img class="ico" src={app.icon} alt="" width="48" height="48" loading="lazy" decoding="async" />
						{:else}
							<span class="ico glyph"><Icon name="square-terminal" size={24} /></span>
						{/if}
						<div class="title">
							<h3>{app.name}</h3>
							<span class="ver">{app.version}</span>
						</div>
						{#if app.kind === 'cli'}<span class="badge">Terminal</span>{/if}
					</div>
					<p>{app.blurb}</p>
					<div class="foot">
						<span class="size">{app.size}</span>
						<a class="btn" href={app.card} download={app.file} aria-label="Get {app.name}">
							<Icon name="download" size={16} /> Get
						</a>
					</div>
				</li>
			{/each}
		</ul>
		<p class="muted under">
			Sizes are what an app downloads when it installs. Apps share parts, so after your first one,
			each downloads less. Versions as of {asOf}.
		</p>
	</section>

	<!-- ── how it works ─────────────────────────────────────────────────── -->
	<section id="how">
		<p class="eyebrow">How it works</p>
		<h2>Install, remove, restore.</h2>
		<ol class="steps">
			<li>
				<span class="ico-step"><Icon name="download" size={16} /></span>
				<div>
					<h3>Get it</h3>
					<p>
						Press <strong>Get</strong> next to an app. A small file named after it, such as
						<code>Firefox.eep</code>, lands in your Downloads folder.
					</p>
				</div>
			</li>
			<li>
				<span class="ico-step"><Icon name="mouse-pointer-click" size={16} /></span>
				<div>
					<h3>Open it</h3>
					<p>
						Double-click the file and press <strong>Install</strong>: you see how far the download
						is, then <strong>Open</strong> starts the app. Or drag the file into your
						<strong>Applications</strong> folder: it shows its progress there and then appears in
						the launcher. Either way, the app's file ends up in Applications — that file is the app.
					</p>
				</div>
			</li>
			<li>
				<span class="ico-step"><Icon name="trash-2" size={16} /></span>
				<div>
					<h3>Remove it</h3>
					<p>
						Move the app's file from Applications to the Trash. The app leaves the launcher at
						once.
					</p>
				</div>
			</li>
			<li>
				<span class="ico-step"><Icon name="undo-2" size={16} /></span>
				<div>
					<h3>Changed your mind?</h3>
					<p>
						Restore the file from the Trash and the app is back straight away, with nothing to
						download. Empty the Trash and the space the app used is freed by itself.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- ── updates ──────────────────────────────────────────────────────── -->
	<section id="updates">
		<p class="eyebrow">Updates</p>
		<h2>Small updates.</h2>
		<p>
			eep checks for new versions by itself, every few hours. An update downloads only the parts of an
			app that changed: in a test, a week of updates for five apps came to
			<strong>129 MB instead of 542 MB</strong>.
		</p>
		<p>
			An app you have open keeps working while it updates; the next time you start it, it's the new
			version. And apps from eep start as quickly as the same apps installed the usual way.
		</p>
		<p class="note">
			Updates show up in Komble with the rest of your updates (or run <code>eep update</code>,
			below).
		</p>
	</section>

	<!-- ── where they come from ─────────────────────────────────────────── -->
	<section id="source">
		<p class="eyebrow">Where they come from</p>
		<h2>Ready-built, and current.</h2>
		<p>
			The apps come ready-built from <a href="https://nixos.org">NixOS</a>, a project that packages a
			huge range of free software and keeps it up to date. Every download is checked against NixOS's
			signature before it's used.
		</p>
		<p>
			Apps that aren't free software — Chrome, Steam or Discord, say — aren't offered this way.
			<a href="/docs/apps/komble/">Komble</a> has them.
		</p>
	</section>

	<!-- ── the terminal, folded away ────────────────────────────────────── -->
	<section id="terminal">
		<details>
			<summary><Icon name="square-terminal" size={16} /> From a terminal</summary>
			<div class="det">
				<p>Everything above is also one command. Each one prints its answer as JSON.</p>
				<Code
					code={`eep install firefox     # get an app
eep remove firefox      # remove it
eep list --all          # every app with a file, the ones you already had too
eep list                # the apps you have
eep update              # install waiting updates
eep rollback firefox    # back to the version before (kept for a week)
eep gc                  # free removed apps' space now (it also happens by itself)`}
				/>
			</div>
		</details>
	</section>
</div>

<style>
	/* the preview note is a Callout (an aside), which app.css's
	   section rhythm can't see — it owns the gap to the apps */
	:global(.callout) + section {
		margin-top: var(--space-lg);
	}

	/* the Badge: a small label that can't be clicked — Preview, Terminal */
	.badge {
		display: inline-block;
		vertical-align: middle;
		margin-left: var(--space-s);
		padding: 0 var(--space-xs);
		border-radius: var(--fully-rounded);
		background: var(--surface-hover);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		line-height: var(--line-height-s);
		font-weight: var(--font-weight-medium);
		letter-spacing: normal;
		text-transform: none;
		white-space: nowrap;
	}
	.badge.warning {
		background: var(--warning-subtle);
		color: var(--warning);
	}

	/* ── the grid of apps (cards) ────────────────────────────────────── */
	.apps {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		max-width: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: var(--space-md);
	}
	.app {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}
	.head {
		display: flex;
		align-items: center;
		gap: calc(var(--space-s) + var(--space-xs));
		min-width: 0;
	}
	.ico {
		flex: none;
		width: var(--icon-3xl);
		height: var(--icon-3xl);
		object-fit: contain;
	}
	.glyph {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--rounded);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.title {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.title h3 {
		margin: 0;
		overflow-wrap: anywhere;
	}
	.ver {
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
		overflow-wrap: anywhere;
	}
	.head .badge {
		margin-left: auto;
		align-self: flex-start;
	}
	.foot {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		padding-top: var(--space-xs);
	}
	.size {
		font-size: var(--font-size-s);
		line-height: var(--line-height-s);
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}
	.under {
		margin-top: calc(var(--space-s) + var(--space-xs));
	}

	/* ── the steps (as on the download page, a glyph for the number) ─── */
	.steps {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		max-width: 44rem;
	}
	.steps li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		background: var(--surface-raised);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		padding: calc(var(--space-s) + var(--space-xs));
		margin: 0;
	}
	.ico-step {
		flex: none;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		display: grid;
		place-items: center;
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.steps h3 {
		margin-bottom: var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.steps p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		margin: 0;
	}

	/* ── the folded terminal commands (the Accordion) ────────────────── */
	details {
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		background: var(--surface-raised);
		max-width: 44rem;
	}
	summary {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		min-height: var(--control-xl);
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		cursor: pointer;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		border-radius: var(--rounded);
	}
	summary:hover {
		background: var(--surface-hover);
	}
	summary :global(.icon) {
		color: var(--text-secondary);
	}
	.det {
		padding: 0 calc(var(--space-s) + var(--space-xs)) calc(var(--space-s) + var(--space-xs));
	}
	.det p {
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	.det :global(.block) {
		max-width: none;
	}
</style>
