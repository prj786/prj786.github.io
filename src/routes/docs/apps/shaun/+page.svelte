<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
</script>

<svelte:head>
	<title>Shaun — ewe docs</title>
	<meta
		name="description"
		content="Shaun, ewe's desktop companion: a notch under the top bar that shows what your AI agents are doing, and a chat that knows ewe, plays your music, looks things up and changes settings when you ask — with or without an AI."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>Shaun, your desktop companion.</h1>
<p class="lede">
	Shaun lives in a small notch under the top bar. It shows what your AI agents are doing and lets you
	answer them without leaving your work. Open it for a glance at what needs you, a few quick
	switches, and a chat that knows ewe, plays your music, looks things up and changes settings when
	you ask.
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
		<div class="row"><dt>Quick actions</dt><dd>Do not disturb, game mode, a screenshot, ewe Settings, Komble and lock, one click each.</dd></div>
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
	<p>Type in the chat line. Everything here works with no AI at all.</p>
	<dl class="rows">
		<div class="row"><dt>The desktop</dt><dd>“volume 60”, “brightness up”, “wifi off”, “connect my airpods”. Switches come with Undo.</dd></div>
		<div class="row"><dt>Apps and folders</dt><dd>“open ewe files”, “open kitty in documents”.</dd></div>
		<div class="row"><dt>Files</dt><dd>“find the pdf about the lease” lists what it finds, with Open and Show in folder.</dd></div>
		<div class="row"><dt>Music and videos</dt><dd>“play jazz from my music” plays songs from your library in ewe Player. “play this link” plays the video link you copied, YouTube too. “what's playing” says what is on.</dd></div>
		<div class="row"><dt>Keyboard languages</dt><dd>“switch to georgian keyboard”, “next layout”. “add japanese typing” helps you set up typing in Japanese, Chinese, Korean and more.</dd></div>
		<div class="row"><dt>Settings</dt><dd>“dark mode”, “show the dock on all displays”, “fold the bar”. Shaun shows what it will change; press <em>Run</em>, and <em>Undo</em> puts it back.</dd></div>
		<div class="row"><dt>Windows</dt><dd>“switch to workspace 3”, “make this window fullscreen”. Closing a window or quitting an app always asks first.</dd></div>
		<div class="row"><dt>This computer</dt><dd>“how much battery do I have”, “why is my laptop slow”, “what's eating my disk”.</dd></div>
		<div class="row"><dt>Timers and sums</dt><dd>“remind me in 10 minutes to call mum”, “what is 15% of 80”, “convert 10 km to miles”, “what time is it in tokyo”.</dd></div>
		<div class="row"><dt>ewe Safe</dt><dd>“copy my GitHub password”. ewe Safe copies it and clears it later; Shaun never sees it. <a href="/docs/apps/safe/">About ewe Safe →</a></dd></div>
		<div class="row"><dt>ewe Browser</dt><dd>“open github.com”, “search men's shoes on zara”, “show my tabs”. <a href="/docs/apps/browser/">About ewe Browser →</a></dd></div>
		<div class="row"><dt>Two at once</dt><dd>“dnd on and set a timer for 25 minutes”. Up to three things, with one Undo.</dd></div>
	</dl>
	<p>
		When an answer needs a shell command, Shaun shows the exact command with <em>Run</em> and
		<em>In terminal</em>, and nothing runs until you press one. Restart, shut down, log out and
		emptying the trash work the same way: offered, never done by themselves.
	</p>
</section>

<section>
	<h2>What Shaun knows</h2>
	<p>These answers come from your computer, with no AI and no internet.</p>
	<dl class="rows">
		<div class="row"><dt>ewe</dt><dd>How to do things, where every setting is, what to do when something is wrong, and every ewe command-line tool. “how do I change my wallpaper?” gets an answer and a button that opens the right place.</dd></div>
		<div class="row"><dt>What's new</dt><dd>“what's new” or “what changed in my last update” tells you what came with the ewe you have.</dd></div>
		<div class="row"><dt>The ArchWiki</dt><dd>“wiki bluetooth headset” or “what does the wiki say about zram” shows the part of the page that fits, with <em>Open the page</em>.</dd></div>
		<div class="row"><dt>Manuals</dt><dd>“man rsync” or “how do I use tar to extract” reads the command's own help.</dd></div>
	</dl>
	<p>Without an AI, answers are in English.</p>
