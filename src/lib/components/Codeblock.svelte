<script lang="ts">
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';
	import { onDestroy } from 'svelte';
	import { fly, scale } from 'svelte/transition';

    export let code: string;
    export let language: string;

    const highlightedCode = hljs.highlight(code, { language }).value

    let copied: boolean = false;
    async function copyToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
        copied = true;
    } catch (err) {}
    }

    let copyTimeout: ReturnType<typeof setTimeout>;
    $: if (copied) {
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => copied = false, 3000);
    }

    onDestroy(() => {
        clearTimeout(copyTimeout);
    });
</script>

<div class="relative">
    <button on:click={() => copyToClipboard(code)} class="absolute right-4 top-4 btn bg-green-400 text-black rounded-[var(--rounded-base)]">
        {#if copied}
            <i in:scale class="fa-solid fa-thumbs-up"></i>
        {:else}
            <span in:scale>Copy</span>
        {/if}
    </button>
    <pre class="rounded-[var(--rounded-base)] bg-[var(--surface-100)] p-2 overflow-scroll">{@html highlightedCode}</pre>
</div>
