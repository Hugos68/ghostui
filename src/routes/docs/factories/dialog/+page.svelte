<script lang="ts">
	import type { Dialog } from '../../../../lib/factories/dialog/types.js';
	import { createDialog } from '../../../../lib/factories/dialog/dialog.js';
	import Preview from '$lib/components/Preview.svelte';
	import Codeblock from '$lib/components/Codeblock.svelte';
	import code from './example.txt?raw';
	import { fly } from 'svelte/transition';

	const dialog: Dialog = createDialog({ label: 'modal' });
</script>

<section class="my-10">
	<h1 class="h1">Dialog</h1>
	<Preview>
		<button
			class="btn bg-purple-400 text-black rounded-[var(--rounded-base)]"
			on:click={dialog.open}>Open Dialog</button
		>
		{#if $dialog.expanded}
			<div
				class="fixed left-[50%] top-[33%] w-[65ch] -translate-x-[50%] rounded-[var(--rounded-base)] bg-[var(--surface-100)] p-8 shadow-2xl"
				use:dialog.dialog
				transition:fly={{ y: 25, duration: 200 }}
			>
				<h2 class="h2">Dialog</h2>
				<p class="text-lg py-4">This is a fully accessible dialog.</p>
				<p class="text-lg py-4">Click outside or hit escape to close the dialog.</p>

				<div class="flex justify-end gap-2">
					<button
						class="ml-auto btn bg-purple-400 text-black rounded-[var(--rounded-base)]"
						on:click={dialog.close}>Cancel</button
					>
					<button
						class="btn bg-purple-400 text-black rounded-[var(--rounded-base)]"
						on:click={dialog.close}>Confirm</button
					>
				</div>
			</div>
		{/if}
	</Preview>
</section>

<h2 class="h2">Usage</h2>

<p class="text-lg">
	Use <code>createDialog</code> factory method to create the neccescary functionality:
</p>
<Codeblock language="html" {code} />
