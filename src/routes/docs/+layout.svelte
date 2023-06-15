<script lang="ts">
	import DocsSidebar from "../../lib/components/DocsSidebar.svelte";
</script>

<section class="xl:grid xl:grid-cols-[250px_calc(100vw-500px)_250px]">
    <aside class="hidden xl:block sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))]"><DocsSidebar /></aside>
    <div class="py-16 px-[10vw]"><slot /></div>
    <aside class="hidden xl:block sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))]"><slot name="sidebarRight" /></aside>
</section>