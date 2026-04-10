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
	<code
		class="codespan cursor-pointer"
		role="button"
		tabindex="0"
		on:click={handleCopy}
		on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopy(); } }}
	>{unescapeHtml(token.text)}</code
	>
{:else}
	<code
		transition:fade={{ duration: 100 }}
		class="codespan cursor-pointer"
		role="button"
		tabindex="0"
		on:click={handleCopy}
		on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopy(); } }}
	>{unescapeHtml(token.text)}</code
	>
{/if}
