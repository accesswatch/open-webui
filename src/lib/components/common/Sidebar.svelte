<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	export let show = false;
	export let side = 'right';
	export let width = '200px';

	export let className = '';
	export let duration = 100;

	let panelEl: HTMLElement | null = null;
	let previousFocus: HTMLElement | null = null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && show) {
			show = false;
		}
	}

	$: if (show) {
		previousFocus = document.activeElement as HTMLElement;
		tick().then(() => {
			const firstFocusable = panelEl?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
			if (firstFocusable) {
				(firstFocusable as HTMLElement).focus();
			}
		});
	} else if (previousFocus) {
		previousFocus.focus();
		previousFocus = null;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
	<div
		role="presentation"
		class="absolute z-20 top-0 right-0 left-0 bottom-0 bg-white/20 dark:bg-black/5 w-full min-h-full h-full flex justify-center overflow-hidden overscroll-contain"
		on:mousedown={() => {
			show = false;
		}}
		transition:fade={{ duration: duration }}
	/>

	<aside
		bind:this={panelEl}
		class="absolute z-30 shadow-xl {side === 'right' ? 'right-0' : 'left-0'} top-0 bottom-0"
		transition:slide={{ duration: duration, axis: side === 'right' ? 'x' : 'y' }}
	>
		<div class="{className} h-full" style="width: {show ? width : '0px'}">
			<slot />
		</div>
	</aside>
{/if}
