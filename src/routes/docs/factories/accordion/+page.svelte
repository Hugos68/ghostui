<script lang="ts">
    import { createAccordion } from '../../../../lib/factories/accordion/accordion.js';

    const { accordionTrigger, accordionPanel, isExpanded } = createAccordion({ allowMultiOpen: false });
</script>

<div class="flex flex-col">
    {#each ['accordion-1', 'accordion-2', 'accordion-3'] as label}
        <button use:accordionTrigger={{ panelLabel: label}}>
            Click me
        </button>
        {#if $isExpanded(label)}
            <div use:accordionPanel={{ label }}>
                This is some content
                <button>Some focusable target</button>
            </div>
        {/if}
    {/each}
</div>
