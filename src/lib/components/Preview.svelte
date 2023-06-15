<script lang="ts">
    export let code: string;
    export let language: string;
	import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';

    const highlightedCode = hljs.highlight(code, { language }).value
    
    let activePanel: 'preview' | 'code' = 'preview';
</script>


<div class="rounded-[var(--rounded-base)]">
    <header class="flex justify-end p-2 bg-[var(--surface-200)]">
        <button class="btn" on:click={() => activePanel = 'preview'}>Preview</button>
        <button class="btn" on:click={() => activePanel = 'code'}>Code</button>
    </header>
    {#if activePanel === 'preview'}
        <div class="bg-gradient-to-r from-green-300 to-blue-400 p-16">
            <slot />
        </div>
    {:else if activePanel === 'code'}
        <div class="bg-[var(--surface-100)] p-16 overflow-scroll">
            <pre class="p-0">{@html highlightedCode}</pre>
        </div>
    {/if}
</div>