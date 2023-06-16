<script lang="ts">
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
                },
                {
                    label: 'Dialog',
                    href: '/docs/factories/dialog'
                },
                {
                    label: 'Popover',
                    href: '/docs/factories/popover'
                }
            ]
        },
    ]
</script>

<ul class="flex flex-col gap-4 p-8 h-full">
    {#each sidebarItems as {label, navItems}}
        <li>
            <h3 class="h3">{label}</h3>
            <nav class="flex flex-col gap-2 p-2">
                {#each navItems as {label, href}}
                    <a href={href}>{label}</a>
                {/each}
            </nav>
        </li>
    {/each}
</ul>
