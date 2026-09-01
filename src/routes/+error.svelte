<script>
	import { page } from '$app/stores';
</script>

<svelte:head><title>{$page.status} — ewe</title></svelte:head>

<div class="wrap page center">
	<img src="/ewe-logo.png" alt="" width="80" height="80" />
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
		gap: 1rem;
		padding-top: 5rem;
		padding-bottom: 6rem;
	}
	.center img {
		opacity: 0.7;
	}
	.center p {
		max-width: 28rem;
	}
</style>
