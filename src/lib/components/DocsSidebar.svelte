<script lang="ts">
    import { createAccordion } from '../factories/accordion/accordion.js';

    const { accordionTrigger, accordionPanel, isExpanded} = createAccordion({ allowMultiOpen: true });

    const sidebarItems = [
        {
            label: 'Overview',
            navItems: [
                {
                    label: 'Installation',
                    href: '/docs/overview/installation'
                },
                {
                    label: 'Getting Started',
                    href: '/docs/overview/getting-started'
                }
            ]
        },
        {
            label: 'Factories',
            navItems: [
                {
                    label: 'Accordion',
                    href: '/docs/factories/accordion'
                }
            ]
        },
    ]
</script>
<ul class="flex flex-col gap-4 p-8 bg-[var(--surface-200)] h-full">
    {#each sidebarItems as {label, navItems}}
        <li>
            <button class="flex justify-between items-center w-full" use:accordionTrigger={{ panelLabel: label}}>
                <h3 class="h3">{label}</h3>
                <i class:rotate-180={$isExpanded(label)} class="fa-solid fa-caret-up transition-transform"></i>
            </button>
            {#if $isExpanded(label)}
                <nav class="flex flex-col gap-2 p-2" use:accordionPanel={{ label }}>
                    {#each navItems as {label, href}}
                        <a href={href}>{label}</a>
                    {/each}
                </nav>
            {/if}
        </li>
    {/each}
</ul>
