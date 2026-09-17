<script>
	import PageNav from '$lib/docs/PageNav.svelte';
	import { FLAT } from '$lib/design/nav.js';
	import { GROUPS, COUNT } from '$lib/design/components.js';
</script>

<svelte:head>
	<title>Components — Ewe design system</title>
	<meta
		name="description"
		content="Every component in the Ewe design system, in five groups: core pieces, forms and feedback, content and navigation, the desktop shell and the apps, and the foundations that remap tokens."
	/>
</svelte:head>

<p class="eyebrow">Design system</p>
<h1>Components</h1>
<p class="lede">
	{COUNT} specs, from Button to Workspace indicator. Each one says what the component is for, its
	anatomy, its variants and sizes, every state it can be in, how it behaves, what the keyboard and a
	screen reader get, and the exact tokens it uses — then names the file in the shell or an app that
	has to match it.
</p>

<section>
	<h2>What a spec decides, and what it does not</h2>
	<p>
		A spec decides how something looks and how it behaves as a piece of interface. It does not
		decide what an app does with it: implementations keep their features and their placement, take
		behavior and accessibility from headless primitives, and take appearance from here. Where the
		code and a spec disagree about color, size, spacing, type, radius, outline or motion, the spec
		wins.
	</p>
	<p>
		The groups below are how the system files them. They are also a rough order of dependence: the
		core pieces turn up inside almost everything else.
	</p>
</section>

{#each GROUPS as group}
	<section>
		<h2>{group.title}</h2>
		<p>{group.blurb} <span class="count">{group.items.length}</span></p>
		<dl class="list">
			{#each group.items as [name, what]}
				<div class="item">
					<dt>{name}</dt>
					<dd>{what}</dd>
				</div>
			{/each}
		</dl>
	</section>
{/each}

<section>
	<h2>Using them outside the desktop</h2>
	<p>
		A plugin, a first-party app or a page like this one draws on the same specs and the same tokens
		— that is the point of naming them. <a href="/docs/plugins/api/">What a plugin may use</a> lists
		the roles and the shell state a plugin can read, and
		<a href="/design/color/">Color</a> has the roles themselves.
	</p>
</section>

<PageNav flat={FLAT} />

<style>
	.count {
		display: inline-block;
		margin-left: var(--space-xs);
		padding: 0 var(--space-xs);
		border-radius: var(--fully-rounded);
		background: var(--surface-hover);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
	}
	.list {
		margin: var(--space-md) 0 0;
		border-top: var(--border-width-1) solid var(--border-subtle);
		max-width: 50rem;
	}
	.item {
		display: grid;
		grid-template-columns: 12rem minmax(0, 1fr);
		gap: var(--space-xxs) var(--space-md);
		padding: var(--space-s) 0;
		border-bottom: var(--border-width-1) solid var(--border-subtle);
		align-items: baseline;
	}
	dt {
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-md);
	}
	dd {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}
	@media (max-width: 640px) {
		.item {
			grid-template-columns: 1fr;
		}
	}
</style>
