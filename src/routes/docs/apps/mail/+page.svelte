<script>
	import Callout from '$lib/docs/Callout.svelte';
	import Code from '$lib/docs/Code.svelte';
	import PageNav from '$lib/docs/PageNav.svelte';
	import Shot from '$lib/Shot.svelte';
</script>

<svelte:head>
	<title>ewe Mail — ewe docs</title>
	<meta
		name="description"
		content="ewe Mail, ewe's own mail app: Gmail and any other mailbox in one inbox. Read, reply, forward, write with attachments, archive, star and search. New mail while the window is open, five seconds to undo a send, and pictures blocked until you allow them."
	/>
</svelte:head>

<p class="eyebrow">Apps</p>
<h1>ewe Mail.</h1>
<p class="lede">
	ewe Mail is your mail on the ewe desktop. Gmail and any other mailbox, as many as you like, in one
	inbox. It comes with ewe from 0.51, and it is the app that opens when you click an email address.
</p>

<Shot
	src="/img/mail-inbox"
	w={1280}
	h={800}
	alt="ewe Mail in its dark look: a rail of accounts and folders on the left, a list of conversations in the middle, and the open conversation on the right. The people and messages are made up."
	caption="One inbox for every account. The people and the mail in these pictures are made up."
/>

<section>
	<h2>Add your mail</h2>
	<p>
		ewe Mail never asks for a password itself. Accounts live in <a href="/docs/cli/ewe-sync/">ewe Sync</a>,
		and ewe Mail shows whatever is there. Its <em>Add account</em> button opens the right page of ewe Sync.
	</p>
	<dl class="rows">
		<div class="row"><dt>Gmail</dt><dd>In ewe Sync, open <em>Google</em> and connect. ewe ships no Google client, so you bring your own: the OAuth client file from your Google Cloud console. <a href="/docs/account/google/">Google, step by step →</a></dd></div>
		<div class="row"><dt>Any other mailbox</dt><dd>In ewe Sync, open <em>Mail</em> and type the address and the password. ewe finds the servers for you, and tests both incoming and outgoing mail before it saves anything. Your Nextcloud provider’s mailbox, one you host and a work account all work. <a href="/docs/account/mail-calendar/">More →</a></dd></div>
		<div class="row"><dt>As many as you like</dt><dd>Every account shows in one inbox, and each one is still a folder list of its own in the rail.</dd></div>
	</dl>
	<Callout type="warning" title="Coming from ewe 0.50?">
		<p>
			ewe Mail needs the <code>gmail.modify</code> permission, so that it can send and organise
			your Gmail. Earlier versions only read. After the update, open ewe Sync, choose <em>Google</em>,
			then <em>Disconnect</em> and <em>Connect</em> once. Until you do, Gmail stays read-only and ewe Mail says so.
		</p>
	</Callout>
</section>

<section>
	<h2>Read and answer</h2>
	<dl class="rows">
		<div class="row"><dt>Conversations</dt><dd>Messages on the same subject are stacked into one conversation. The newest is open and the older ones fold to a single line.</dd></div>
		<div class="row"><dt>Reply, reply all, forward</dt><dd>The answer opens under the conversation, with the quoted text in place. Choose which account it is sent from.</dd></div>
		<div class="row"><dt>Write</dt><dd>A new message with To, Cc and Bcc, attachments (a button, or drop a file on it) and a signature for each account.</dd></div>
		<div class="row"><dt>Undo send</dt><dd>A sent message waits five seconds, with an <em>Undo</em> beside it. Only then does it go.</dd></div>
		<div class="row"><dt>Tidy up</dt><dd>Archive, delete, star, mark as unread, or move to another folder. <em>Undo</em> brings a move or a delete back.</dd></div>
		<div class="row"><dt>Search</dt><dd>Type in the search field at the top of the list. It looks in the folder you are in, or in every account.</dd></div>
		<div class="row"><dt>New mail</dt><dd>It shows up while the window is open, without a refresh.</dd></div>
	</dl>
	<Shot
		src="/img/mail-reply"
		w={1280}
		h={800}
		alt="ewe Mail with a conversation open and an answer being written under it, the quoted message above the cursor and a Send button below."
		caption="Answering under the conversation. Send is Ctrl+Enter."
	/>
