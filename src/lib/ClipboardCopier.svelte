<script lang="ts">
	export let content = '';

	let tip_visible = false;
	let current_timeout: any;

	function fallbackCopyTextToClipboard(text) {
		var textArea = document.createElement('textarea');
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.body.removeChild(textArea);
	}
	function copyTextToClipboard(text) {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text).then(
			function () {
				console.log('Async: Copying to clipboard was successful!');
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}

	function copy_text(_: MouseEvent) {
		copyTextToClipboard(content);

		tip_visible = true;

		if (current_timeout) clearTimeout(current_timeout);
		current_timeout = setTimeout(() => {
			tip_visible = false;
		}, 3000);
	}
</script>

<div class="outer">
	<span class="content" on:click={copy_text}>
		<slot>{content}</slot>
	</span>
	<span class="tip" class:visible={tip_visible}>
		<slot name="tip">Copied to clipboard!</slot>
	</span>
</div>

<style>
	div.outer {
		display: inline-block;
		position: relative;
	}
	span.content:hover {
		cursor: pointer;
	}
	span.tip {
		visibility: hidden;
		background-color: rgb(39, 38, 38);
		color: #fff;
		text-align: center;
		padding: 7px 12px;
		margin-bottom: 0.25em;
		border-radius: 6px;

		position: absolute;
		z-index: 1;
		bottom: 100%;
		right: 0%;
	}
	span.tip.visible {
		visibility: visible;
	}
</style>
