<script>
	import Code from '$lib/docs/Code.svelte';
	import Callout from '$lib/docs/Callout.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import { OS_REPO } from '$lib/nav.js';
	const INSTALL_DOC = OS_REPO + '/blob/main/docs/INSTALL.md';
</script>

<svelte:head>
	<title>Install ewe — ewe docs</title>
	<meta
		name="description"
		content="Install ewe OS from the ISO: seven screens, about ten minutes, and the disk you choose is erased. Plus the headless path and adding ewe to an existing Arch install."
	/>
</svelte:head>

<p class="eyebrow">Get started</p>
<h1>Install ewe.</h1>
<p class="lede">
	Download the image, verify it, write it to a stick, and boot in UEFI mode with Secure Boot off. The
	stick runs the real desktop, so you can try everything before you commit; nothing touches your
	disks until you press Install.
</p>

<div class="btns"><a class="btn primary" href="/download/">Download the ISO →</a></div>

<section>
	<h2>The screens</h2>
	<p>
		The installer asks only what is personal to you. Everything technical is decided, and the
		summary shows you what was decided before anything is written.
	</p>
	<dl class="rows">
		<div class="row"><dt>Welcome</dt><dd>Your keyboard layout, with a field to try it.</dd></div>
		<div class="row"><dt>Network</dt><dd>The install downloads the system, so this screen waits for a connection. A cable just works; Wi-Fi is joined here.</dd></div>
		<div class="row"><dt>Time and place</dt><dd>Detected from the network and shown to you, never silently trusted, plus a language picker.</dd></div>
		<div class="row"><dt>Disk</dt><dd>Which disk. <strong>It is erased entirely.</strong></dd></div>
		<div class="row"><dt>Your account</dt><dd>Name, user name, password, computer name.</dd></div>
		<div class="row"><dt>Summary</dt><dd>Everything you chose, the decided stack, and the only Install button.</dd></div>
		<div class="row"><dt>Install</dt><dd>A last connectivity check, streamed progress, then reboot. If a step fails it says why and offers to retry.</dd></div>
	</dl>
	<Callout type="warning" title="Whole-disk installs only">
		<p>
			There is no dual-boot and no manual partitioning path yet. The chosen disk is erased. Install
			on a machine you can afford to reinstall.
		</p>
	</Callout>
</section>

<section>
	<h2>Headless and scripted</h2>
	<p>
		The graphical installer drives a privileged helper with fixed verbs, and the same primitives are
		a command on the live session. That is the path for scripted or headless installs, and for
		resuming an interrupted one.
	</p>
	<Code code={'ewe-install --help'} />
	<p><a href="/docs/cli/ewe-install/">The ewe-install reference →</a></p>
</section>

<section>
	<h2>Just the desktop, on Arch you already have</h2>
	<p>
		ewe is a normal package in a normal repository. Add <code>[ewe]</code> to your
		<code>pacman.conf</code>, then install it and deploy for your user:
	</p>
	<Code
		code={`sudo pacman -S ewe     # the desktop, its apps and dependencies
ewe-setup              # deploy it for your user`}
	/>
	<p>
		Or let the installer do the layering, including the greeter and the boot splash, with
		<code>ewe-install --layer-only</code>.
	</p>
</section>

<section>
	<h2>Deeper</h2>
	<p>
		The <a href={INSTALL_DOC}>install guide</a> in the distro repository carries the full path, the
		decided stack in detail, and what to do when a step goes wrong.
	</p>
</section>

<PageNav />

<style>
	.btns {
		margin-top: 1.4rem;
	}
</style>
