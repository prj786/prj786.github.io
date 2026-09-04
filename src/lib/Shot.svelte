<script>
	// A real screenshot of a running ewe session.
	let {
		src = '/img/desktop',
		alt,
		caption = '',
		priority = false
	} = $props();
</script>

<figure class="shot">
	<picture>
		<source srcset="{src}.webp" type="image/webp" />
		<img
			src="{src}.png"
			{alt}
			width="1920"
			height="1080"
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding="async"
		/>
	</picture>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>

<style>
	.shot {
		margin: 0;
	}
	picture {
		display: block;
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-panel);
		overflow: hidden;
		background: var(--bg-4);
		box-shadow: var(--elevation);
	}
	img {
		display: block;
		width: 100%;
		height: auto;
	}
	figcaption {
		margin-top: 1rem;
		font-size: 0.9rem;
		color: var(--fg-3);
		max-width: 46rem;
	}
</style>