</section>

<section>
	<h2>Teach Shaun</h2>
	<p>Shaun also knows what you tell it. It keeps all of it on your computer.</p>
	<dl class="rows">
		<div class="row"><dt>Your notes</dt><dd>Put Markdown or text files in the <code>Shaun</code> folder inside Documents. Shaun reads them like its own guide: a note that says where the printer is answers “where is the printer”.</dd></div>
		<div class="row"><dt>Learn this</dt><dd>“learn this: the printer is on the second floor” writes that note for you, and <em>Undo</em> takes it back. “show my notes” lists them.</dd></div>
		<div class="row"><dt>Remember</dt><dd>“remember that my dentist is on friday” keeps a short fact. “what do you remember” lists them, and “forget about my dentist” lets one go.</dd></div>
	</dl>
	<p>
		Shaun will not keep anything that looks like a password, a PIN or a card number, and it skips such
		lines in your notes.
	</p>
</section>

<section>
	<h2>Why won't this play?</h2>
	<p>
		Copy the file or the link, or leave it open in ewe Player, and ask “why won't this play”. Shaun
		names the format in plain words, says whether this computer can play it, and offers the fix or
		<em>Open with another app</em>.
	</p>
	<p>
		A YouTube link is a web page, not a video file: Shaun offers <em>Play in ewe Player</em>. Some
		sites lock their videos, like Vimeo and Netflix, and Shaun says so instead of trying.
	</p>
</section>

<section>
	<h2>With an AI</h2>
	<p>
		Everything above works without one. Pick who answers in Komble → Plugins → Shaun →
		<strong>Options</strong>, and Shaun can do more:
	</p>
	<dl class="rows">
		<div class="row"><dt>Any question</dt><dd>Ask anything, in your own words and your own language. The answer comes back in it.</dd></div>
		<div class="row"><dt>About this computer</dt><dd>When the answer depends on your computer, Shaun looks first (what is using the CPU, what fills the disk) and answers from what it found.</dd></div>
		<div class="row"><dt>Several steps</dt><dd>One answer can do up to three things, with one Undo.</dd></div>
		<div class="row"><dt>Translate</dt><dd>Copy some text and say “translate this” or “translate this to French”.</dd></div>
		<div class="row"><dt>Quick</dt><dd>Answers appear as they are written. With your Claude Code, they start in about a second.</dd></div>
	</dl>
	<p>Who can answer:</p>
	<dl class="rows">
		<div class="row"><dt>None</dt><dd>The default. Everything above still works.</dd></div>
		<div class="row"><dt>Your own app</dt><dd>Claude Code, Codex or OpenCode, with the login you already have there.</dd></div>
		<div class="row"><dt>An API key</dt><dd>Anthropic, OpenAI, Gemini or OpenRouter. Shaun asks for the key and keeps it in your keyring.</dd></div>
		<div class="row"><dt>This computer</dt><dd>Ollama or LM Studio, running here.</dd></div>
		<div class="row"><dt>Your own server</dt><dd>Any OpenAI-compatible server, by its address.</dd></div>
	</dl>
</section>

<section>
	<h2>What stays private</h2>
	<p>
		Nothing leaves your computer unless you pick an AI to answer. Then that AI gets your question, a
		short note about this computer (your ewe version, battery, volume), what you asked Shaun to
		remember, and any of your notes that fit the question. Never a password, a key, or the name of
		your Wi-Fi.
	</p>
	<p>
		File names, song titles, your tabs and the names of your logins show in the notch only; the AI
		never hears them. Anything that looks like a password, a PIN or a card number is refused: Shaun
		will not remember it or write it into a note. And Shaun never sees your passwords at all: ewe Safe
		copies them itself.
	</p>
</section>

<PageNav />
