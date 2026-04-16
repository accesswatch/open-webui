<script lang="ts">
	import { copyToClipboard, unescapeHtml } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	import { getContext } from 'svelte';

	const i18n = getContext('i18n');

	export let token;
	export let done = true;

	function handleCopy() {
		copyToClipboard(unescapeHtml(token.text));
		toast.success($i18n.t('Copied to clipboard'));
	}
</script>

{#if done}
	<button
		type="button"
		class="codespan-button cursor-pointer inline p-0 bg-transparent border-0 font-mono text-inherit align-baseline"
		aria-label={$i18n.t('Copy code')}
		on:click={handleCopy}
	>
		<code class="codespan">{unescapeHtml(token.text)}</code>
	</button>
{:else}
	<button
		type="button"
		transition:fade={{ duration: 100 }}
		class="codespan-button cursor-pointer inline p-0 bg-transparent border-0 font-mono text-inherit align-baseline"
		aria-label={$i18n.t('Copy code')}
		on:click={handleCopy}
	>
		<code class="codespan">{unescapeHtml(token.text)}</code>
	</button>
{/if}
