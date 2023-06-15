<script lang="ts">
	import DocsSidebar from "./DocsSidebar.svelte";
</script>

<section class="lg:grid lg:grid-cols-[250px_1fr_250px]">
    <aside class="hidden lg:block sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))]"><DocsSidebar /></aside>
    <div class="p-4"><slot /></div>
    <aside class="hidden lg:block sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))]"><slot name="sidebarRight" /></aside>
</section>