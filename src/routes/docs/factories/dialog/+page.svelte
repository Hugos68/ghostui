<script lang="ts">
	import type { Dialog } from "../../../../lib/factories/dialog/types.js";
    import { createDialog } from "../../../../lib/factories/dialog/dialog.js";
	import Preview from "$lib/components/Preview.svelte";
	import Codeblock from "$lib/components/Codeblock.svelte";
    import code from './example.txt?raw';
	import { fly } from "svelte/transition";

    const { dialogWindow, openDialog, closeDialog, isExpanded }: Dialog = createDialog();
    
</script>

<section class="my-10">
    <h1 class="h1">Dialog</h1>

    <Preview>

        <button class="btn bg-purple-400 text-black rounded-[var(--rounded-base)]" on:click={openDialog}>Toggle</button>
        {#if $isExpanded()}
            <div class="fixed left-[50%] top-[33%] -translate-x-[50%] rounded-[var(--rounded-base)] bg-[var(--surface-100)] p-4 shadow-2xl" use:dialogWindow transition:fly={{ y: 25 }}>
                <h3 class="h3">Dialog</h3>
                <p class="text-lg py-4">This is a fully accessible Dialog</p>
                <div class="flex justify-end gap-2">
                    <button class="ml-auto btn bg-purple-400 text-black rounded-[var(--rounded-base)]" on:click={closeDialog}>Cancel</button>
                    <button class="btn bg-purple-400 text-black rounded-[var(--rounded-base)]" on:click={closeDialog}>Confirm</button>
                </div>
            </div>
        {/if}
  

    </Preview>
</section>


<h2 class="h2">Usage</h2>

<p class="text-lg">To implement the Dialog component in your UI you will need to use the <code>createDialog</code> method to create the neccescary functionality:</p>
<Codeblock language="html" {code} />

