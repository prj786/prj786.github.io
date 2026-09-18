<script>
	// A real screenshot of a running ewe session.
	// The intrinsic size is a PROP, not a literal. It was hard-coded 1920x1080
	// while the shot itself is 16:10, so the browser reserved the wrong box and
	// the page jumped as the image landed.
	let {
		src = '/img/desktop',
		alt,
		caption = '',
		priority = false,
		w = 2560,
		h = 1600,
		// the non-WebP copy: a flat UI shot compresses as PNG, a shot with a
		// photo wallpaper behind it is ten times smaller as a JPEG
		fallback = 'png'
	} = $props();
</script>

<figure class="shot">
	<picture>
		<source srcset="{src}.webp" type="image/webp" />
		<img
			src="{src}.{fallback}"
			{alt}
			width={w}
			height={h}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding={priority ? 'auto' : 'async'}
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
		border: var(--border-width-1) solid var(--border-subtle);
		border-radius: var(--rounded);
		overflow: hidden;
		background: var(--surface-sunken);
	}
	img {
		display: block;
		width: 100%;
		height: auto;
	}
	figcaption {
		margin-top: var(--space-md);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
		color: var(--text-muted);
		max-width: 46rem;
	}
</style>
