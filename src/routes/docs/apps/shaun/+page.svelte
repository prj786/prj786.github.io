<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Shaun — ewe docs</title>
	<meta
		name="description"
		content="Shaun, ewe's desktop companion: a notch under the top bar that shows what your AI agents are doing, lets you answer their requests, and takes questions and commands in a small chat."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Shaun, your desktop companion.</h1>
<p class="lede">
	Shaun lives in a small notch under the top bar. It shows what your AI agents are doing and lets you
	answer them without leaving your work. Open it for a glance at what needs you, a few quick
	switches, and a small chat for questions and commands.
</p>

<section>
	<h2>Get it</h2>
	<p>
		Shaun is one of ewe's <a href="/docs/plugins/built-in/">built-in plugins</a>, and it stays off
		until you pick it. Open Komble → Plugins → Shaun and press <em>Install</em>, or tick it in the
		installer's Plugins step. The <code>ewe-companion</code> package comes with it. Then press
		<kbd>Super</kbd>+<kbd>A</kbd>.
	</p>
	<Callout>
		<p>
			If the notch's dot stays dim and says <em>Shaun is off</em>, the package is missing. Install it
			with <code>sudo pacman -S ewe-companion</code>.
		</p>
	</Callout>
</section>

<section>
	<h2>The notch</h2>
	<p>
		The notch shows up on its own while something is going on, like an agent at work or a request,
		and tucks away when it is done. Click it or press <kbd>Super</kbd>+<kbd>A</kbd> to open it.
		<kbd>Esc</kbd> or a click outside closes it.
	</p>
	<dl class="rows">
		<div class="row"><dt>Agents</dt><dd>What each of your AI agents is doing now. Click one to jump to its terminal.</dd></div>
		<div class="row"><dt>Needs you</dt><dd>A disk that is almost full, updates waiting, a low battery.</dd></div>
		<div class="row"><dt>Playing</dt><dd>What music or video is on.</dd></div>
		<div class="row"><dt>Quick actions</dt><dd>Do not disturb, game mode, a screenshot, Settings, Komble and lock, one click each.</dd></div>
		<div class="row"><dt>Chat</dt><dd>A line to type a question or a command.</dd></div>
	</dl>
</section>

<section>
	<h2>Your AI agents</h2>
	<p>Shaun works with Claude Code. Turn its cards on once, then restart any Claude Code you have open:</p>
	<Code code={'ewe-companion agents install claude'} />
	<p>When Claude wants to run something, a card drops out of the bar. When it asks a question, pick an answer on the card.</p>
	<dl class="rows">
		<div class="row"><dt>Allow · Deny</dt><dd>Answer right from the notch.</dd></div>
		<div class="row"><dt>Always for …</dt><dd>Allow it and stop asking for this kind of request, as Claude offers it.</dd></div>
		<div class="row"><dt>Answer in terminal</dt><dd>Go to the terminal where the agent runs.</dd></div>
	</dl>
	<Callout>
		<p>
			Shaun never approves anything without your click. If you do not answer, or the screen is
			locked, Claude simply asks in its terminal as usual.
		</p>
	</Callout>
</section>

<section>
	<h2>Things to say</h2>
	<p>Type in the chat line. Plain commands like these work with no AI at all.</p>
	<dl class="rows">
		<div class="row"><dt>The desktop</dt><dd>“volume 60”, “brightness up”, “wifi off”, “connect my airpods”. Wi-Fi and Bluetooth switches come with Undo.</dd></div>
		<div class="row"><dt>Apps and folders</dt><dd>“open nemo”, “open kitty in documents”.</dd></div>
		<div class="row"><dt>Files</dt><dd>“find my resume” lists what it finds by name, with Open, Show in folder and Copy path.</dd></div>
		<div class="row"><dt>Safe</dt><dd>“copy my GitHub password”. Safe copies it and clears it later; Shaun never sees it. <a href="/docs/apps/safe/">About Safe →</a></dd></div>
		<div class="row"><dt>ewe browser</dt><dd>“open github.com”, “search men's shoes on zara”, “show my tabs”, “bookmark this page”. <a href="/docs/apps/browser/">About the browser →</a></dd></div>
		<div class="row"><dt>Timers and sums</dt><dd>“remind me in 10 minutes to call mum” arrives as a notification. “what is 15% of 80” is worked out on the spot.</dd></div>
		<div class="row"><dt>Help with ewe</dt><dd>“how do I change my wallpaper?” gets an answer and a button that opens the right place.</dd></div>
	</dl>
	<p>
		When an answer needs a shell command, Shaun shows the exact command with <em>Run</em> and
		<em>In terminal</em>, and nothing runs until you press one. Restart, shut down, log out and
		emptying the trash work the same way: offered, never done by themselves.
	</p>
</section>

<section>
	<h2>Who answers questions</h2>
	<p>For anything beyond plain commands, pick who answers in Komble → Plugins → Shaun → Options.</p>
	<dl class="rows">
		<div class="row"><dt>None</dt><dd>The default. Commands still work, and so do many how-to questions about ewe.</dd></div>
		<div class="row"><dt>Your own app</dt><dd>Claude Code, Codex or OpenCode, with the login you already have there.</dd></div>
		<div class="row"><dt>An API key</dt><dd>Anthropic, OpenAI, Gemini or OpenRouter. Shaun asks for the key and keeps it in your keyring.</dd></div>
		<div class="row"><dt>This computer</dt><dd>Ollama or LM Studio, running here.</dd></div>
		<div class="row"><dt>Your own server</dt><dd>Any OpenAI-compatible server, by its address.</dd></div>
	</dl>
</section>

<section>
	<h2>What stays private</h2>
	<p>
		With no AI picked, nothing leaves your computer. With one, it gets your question and a short
		note about this computer — your ewe version, battery, volume — but never a password or a key.
		Shaun never sees your passwords at all: Safe copies them itself.
	</p>
</section>

<PageNav />
