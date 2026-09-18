<script>
	import { page } from '$app/stores';
</script>

<svelte:head><title>{$page.status} — ewe</title></svelte:head>

<div class="wrap page center">
	<img class="logo-on-dark" src="/ewe-logo.png" alt="" width="80" height="80" /><img class="logo-on-light" src="/ewe-logo-light.png" alt="" width="80" height="80" />
	<h1>{$page.status}</h1>
	<p class="lede">{$page.error?.message ?? 'This one wandered off.'}</p>
	<div class="btns">
		<a class="btn primary" href="/">Back to the flock</a>
		<a class="btn" href="/docs/">Docs</a>
	</div>
</div>

<style>
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-md);
		padding-top: var(--space-xl);
		padding-bottom: var(--space-xl);
	}
	.center img {
		opacity: 0.7;
	}
	.center p {
		max-width: 28rem;
	}
</style>
