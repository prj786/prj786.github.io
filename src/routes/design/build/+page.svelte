<script>
	import Icon from '$lib/Icon.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import Downloads from '$lib/design/Downloads.svelte';
	import { FLAT } from '$lib/design/nav.js';

	const QML_WIDGET = `import QtQuick
import qs

Item {
    implicitWidth: row.implicitWidth + 2 * Theme.spaceS
    implicitHeight: Theme.barModule
    Rectangle {
        anchors.fill: parent
        radius: Theme.radiusPrimary
        color: ma.pressed ? Theme.barPressedFill
             : ma.containsMouse ? Theme.barHoverFill : "transparent"
        Behavior on color { ColorAnimation { duration: Theme.durFast; easing.type: Theme.easeFast } }
    }
    Row {
        id: row; anchors.centerIn: parent; spacing: Theme.spaceXs
        Text { text: Theme.icStar; font.family: Theme.fontIcons
               font.pixelSize: Theme.barIcon
               color: ma.containsMouse ? Theme.textPrimary : Theme.textSecondary }
        Text { text: "Focus"; color: Theme.textPrimary
               font.family: Theme.type.label.family
               font.pixelSize: Theme.type.label.size
               font.weight: Theme.type.label.weight }
    }
    MouseArea { id: ma; anchors.fill: parent; hoverEnabled: true }
}`;

	const QML_PANEL = `Rectangle {                       // a panel: raised, outlined, rounded
    color: Theme.surfaceRaised
    border.color: Theme.borderSubtle
    border.width: Theme.borderWidth1
    radius: Theme.radiusRounded
    opacity: shown ? 1 : 0
    Behavior on opacity { NumberAnimation { duration: Theme.durBase; easing.type: Theme.ease } }
}`;

	const HTML = `<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">

<button class="ewe-btn ewe-btn--primary">Install</button>
<button class="ewe-btn ewe-btn--secondary">Cancel</button>

<label class="ewe-field">
  <span class="ewe-field__label">Name</span>
  <input class="ewe-input" placeholder="The name in the file">
</label>

<p class="caption">Type styles are classes too: .body, .label, .caption …</p>`;

	const CSS = `.panel {
  background: var(--surface-raised);
  border: var(--border-width-1) solid var(--border-subtle);
  border-radius: var(--rounded);
  padding: var(--space-md);
  color: var(--text-primary);
  transition: background-color var(--dur-fast) var(--ease-out);
}
.panel:focus-visible {
  outline: var(--focus-width) solid var(--focus-ring);
  outline-offset: var(--border-width-1);
}`;

	const LIVE = `// tokens.css is compiled in, so the app paints before this runs.
// ewe-theme show builds the same map from this machine's ewe.conf:
// scheme, accent, look presets, accessibility modes, all applied.
async function refreshTheme() {
  const t = await invoke('theme_tokens');        // runs \`ewe-theme show\`
  const root = document.documentElement;
  for (const [k, v] of Object.entries(t.css_vars)) root.style.setProperty(k, v);

  const speed = Number(t.motion.speed ?? 1);        // 0 = animations off
  const dur = (ms) => (speed > 0 ? Math.round(ms / speed) : 0) + 'ms';
  for (const n of ['Fast', 'Base', 'Slow', 'Dim'])
    root.style.setProperty('--dur-' + n.toLowerCase(), dur(t.motion['dur' + n]));

  root.style.colorScheme = t.input.variant === 'light' ? 'light' : 'dark';
}
refreshTheme();
window.addEventListener('focus', refreshTheme);    // a change made elsewhere arrives`;

	const SITE = `# two schemes in one file, the way this website does it
ewe-theme build --json /dev/null --css dark.css  --scheme ewe-dark  --selector ':root'
ewe-theme build --json /dev/null --css light.css --scheme ewe-light --selector ':root[data-theme="light"]'`;

	const CHECK = `ewe-theme scheme apply ewe-light
ewe-conf set desktop.accessibility.text_scale 130
ewe-conf set desktop.accessibility.increase_contrast true
ewe-conf set desktop.theme.bar_opacity 80`;

	const CHECKLIST = [
		['sun', 'Both schemes', 'Look at it in Ewe Dark and in Ewe Light. Nothing should check which one is on; if something looks right in one and wrong in the other, it is reading a value instead of a role.'],
		['type', 'Text size 130%', 'Type grows and so do the controls around it. Nothing clips, nothing truncates, and the bar steps its icons up one size.'],
		['contrast', 'Increase contrast', 'Subtle borders become strong ones, muted text becomes secondary, and the focus ring is 2px. Glass turns solid.'],
		['layers', 'Glass at 80%', 'bar_opacity 80: the bar, the dock and the lock card turn translucent over the wallpaper. Anything in them reads the bar roles, and text still holds 4.5:1 on a white or a black wallpaper.'],
		['keyboard', 'Keyboard only', 'Every control is reachable with Tab and shows the 1px focus ring. Esc closes what opened.'],
		['globe', 'Georgian', 'Strings run about 30% longer. Buttons grow instead of truncating, and nothing uppercases.'],
		['search', 'No raw values', 'Search the change for a # color, a px number or a millisecond count. The only ones allowed live in the token generator.']
	];

	const RULES = [
		['swatch-book', 'Tokens only', 'Every color, size, radius, space and duration comes from a token or the motion table. If a value you need has no token, the token is added to the system first — never a literal in the component.'],
		['square-round-corner', 'The 1px focus ring', 'Keyboard focus is one solid focus-width outline in focus-ring, one border-width outside the edge. No glow, no shadow. Fields turn their own border instead. Increase contrast makes it 2px — through the token, not your code.'],
		['pen-line', 'Sentence case', '“Reduce transparency”, not “Reduce Transparency”: titles, buttons, menus, tabs and settings. The Writing guide has the word list.'],
		['globe', 'Never uppercase Georgian', 'text-transform: uppercase turns Mkhedruli into Mtavruli. Overlines keep their letters and use letter spacing only; components.css has no uppercase anywhere.'],
		['blend', 'Roles, not schemes', 'Schemes, look presets and accessibility modes are remaps. A component never asks which one is active; it reads roles and the generator has already decided.']
	];