</section>

<section>
	<h2>Pictures stay out until you say so</h2>
	<p>
		Pictures in a message can tell the sender that you read it. So ewe Mail blocks the ones that come
		from the web, and the message reads fine without them. Allow them for one message, or for every
		message from that sender. Pictures that are part of the message itself show at once.
	</p>
	<Shot
		src="/img/mail-pictures"
		w={1280}
		h={800}
		alt="ewe Mail in its light look, with a newsletter open. A line above it says the pictures are hidden and offers to show them, once or always for this sender."
		caption="A newsletter with its pictures hidden, in the light look."
	/>
</section>

<section>
	<h2>Opens when you click an address</h2>
	<p>
		ewe Mail is the default <code>mailto:</code> handler. A link like <code>mailto:you@example.org</code>,
		in ewe Browser or anywhere else, opens a new message with the address filled in.
	</p>
	<Shot
		src="/img/mail-compose"
		w={600}
		h={800}
		alt="ewe Mail in a narrow window with a new message open: the From account, the To field, a subject, the text and a signature, with the rail folded to icons."
		caption="The same app in a narrow window. The rail folds to icons."
	/>
</section>

<section>
	<h2>Keys</h2>
	<dl class="rows">
		<div class="row"><dt>Write and find</dt><dd><kbd>C</kbd> writes a new message, <kbd>/</kbd> searches.</dd></div>
		<div class="row"><dt>Move around</dt><dd><kbd>J</kbd> and <kbd>K</kbd> go to the next and the previous conversation, <kbd>Enter</kbd> opens it, <kbd>Esc</kbd> goes back.</dd></div>
		<div class="row"><dt>Answer</dt><dd><kbd>R</kbd> replies, <kbd>A</kbd> replies to all, <kbd>F</kbd> forwards, <kbd>Ctrl</kbd>+<kbd>Enter</kbd> sends.</dd></div>
		<div class="row"><dt>Tidy up</dt><dd><kbd>E</kbd> archives, <kbd>#</kbd> or <kbd>Delete</kbd> deletes, <kbd>S</kbd> stars, <kbd>U</kbd> marks as unread.</dd></div>
	</dl>
</section>

<section>
	<h2>With the Mail plugin</h2>
	<p>
		The envelope in the bar, the Inbox page in Quick settings and the note for each new message are the
		<a href="/docs/plugins/built-in/">Mail plugin</a>. It reads everything from ewe Mail, and a note opens
		its message in ewe Mail. ewe Mail itself runs only while its window is open. Close the window and
		nothing of it is left running.
	</p>
</section>

<section>
	<h2>Where it keeps things</h2>
	<dl class="rows">
		<div class="row"><dt>Passwords</dt><dd>In the system keyring, put there by ewe Sync. ewe Mail only reads them.</dd></div>
		<div class="row"><dt>A copy of your mail</dt><dd><code>~/.cache/ewe-mail/mail.sqlite</code>, so the list shows at once and works offline. It is only a cache: delete it and the only loss is a moment of waiting.</dd></div>
		<div class="row"><dt>Settings</dt><dd><code>[mail]</code> in <code>ewe.conf</code>: whether pictures are asked for, when a message counts as read, and your signatures. <a href="/docs/one-file/schema/">Schema →</a></dd></div>
	</dl>
	<Code code={'ewe-mail-app'} copyable={false} />
	<p class="muted">
		ewe Mail’s source is <a href="https://github.com/prj786/ewe-mail">github.com/prj786/ewe-mail</a>.
	</p>
</section>

<PageNav />

<style>
	:global(.shot) {
		margin: var(--space-xl) 0;
	}
</style>
