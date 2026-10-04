<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';

	const theme = [
		['Surfaces', 'surfaceBase, surfaceRaised, surfaceOverlay, surfaceSunken, surfaceHover, surfacePressed, surfaceSelected'],
		['Text', 'textPrimary, textSecondary, textMuted, textDisabled'],
		['Borders & focus', 'borderSubtle, borderStrong, focusRing; borderWidth1, borderWidth2, focusWidth, fieldBorderWidth'],
		['Accent', 'accent, accentHover, accentPressed, accentSubtle, accentText, onAccent; the ewellow50 … ewellow950 ramp'],
		['Status', 'success, warning, danger, info — and successSubtle, warningSubtle, dangerSubtle, infoSubtle; onStatus'],
		['Glass & depth', 'glassBase, glassRaised, glassBorder, glassHover, glassPressed, glassAccent; scrim, shadowSm, shadowFloat'],
		['The bar & dock', 'barGround, barOutline, barHoverFill, barPressedFill, barAccentText, barTextMuted; barModule, barIcon, barHeight; dockGround, dockOutline'],
		['Space & radii', 'spaceXxs, spaceXs, spaceS, spaceMd, spaceLg, spaceXl; radiusSlight, radiusSecondary, radiusPrimary, radiusRounded, radiusFull'],
		['Sizes', 'controlSm … control2xl, iconXs … icon4xl, panelSm, panelMd, panelLg, windowGap'],
		['Type', 'fontSans, fontMono, fontIcons; fontSizeXs … fontSize6xl, lineHeight*, fontWeight*; the styles as Theme.type.<style> (body, label, caption, overline, h1 …)'],
		['Motion & modes', 'durFast, durBase, durSlow, ease, easeFast, easeSlow, slideOffset; reduceMotion, textScale …'],
		['Icons', 'the ic* Lucide glyphs — icSun, icWifi, icBell, icStar … — drawn with fontIcons']
	];

	// API 1 (the Fluent-era names) → API 2 (the Ewe names)
	const renames = [
		['bg1 · bgDisabled · card · panel', 'surfaceRaised'],
		['bg2 · bg3', 'surfaceBase'],
		['bg4 · bg5', 'surfaceSunken'],
		['bg6', 'surfaceOverlay'],
		['bgNHover · cardHover · subtleHover', 'surfaceHover'],
		['bgNPressed · cardPressed · subtlePressed', 'surfacePressed'],
		['bgNSelected · cardSelected · subtleSelected', 'accentSubtle'],
		['subtle', '"transparent"'],
		['stroke1 · stroke1Pressed · strokeAccessible', 'borderStrong'],
		['stroke1Hover', 'textMuted'],
		['stroke1Selected', 'accentText'],
		['stroke2 · stroke3 · strokeDisabled · cardStroke', 'borderSubtle'],
		['strokeFocus2 · brandStroke1 · compoundBrandStroke', 'focusRing'],
		['strokeFocus1', null, 'Removed. Ewe draws one focus ring.'],
		['fg1 · fg2Hover · fg3Hover', 'textPrimary'],
		['fg2', 'textSecondary'],
		['fg3 · fg4', 'textMuted'],
		['fgDisabled', 'textDisabled'],
		['fgInverted · fgOnBrand · accentOn', 'onAccent'],
		['brandBg · compoundBrandBg · accentFill · linkSolid', 'accent'],
		['brandBgHover · compoundBrandBgHover', 'accentHover'],
		['brandBgPressed · brandBgSelected · compoundBrandBgPressed', 'accentPressed'],
		['brandFg1 · brandFg2 · brandFgLink · brandFgLinkHover · compoundBrandFg · link', 'accentText'],
		['brandStroke2', 'ewellow900'],
		['successBg · warningBg · dangerBg · infoBg', 'successSubtle · warningSubtle · dangerSubtle · infoSubtle'],
		['successBorder · warningBorder · dangerBorder · infoBorder', 'success · warning · danger · info'],
		['shadow', 'scrim', 'For a dim backdrop. For elevation, shadowFloat.color.'],
		['barTop · barBottom · barFill', 'barGround'],
		['barBorder', 'barOutline'],
		['dockFill', 'dockGround'],
		['dockStroke', 'dockOutline'],
		['barHover', 'barHoverFill'],
		['barActive', 'barPressedFill'],
		['barItemRadius · radiusInner · radiusControl', 'radiusPrimary'],
		['barItemHeight', 'barModule'],
		['barIconPx · trayIconPx', 'barIcon'],
		['barCellPx', 'barIcon + spaceXxs'],
		['barItemSpacing · trayItemSpacing', 'spaceXs'],
		['barItemPad · gap', 'spaceS'],
		['pad', 'spaceS + spaceXs'],
		['fontText · fontDisplay', 'fontSans'],
		['fsSmall · fsBody · fsLarge · fsTitle', 'fontSizeS · fontSizeMd · fontSizeLg · fontSize2xl', 'Better: a type style, Theme.type.<style>.'],
		['labelWeight', 'fontWeightMedium'],
		['labelCaps · labelTracking', 'Theme.type.overline'],
		['radius', 'radiusRounded'],
		['radiusPill', 'radiusFull'],
		['outline · border · borderThin · hairline · cardBorder', 'borderWidth1'],
		['hoverInset', 'Math.max(1, borderWidth1)'],
		['shadowOffset', null, 'Removed.'],
		['rowHeight · controlHeight', 'controlMd']
	];

	// The Shell singleton — API 3's front door. Rows: [member, meaning]
	const shellReads = [
		['apiVersion', '3.'],
		['overviewOpen · quickSettingsOpen · lowPower · onBattery · locked · dnd', 'Shell state, bindable.'],
		['bottomInset · bottomReserved · dockPresent', 'The pixels a dock takes from the bottom of the screen (0 without one), whether it reserves that strip, and the shorthand. A panel that opens above the dock keeps bottomInset clear, so nothing leaves a gap when no dock is installed.'],
		['dockPrefs · pinnedApps · primaryScreenName', 'The user’s [desktop.dock] prefs, the pinned desktop ids, the primary output — what a dock plugin obeys. Read-only; Settings and ewe-conf write them.'],
		['dockItems · activeCount', 'The dock-item registry of every enabled plugin, in order; how many actions report themselves open (an autohide dock stays out while > 0).']
	];
	const shellCalls = [
		['toast(text, kind)', 'A bottom-centre toast; kind is "", "info", "warning" or "danger", or an options object with actionLabel, action, icon, timeout.'],
		['openQuickSettings(tab) · closeQuickSettings()', 'A built-in key or a plugin page’s quickPage.key — the same route as qs ipc call quicksettings tab <key>.'],
		['openSettings(page) · openStore(page)', 'ewe-settings and Komble, focused if already open; page is forwarded (komble --addons, ewe-settings --page …).'],
		['toggleOverview()', 'Open or close the Overview in-shell — what a dock’s Overview button does.'],
		['launch(desktopId) · focusApp([classes])', 'Run a .desktop id (focusing an existing window first); bring a window of one of these classes forward. false when unknown.'],
		['registerAction(name, fn) · runAction(name, anchor)', 'A named function a dockItem.action names, and how the dock — or another plugin — runs it.'],
		['setActive(name, on) · isActive(name)', 'An action’s open state; its dock item lights. AnchoredPopup reports it for you through action.'],
		['setDockItemShown(id, on) · dockItemShown(id)', 'Hide or show your own dock item at runtime — a player with nothing playing, a “bar only” setting.'],
		['closePopups(exceptId)', 'The one-popup rule: asks every add-on popup but exceptId’s to close. AnchoredPopup honours it and calls it when it opens; a plugin with its own PanelWindow listens to popupsClosing and calls it on open.'],
		['setBottomInset(id, px, reserved) · setPinned(desktopId, on)', 'What a dock plugin publishes (0 withdraws it); pin or unpin an app through ewe-conf.'],
		['anchorFor(item, window)', 'An anchor for a popup — the item’s centre in its window and the edge, "top" or "bottom". Pass barWindow or your own PanelWindow.']
	];
	const shellSignals = [
		['aboutToSleep() · resumed()', 'The system is about to suspend; the wake sequence reached its network step (about three seconds after wake — refresh what you cache then).'],
		['popupsClosing(exceptId)', 'Another popup is opening: close yours unless exceptId is your plugin id.']
	];

	const components = [
		['Tile', 'The Quick settings tile: ic, label, sub, active, opened, hasMenu, busy, disabled; clicked, menu. Root a quick-tile on it.'],
		['QsPageHead', 'A page’s head: back, title, note, busy, an optional switch; actions as children.'],
		['QsSwitchRow · QsButton · QsIconButton · QsSegmented', 'The row with a switch; the button (primary, secondary, ghost, danger); the icon button; the segmented control.'],
		['QsField + QsFieldInput · QsEmpty · QsNote · QsMsgRow', 'A text field and its input; the empty state; a caption under a list; a two-line message row.'],
		['TextBody · TextStrong · TextCaption · TextMono · Glyph', 'Text in the system’s styles, and one icon-font glyph.'],
		['BarModule · BarSep · BarStatusGlyph', 'The bar’s module, divider and pill glyph (ink, shown).'],
		['AnchoredPopup', 'A popup card for a plugin: openAt, toggleAt, close; open, name, owner, action, implicitWidth/Height, content as children. One PanelWindow on the anchor’s screen, above the dock or under the bar, closed by Esc or a click outside, one at a time.'],
		['Toggle · Slider · Meter · ListWell · ListRow · SectionTitle · Badge · Spinner · Avatar · Elevation', 'The rest of the kit the first-party panels are built from.']
	];

	const injected = [
		['pluginId · pluginDir · stateDir', 'Your id; a file:// url to your directory; ~/.local/state/ewe/plugins/<id>, created when first asked for and never synced.'],
		['settings', 'The declared settings as {key: value}, pushed again live on every change.'],
		['screen · barWindow', 'The output and the bar window a bar slot sits in (bar-widget, bar-status) — hand barWindow to Shell.anchorFor().'],
		['ink', 'The pill’s current glyph colour (bar-status): textSecondary, textPrimary while hovered or open.'],
		['panelOpen', 'This tile or page is on screen (quick-tile, quick-page) — poll only while true.']
	];

	const reads = [
		['version', 'The desktop version, e.g. "0.25.0-beta".'],
		['accentColor', 'The user’s accent. Theme.accent already follows it; read this only to react to a change.'],
		['dnd', 'Do not disturb is on.'],
		['onBattery · lowPower', 'Unplugged; and the low-power mode the shell enters on battery.'],
		['locked', 'The session lock is up — stop animating, stop polling.'],
		['barShows(key)', 'Whether a bar indicator is shown; your widget’s key is plugin:<id>.']
	];
	const calls = [
		['openSettings() · openStore()', 'The settings app; Komble.'],
		['launchEntry(desktopId)', 'Launch an application by its .desktop id.'],
		['focusWindowByClass(cls)', 'Focus a running window by its class.'],
		['playSound(name)', 'One of the shell’s event sounds, respecting the user’s setting.']
	];
