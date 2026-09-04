<script>
	// A drawing of the installer's fifth screen — the one that matters, because
	// it is the last moment before anything is written and the only place the
	// machine's decisions are all visible at once.
	const STEPS = ['Welcome', 'Time & place', 'Disk', 'Your account', 'Summary', 'Install'];
	const CHOSE = [
		['Keyboard', 'English (US)'],
		['Time zone', 'Asia/Tbilisi — detected'],
		['Language', 'en_US.UTF-8'],
		['Account', 'scubba · ewe-laptop']
	];
	const DECIDED = [
		'btrfs · @ + @home · zstd',
		'systemd-boot',
		'hibernate: RAM + 2 GB',
		'linux + microcode',
		'GPU drivers matched',
		'PipeWire · NetworkManager · greetd'
	];
</script>

<figure class="frame">
	<div class="win">
		<nav class="rail">
			{#each STEPS as s, i}
				<div class="step" class:done={i < 4} class:now={i === 4}>
					<span class="pip">{i < 4 ? '✓' : i + 1}</span>
					<span class="nm">{s}</span>
				</div>
			{/each}
		</nav>

		<div class="body">
			<h4>Summary</h4>
			<p class="sub">Nothing has been written yet.</p>

			<dl class="chose">
				{#each CHOSE as [k, v]}
					<div><dt>{k}</dt><dd>{v}</dd></div>
				{/each}
				<div class="danger">
					<dt>Disk</dt>
					<dd>/dev/nvme0n1 · 512 GB — <strong>erased entirely</strong></dd>
				</div>
			</dl>

			<div class="decided">
				<span class="lbl">Decided by ewe</span>
				<div class="chips">
					{#each DECIDED as d}<span class="chip">{d}</span>{/each}
				</div>
			</div>

			<div class="foot">
				<span class="ghost">Back</span>
				<span class="go">Install</span>
			</div>
		</div>
	</div>
</figure>

<style>
	.frame {
		container-type: inline-size;
		margin: 1.6rem 0 0;
		width: 100%;
	}
	.win {
		display: flex;
		aspect-ratio: 16 / 10;
		background: var(--bg-3);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: var(--radius-panel);
		overflow: hidden;
		box-shadow: var(--elevation);
		font-size: 1.55cqw;
		color: var(--fg-1);
	}

	.rail {
		flex: none;
		width: 26%;
		background: var(--bg-4);
		border-right: var(--stroke-width) solid var(--stroke-2);
		padding: 2cqw 1.4cqw;
		display: flex;
		flex-direction: column;
		gap: 1.1cqw;
	}
	.step {
		display: flex;
		align-items: center;
		gap: 0.8cqw;
		font-size: 0.85em;
		color: var(--fg-4);
	}
	.pip {
		width: 1.9cqw;
		height: 1.9cqw;
		border-radius: 50%;
		border: var(--stroke-width) solid var(--stroke-1);
		display: grid;
		place-items: center;
		font-size: 0.75em;
		flex: none;
	}
	.step.done {
		color: var(--fg-2);
	}
	.step.done .pip {
		background: var(--brand-bg);
		border-color: var(--brand-bg);
		color: var(--fg-on-brand);
	}
	.step.now {
		color: var(--fg-1);
	}
	.step.now .pip {
		border-color: var(--accent);
		color: var(--accent);
	}

	.body {
		flex: 1;
		padding: 2.2cqw 2.4cqw;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	h4 {
		margin: 0;
		font-size: 1.5em;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.sub {
		margin: 0.3cqw 0 0;
		font-size: 0.82em;
		color: var(--fg-3);
	}

	.chose {
		margin: 1.6cqw 0 0;
		display: flex;
		flex-direction: column;
	}
	.chose > div {
		display: flex;
		justify-content: space-between;
		gap: 1cqw;
		padding: 0.75cqw 0;
		border-bottom: var(--stroke-width) solid var(--stroke-3);
		font-size: 0.82em;
	}
	.chose dt {
		color: var(--fg-3);
		flex: none;
	}
	.chose dd {
		margin: 0;
		color: var(--fg-1);
		text-align: right;
	}
	.danger dd {
		color: var(--danger);
	}

	.decided {
		margin-top: 1.6cqw;
		background: var(--bg-2);
		border: var(--stroke-width) solid var(--stroke-2);
		border-radius: 1.1cqw;
		padding: 1.1cqw 1.2cqw;
	}
	.lbl {
		font-size: 0.68em;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-4);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5cqw;
		margin-top: 0.8cqw;
	}
	.chip {
		font-size: 0.72em;
		color: var(--fg-2);
		background: var(--bg-3);
		border: var(--stroke-width) solid var(--stroke-3);
		border-radius: 0.6cqw;
		padding: 0.35cqw 0.7cqw;
	}

	.foot {
		margin-top: auto;
		padding-top: 1.6cqw;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.8cqw;
	}
	.ghost,
	.go {
		font-size: 0.82em;
		border-radius: 0.7cqw;
		padding: 0.6cqw 1.4cqw;
	}
	.ghost {
		color: var(--fg-1);
		background: var(--bg-1);
		border: var(--stroke-width) solid var(--stroke-1);
	}
	.go {
		background: var(--danger);
		color: var(--fg-inverted);
	}
</style>
