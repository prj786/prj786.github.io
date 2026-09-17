<script>
	// Ewe Dark or Ewe Light for this site.
	//
	// With no choice made, the page follows the system (prefers-color-scheme,
	// in tokens.css) and this button only shows the other scheme. Choosing the
	// scheme the system already asks for clears the choice again, so the page
	// goes back to following the system. The choice is `data-theme` on <html>,
	// set before paint by the script in app.html; localStorage may be missing
	// or blocked, so every access is guarded.
	//
	// Which icon shows is decided in CSS, not here, so the prerendered page
	// shows the right one before any script runs. Without JS the button is
	// hidden (app.html adds the `js` class) and the system setting applies.
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	const KEY = 'ewe-theme';
	let current = $state('dark');

	const systemLight = () => window.matchMedia('(prefers-color-scheme: light)').matches;
	const effective = () =>
		document.documentElement.dataset.theme ?? (systemLight() ? 'light' : 'dark');

	onMount(() => {
		current = effective();
		const mq = window.matchMedia('(prefers-color-scheme: light)');
		const sync = () => (current = effective());
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});

	function toggle() {
		const next = effective() === 'dark' ? 'light' : 'dark';
		const root = document.documentElement;
		const followsSystem = next === (systemLight() ? 'light' : 'dark');
		if (followsSystem) delete root.dataset.theme;
		else root.dataset.theme = next;
		try {
			if (followsSystem) localStorage.removeItem(KEY);
			else localStorage.setItem(KEY, next);
		} catch {
			// storage is unavailable: the choice lasts for this page only
		}
		current = next;
	}

	const label = $derived(current === 'dark' ? 'Switch to Ewe Light' : 'Switch to Ewe Dark');
</script>

<button class="theme-toggle" type="button" onclick={toggle} aria-label={label} title={label}>
	<span class="to-light"><Icon name="sun" size={16} /></span>
	<span class="to-dark"><Icon name="moon" size={16} /></span>
</button>

<style>
	.theme-toggle {
		display: none;
		place-items: center;
		width: var(--control-lg);
		height: var(--control-lg);
		padding: 0;
		border: var(--border-width-1) solid transparent;
		border-radius: var(--primary);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	:global(:root.js) .theme-toggle {
		display: inline-grid;
	}
	.theme-toggle:hover {
		background: var(--surface-hover);
		color: var(--text-primary);
	}
	.theme-toggle:active {
		background: var(--surface-pressed);
	}
	.to-dark {
		display: none;
	}
	:global(:root[data-theme='light']) .to-light {
		display: none;
	}
	:global(:root[data-theme='light']) .to-dark {
		display: block;
	}
	@media (prefers-color-scheme: light) {
		:global(:root:not([data-theme='dark'])) .to-light {
			display: none;
		}
		:global(:root:not([data-theme='dark'])) .to-dark {
			display: block;
		}
	}
</style>