</script>

<svelte:head>
	<title>What a plugin may use — ewe docs</title>
	<meta
		name="description"
		content="The public API of the ewe shell for plugins, version 3: the Shell singleton, the public components, the injected properties, every Theme role, the Globals subset, Log, IPC, what is private, and how to move from API 1 or 2."
	/>
</svelte:head>

<p class="eyebrow">Plugins</p>
<h1>What a plugin may use.</h1>
<p class="lede">
	<code>import qs</code> gives a plugin the shell's own modules. Of what it sees, this page is what
	is <strong>public</strong> — it will not change without the plugin <code>apiVersion</code> moving.
	Everything else is internal and may be renamed without notice. The API is <code>3</code>; the
	shell still loads <code>2</code>.
</p>

<section>
	<h2>The <code>Shell</code> singleton</h2>
	<p>
		API 3's front door: what the shell knows that a plugin may react to, and the few things a plugin
		may ask it to do. Every add-on goes through it; a dock plugin is <em>only</em> a reader of
		<code>dockPrefs</code>, <code>pinnedApps</code> and <code>dockItems</code> and a publisher of
		<code>bottomInset</code>.
	</p>
	<p>Read:</p>
	<dl class="rows">
		{#each shellReads as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<p>Call:</p>
	<dl class="rows">
		{#each shellCalls as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<p>Signals:</p>
	<dl class="rows">
		{#each shellSignals as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<Code
		code={`Shell.toast("Forecast updated")
Shell.openQuickSettings("weather")                       // your page's key
Shell.registerAction("acme.weather.toggle", (a) => pop.toggleAt(a))
Connections { target: Shell; function onResumed() { root.fetch() } }`}
		copyable={false}
	/>
</section>

<section>
	<h2>Public components</h2>
	<p>
		The kit the first-party panels are built from. Root your entry points on these and they follow
		Glass, the look presets, text size and the one-popup rule without a line of yours.
	</p>
	<dl class="rows">
		{#each components as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
</section>

<section>
	<h2>Injected properties</h2>
	<p>
		Set on your entry point's root by the host — but only when the root <em>declares</em> them, so
		a plugin that does not care is not touched.
	</p>
	<dl class="rows">
		{#each injected as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
</section>

<section>
	<h2><code>Theme</code> — every role</h2>
	<p>
		The whole vocabulary is public, under the QML names of the Ewe design system. Ask for a role,
		never a value: the scheme, the accent and the look presets are the user's and change at
		runtime, and a plugin that uses roles changes with the desktop.
	</p>
	<dl class="rows">
		{#each theme as [group, roles]}
			<div class="row"><dt>{group}</dt><dd><code class="soft">{roles}</code></dd></div>
		{/each}
	</dl>
	<Code
		code={`Rectangle { color: Theme.surfaceRaised; radius: Theme.radiusRounded
            border.width: Theme.borderWidth1; border.color: Theme.borderSubtle }
Text { color: Theme.textPrimary; font.family: Theme.type.body.family
       font.pixelSize: Theme.type.body.size; font.weight: Theme.type.body.weight }
Text { text: Theme.icBell; font.family: Theme.fontIcons; font.pixelSize: Theme.barIcon }`}
		copyable={false}
	/>
	<p>
		In the bar, use the <code>bar*</code> roles rather than the surface roles. They already follow
		Glass, so a widget never has to ask whether Glass is on.
	</p>
</section>

<section>
	<h2><code>Globals</code> — the API 2 subset</h2>
	<p>
		Unchanged since API 2, and still public. New code should prefer <code>Shell</code>:
		<code>Shell.launch(desktopId)</code> takes an id where <code>launchEntry</code> wants a
		Quickshell <code>DesktopEntry</code>.
	</p>
	<p>Read:</p>
	<dl class="rows">
		{#each reads as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<p>Call:</p>
	<dl class="rows">
		{#each calls as [name, meaning]}
			<div class="row"><dt><code>{name}</code></dt><dd>{meaning}</dd></div>
		{/each}
	</dl>
	<Callout type="warning" title="Private, on purpose">
		<p>
			The <code>*Open</code> flags, the notification <code>server</code>, the updater and anything
			beginning with an underscore are the shell's own. A plugin that flips
			<code>settingsOpen</code> works today and breaks silently in a release — use
			<code>openSettings()</code>.
		</p>
	</Callout>
</section>

<section>
	<h2><code>Log</code></h2>
	<Code
		code={`Log.info("acme.weather", "fetched", n, "stations")
Log.warn("acme.weather", "no network")
Log.debug("acme.weather", "raw", payload)      // HS_LOG_MODULES=acme.weather to see`}
		copyable={false}
	/>
	<p>
		Lines land in the shell's journal — <code>journalctl --user -u ewe.service</code> — prefixed
		with your module name, so they can be filtered like the shell's own.
	</p>
</section>

<section>
	<h2><code>settings</code> — what the user chose</h2>
	<p>
		Declare <code>property var settings: ({'{'}{'}'})</code> on any entry point's root and ewe fills it
		with the values of the options your manifest declares — the defaults under the user's own,
		read from <code>ewe.conf</code> <code>[plugins.settings]</code>. It is assigned when the entry
		point loads and again whenever a value changes (<code>ewe-plugin set</code>, Komble's form), so
		bind to it and nothing needs a restart. Keys you did not declare never appear.
	</p>

	<h2>IPC</h2>
	<p>
		Anything a keybind or a script should reach is an <code>IpcHandler</code> in your entry point.
		Name the target after your id.
	</p>
	<Code
		code={`IpcHandler {
    target: "acme.weather"
    function toggle(): void { root.shown = !root.shown }
    function refresh(): void { root.fetch() }
}`}
		copyable={false}
	/>
	<Code
		code={`qs ipc call acme.weather toggle
qs ipc call plugins list           # what the host loaded, as JSON
qs ipc call plugins safeMode       # did this session boot with plugins off`}
	/>
	<p>
		The shell's own targets — <code>bar</code>, <code>quicksettings</code>, <code>settings</code>,
		<code>store</code>, <code>plugins</code>, <code>overview</code>, <code>osd</code> and friends —
		are documented in the manual and are public API too. The old names of the features that became
		add-ons (<code>cast</code>, <code>launcher</code>, <code>places</code>, <code>player</code>,
		<code>mail</code>) are their <code>ipcAliases</code>: present while the add-on is installed,
		reserved to add-ons. With API 3 a manifest keybind's target must be your own id.
	</p>
</section>

<section>
	<h2>Quickshell itself</h2>
	<p>
		It is the same engine, so everything Quickshell offers is available: <code>PanelWindow</code>,
		<code>Process</code>, <code>FileView</code>, the D-Bus, Hyprland, UPower and Bluetooth
		services. The <a href="https://quickshell.org/docs/">Quickshell documentation</a> is the
		reference; the shell's components in <code>~/.config/quickshell/</code> are the worked
		examples.
	</p>
</section>

<section>
	<h2>Versioning</h2>
	<p>
		The plugin API is <code>3</code>. It changes only when something on this page changes in a way
		that breaks plugins. <code>ewe-plugin add</code> refuses a manifest whose
		<code>apiVersion</code> it does not know, so an old plugin fails at install, never at login.
	</p>
	<dl class="rows">
		<div class="row"><dt><code>3</code></dt><dd>ewe 0.25: the <code>quick-tile</code>, <code>quick-page</code>, <code>bar-status</code> and <code>dock-item</code> kinds, the injected properties, the <code>Shell</code> singleton, the public components, <code>requires</code>, <code>ipcAliases</code> and the add-ons model. A superset — every API 2 plugin still loads.</dd></div>
		<div class="row"><dt><code>2</code></dt><dd>The Ewe design system, version 3: <code>Theme</code> speaks the Ewe names above. Still loaded.</dd></div>
		<div class="row"><dt><code>1</code></dt><dd>The Fluent-era names (<code>bg1</code>, <code>fg1</code>, <code>stroke2</code>, <code>brandBg</code>, <code>fsBody</code> …). They no longer exist; refused at install.</dd></div>
	</dl>
</section>

<section>
	<h2 id="api-2-to-3">Moving a plugin from API 2 to API 3</h2>
	<p>
		Nothing is required: an API 2 manifest loads unchanged. Set <code>"apiVersion": 3</code> when
		you want one of the new kinds, <code>requires</code>, or a manifest keybind — whose target must
		then be your own id. Two things are worth doing anyway: root a bar widget on
		<code>BarModule</code> and a popup on <code>AnchoredPopup</code>, so you inherit the bar's
		conventions and the one-popup rule; and read <code>Shell.bottomInset</code> instead of assuming a
		dock, since on a fresh 0.25 there may be none.
	</p>
</section>

<section>
	<h2 id="api-1-to-2">Moving a plugin from API 1 to API 2</h2>
	<p>
		Only <code>Theme</code> changed. <code>Globals</code>, <code>Log</code>, IPC, settings and the
		manifest format are the same. A plugin still on API 1 is refused at install. One that was
		already installed still loads, but every old name reads as undefined, so it loses its colors
		and sizes.
	</p>
	<ol class="steps">
		<li>In <code>manifest.json</code>, set <code>"apiVersion": 2</code> and bump <code>version</code>.</li>
		<li>Rename every <code>Theme</code> name with the table below. Where several old names became one, use the one.</li>
		<li>
			Check sizes, not just names. Ewe's controls are smaller and its corners tighter than
			before, and the bar module is <code>Theme.barModule</code> tall, so a layout built on
			fixed offsets may need a look.
		</li>
		<li>Run <code>ewe-plugin validate .</code>, then <code>ewe-plugin dev .</code> and look at it in both schemes.</li>
	</ol>
	<Code
		code={`// API 1
Rectangle { color: Theme.bg2; radius: Theme.radius }
Text { color: Theme.fg1; font.family: Theme.fontText; font.pixelSize: Theme.fsBody }

// API 2
Rectangle { color: Theme.surfaceBase; radius: Theme.radiusRounded }
Text { color: Theme.textPrimary; font.family: Theme.fontSans; font.pixelSize: Theme.fontSizeMd }`}
		copyable={false}
	/>
	<p>
		<code>bgN</code> stands for any of <code>bg1</code> … <code>bg6</code>: <code>bg2Hover</code>,
		<code>bg4Pressed</code> and so on.
	</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>API 1</th><th>API 2</th></tr>
			</thead>
			<tbody>
				{#each renames as [from, to, note]}
					<tr>
						<td><code>{from}</code></td>
						<td>
							{#if to}<code>{to}</code>{/if}
							{#if note}<span class="rename-note">{note}</span>{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<PageNav />

<style>
	.steps {
		max-width: 44rem;
		padding-left: var(--space-md);
		color: var(--text-secondary);
	}
	.steps li + li {
		margin-top: var(--space-xs);
	}
	.scroll {
		overflow-x: auto;
		margin-top: var(--space-md);
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		max-width: 52rem;
		scrollbar-width: thin;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 34rem;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	th {
		text-align: left;
		font-weight: var(--font-weight-semibold);
		color: var(--text-muted);
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		background: var(--surface-raised);
	}
	td {
		padding: var(--space-s) calc(var(--space-s) + var(--space-xs));
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		color: var(--text-secondary);
		vertical-align: top;
	}
	td:first-child {
		width: 55%;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	.rename-note {
		display: block;
		color: var(--text-muted);
	}
	td code + .rename-note {
		margin-top: var(--space-xxs);
	}
	code.soft {
		background: none;
		border: 0;
		padding: 0;
		color: var(--text-secondary);
	}
</style>