</script>

<svelte:head>
	<title>Building with the system — Ewe design system</title>
	<meta
		name="description"
		content="How to use the Ewe design system: Theme tokens and type styles in a shell plugin, tokens.css and components.css in a web or Tauri app, the live-token pattern, the rules, and a checklist before shipping a surface."
	/>
</svelte:head>

<p class="eyebrow">Design system · documentation</p>
<h1>Building with the system</h1>
<p class="lede">
	Two ways in, one vocabulary. A shell plugin reads the tokens from <code>Theme</code>; a web or
	Tauri app reads the same tokens as CSS custom properties. Either way you ask for a role, and the
	person’s scheme answers.
</p>

<section>
	<h2 id="rules">The rules</h2>
	<dl class="rows">
		{#each RULES as [icon, title, body]}
			<div class="row">
				<dt><Icon name={icon} size={16} />{title}</dt>
				<dd>{body}</dd>
			</div>
		{/each}
	</dl>
</section>

<section>
	<h2 id="qml">In a shell plugin (QML)</h2>
	<p>
		A plugin’s QML says <code>import qs</code> and sees <code>Theme</code>, the design system’s tokens
		under their QML names. Everything on the <a href="/design/tokens/">token reference</a> has one:
		<code>Theme.surfaceRaised</code>, <code>Theme.textMuted</code>, <code>Theme.spaceS</code>,
		<code>Theme.radiusPrimary</code>, <code>Theme.controlMd</code>, <code>Theme.iconLg</code>.
	</p>
	<h3 id="qml-type">Type styles</h3>
	<p>
		<code>Theme.type.&lt;style&gt;</code> carries <code>size</code>, <code>lineHeight</code>,
		<code>weight</code>, <code>family</code>, <code>italic</code> and <code>letterSpacing</code> (in
		px, what <code>font.letterSpacing</code> wants). Dashed names work both ways:
		<code>Theme.type["body-strong"]</code> and <code>Theme.type.bodyStrong</code>. Text size has
		already scaled them.
	</p>
	<h3 id="qml-motion">Motion</h3>
	<p>
		<code>Theme.durFast</code>, <code>durBase</code>, <code>durSlow</code> and <code>durDim</code>,
		with <code>Theme.easeFast</code>, <code>ease</code>, <code>easeSlow</code> and
		<code>easeDim</code>. The animation speed and Reduce motion are already applied, so the same
		<code>Behavior</code> is right in every mode. A panel opening slides
		<code>Theme.slideOffset</code>, which Reduce motion makes 0.
	</p>
	<Code code={QML_PANEL} />
	<h3 id="qml-bar">In the bar: the glass roles</h3>
	<p>
		The bar and the dock turn to Glass when bar opacity is under 100. Anything inside them reads the
		bar roles — <code>barGround</code>, <code>barOutline</code>, <code>barHoverFill</code>,
		<code>barPressedFill</code>, <code>barAccentText</code> and <code>barTextMuted</code> — which are
		the glass roles while Glass is on and the plain ones when it isn’t. A widget never asks which. A
		bar module is <code>Theme.barModule</code> tall with <code>Theme.radiusPrimary</code> corners, no
		fill until pointed at, and glyphs <code>Theme.barIcon</code> in
		<code>Theme.textSecondary</code>.
	</p>
	<Code code={QML_WIDGET} />
	<Callout title="No raw values">
		<p>
			No <code>"#eeb407"</code>, no <code>radius: 8</code>, no <code>duration: 150</code>. The accent,
			the scheme, the corners and the text size are the person’s, and they change while your plugin
			runs.
		</p>
	</Callout>
	<p>
		The whole public surface — <code>Theme</code>, <code>Globals</code>, <code>Log</code>, settings
		and IPC — is on the <a href="/docs/plugins/api/">plugin API</a> page. Plugins declare
		<code>"apiVersion": 2</code>; a plugin written for API 1 still uses the old Fluent names
		(<code>bg1</code>, <code>fg2</code>, <code>brandBg</code> …) and is refused at install.
		<a href="/docs/plugins/api/#api-1-to-2">Moving a plugin from API 1 to API 2</a> has the rename
		table.
	</p>
</section>

<section>
	<h2 id="web">In a web or Tauri app</h2>
	<p>
		Two files, in this order: <code>tokens.css</code>, every token as a custom property, and
		<code>components.css</code>, the <code>ewe-*</code> classes built only from them. ewe ships both
		in <code>design/</code>, and Settings, Komble and ewe-sync carry byte-for-byte copies —
		<code>design/check-tokens.sh</code> fails when one drifts.
	</p>
	<Downloads
		items={[
			{ href: '/design/tokens.css', label: 'tokens.css', note: 'Ewe Dark and Ewe Light' },
			{ href: '/design/components.css', label: 'components.css', note: 'The ewe-* classes, from ewe' }
		]}
		label="Stylesheets"
	/>
	<h3 id="web-classes">The ewe-* classes</h3>
	<p>
		Class names are the component names: <code>.ewe-btn</code>, <code>.ewe-input</code>,
		<code>.ewe-switch</code>, <code>.ewe-dialog</code>, <code>.ewe-toast</code>,
		<code>.ewe-scheme</code> and about seventy more. Variants and sizes are modifiers
		(<code>.ewe-btn--primary</code>, <code>.ewe-btn--sm</code>). States are classes too —
		<code>.is-hover</code>, <code>.is-pressed</code>, <code>.is-selected</code>,
		<code>.is-focus</code>, <code>.is-disabled</code>, <code>.is-on</code>,
		<code>.is-checked</code>, <code>.is-open</code> — and a “Live states” block at the end maps them to
		<code>:hover</code>, <code>:focus-visible</code>, <code>:disabled</code> and the
		<code>data-state</code> attributes headless primitives set. Behavior comes from those primitives;
		the look comes from Ewe.
	</p>
	<Code code={HTML} />
	<p>Your own CSS asks for the same tokens:</p>
	<Code code={CSS} />
	<h3 id="web-live">Live tokens</h3>
	<p>
		The compiled <code>tokens.css</code> is Ewe Dark at the defaults. On the desktop, the app asks
		<code>ewe-theme show</code> for this machine’s token map and sets every value inline on
		<code>&lt;html&gt;</code>, which beats the compiled file. It does that at start and whenever the
		window gets focus. The app never knows which scheme is active: the generator did the derivation,
		the app only carries the result. This is Settings’ own pattern:
	</p>
	<Code code={LIVE} />
	<p>
		A page that isn’t running on ewe, like this site, can stack both built-in schemes instead and let
		a selector choose:
	</p>
	<Code code={SITE} />
</section>

<section>
	<h2 id="checklist">Before you ship a surface</h2>
	<p>Switch each of these on, one at a time, and look again.</p>
	<ol class="check">
		{#each CHECKLIST as [icon, title, body]}
			<li>
				<span class="ic"><Icon name={icon} size={16} /></span>
				<div>
					<h3>{title}</h3>
					<p>{body}</p>
				</div>
			</li>
		{/each}
	</ol>
	<p>From a terminal, the four big ones:</p>
	<Code code={CHECK} />
	<p class="muted">
		Put them back with <code>ewe-theme scheme apply ewe-dark</code>, <code>text_scale 100</code>,
		<code>increase_contrast false</code> and <code>bar_opacity 100</code>, or from Settings →
		Appearance and Settings → Accessibility.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.rows {
		margin-top: var(--space-md);
	}
	.rows :global(.icon) {
		color: var(--text-muted);
	}
	.check {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		max-width: 46rem;
	}
	.check li {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
		margin: 0;
	}
	.ic {
		flex: none;
		display: grid;
		place-items: center;
		width: var(--control-md);
		height: var(--control-md);
		border-radius: var(--fully-rounded);
		background: var(--accent-subtle);
		color: var(--accent-text);
	}
	.check h3 {
		margin: 0 0 var(--space-xxs);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
	}
	.check p {
		margin: 0;
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	section :global(.block) {
		max-width: 60rem;
	}
</style>
